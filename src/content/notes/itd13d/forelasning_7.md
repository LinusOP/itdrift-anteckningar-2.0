---
title: Föreläsning 7
order: 70
---

# Föreläsning 7 - Forts. DNS/IIS & DHCP

## Forts. DNS

### Split Horizon

Tillämpas i en miljö där vi vill ha vissa DNS poster publika och vissa privata. Man har då två DNS servrar, en som hanterar poster som endast ska vara tillgängliga internt, samt en som hanterar poster som ska vara tillgängliga från internet också.

Detta kan då se ut något såhär:

![](/itd13d/f7/fig1.png)

Som vi ser så pratar de interna klienterna i vår miljö med vår interna DNS server, men klienter ute på internet pratar med vår publika DNS server. Viktigt i en sådan uppställning är såklart att den interna DNS servern har en länk på något sätt till den publika, så att interna klienter kan komma åt samma servrar som de externa. Skillnaden blir ju att interna klienter _också_ kommer åt andra servrar.

### Secondary zone

I många fall vill vi ha redundans i vårt DNS system. Vi kan då ha en sekundär zon hos en andra DNS server. Vilket innebär att vår andra DNS server får en kopia av allt på vår primära server. Den kan enbart läsa, den primära servern har fortfarande ansvaret. Men den sekundära servern gör att om vår primära server går ner så tar den över och kan fortfsätta svara på frågor.

### Säkerhet och DNS

Designen av DNS är inte helt säker. Detta då det är ett gammalt protokoll som inte från början är designat för att vara säkert.

#### DoS - Denial of Service

En DoS attack innebär enkelt sagt att man skickar en massa förfrågningar till en server i hopp att man skickar fler än den klarar av att svara på, och då går ner. Man kan på så sätt stänga ner en tjänst genom att får deras DNS server att gå ner och därmed inte kan svara med IP adressen till tjänstens server.

**Potentiella sätt att försvåra detta**:

- Skilj på ansvar och resolver, ha en DNS server som inte svarar på rkursiva frågor utan enbart har ansvar för vår egen zon, och en som svarar på övriga rekursiva frågor. Går resolvern ner så har vi fortfarande en server som kan ansvara för vår egen zon.
- Begränsa antalet frågor som en enskild host får ställa inom en viss tid

#### Cache Poisoning

Om en klient ställer en fråga och dess DNS server i sin tur börjar med sin iterativa fråga, där den går till root servrar, topp-domän servrar osv. så kan vi försöka att svara innan någon av de här servrarna. Vi svarar alltså t.ex att "Jag har hand om google.com" innan toppdomänservern hinner svara. DNS servern som klienten frågade cachar då detta som svar och nästa gång någon frågor svara den också att "vi" har hand om google.com.

**Potentiella lösningar**:

- Cache lock - Har vi redan ett cachat svar för google.com så tillåter vi inte ett nytt svar att skriva över det, så vårt falska svar skriver inte över ett gammalt.
- Port pool - DNS servern skickar ut svar och frågor på olika portar, vet man då inte porten man ska skicka sitt falska svar till så kan man inte hellet göra en cache poisoning attack.
- DNSSEC - Signerade poster

#### DNSSEC

Med DNSSEC så skapar man nycklar som används för att signera poster. Varje nyckel kommer i par, en privat och en publik. Den privata nyckeln används för att signera och hålls hemlig. Den publika nyckeln skickas ut till alla och de kan använda den för att verifiera att en post signerades med vår privata nyckel.

För att veta att en domän är signerad av rätt nyckel så signeras den också av domänen "ovan". Dvs .se signerad av root servrarna, exempel.se signeras av .se, och www.exempel.se signeras av exempel.se.

Får vi då ett svar som inte är signerat av den publika nyckeln så vet vi att det nog inte är ett riktigt svar om vi förväntar oss ett signerat sådant.

#### DNS över HTTPS

Normalt sett är DNS förfrågningar inte krypterade, vilket innebär att personer som lyssnar på förfrågningar vet vilka hemsidor personer försöker nå. Vi kan då använda liknande system som vi använder för att kryptera förfrågningar till webbservrar för att också kryptera våra DNS förfrågningar.

Notera att DNS servern fortfarande ser vilka hemsidor vi besöker, vi förhindrar enbart andra att se dessa.

### Verktyg för DNS på klienter

Klienter (dvs windows datorer) kör en egen DNS klint tjänst. Det är denna som används när vi t.ex använder `nslookup` samt som andra applikationer använder när de behöver göra DNS förfrågningar. Den har också en egen cache.

### IIS - Internet Information Services

