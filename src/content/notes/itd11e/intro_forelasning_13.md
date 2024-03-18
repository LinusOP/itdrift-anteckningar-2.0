---
title: Datateknisk introduktion - Föreläsning 13
order: 130
---

# Föreläsning 13 - Nätverksteknik

För att få all datorer att förstå varandra i ett nätverkspespektiv så behövs en standard. Den standard man kom fram till kallas TCP/IP.

Modellen delas in i olika lager.

## Lager i TCP/IP modellen

### Lager 5 - Application

Data via protokoll, dvs det format som våra program förstår.

Exempel på protokoll: HTTP, DNS, DHCP

### Lager 4 - Transport

Detta lager hanterar hur datan ska transporteras från punkt A till punkt B. Bl.a problem såsom om 2 applikationer på samma dator skickar data till samma server, vilken applikation ska ha vilken data? Löser detta med s.k portar.

Arbetar med två protokoll:

- UDP: Skickar data utan att se till att all data kommer fram, mindre tillförlitligt och kan ha dataförlust
- TCP: Frågar om datan kom fram innan den skickar nästa del, mer tillförlitligt och utan dataförlust

### Lager 3 - Nätverkslagret

Arbetar med IP-Adresser, finns två typer: IPv4 och IPv6. IPv6 hanteras senare i nätverksteknik 1. I resterande text betyder IP en IPv4 adress.

En IP-Adress är uppbyggd av 4 oktetter, 32 bitar. Bitarna skrivs ofta ut decimalt, ex: `192.168.1.15`.

För en dator ser den adressen istället ut såhär: `11000000 10101000 00000001 00001111`.

Dock talar inte en IP-adress om hela sanningen, det krävs även en nätmask. För ovanstående adress säger vi att masken är `255.255.255.0`.

En nätmask som `255.255.255.0` kan också skrivas som `/24`. Det är alltså hur många 1or vi har. Varje oktett i vår nätmask som har värdet 255 är 8 1or, totalt har vi därmed 24 1or. Detta kallas CIDR notering.

#### Nätadresser

En IP-Adress tillsammans med en nätmask används för att få fram en nätadress. Nätadressen indikerar om två IP-adresser tillhör samma nät.

Detta gör man genom att göra en AND operation på IP-Adressen med nätmasken. Dock kan man göra en viss genväg här, eftersom att en AND operation med enbart 1or ger dig samma resultat som du började med och en AND operation med bara 0or ger dig enbart 0or som resultat.

Dvs `00001001 AND 11111111 = 00001001` och `10100011 AND 00000000 = 00000000`.

På så sätt kan vi med hjälp av en IP och nätmask såsom `192.168.1.15 AND 255.255.255.0` veta enkelt att resultatet blir `192.168.1.0`. Detta är vår nätadress.

Om nätadressen stämmer mellan två olika IP-adresser så är de på samma nät.

Resterande bitar kallas hostbitar. En nätadress har alltså 0or på hostbitarna

Eftersom att nätadresser har 0or i sig så innebär det att en IP-adress aldrig får ha det, att ha enbart 0or i en adress är endast tillåtet i nätadresser. Detta innebär att den lägsta adressen i vårt exempel ovan är `192.168.1.1` eftersom vi inte får ha en 0a på våra hostbitar.

#### Router

En router här är något annorlunda än det vi hemma kallar för router. Det vi har hemma är en router, men också andra saker (bl.a switch och access punkt (wifi)). En renodlad router gör enbart en sak, den håller koll på var data ska skickas.

I de flesta fall har vår router den lägsta adressen, dvs `192.168.1.1` i nätverket med nätadress `192.168.1.0`.

### Lager 2 - Datalänk

Använder en annan adress, en s.k MAC-adress. Består av 48 bitar och skrivs oftast ut som 12 hexadecimala tecken.

Dessa används för transporten inuti ett nät. Varje enhet inuti nätet, dvs varje enhet med en MAC-adress kallas en frame.

#### Switch

Ett exempel på en enhet som jobbar med MAC-Adresser är switchar. Dessa håller reda på vilken mac-adress som är kopplad till vilken fysisk port, och vet således var den ska skicka data.

### Lager 1 - Fysiskt

Detta är hur datan faktiskt rör sig i de fysiska medier vi använder. Dvs nätverskablar (koppar och fiber), trådlösa signaler mm.

I praktiken är detta hur vi får fram de elektriska signaler som senare översätts till 1or och 0or.
