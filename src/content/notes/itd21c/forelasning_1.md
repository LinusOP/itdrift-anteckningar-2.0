---
title: Föreläsning 1
order: 10
---

# Föreläsning 1 - Repetition och managementnätverk

**Föreläsningen började med kursintroduktion, se slides**

## Repetition

### Ethernet

Använder standarden IEEE 802.3. Vanlig standard för lokala nätverk och arbetar med MAC-adresser.

Använder switchen som central komponent för att transportera trafik. Använder ofta VLAN för att dela upp nätverk i segment, för säkerhet och bättre administration.

#### VLAN

Som nämnt delar VLAN upp en fysisk switch i flera logiska nätverk. Detta görs genom att tagga ethernet frames med extra data som indikerar vilket VLAN framen tillhör.

### Router

Routrar kopplar samman flera olika nätverk och möjliggör kommunikation mellan dess. Den identifierar även vägar till andra nät med hjälp av routingprotokoll och sin routingtabell.

Repetition på routrar:

![](/itd21c/f1/fig1.png)

Om vi enbart sätter IP-adresser samt öppnar interfacen på R1, vad händer?

R1s routingtabell uppdateras och visar att vi är direkt kopplade till nät `12.0`, `13.0`, samt `14.0`. Vi vet också att om vi vill nå nätverk förbi dessa krävs ett routingprotokoll, t.ex RIP som vi använt tidigare eller OSPF som vi kommen använda i kursen.

### IPv4

En IPv4 adress består av 32 bitar och indikerar en host samt vilken host nätet ligger i. För att få fram nätet används en nätmask, nätmasken matchar längden på 32 bitar och består av 1or och 0or. De delar i IP-adressen som matchar maskens 1or indikerar nätverk, resterande indikerar host.

## Konfiguration över nätverk

### Konfiguration via serial

Normalt när vi konfigurerat nätverksutrustning, t.ex en switch, har vi använt en seriaklabel kopplad till konsolporten på switchen.

Fördelarna är att där finns inga krav på annan infrastruktur. Har du en switch och en laptop med serialport så kan du konfigurera switchen. Det är också relativt säkert, chansen att någon skulle lyckas avlyssna konfiguration är låg.

Nackdelen är såklart att man måste fysiskt kunna koppla in till enheten. Har man utrustning på många ställen, kanske med många mil emellan, så blir detta snabbt jobbigt.

### Konfiguration via nätverk

Våra enheter är ju nätverksanslutna, det känns då naturligt att vi också konfigurerar dessa via nätverket. För detta används en anslutning över TCP/IP, detta görs genom en virtuell terminalanslutning, en s.k "vty".

Oftast används ett protokoll såsom SSH, men vi har tidigare laborerat med Telnet, varför använder vi inte detta? Telnet är inte säkert, det skickar data i klartext och detta inkluderar ju då lösenord mm.

SSH är å andra sidan krypterat. Det är också bättre på att verifiera identiteten på den som ansluter. Av denna anledning bör man använda SSH för att skydda mot avlyssning och se till att enbart behöriga ansluter.