Webbservertjänst i windows server för att tillhandahålla webbsidor.  
Går att skapa/ändra hemsidor direkt med HTML kod, men kan även använda sharepoint.

Fördelen är att man då lagrar koden för sin hemsida direkt på sin server istället för i en extern tjänst. Är också ett bra verktyg för att testa DNS frågor.

## DHCP - Dynamic Host Configuration Protocol

DHCP används för att automatiskt dela ut IP adresser i ett nätverk, istället för att behöve sätta dessa statiskt.

Detta sker genom en princip som kallas DORA, "Discovery Offer Request Acknowledge", som är metoden som klienten och DHCP servern följer.

DHCP jobbar med UDP på port 67 för servern och 68 för klienten.

### DORA

#### Discovery

Allra först så börjar förfarandet med att en klient ansluter till ett nätverk och behöver en IP. Den skickar då ut ett broadcast-meddelande, med följande parametrar:

- Ethernet:
  - Source: Klientens MAC
  - Destination: Broadcast FF:FF:FF:FF:FF:FF
- IP
  - Source: 0.0.0.0
  - Destination: 255.255.255.255
- UDP
  - Source: 68
  - Destination: 67

Eftersom klienten inte har en IP adress får den sätta `0.0.0.0`.

#### Offer

DHCP servern tar emot discovery-meddelandet och reserverar en adress till klienten, vilka adresser den kan välja emellan kan konfigureras på DHCP-servern. Den skickar sedan ut ett erbjudande om den adressen till klienten.

Meddelandet ser ut som så:

- Ethernet:
  - Source: Serverns MAC
  - Destination: Klientens MAC
- IP
  - Source: Serverns IP
  - Destination: 255.255.255.255
- UDP
  - Source: 67
  - Destination: 68
- Data: Erbjuden IP-adress för klientens MAC

Även om DHCP servern redan reserverat en adress så är den inte officiellt tagen av klienten, därav är destinationen fortfarande en broadcast adress på IP lagret.

#### Request

Klienten svarar nu och accepterar erbjudandet att den vill ha den erbjudna adressen. Detta är fortfarande ett broadcast-meddelande, detta då det kan finnas flera DHCP servrar i nätet som kan ha skickat erbjudanden. Request meddelandet fungerar alltså både som svar på att vi vill ha adressen samt indikation till andra DHCP servrar att vi har tagit ett erbjudande från en annan server.

Meddelandet:

- Ethernet:
  - Source: Klientens MAC
  - Destination: Broadcast FF:FF:FF:FF:FF:FF
- IP
  - Source: 0.0.0.0
  - Destination: 255.255.255.255
- UDP
  - Source: 68
  - Destination: 67

#### Acknowledge

DHCP servern ger ett slutgilgit svar som berättar att allt är OK. Den skickar också s.k DHCP options.

Dessa innehåller information såsom DNS servrar, routerns IP, hur länge klienten får ha IP adressen (lease time) osv.

Meddelandet:

- Ethernet:
  - Source: Serverns MAC
  - Destination: Klientens MAC
- IP
  - Source: Serverns IP
  - Destination: Klientens IP
- UDP
  - Source: 67
  - Destination: 68
- Data DHCP Options

### Övriga meddelanden

Utöver meddelanden i DORA förfarandet så finns där några meddelanden som klienten kan skicka.

**DHCP Inform**

En klient kan begära mer information än det som skickades med automatiskt med detta meddelandet.

**DHCP Release**

Skicas av en klient som vill släppa ifrån sig sin adress. Detta är dock inte tvingande, det är servern som bestämmer om den ska släppa eller inte.

### Förnya adresser

Eftersom att en klient bara får ha en adress en viss tid (lease time) så behöver den förnya sitt lån. Den kommer därför att efter 50% av tiden försöka låna om sin adress.

Dessa förfrågningar skickas inte som broadcast, utan som unicast direkt till DHCP servern.

### Problem DHCP

När en klient får en adress tilldelad så ska den kontroller att ingen annan har samma adress redan. Detta görs genom en ARP förfrågan, får den inget svar så vet den att ingen annan har adressen.

Har vi flera DHCP servrar kan det uppstå konflikter, dvs att en annan server redan delat ut adressen som DCHP servern försöker dela ut till en klient.

Om en klient då får en adress tilldelad, men sen får svar när den skickar ut en ARP förfrågan för den adressen, då vet den att det blir konflikt.

Vad klienten då gör är att tilldela sig själv en s.k APIPA (Automatic Private IP Adressing) adress. Dessa är adresser i nätet `169.254.0.0/16` som klienten tilldelar sig själv. Dessa adresser får inte routas och det är därför ett icke-fungerande nät.

