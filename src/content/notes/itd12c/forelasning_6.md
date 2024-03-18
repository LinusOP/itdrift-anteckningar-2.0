---
title: Föreläsning 6
order: 60
---

# Föreläsning 6 - Forts. Fragmentering, ARP, och ICMP

## Fragmentering

Ett IP-paket har en maximal storlek på 65 535 byte. Dock är den maximala storleken (MTU, Maximal Transmission Unit) på lager 2 1500 byte, vilket innebär att vi kan ha IP-paket som är större än vad lagret under tillåter. Notera att i dessa 1500 byte ingår IP headern, så datan kan enbart vara 1480 byte.

För att kunna skicka dessa stora IP-paket så används fragmentering, vilket enkelt sett är att man delar up IP-paketet i flera mindre delar som får plats i frames.

Stödet för detta i IP standarden baseras på 3 fält i IP-headern. Dessa är "ID", "Flaggor", samt "Offset".

- ID - Gemensam ID för samtliga delar av vårt fragmenterade paket, dvs alla delar av ett fragmenterat har samma ID, för att visa vilka delar som ska sättas ihop i slutet till ett stort IP paket
- Flaggor - Används för att indikera för en router att paketer är fragmenterat, när det sista fragmentet kommer osv.
- Offset - Indikerar vilken position av all fragment som en del har. Dvs delar vi upp ett paket så visar vår offset var nästa paket börjar. Mäts i hur många 8 bytes efter första paketet som detta tar vid. Har vi t.ex tre delar så kommer första ha offset 0, andra ha offset 185 (1480 (vår data mängd i första paketet) / 8) vilket är hur många 8 bytes hopp efter första paketet som vårt andra paket ska börja

## ARP - Address Resolution Protocol

ARP är ett protokoll som ligger mellan nivå 2 och 3. Syftet är att kunna få en MAC-adress om man vet en IP-adress.

Har vi t.ex ett IP-paket som ska till en viss IP-adress, så kommer det packas ner i en frame i lager 2. Dock får vi problem när vi ska fylla i destinationens MAC-adress, denna vet vi inte!

Avsändaren kommer då först kolla i sin ARP-tabell, en tabell med IP-adresser och MAC-adreser tillsammans. Om IP-adressen vi vill skicka till har en tillhörande MAC-adress så använder vi denna i vår frame.

Om vi inte har en rad i vår ARP-tabell för den IP-adressen så får vi göra en ARP förfrågan. Vi skickar alltså ett broadcast meddelande, till alla på nätverket, och anger sin adress samt frågar vilken MAC-adress personen med en specifik IP-adress har. Finns där en dator som ser att den har IP-adressen i vår förfrågan så skickar den ett svar till oss (med hjälp av våra adresser i vår förfrågan) och vi får på så sätt rätt MAC-adress.

## ICMP - Internet Control Message Protocol

ICMP används för att skicka fel- eller kontrollmeddelanden. T.ex använder ping ICMP.

Ping skickar alltså en s.k ICMP Echo request, och får en s.k ICMP Echo Reply tillbaks. Dessa är ICMP meddelanden för att se om man kan nå en specifik adress.
