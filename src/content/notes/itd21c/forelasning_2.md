---
title: Föreläsning 2
order: 20
---

# Föreläsning 2 - Spanning Tree Protocol

Spanning Tree Protocol - STP - är ett protokoll som är kopplat till switchar.

## Repetition switchar

- Används för att bygga ett LAN
- MAC-Tabell som huvudverktyg, binder destinations-adress och interface
- Flooding används om en adress saknas i MAC-tabellen
- Switchen lär sig MAC-tabellen automatiskt genom att läsa av MAC-adress och koppla till ankommande interface

## Redundans i switchar

Tänk er ett nätverk som följande:

![](/itd21c/f2/fig1.png)

Om vi inte har den gröna kopplingen i bilden och länken mellan SW1 och SW2 försvinner eller går sönder, då försvinner kopplingen mellan H2 och H3. Lösningen blir såklart då vår gröna koppling, som ger H2 och H3 en väg till resten av nätverket även genom SW3.

### Problem redundans

Även om vår gröna länk funkar bra i att ge alternativa vägar så ställer en också till en del problem, nämligen en loop. Loopen ger oss flera problem, en s.k broadcast storm, MAC-table instability, samt multiple frame transmission.

#### Broadcast storm

En broadcast storm uppstår i fall där switcharna använder flooding. Om vi i vår bild ovan tänker att alla switchar har tomma MAC-tabeller och H1 skickar något till H2. Framen når SW1 som floodar (tom tabell), SW2 får framen och floodar, H2 får framen! Men, SW3 får också framen, och floodar, framen når SW2 igen som än en gång floodar (förutsatt att H2 inte hunnit svara). Framen når då tillbaka till SW1 som floodar igen och helt plötsligt har vi oändliga loopar.

#### MAC-Table instability

Tänk er ovanstående scenario, utöver vår loop så får vi också problem med vilket interface som tillhör en MAC-adress. I början skickar H1 till SW1 på g0/1, och SW1 lär sig detta. Men när framen loopar och kommer från SW3 så är avsändar-MAC fortfarande H1s MAC, men nu ankommer det på g0/3. Switcharnas MAC-tabeller kommer hela tiden att ändras på detta sättet.

#### Multiple frame transmission

Vårt sista problem är att H2 i vårt scenario kommer få samma frame flera gånger. Chansen är stor att detta skapar problem eller kraschar program högre upp i TCP/IP stacken.

## Lösningen

För att kunna ha redundans utan att skapa dessa problematiska loopar får vi eliminera de interface som skapar looparna. Specifikt ser förfarandet ut såhär:

1. Bygg nätverket med redundans (loopar)
1. Stäng ner de interface som skapar looparna
1. Om det öppna interfacet går ner så starta det andra interfacet iställe

På så sätt kan vi ha en potentiell loop som är stängd tills den behövs. Men detta blir klumpigt att göra för hand. Det är detta STP gör automatiskt.

## STP

### Principen för Spanning Tree

Spanning tree förhindrar loopar genom att placera portar i ett av två lägen, forward eller blocking.
Dessa lägen är ganska självförklarande, forward mode innebär att porten är öppen ock skickar trafik, blocking mode innebär att porten inte skickar trafik (förutom STP meddelanden och vissa kontrollmeddelanden).

STP väljer sedan forward eller blocking mode på varje port för att se till att alla kan nås utan några loopar.

### STP algoritm (metod)

För att titta på STP utgår vi från följande skiss:

![](/itd21c/f2/fig2.png)

#### Root switch

För att STP ska fungera väljer algoritmen ut en root switch. För att lösa detta skickar STP s.k BPDU, Bridge Protocol Data Units. Dessa är meddelanden som skickas mellan switchar för att kunna utföra STP.

Specifikt skickas det ut ett s.k BPDU Hello meddelande. Detta innehåller ett antal saker:

- Root bridge ID
- Sender bridge ID
- Sender root cost
- Timer values

Viktigt här är de bridge ID, eller BID, som skickas ut. Varje switch har ett BID, bstående av en priority och sin MAC-adress. Priority är 4 bitar och sätts (binärt) framför MAC-adressen, tillsammans bildar dessa BID. Notera att pga den binära representationen av dessa ihopsatta gör att priority blir en multipel av 4096 (standard 32 768).

När switchar då ska lista ut root skickar de ut sina BDPU hello meddelande med sig själv som root. När de tar emot ett BDPU hello med en root med lägre BID så ser den istället denna som root och börjar skicka ut detta.

Till slut skickar alla switchar ut BDPU hello med samma root BID, tillhörande switch blir då root switch.

**I vår switch antar vi att vi justerat prioritet så att SW2 är root**

#### Kostnad till root

När vi nu har en root switch behöver vi kolla på kostnader till rooten. För att göra detta kollar man på länkhastigheten (därav är den utplacerad i skissen, `M=Mb/s` och `G=Gb/s`).

Kostnaderna per länkhastighet är följande:

| Hastighet | Kostnad |
| --------- | ------- |
| 100 Mb/s  | 19      |
| 1 Gb/s    | 4       |
| 2 Gb/s    | 3       |
| 10 Gb/s   | 2       |

Tittar vi på länken mellan SW1 och SW2 (root) har denna hastigheten 1 Gb/s, därmed kostnad 4. Vi gör sedan denna uträkningen för varje länk i skissen. Vi kan sedan räkna ut kostnaden från en switch till root genom att addera alla kostnader i den väg med lägst kostnad. T.ex blir kostnad från SW5 till SW2 `2`, kostnaden för länken rakt upp. Tittar vi däremot på kostnaden från SW6 till root blir denna 7, då dess direkta koppling kostar 19 blir den lägsta kostnaden igenom SW3 (4 + 3, `SW6 -> SW3 -> Root`).

Fullständigt får vi följande kostnader för varje switch:

| Switch | Kostnad |
| ------ | ------- |
| SW1    | 4       |
| SW3    | 3       |
| SW4    | 3       |
| SW5    | 2       |
| SW6    | 7       |

**Oftast vill man justera priority så att den switch som är vägen "ut" ur nätverket blir root**

#### Designera portar

När vi har vår kostnad kan vi börja designera portar på varje switch. Den port som ger oss lägst kostnad till root blir "root port" (RP). På SW5 är detta t.ex porten "rakt upp".

Gör vi detta för samtliga portar får vi följande:

![](/itd21c/f2/fig3.png)

När vi satt ut root portar vill vi nu lista vilka interface som ska bli blockerade för att undvika loopar. För att göra detta kollar vi på varje länk mellan switcha där vi inte har någon RP (t.ex länken mellan SW1 och SW4).

På varje länk kollar man på vilken av switcharna som har lägst kostnad till root (enligt vår tabell), den "sidan" blir designated port (DP), andra "sidan" blockeras.

Länken ser då ut såhär:

![](/itd21c/f2/fig4.png)

Gör vi detta för samtliga får vi:

![](/itd21c/f2/fig5.png)

På så sätt listar STP ut vilka portar som ska vara öppna och vilka som bör stängat för att unvika loopar och få en optimal väg till vår root.
