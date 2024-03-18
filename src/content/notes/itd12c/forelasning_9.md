---
title: Föreläsning 9
order: 90
---

# Föreläsning 9 - VLAN

## Varför VLAN?

Tidigare i kursen har vi jobbat med ett stort LAN med hjälp av switchar. Alla hosts har varit på samma nätverk och kopplade till en eller flera switchar i det nätverket.

Det finns dock några problem eller svårigheter med den här strukturen. Om vi då vill dela in detta så kan vi använda VLAN.

Har vi ett väldigt stort nätverk, med många hosts, och vi skickar ett broadcast meddelande så får vi en extremt stor mängd trafik. I ett VLAN har vi mindre nätvkerk där problemet inte blir lika stort.

Där finns också ett säkerhetsperspektiv, vi vill t.ex inte ha servrar med känsliga uppgifter i samma nätverk som enheter som kan innebära en risk, t.ex skrivare.

Det kan dessutom vara lättare att felsöka i ett nätvker med färre enheter.

### Definition LAN (från Ciscos bok)

> A LAN includes all devices in the same broadcast domain

Något som är ganska logiskt, vi ser ett nätverk/LAN som att alla är sammankopplade, men det stämmer ju ocskå att det är där alla nås av samma broadcastmeddelande

## Exempel

- Ett företag med tre medarbetare i en kontorslokal
- Varje medarbetare har en arbetsdator
- I kontorslokalen finns en gemensam printer/kopiator
- Förutom kontorslokalen har de plats i ett serverrum som
  ligger på en annan plats i samma hus
- I serverrummet finns router för inkommande Internet samt
  två servrar
- En av de anställda fungerar som it-tekniker och har en
  extra dator som används för att kommunicera med servrar
- Avståndet gör att det är bäst lämpat med fiberanslutning
  från serverrum till kontoret (100m jämfört med 5000m)
- Hur ska vi bygga/konfigurera nätet?

### Lösning 1

En potentiell lösning kan se ut som såhär

![](/itd12c/f9/losning1.png)

Här finns dock några problem:

- Alla ligger i samma nät, blir vårt nät större kanske vi till slut får problem med mängden trafik p.g.a broadcast (dock inte om det ser ut som i bilden, p.g.a så få hosts)
- Säkerhetsrisk, sevrar och andra användarenheter ligger i samma nät

### Lösning 2

![](/itd12c/f9/losning2.png)

**Kommentarer**

- Mer logisk indelning, vilket är bra
- Kräver extra hårdvara
  - Tre switchar kontra två (ingen större kostnad dock)
  - Två fiberlänkar (stort problem, stor kostnad)
- Förutsätter ett tredje interface på routern

Helst skulle vi nog gärna se en kombination av dessa, fysiskt vill vi ha det likt lösning 1, med bara en fiberlänk, men logiskt är lösning 2 bättre. Då kan vi använda VLAN.

## VLAN - Virtual Local Area Network

Skapar flera broadcastdomäner i samma switch, dvs delar upp switchen. Varje individuell broadcastdomän kallas ett VLAN. Logiskt är de separata även om de fysiskt är kopplade till samma switch.

![](/itd12c/f9/fig1.png)

Som på figuren ser vi att även om alla fyra hosts ligger på samma nät så kommer de inte åt varandra, de är logiskt sett på två helt olika nätverk.

Notera att alla enheter i ett VLAN måste vara i sama subnät och varje VLAN måste ha ett eget subnät.

Vi behöver gå upp till lager 3 för att kunna skicka trafik. Vi behöver då antingen en router alternativt en lager 3 switch.

Detta skulle t.ex kunna se ut såhär:

![](/itd12c/f9/fig2.png)

Men här finns en stor nackdel, vi måste ha två kablar till routern från switchen, en för varje VLAN.

## Trunking

Lösningen på detta är s.k trunking, vilket tillåter att en fysisk anslutning kan delas av flera VLAN.

Vad vi då gör är att man skapar två (eller fler) VLAN på en switch, man designerar sedan ett enda interface som inte ligger i något VLAN och konfigurerar "trunking" på detta interface. Då kan trafik från alla VLAN gå igenom samma interface.

Finns två protokoll i Cisco för detta

- ISL - Inte-Switch Link
  - Ett äldre cisco-protokoll
  - Stöds inte längre
- 802.1Q
  - Nyare IEEE-Standard, kallas även "Dot1q"
  - I dagsläget är det detta som gäller

### Principen

Varje ethernet frame taggas med ett VLAN-ID (12 bitar).

Vår header ser då ut såhär:

![](/itd12c/f9/fig3.png)

Notera felet, taggen är totalt 4 byte, inte 2!

Taggens delar:

- TPID - Första två bytes är ett speciellt bitmönster som indikerar att nu kommer en VLAN-taggad frame
- PCP - Bryr oss inte
- CFI - Bryr oss inte
- VID - VLAN Identifier - Vårt VLAD-ID

Annan representation finns på slide 19

Fysiskt ser hela trunkingen ut såhär:

![](/itd12c/f9/fig4.png)

## Exempel forts.

### Lösning 3

Om vi då blickar tillbaka på vårt exempel, kan vi kombinera det fysiska från lösning 1 med det logiska från lösning 2?  
Ja, med hjälp av VLAN och trunking

Det kan då set ut något såhär, med ett VLAN för våra sevrar (samt IT-dator och skrivare) och ett för våra vanliga datorer. Notera att kopplingen mellan våra switchar (fiberlänken) samt till routern är trunkad.

![](/itd12c/f9/fig5.png)
