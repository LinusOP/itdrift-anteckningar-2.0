---
title: Föreläsning 4
order: 40
---

# Föreläsning 4

## Lagring & Filsystem

### Lagring i praktiken

I dagens datacenter jobbar man (nästan alltid) med virtuella maskiner där dessa delar på diskarna på den fysiska servern.

Den klassiska modellen i detta fallet är att diskarna är direkt anslutna till den fysiska servern. Detta är dock inte alltid optimalt. T.ex då vi vill ha virtuella maskiner med väldigt mycket lagring eller där vi vill lagra filerna på en annan server.

### Virtuella diskar & Storage pools

För att lösa ovanstående så jobbar man med virtuella diskar. Vi har redan stött på dessa i VMWare, filer som slutade me `.vmdk`, microsoft har också ett eget system där filerna slutar i `.vhd` (äldre version) eller `.vhdx` (nyare).

Dock är inte virtuella diskar hela lösningen, vi behöver ett system som utnyttjar våra virtuella diskar. I windows server är detta "Storage Pools". I storage pools kan vi gruppera våra fysiska diskar och skapa virtuella diskar. Dessa virtuella diskar kan sen utökas och användas med mycket bättre flexibilitet. Får vi t.ex slut på utrymme kan vi ansluta en ny disk och utöka vår "pool".

#### RAID i Storage pools

Skapar vi en storage pool får vi tre alternativ för typer:

- Simple - RAID 0
- Mirrored - RAID 1
- Parity - RAID 6

### Filserver - NAS (Network Attached Storage)

Använder vi en NAS lösning så har vi en server som delar ut filer över nätverket till klienter. Viktigt att poängtera är att om vår klient och server inte är anslutna till samma domän så måste man ha ett lokalt konto på servern, vi har alltså två separata konton.

#### Protokoll

Ett vanligt protokoll i windows server är SMB. Det är detta vi använde under labb 2.

I linux finns NFS och SAMBA som vanliga protokoll.

## VMWare network editor

Tre typer av nätverk:

- NAT - Tillåter vår virtuella maskin att nå internet genom att koppla sig genom vår fysiska maskin
- Host Only - Virtuella maskiner kan kommunicera med varandra och med den fysiska maskinen men kommer inte ut på internet
- Custom - Tillåter oss att själva konfigurera nätets inställningar

## Roller i Windows Server

Roller är hur man installerar servertjänster i windows server. T.ex fick vi installera tjänsten för att dela ut block genom iSCSI som en roll.
