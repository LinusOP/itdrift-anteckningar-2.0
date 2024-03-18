---
title: Föreläsning 2
order: 20
---

# Föreläsning 2 - Windows Server & VMWare Workstation

## Windows server

### Installation

När en dator startar kommer BIOS/UEFI leta efter en plats att boota ifrån. Vanligast är såklart ett installerat operativsystem. Finns där inte ett sådant letar den på andra platser, t.ex ett USB-minne med ett installationsprogram, en DVD med installationsprogram, nätverskortet mm.

#### Installation i flera steg:

- Förbereda

  - Kontrollera hårdvara
  - Välj/Skapa partition/disk

- Kopiera filer

  - Windowsfiler
  - Mjukvaran som kommer med windows (Notepad etc.)

- Ändra BIOS/UEFI så att det vet att den nu kan boota windows vid start

- Anpassa installation (OOBE - Out Of the Box Experience)
  - Koppla installation med hårdvaran
  - Drivrutiner
  - Användarkonton
  - Registrering
  - Spara konfigurationer i registret

### Grundkonfiguration Windows Server

**Ge datorn bra namn:**
Standardnamnen är ofta långa och visar inte vad servern är till för eller vilken tjänst den kör (ex: WIN-IDQ93291G). Här vore det kanske bättre med ett namn såsom "Webbserver" eller dylikt.

**IP-Inställningar:**

För att servern ska fungera korrekt måste vi t.ex se till att den har en IP-adress i rätt nät osv.

**Användarkonto och lösenord**

**Domänanslut om AD-Miljö:**

Om servern ska vara en del av en domän så behöver vi ansluta den till vår domänkontrollant.

**I labbmiljö specifikt**

Inaktivera brandväggen

### Administration Windows

#### Klienter

Administration och inställningar hämtas från en central server, t.ex datorerna i datorsalen hämtar sin konfiguration från IT-Avdelningens server.

Andra verktyg:

- Kontrollpanelen, Windows Settings mm.
- Kommandotolken

#### Windows Server

**Controls**

- MMC Snap-ins, Kontrollpanelen, tools
- Finns också de vanliga grafiska windows-verktygen

**Textverktyg**

Finns en del textbaserade verktyg i windows server, t.ex diskpart

**Server Manager**

Unikt för windows server, ett centralt verktyg för att konfigurera tjänster mm

**PowerShell**

Ersätter kommandotolken och kan även användas för att skriva script som kan köras. Kommandon kallas Cmdlets, (Command-lets). Dessa är normalt i formatet "verb-funktion", ex: `Get-Name`, `Set-Name` osv.

PowerShell kan ofta göra mer än de grafiska verktygen.

PowerShell är också ett komplett programmeringsspråk och dina skript kan därmed bli väldigt avancerade.

### Registret/Windows Registry

Registret är en databas med inställning, sparas i en s.k key-value database. Delas sedan upp i s.k hives (grupper).

**Registrets "Root Keys":**

- HKEY_LOCAL_MACHINE eller HKLM
- HKEY_CURRENT_CONFIG eller HKCC
- HKEY_CLASSES_ROOT eller HKCR
- HKEY_CURRENT_USER eller HKCU
- HKEY_USERS eller HKU

## Virtualisering med VMWare Workstation

VMWare filer (dessa är filändelser):

- vmx - konfigurationsfiler, mängden med RAM, CPU etc.
- nvram - BIOS inställningar för din virtuella maskin
- vmsn - Snapshot - Ögonblicksbild på hur din maskin är just när den togs, kan använda för att återställa till
- vmsd - Generella snapshot - Där äldre snapshots sparas, då du kan ta flera
- log - Loggar för aktiviteter

Virtuella diskar i VMWare:

- vmdk - Den fil som din virtuella maskin använder som hårddisk, storleken begränsas av din konfigurationsfil
- s001.vmdk, s002.vmdk - Delar av disken, kan underlätta i vissa fall att inte ha disken som en stor fil

### Snapshots

Snapshots är en bild eller representation av statusen av din VM vid ett visst ögonblick. Du kan därför ta en snapshot, sen testa ny inställningar, och återställa till en snapshot om inställningarna inte funkar.

### VMWare tools

Den virtuella maskinen är egentligen helt självständig, den tror att den är, och fungerar som, en helt egen dator. T.ex kan du normalt sett inte föra över filer från datorn till din VM enkelt osv.

VMWare tools är ett program som installeras på din virtuella maskin och hjälper med att underlätta vissa av dessa grejer. Den tillåter t.ex att dra filer från en host till en VM mm.

Viktiga funktioner:

- Bättre grafisk prestanda (Med en s.k SVGA driver)
- Delade kataloger, drag and drop, copy and paste
- Synkronisering av tid
- Förbättrar hur muspekare och tangenbord funkar mellan VM och Host

Installeras från VMWare workstation, utanför din VM

### Generalisering av OS

Vid klonin så får vår nya VM ett eget ID-nummer. Annars får vi problem då det som borde vara ett unikt ID-nummer nu representerar mer än en server.

Dock körs OS med samma inställningar och program osv.

För att återställa så att namn och ID blir unikt fast än vi behåller inställningar och program använda "sysprep". Detta skapar en s.k "OOBE" (Out-Off-Box Experience).
