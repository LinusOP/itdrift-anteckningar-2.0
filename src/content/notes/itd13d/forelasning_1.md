---
title: Föreläsning 1
order: 10
---

# Föreläsning 1 - Kursintroduktion & Klient/Server + Windows Server

## Introduktion - Övergripande kommentarer

**Labbgrupper är samma som i "Introduktion till informationsteknologi"**

Examinering: Se kursplan

Kommer att fokusera på vanliga tjänster som krävs för att kunna bygga upp en it-miljö

- Konfigurering av servrar
- Lagring
- DNS/DHCP
- AD (Active directory)

Detta kommer göras med:

- Windows Server 2019
- Tjänster som kör på egna servrar (Ovanstående lista)
- Virtualisering
  - VMWare Workstation
  - Hyper-V

Föreläsningars upplägg:

1. Presentera teori
2. Förebereda inför laboration
3. Sammanfattnin efter laboration

## Klient/Server

### (Går)dagens IT-System

Består av klienter och en server. Klienterna är vanliga datorer som begär enstaka tjänster från servrar. Servrarna är kraftfulla datorer som levererar tjänster, kan finnas fler beroende på hur många klienter man har.

**Exempel på tjänster:**

- Lagring
- Information
- Utskrifter
- Kommunikation
  - DNS/DHCP
  - Mail

**Olika sorters användare av tjänsten:**

Många tjänster levereras direkt till användare, t.ex filservrar (onedrive etc.) eller skrivartjänster. Andra är tjänster som levererar till andrar tjänster, t.ex databaser, webbservrar mm.

## (Morgon)dagens IT-System

Består av webbklienter som presenterar data från molnet, samt molned som leverar och paketera allt åt oss.

I denna kursen kommer vi behandla egna tjänster, i framtida kurser kommer molntjänster (Azure) hanteras.

Att poängtera är att molnet är helt enkelt en dator/server som någon annan äger och sköter.

## Vad är sen server?

- Hårdvaran
- Operativsystemet
- Tjänsten

Det unika är egentligen tjänsten (och i viss mån operativsystemt). Hårdvaran är mer eller mindre kraftfullare versioner av den hårdvara som man har i en vanlig dator. T.ex stöd för mer minner eller diskar, fler processorer eller kärnor, redundant strömförsörjning mm.

## Utveckling servrar

Normalt sett har man en server till en tjänst. Har vi dock en tjänst som är väldigt välbesökt så kanske den ensamma servern inte klarar av mängden trafik. Vad man då kan göra är att ha flera servrar som kör samma tjänst, då sprids trafiken ut över flera servrar.

Har man på andra hållet så att en tjänst inte utnyttjar servern fullt ut, då kanske man vill köra flera tjänster på samma server så att kapaciteten faktiskt utnyttjas. Problemet i detta fallet är att skulle en av tjänsterna krascha så finns risken att den "drar med sig" de andra tjänsterna också.

### Virtualisering

I vårt andra fall så vore det bra att utnyttja virtualisering. Att man delar upp serverna i flera, mindre, virtualiserade maskiner. Dessa är då isolerade från de andra tjänsterna i sina egna virtuella maskiner.

I de flesta fall görs detta genom att man på en fysisk server installerar ett operativsystem och en virtualiseringsplatform som sedan virtualiserar maskiner till våra tjänster.

I vissa fall använder man typ 1 virtualisering, då körs virtualiseringsplatformen direkt på hårdvaran utan ett OS, och sköter kommunikationen mellan de virtuella maskinerna och hårdvaran.

Det vi har använt är typ 2 virtualisering, i vårt fall VMWare workstation. Här finns också ett operativsystem installerat på själva datorn/servern (i vårt fall Windows 11 i labbsalen).

Virtualisering gör också att man kan sätta gränser, t.ex kan man ge en maskin tillgång till en viss mängd hårddiskutrymme eller en viss mängd RAM. På så sätt kan man anpassa kapaciteten utifrån tjänsten samt se till att den fysiska maskinen inte får helt slut på kapacitet. Detta eftersom det krävs en viss mängd RAM osv för att driva virtualiseringsplatformen och operativsystemet som körs i grunden.

## Server OS

Det finns operativsystem som är speciellt anpassade för servrar. T.ex Windows Server eller olika linux-server system (t.ex Ubuntu, CentOS). I grund och botten är dessa vanliga OS som sedan har saker tillagda eller borttagna så att de funkar bättre som server.

Inluderar ofta även mjukvara för att övervaka samt hantera IT-Miljön. T.ex kan dessa larma om hårddisken börjar bli full mm.

### Typer av windows server

Finns två olika type:

**Windows Server**

- Kallades tidigare Core
- Helt textbaserat
- "sconfig" används för grundonfiguration

**Windows Server Desktop Experience**

Är windows server med ett grafiskt gränssnitt (GUI) för att underlätta konfiguration mm.

#### Olika utgåvor av windows server

Licensieras per CPU kärna.

**Standard**

Billigare men begränsad i sina funktioner.

**Datacenter**

Dyrare och med mer funktioner. Windows Server 2022 Datacenter kostar för 16 kärnor cirka 70 000kr. Men får han ett oändligt antal virtuella maskiner.

Båda versionerna finns i ovanstående två typer, med eller utan GUI.

## Jämföring fysisk dator/virtuell maskin

Fysisk dator:

- Köpa dator
- Ändra i hårdvaran
- Ansluta till nätverk
- Konfigurera Router/Switch
- Installera OS
  - Konfigurera
  - Installera program

VMWare Workstation

- Skapa virtuell maskin
- Kan utöka kapacitet i settings
- Kan konfigurera nätverk i settings
- Installera OS
  - Konfigurera
  - Installera program

## Kloning av VM

Vi kommer att skapa en "master VM", en mall, som vi kan utgå ifrån när vi skapar virtuella maskiner.

Här finns två sätt att sen använda vår master, man kan antingen göra en full klon, dvs en komplett kopia som är identisk i hur vår master ser ut, och lika stor. Den fulla klonen kan fungera helt självständigt utan vår master.

Man kan också göra en länkad klon, som pekar tillbaka på vår master och sen bygger på detta. Fördelen är att man måste inte duplicera allt i masterns för vår nya klon så vi använder mindre utrymme, men försvinner mastern så funkar inte heller den länkade klonen.

### Förslag för VM under labb

GrandMaster

- Skapa en maskin, installera OS
- Grundkonfigurera och förbered OS

Inför varje lab:

- Skapa en full klon av GrandMaster - LabMaster
- Konfigurera LabMaster inför labben

För servrar i labben

- Skapa en länkad klon av vår LabMaster

Detta innebär att GrandMastern alltid är säker eftersom LabMastern är en full klon. Men varje individuell server i labben tar mindre plats då de är länkade till LabMastern.
