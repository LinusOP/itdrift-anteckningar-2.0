---
title: Föreläsning 6
order: 60
---

# Föreläsning 6 - DNS / IIS

## DNS

Syftet med DNS är, enkelt sett, att översätta mellan domännamn (t.ex `hkr.se`) och en IP-adress (t.ex `194.47.29.157`). Det kan liknas lite vid en telefonkatalog.

Vi kan även använda DNS internt, dvs för att översätta namn inom en miljö. I vår AD labb märkte ni kanske att vi kunde skriva `\\FileSRV\Public` för att komma åt filservern.  
Detta funkar eftersom AD servern har en DNS server som automatiskt lagrar servrars namn och IP-adresser när de är anslutna till domänen. Vi fick också ställa in i våra inställningar på filservern och klienten vår AD-servers IP-adress som DNS server.

### DNS-serverns funktioner

Det finns generellt två uppgifter för en DNS-server. Dels är de ansvariga för att, som nämnt ovan, hjälpa klienter att översätta namn till IP-adresser, detta är funktionen som gemene man oftast har nytta av. En DNS server som gör detta kallas en "Resolver".

Men de kan också ha ett ansvar över en viss zon eller domän. Det vill säga att vara servern som berättar vilka IP-adresser som gäller för en viss domän.

### Root-servrar

Om en DNS-server får en förfrågan för en domän som den inte har hand om så måste den ha nånstans dit den kan ställa frågor. I grund och botten är det DNS root-servrarna som ger oss detta. Det finns 13 av dessa på lite olika ställen i världen (en finns t.ex här i sverige).

Vill vi t.ex veta vem som har hand om `arla.se` så kan vi fråga en root-server om `arla.se`. Dock kommer vi inte få ett direkt svar. Istället kommer den svara att "Jag vet inte detta, men jag vet vem som har hand om `.se` domäner". Vi frågar då denna server, då får vi nog ett liknande svar "Vet inte men jag vet vem du ska fråga om `arla.se`". Vi frågar sen den servern som svarar med DNS serverns som är ansvarig för `arla.se`, och sist får vi fråga denna DNS server om IP-adressen till webbservern för `arla.se`.

Självklart sker dock inte detta förfarandet varje gång, med hjälp av caching så kan nästa fråga om `arla.se` svaras på direkt.

#### Förfarandet som exempel

Den svenska root-servern har adressen `i.root-servers.net`. Om jag frågar denna om `arla.se` får jag som svar att den vet inte, men fråga nån av följande:

```
a.ns.se
x.ns.se
y.ns.se
b.ns.se
g.ns.se
i.ns.se
c.ns.se
f.ns.se
m.ns.se
z.ns.se
```

Om vi då t.ex frågar `a.ns.se` får vi ett liknande svar att den inte vet men här är servrarna som kan veta:

```
a.portsdns.se
b.portsdns.net
```

Frågar vi då `a.portsdns.se` får vi vårt svar att `arla.se` har IP-adressen `20.50.2.55`.

### Rekursiv / Iterativ fråga

#### Rekursiv fråga

En rekursiv fråga är det som vi som klienter nästan alltid gör. Vi frågar vår DNS server (kanske googles eller telias osv.), sen väntar vi lite och får ett slutgiltigt svar direkt. Vi slipper alltså själva göra förfarandet ovan.

#### Iterativ fråga

Det vi beskrev ovan är en iterativ fråga, det är när vi får svaret "Jag vet inte men kolla med..." och får ställa flera frågor. Detta sker oftast mellan olika DNS-servrar.

### Vad gör en DNS server med en fråga?

1. Om DNS servern är ansvarig för en zon/domän så kollar den om det är denna fråga gäller och svarar då direkt
2. Annars kollar den om svaret finns i sin cache, om samma fråga nyligen ställts t.ex
3. Om den inte själv kan svaret (inte en egen domän) och den inte har det i sin cache så har den två alternativ:
   - Gör en egen iterativ fråga som ovan
   - Skicka vidare till en forwarder

#### Forwarder

Vissa DNS servrar vill inte behöva göra dessa iterativa frågor men kanske har en andra server för detta. Då kan denna DNS servern göra en egen rekursiv fråga till en annan DNS server (forwarder) som i sin tur gör den iterativa frågan åt oss.

Några vanliga forwarders är t.ex `8.8.8.8` (Google) eller `1.1.1.1` (Cloudflare) men din ISP (internetleverantör) har ofta också en egen forwarder.

### Zoner och records

En DNS server som är ansvarig för en (eller flera) domän/zon har ett eller flera s.k "DNS Record" eller poster, dessa poster är de som innehåller informationen kring vår domän.

#### Olika sorters poster/records

- SOA - Start of authority
  - Innehåller administrativ information om domänen
- NS - Name Server
  - Innehåller adresser till domänens DNS-servrar
- A (IPv4) och AAAA (IPv6)
  - Posterna som faktiskt översätter mellan domäner och adresser
- CNAME
  - Inehåller alias för domäner, t.ex "`www.hkr.se` är detsamma som `webbserver.hkr.se`".
- PTR
  - Används för att översätta på andra hållet, dvs IP -> Domän, en s.k reverse-lookup

Flera exempel är t.ex SRV, MX, TXT osv men dessa kommer vi inte kolla på nu.

**Reverse lookup**

Om vi har en IP-adress och vill ha tillhörande domän så får vi denna igenom PTS posters som nämnt ovan, dessa har ett unikt format.

För adressen `192.168.10.56` så hade PTR posten sett ut som så: `56.10.168.192.in-addr.arpa`. Notera att IP-delen är omvänd, vi måste också lägga in `in-addr.arpa` pga hur PTR poste fungerar.

### Subdomäner

Har vi en domän såsom `example.com` men vill ha en "del" av denna för IT-avdelningen så kan vi skapa en subdomän som er ut som följande `it.example.com`. En subdomän kan antingen hanteras av samma DNS server som vår huvuddomän eller så kan ansvaret delegeras till en annan server.

IT-avdelningen kanske själva ska ha hand om sin subdomän men en konsult har han om huvuddomänen, då kam man delegera ansvaret för `it.example.com` till IT-avdelningens egna DNS server.

### Separata domäner

Antag att ett företag äger två domäner, t.ex `example.org` och `example.com`.

En klient i `example.org` vill nå `example.com`, men vår DNS server för `example.com` kan inte detta.  
Då finns tre alternativ:

1. Gör som för vilken domän som helst, gå ut på internet till root-servrar och gör iterativa förfrågningar
2. Ställ in en "Conditional forwarder" för `example.com`.
3. Ställ in en stub-zon för `example.com`

#### Conditional forwarder och stub-zon

Tidigare pratade vi om forwarders, dessa var andra DNS servrar dit vi skickade alla våra förfrågningar istället för att själv lösa dem.

Men vi kanske vill skicka till en specifik DNS server för en viss domän, i vårt fall vill vi att förfrågningar till `example.org` DNS servern som gäller `example.com` besvaras av vår andra DNS server. Vi kan då skapa en conditional forwarder på `example.org` DNS servern som säger att "får du frågor om `example.com` fråga denna servern".

En stub-zon funkar ganska likt men är istället en egen zon i `example.org` DNS servern med enbart DNS sevrarna för `example.com`. I vår labb kommer vi enbart kolla på conditional forwarders.
