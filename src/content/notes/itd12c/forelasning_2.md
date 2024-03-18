---
title: Föreläsning 2
order: 20
---

# Föreläsning 2 - TCP/IP/Ethernet Top-down Forts.

# TCP

- Skickar "Segment"
- Ser till att datan kommer fram i rätt ordning
- Felhantering
- Mer tillförlitligt än UDP

## TCP Header

Består av följande:

- Byte 0-1 - Avsändarport
- 2-3 - Destinationsport
- 4-7 - Sekvensnummer
- 8-11 - ACK-nummer
- 12-13 - Data offset (4 bitar), Rserverade bitar (3 bitar), Flaggor (9 bitar)
- 14-15 - Fönsterstorlek
- 16-17 - Kontrollsumma
- 18-19 - Pekare till brådskande data
- 20 och framåt - Alternativ, inte nödvändigt

Se slide 6 för förklaring av varje del

## UDP vs TCP

### UDP

- Mindre paketstorlek, UDP-header är 8 bytes, mot TCP-headerns 20 bytes
- Skapar ingen anslutning
- Bättre kontroll gällande när data skickas
- Mindre bra felkontroll, skickar inte paket igen när det blir fel
- Garanterar **inte** rätt ordning på paketen
- Ingen flödeskontroll

### TCP

- Skapar en anslutning/Kanal
- Skickar paket igen om mottagaren inte bekräfta det
- Numrerar segmenen, garanterar rätt ordning
- Flödeskontroll, minskar överföringshastigheten vid hård belastning
- Kräver felkontroll vid bara IPv4 och IPv6 (UDP kräver bara vid IPv6)
- Större "overhead", dvs _lite_ långsammar hastighet

### Vilken är bäst?

Beror såklart på vad applikation gör

Exempel:

- Textkommunikation - TCP
- Filöverföring - TCP
- Multimedia streaming - UDP
- Remote access - TCP

## Att skicka IP-Paket

En host som ska skicka ett IP-paket har två alternativ:

- Om mottagaren ligger i samma nät:
  - Skicka direkt till destinationen
  - Hitta lager 2/MAC-Adress
- Om mottagaren ligger i ett annat nät:
  - Skicka via default gateway
  - Använd MAC-adress för default gateway