### Konfiguration av DHCP

När vi konfigurerar DHCP ger vi servern en pool/scope av adresser, t.ex 192.168.10.100-192.168.10.199.

Vi kan även plocka bort vissa adresser som inte ska delas ut, eller reservera adresser för en viss host så att den alltid får samma adress.

Vi kan också konfigurera vilken/vilka DNS servrar , router adresser osv. som ska skickas med.

#### DCHP Filter och Policy

Vi kan även konfigurera filter och policy på vår DHCP server.

Filter baseras på MAC adresser och finns i två förfarande:

- Deny - Aktiverar vi "Deny" filtret och lägger till en MAC där så kommer den vara blockerad från att få en IP adress av vår server
- Allow - Aktiverar vi "Allow" filtret så är det endast MAC adresser i allow-listan som får adresser, alla andra blir blockerade

På så sätt kan vi styra vilka klienter som ska få eller inte få adresser tilldelade av vår DHCP server. Filter sätts på servernivå.

Med policy kan du skapa regler för antingen servern eller ett specifikt scope. Du sätter där vissa vilkor och mostsvarande inställningar som appliceras när de villkoren uppfylls.

### PXE - Preboot eXecution Environment

PXE är ett sätt att boota från nätverket. Det är det vi gör i de små labbsalarna när vi resettar datorerna. BIOS (UEFI) inehåller en DHCP klient, en TFTP (Trivial File Transfer Protocol) klient, samt ett system för att läsa kod från TFTP till RAM och boota från de koden.

När vi då bootar från vårt NIC så så gör en s.k PXE DHCP Discovery, med denna får vi en IP som vanligt, men även adressen till TFTP servern så att vi kan hämta installationsfilerna för OS därifrån, och sen boota från de filerna. På så sätt kan vi t.ex hämta och installera om windows över nätverket.

### DCHP i större nät

I ett större företag har vi förmodligen flera (V)LAN som alla ska ha IP-adresser från en DHCP server. Vi kan sätta en DHCP server i varje nät, men det kan snabbt bli många servrar att hålla reda på. Vad vi skulle vilja är nog att ha en gemensam DHCP server för alla nät.

Normalt sett funkar inte detta, efter som en router mellan två nät inte routar broadcast-meddelanden. Dock finns det ett verktyg för detta, s.k DHCP Relay. Vilket installeras/konfigureras på routern och som tillåter routern att skicka DHCP meddelanden mellan olika nät. Vi kan sedan skapa ett scope för varje (V)LAN i vårt nät på vår DHCP server.

Utgår från följande nät:

![](/itd13d/f7/fig2.png)

Vi vill då konfigurera vår router (R) som DHCP relay. Vi får tala om att den ska skicka DHCP meddelanden i andra nät till DHCP serverns adress.

När den sedan tar emot ett meddelande från H2 så kommer den skicka detta vidare (trots att det är ett broadcast-meddelande) till DHCP i vårt andra nät. Notera att till DHCP servern skickar routern unicast-meddelanden, inte broadcast. Den skickar sen tillbaka svaren från DHCP till H2s nät.

På så sätt kan vår DHCP server användas av hosts i andra nät.  
Konfigurationen ser olika ut beroende på vilken router vi använder. Men typisk konfiguration inluderar att DHCP relay funktionen aktiveras samt att man get den IP adressen till DHCP servern.

#### DHCP relay i windows

I vår labb är vi inte kopplade till en "riktig" router. Vi kommer därmed använda en server som router. På windows server installerar man rollen "Remote access" för att få detta att fungera. Man använder sedan "Routing and Remote Access" verktyget och man kan där konfigurera DHCP relay.

### Superscope

Superscope är en microsoft-teknik för att konfigurera flera scopes på samma fysiska nät. Dvs vi kan i samma nät dela ut både från `192.168.9.0/24` och `192.168.10.0/24`. Det blir lite som ett fusk-VLAN, dock är det inte e riktig uppdelning som i ett riktigt VLAN. Det finns dock vissa användningsområden, t.ex om man har slut på adresser i sitt första nät eller om man migrerar en miljö.

### Redundant DHCP

Om vår DHCP server är nere så kan inge klienter tilldelas/förnya adresser. Vi behöver därav flera servrar som redundans. Dock diskuterade vi innan att flera servrar kan skapa konflikter.

Det finns vissa lösningar för detta:

- Kluster
- Split scopes - DHCP servrarna kan dela på scopet, dvs en delar ut 1-50 och den andra 51-100 osv.
- DHCP Failover - Den andra servern ligger och väntar, om vår primära server slutar svara så tar failovern över.
