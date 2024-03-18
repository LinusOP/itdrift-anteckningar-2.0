---
title: Föreläsning 8
order: 80
---

# Föreläsning 8 - Routingprotokoll RIPv2

## Repetition

**Routingtabell / Routing Table**

Vi utgår från en router (R1) med två interfaces, `g0/0` samt `g0/1`. På g0/1 är vi kopplade till nät `192.168.1.0/24` och på g0/0 `192.168.2.0/24`. Kollar vi då på routingtabellen i R1 ser den ut något såhär:

```
R1
192.168.1.0/24 D.C g0/1
192.168.2.0/24 D.C g0/0
```

Där D.C visar att det är directly connected (i Ciscos terminal ser detta annorlunda ut).

Vi kopplar en till router (R2) i nätet `192.168.2.0/24` som även är kopplad i `192.168.3.0/24` (R1 och R2 har varsett eget nät samt är båda i nät 2). Vill vi nå detta tredje nät från vårt första nät (där trafiken ska gå igenom båda routers) så går detta inte, R1 vet inte hur man når R2 och därmed nät 3.

Vi sätter då statiska routes, så att R1 vet vilken väg den ska ta för att nå ett nät den inte är direkt kopplad till.  
Detsamma måste då göras från R2 till R1 så att den kan nå nät 1.

Har vi dock många routers, i många olika nät osv så blir detta snabbt oerhör rörigt, vi använder då dynamiska routingprotokoll (som kommer senare här).

**Hur routern jobbar**

1. Routern tar emot en frame, den kontrollerar att MAC-adressen är sin egen samt gör felkontroll på framen
2. Routern packar upp från lager 2 -> lager 3
3. Routern kollar på vilken destinations-IP vi har, den tittar sen på routingtabellen för att se om den har en väg dit
4. Har den det så packar den ner IP-paketet i en ny frame
5. Den skickar framen vidare

## Dynamiska routingprotokoll

### Vad gör vi om en förbindelse går ner?

Har vi en statisk route så kan vi helt enkelt inte komma fram, vi har gett vår router en väg, är den vägen inte tillgänglig får vi vänta tills den är det.

Med dynamiska protokoll är detta inte längre ett lika stort problem.

Detta innebär att de dynamiska protokollen har två fördelar:

- Som tidigare diskuterat slipper vi ställa in routes statiskt
- Försvinner en route så kan de hitta nya vägar (förutsatt att en är tekniskt möjlig såklart)

### Vad gör dessa?

Enkelt sagt kommer varje router göra två saker, den kommer dels skicka ut sin routinginformation till andra router, samt ta emot och lära sig från informationen alla andra skickar ut.

Finns där flera vägar så väljer de den bästa vägen (vissa routingprotokoll är bättre på detta än andra)

Om topologin ändras så uppdateras routinginformationen, vilket enkelt sagt betyder att om en router läggs till eller försvinner så uppdateras informationen utifrån detta dynamiskt och vi behöver inte göra nåt.

I det förfarandet finns där något vi kallar konvergenstid, detta är tiden det tar från att topologin ändras till att våra routers lärts sig detta och listat ut nya vägar.

Observera att routingprotokoll är applikationer som körs på en router, olika routers stödjer olika routingprotokoll.

Det är också viktigt att tänka på att routingprotokoll inte gör nåt för själva routingen, de har enbart som uppgift att hålla routingtabellen uppdaterade, det är sen den som avnänds för själva routingen.

### Bästa väg

Hur avgör routingprotokollen vilken väg som är bäst?

Kollar huvudsakligen på tre saker:

- Antal hopp (hur många gånger måste trafiken routas)
- Hastighet (hur snabb är en viss föbindelse)
- Fördröjningar (finns där något som gör att en viss förbindelse tar längre tid?)

### Interior vs Exterior

Där finns olika typer av routingprotokoll, interior samt exterior.

#### Interiorprotokoll (IGP, Interior Gateway Protocol)

Dessa används inom ett nät (s.k AS, Autonomous System) och här finns några olika:

**RIP (RIPv2)**

Det vi använder i denna kurs, ett ganska ankelt och långsamt protokoll. Baserar sin "bästa väg" enbart på hur många hopp det är till "målet". Denna typ kallas "Distance Vector".

**EIGRP**

_Fylls i senare_

**OSPF**

_Fylls i senare_

#### Exteriorprotokoll (EGP, Exterior Gateway Protocol)

Dessa används mellan nät, t.ex mellan olika företsgs system osv.

Här finns egentligen bara ett enda protokoll som används, **BGP**. Detta kollar vi dock inte på, men är bra att känna till att det finns.

### RIP - Routing Information Protocol

RIP är det routingprotokoll vi kommer titta på i denna kurs och använda i våra labbar. Specifikt använder vi version 2, RIPv2.

RIP är ganska enkelt, det väljer bästa väg baserat på antal hopp, dvs färre antal routrar på vägen anses vara en bättre väg, oavsett hastigheter och fördröjningar.

### Risk för loopar

Med distance vector protokoll finns en risk för loopar (då dessa inte har koll på hela topologin), det finns då några sätt att motverka dessa.

_Fylls i senare_

#### Split Horizon

#### Route Poisoning

#### Hold down

## Gateway of last resort

_Fylls i senare_
