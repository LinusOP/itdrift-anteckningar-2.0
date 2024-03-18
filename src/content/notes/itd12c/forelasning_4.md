---
title: Föreläsning 4
order: 40
---

# Föreläsning 4 - Switch

## Ethernet Frame

En ethernet frame har följande uppbyggnad:

1. Preamble
2. SFD
3. Destination
4. Source
5. Type
6. Data and pad
7. FCS

**Preamble**

Detta är en sekvens av 7 bytes, alla med värde `10101010` som används för att visa att det snart kommer data, samt för att kunna synkronisera.

**SFD (Start Frame Delimiter)**

Denna byte visar att vår preamble är över och att nästa byte är början på vår faktiska data. Den har formatet `10101011`.

**Destination**

Detta är vår mottagaradress, en MAC-adress på 48 bitar (6 byte)

**Source**

Vilken MAC-adress som framen kommer ifrån, också 6 bytes/48 bitar.

**Type**

2 bytes som indikerar vilken typ av protokoll som används i framen. Idag visar det ofta om det är IPv4 eller IPv6 vi jobbar med i framen.

**Data and pad**

Detta är vår data, inklusive headers för ovanstående lager. Detta är 46-1500 bytes, därav "and pad", för har vi data som är mindre än 46 byte så lägger man på bytes tills man når detta.

**FCS**

Frame Check Sequence, 4 byte som används för att kontrollera att framen mottogs korrekt och utan korruption.

## Switch

En switch har flera "interface". Varje port är ett eget interface, och varje interface har ett namn. På Cisco-utrustning (som vi kommer labba med), så döper de sina interface i format såsom "GigabitEthernet 0/1", där sista siffran är nummret för vårt interface. Dessa kan förkortas "G0/1".

### Switchens logik

Hur vet switchen vilket interface den ska skicka en frame till?

Den gör detta genom att använda sin "MAC Address Table". En tabell där den matchar ett interface till en MAC-adress. När den sedan tar emot en frame så kollar den destination adressen, den kollar efter adressen i sin tabell, och skickar ut på matchande interface.

När en switch har en frame så har den två alternativ för varje interface, "forward" eller "filter". Forward innebär att vi skickar framen på det interface och filter innebär att vi inte gör det. För varje interface väljer switchen om den ska göra en forward eller filter, utifrån sin tabell.

### Hur switchen fyller sin MAC tabell

I början, när en switch har en tom tabell, så kommer switchen ta emot en frame och sen göra en flood. Där den skickar ut framen på alla interface utom avsändaren. Samtidigt noterar den också avsändarens interface samt vilken MAC-adress den har i sin tabell. På så sätt lär den sig nya adresser varenda gång den tar emot en frame på ett interface.

### Interna switch metoder

- Store-and-forward - Switchen tar emot en hel frame, kollar alla nödvändiga fält (destination, FCS osv) och skickar sedan den vidare.
- Cut through, switchen läser upp till den ser destinationsadressen, sen skickar den direkt vidare framen utan att kolla något i resterande del av framen. Den kollar då t.ex inte FCS.
- Fragment-free - Här skickar switchen vidare framen efter att den tagit emot 64 byte. Ett värde som man kommit fram till då det motverkar vissa kollisionsfel.

## Switchens minne

- RAM - Motsvarande primärminne på en dator
- Flashminne - Lagrar OS
- ROM - Bootstrap/Boothelper, precis som en vanlig dator krävs något program som startar OS, detta lagras här
- NVRAM - Minne där startkonfigurationer kan lagras utan att försvinna vid strömavbrott osv. Icke flyktigt

## Konfigurering av switchar

Dyrare switchar är oftast mer konfigurerbara än de som vi använder hemma. I vårt fall kollar vi på CISCO switchar.

Vanligt är att vi kommer koppla in oss till switchen med serialportar på datorn. De kan även konfigureras över telnet eller SSH, dvs över nätverket. Hur vi konfigurerar kommer behandlas mer i labbar.
