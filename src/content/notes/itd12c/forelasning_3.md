---
title: Föreläsning 3
order: 30
---

# Föreläsning 3 - Ethernet

**Vad är ethernet?**

- Standard för lokala nätverk
- Kablage, kontakter, protokoll
- IEEE 802.3 - Den officiella standarden för hur den trådade kommunikationen sker
- Koppar- eller fiberkablar
- I princip den enda kvarvarande tekniken för lokala nätverk

## Kommunikation över kabel/Dataöverföring - UTP

**Slides har bra bilder på följande, från slide 10**

Finns tre olika sorters kommunikation över kabel:

- Simplex - kan enbart skicka åt ett håll
- Halv duplex - kan skicka på båda hållen, men inte samtidigt
- Full duplex - Kan skicka på båda hållen samtidigt

UTP - Unshielded Twisted Pair

UTP innebär kablar som är tvinnade i par. Tvinnas för att motverka att kablarna stör ut varandra (Crosstalk).

### Dataöverföring 10 och 100 Mbit

Här har man två par UTP, totalt 4 kablar. Ett par för att skicka åt ena hållet, andra paret för andra hållet. Ger full duplex. Varje par kopplas därmed till två "pinnar" (engelska - pins) i kontakten. Total 4 pinnar i detta fallet. Två pinnar (ett par) innebär en anslutning åt ett håll.

Termer:

- Rx - Receiver
- Tx - Transmitter

I äldra komponenter och nätverk:

PC/Server/Router:

- Skickar (Tx) på pin 1 och 2
- Tar emot (Rx) på 3 och 6 (varför detta är pin 6 och inte 4 kommer sen)

Switch (och hubb):

- Skickar (Tx) på 3 och 6
- Tar emot (Rx) på 1 och 2

Finns risk för problem:

Om vi kopplar en kabel PC <-> PC där båda vill skicka på 1 och 2 och ta emot på 3 och 6.

Lösningen var att man korsar kablarna, så att 1 och 2 i ena änden når 3 och 6 i andra änden.

Idag använder de flesta NIC Auto MDI-X vilket är ett system som gör den här logiska omkopplingen om det är en felaktig kabel som används.

### Gigabit Ethernet

Detta som oftast används idag, enbart äldre kablar följer standarden ovan.

Använder total 4 UTP par (totalt 8 ledare). Två par för sändning och två par för mottagning.

- 1 och 2
- 3 och 6
- 4 och 5
- 7 och 8

Finns olika standarder för vilket par i kabeln som kopplas till vilket par pins.

T568A och T568B, vanligast i dagsläget är T568B.

### Fiber

Bitar skickar med ljuspulser istället för elektriska signaler.

Fördelar:

- Mindre störningskänsligt
- Längre avstånd (5km istället för 100m som är gränsen för koppar i de flesta fall)
- Generellt högre hastigheter

## Switch

Switchar är viktiga byggblock för att skapa dagens ethernet. Kan stödja fler hastigheter. Varje host kopplas direkt till switchen. Switchar stödjer full duplex.

Följer vissa regler:

- Broadcast skickas ut på alla interface utom det interface som det kom ifrån.
- Unicast
  - Kollar i MAC-tabell, finns mottagaren skickas det bara enbart ut på motsvarande interface
  - Om inte, gör en flood och skicka ut på alla andra interfaces
- Observerar inkommande frames för att bygga sin MAC-tabell, dvs när den tar emot en frame så kollar den avsändar-mac samt vilket interface och kommer ihåg detta

### Frames

Består av följande fält:

- Preamble - 7 bytes, alltid samma mönster, förbereder och synkroniserar mottagaren
- SFD - Visar att preamble är över och att datan nu kommer
- Destination - Mottagar-MAC
- Source - Avsändar-MAC
- Type - Olika inställningar för framen
- Data and pad - Datan som finns, inklusive headers för övre lager mm
- FCS - Checksumma som används för att säkerställa att ingen korruption skett
