---
title: Föreläsning 1
order: 10
---

# Föreläsning 1 - TCP/IP/Ethernet Top-down

## Encapsulation i lager - Repetition från intro

Lager i TCP/IP-modellen

- Lager 5 - App - Där vår "data" lever, inklusive t.ex vilket protokoll dessa använder (HTTP mm.)
- Lager 4 - Transport - TCP/UDP information samt portar
- Lager 3 - Nätverk - IP-Paket, innehåller IP-Adresser, mottagare/avsändare
- Lager 2 - Datalänk - Frame, innehåller MAC-Adresser, även här mottagare/avsändare
- Lager 1 - Fysiska - Översättning av vår binära data till elektriska signaler

## Praktiskt exempel

> Jag sitter på mitt kontor, startar browsern och matar in www.hkr.se, browsern visar information

Vårt nätverk ser ut som följande:

![](/itd12c/f1-natverk.png)

Vad händer då?

1. Du skriver in www.hkr.se i webbläsaren. Webbläsaren vet inte vilken IP detta motsvarar.

2. Webbläsaren skapar ett paket, med destination till vår DNS server, med en förfrågan som frågar vilken IP-adress som ska användas för att nå www.hkr.se. Paketer ser ut som följande:

   - Lager 5: Vår förfrågan
   - Lager 4: TCP förfrågan, destinations port: 53 (standard för DNS), avsändarport väljs automatiskt.
   - Lager 3: IP-Header med destination `194.47.46.13` och avsändare `194.47.46.112`
   - Lager 2: Frame med destination `F0:1F:AF:12:34:56` och avsändare `F0:1F:AF:6A:6C:FC`

3. DSN servern skapar ett paket med svar och packar på samma sätt, fast med omvända destination och avsändare.
4. Webbläsaren vet nu var den ska skicka förfrågan för www.hkr.se, den packar ett paket och skickar iväg till routern.
5. Switchen får först paketet, packar upp till lager 2 och kollar på MAC-adresserna, skickar vidare till routern.
6. Routern tar emot paketet, packar upp och kollar IP-adresser och skickar ut på rätt interface. Den ändrar också MAC-Adresser så att den blir avsändare och webbservern blir mottagare.
7. Samma förfarande sker i andra nätet och webbservern kan ta emot förfrågan, skapar paket med svar och processen sker igen, från webbservern till laptopen.

## Princip TCP/IP

Möjliggör för processer/applikation/program på olika datorer att kommunicera med varandra.

Följande delar bidrar till detta:

- IP-Adress, pekar ut en nätverskanslutning
- Portnummer, pekar ut en applikation på datorn
- Definieras som socker, IP-Adress + port (+ transportprotokoll), exempel 194.47.46.8:80

Serverapplikationen lyssnar på en port

### Applikationsprotokoll

Standarder för att kunna låta applikationer som körs på olika pattformar och från olika utvecklare ska kunna kommunicera med varandra.

Exempel:

- HTTP, FTP, DNS

## UDP

- Skickar "Datagram"
- Avsändarport, tilldelas slumpmässigt av OS (inom vissa gränser)
- Mottagarport, standardiserade för olika tjänster

### UDP Header

Består av 8 byte:

1. Byte 0-1 anger avsändarport
2. 2-3 anger destinationsport
3. 4-5 anger längd på hela paketet
4. 6-7 anger en kontrollsumma (ett värde som man beräknar baserat på hela paketet, samma beräkning kan användas vid mottagning och stämmer inte summorna har paketet korrupterats)
