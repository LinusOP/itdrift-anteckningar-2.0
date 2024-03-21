---
title: Föreläsning 12
order: 120
---

# Föreläsning 12 - IEEE 802.11

## MCS - Modulation and coding scheme

**Repetition**

MCS avser hur vi modulerar signalen, vad vi använder för tekniker osv. Både sändare och mottagare måste använda samma MCS för att de ska förstå varandra, dock kan den ändras dynamiskt och vilken som väljs av sändare och mottagare bygger på SNR värdet.

Den skrivs ut enligt följande format: _modulationsteknik_ _modulering_ _kodning_. Modulationstekniken är t.ex (och ofta) OFDM, moduleringen är t.ex 64-QAM, kodningen är hur många av våra bitar som faktiskt innehåller data, skrivs som ett bråktal t.ex 3/4. Ett exempel är då t.ex "OFDM 64-QAM 3/4".

Här finns många olika kombinationer av modulationstekniker samt vilken typ av modulering man använder med dem. Man kan t.ex använda OFDM QPSK 1/2 som är bra mycket långsammare än OFDM 256-QAM 3/4. Har vi mycket brus, eller dålig signal, så får vi gå ner till en MCS som klarar det. Generellt krävs bättre signal för de snabbare MCS kombinationerna. Ett SNR värde över ca 20 dB betraktas som ett bra SNR där vi kan börja använda de bättre teknikerna.

Vi behöver kunna läsa av MCS för att förstå de olika 802.11 standarderna som finns.

## WiFi

IEEE 802.11 är standarden för trådlösa nätverk. Där finns många olika standarder, t.ex 802.11ac för WiFi 5, 802.11ax för WiFi 6, 802.11n för WiFi 4 osv.

### Historia

802.11 legacy, den första standarden från 1997, låg på 2.4GHz bandet och använde enbart gamla modulationstekniker, FHSS och DSSS. Sedan kom 802.11b 1999, fortfarande i 2.4GHz bandet men med bättre modulationsteknik för att öka hastigheten. Såhär fortsätter det med 802.11g som introducerar OFDM (2003), 802.11n (wifi 4, 2009) som introducerar både 2,4 GHz och 5 GHz osv.

I dagsläget använder de flesta WiFi 5, 802.11ac och det senaster är WiFi 6, 802.11ax.

### Signalbehandling

Utöver hur vi modulerar signalen, med kanaler osv, så kan vi också behandla signalen beroende på omgivningen för att förbättra uppkopplingen.

#### Transmit beamforming

Transmit beamforming innebär att man på olika sätt skickar flera signaler för att slå ihop dessa på ett sätt som gör att man kan rikta den slutgiltiga signalen mot enheter. Vilket innebär att man får bättre signal och "slösar" mindre genom att bara skicka ut generellt.

#### MRC - Maximal-Ratio Combining

Flera antenner kan ta emot kopior av samma data, och mottagaren kan då välja den bästa versionen. Man ökar mer eller mindre chansen att får rätt data.

#### Spatial Multiplexing

Två enheter kan skapa mer än en ström mellan varandra. Det är samma bärvåg som skickar båda strömmarna, men signalbehandling innebär att mottagaren sen kan skilja på dessa, på så sätt kan man mer eller mindre fördubbla sin hastighet genom att lägga till en till ström.

#### Channel aggregation

Flera kanaler á 20 MHz kan slås ihop, t.ex till en 40 MHz eller t.o.m 80 MHz kanal. På så sätt kan vi använda flera datakanaler och därmed öka hastigheten.

#### MAC layer efficiency

Något vi gömt lite tidigare är att det vi kallat symboltid, alltså tiden för att skicka en modulation, är faktiskt en sammanslagen tid. Den består både av tiden det faktiskt tar att skicka symbolen, plus en liten tid där access punkten pausar och inte skickar något. Detta är ett skydd för att se till att symboler inte stör varandra.

Med hjälp av olika tekniker kan man minska denna, från 800 ns till 400 ns. VIlket gör att vår totala symboltid går från 4 µs till 3.6 µs.

### Dagens wifi

#### 802.11ac

Sen 2012-2014 ungefär har vi WiFi 5. Här ligger huvudfokus på 5 GHz bandet, med ännu fler antenner, fler och bredare kanaler osv. Även bättre modulationstekniker, t.ex 256-QAM.

Även nya tekniker såsom Mu-MIMO som tillåter routern att skicka till flera enheter samtidigt gör stor skillnad för effektiviteten.
