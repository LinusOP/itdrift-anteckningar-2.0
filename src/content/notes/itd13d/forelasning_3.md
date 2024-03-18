---
title: Föreläsning 3
order: 30
---

# Föreläsning 3 - Lagring & Filsystem

## Återkoppling labb 1

### Kloner

Full klon: Kopierar hela virtuella maskinen, kan fungera utan sin master  
Länkad klon: Använder originalets hårddisk och sparar endast ändringar, funkar inte utan sin master

Fördel med länkad klon är att de går snabbare att skapa samt att de tar mindre plats. Nackdel är just det att de kräver sin master för att fungera.

### Datornamn

Er dator (VM) identifieras med fler olika namn, för att minimera fel så använd samma namn överallt, så som namn på filerna, på mappen, samt i VMWare.

### Register Editorn (RegEdit)

Om man har syspreppat en dator för många gånger och det inte längre funkar så gör man följande:

På din VM i RegEdit i `HKEY_LOCAL_MACHINE\System\Setup\Status\SysprepStatus` ändra följande:

- `CleanupState` till värde `2`
- `GeneralizationState` till värde `7`

## Lagring

Använder sekundärminne såsom hårddiskar, SSD, DVD, USB-minnen etc.

Dessa kan vara på olika platser:

- DAS (Direct Attached Storage) - Lagringsenheten är direkt kopplad till datorn
- NAS (Network Attached Storage) - Filer sparas på en server i det lokala nätet, servern hanterar lagringsenheterna
- SAN (Storage Area Network) - Delar ut hårddiska eller delar av en hårddisk på nätverket, men mottagaren får hantera formatering mm
- VHD (Virtual HardDrive) - Virtuell hårddiskar som hanteras av OS/Hypervisor
- Internet/Molnet - Någon annans server, på ett annat nät, som hanterar lagring åt oss. T.ex Google Drive, dropbox etc.

### Accessmetoder

Beroende på vad det är som vill ha tillgång till en lagringsenhet så kollar dessa på olika saker.

- Applikationer kollar på Filer
- Operativsystemets filsystem kollar på block på partitioner
- Operativsystemets kärna kollar på adresser på eneheten
- Hårdvaran har direk fysisk access

#### Access - hårdvara

Hur vår hårdvara kopplas till och pratar med vår nehet beror på den fysiska anslutningen samt protokollet som används på bussen.

Exempel på fysiska anslutningar: SATA, USB, SAS

Exempel på protokollsskillnader:

- SCSI (används av SAS diskar), ATA (används av SATA diskar)
- Hårdvaruadresser och interrupt
- SAN, iSCSI, FiberChannel

#### Access - Block

Lägre lager i OS läser in block av data. I en klassisk hårddisk är dessa ofta 512B och kallas sektor, på en SSD är dessa ofta 4KB och kallas page. Dessa delar av OS läser eller skriver med dessa block som sin enhet, dvs "skriv till block x" osv.

### RAID

Det finns två olika sorters RAID, hårdvaruraid och mjukvaruraid.

Hårdvaruraid:

- Gör inställningar utanför OS, antingen i BIOS eller genom ett externt verktyg.
- Måste ha ett moderkort som stödjer detta eller ett externt RAID-kort
- Operativsystemet ser det som en disk, vet inte att det är RAID

Mjukvaruraid:

- Skapas från OS/Mjukvara på OS
- Kräver inte speciell hårdvara, operativsystemet vet att det är olika diskar och sköter detta åt oss
- Kan t.ex skapas i windows server med det som kallad "Storage Spaces" eller i en "Storage Pool"

#### RAID 0

Sätter ihop flera diskar så att de kan användas som en stor disk

- Ingen redundans
- Hög hastighet, kan dela upp trafik över flera diskar
- Ingen kapacitet försvinner

#### RAID 1

Speglar diskar, så att samma data skrivs till två diskar

- Hög redundans pga full kopia av all data
- Förlorar hälften av kapaciteten till redundans
- Läsning kan va snabbare (kan delas upp på båda diskarna) men inte skrivning

#### RAID 5 (och 6)

När data sparas så beräknas också paritetsdata för denna, kan sedan användas för att återskapa filen. I RAID 5 sparas en uppsättning paritetsdata, i RAID 6 sparas två uppsättningar.

#### Nästlad RAID

Man kan applicera RAID på redan raidade diskar. T.ex ta två RAID 1 diskar och sedan skapa en RAID 0 koppling mellan dessa.

## Partionering

En disk delas upp i "partitioner". Varje partition blir sedan en logisk disk. Även diskar som bara ska ha en partition måste partitioneras, men detta görs ofta automatiskt. Vad som sedan existerar i en partition det löser filsystemet. Detta handlar endast om hur vi delar upp vår disk.

Finns två sätt att hålla koll på partitionerna:

- MBR - Master Boot Record
- GPT - GUID Partition Table

### MBR

Äldre standard, skapad för 32-bitars system. Pga detta kan vi ha max $2^32$ adresser, med block på max 512B så innebär detta max 2TB diskstorlek.

Använder en speciell boot sector, ligger i LBA 0 (första blocket).

Kan max skapa 4 partitioner på en disk.

### GPT

Löser problemen med MBR, så vi kan ha större diskar med fler partitioner.

Även GPT skapar en MBR, såkallad Protective MBR, i LBA 0. Detta så att ett system som enbart förstår MBR ser detta och blir tillsagd att disken är full och du får inte skriva över nåt.

Sedan i LBA 1 skapas en Primary GPT header, där data sparas om vilka partitioner vi har.

Utnyttjar 128-bitars adresser, s.k GUID (eller UUID). En GUID ser ut ungefär såhär: `78c339e1-ca10-4a93-9593-81fd50747275`.

GPT har även dubbla tabeller, där finns en Secondary GPT Header som används om vår primary GPT header blir korrupt.

### Verktyg för partitionering

Grafiskt: Disk Manager
Kommandotolken: DiskPart

## Volym - Filsystem

Varje volym får en enhetsbokstav. Formaterar en partition och skapar ett filsystem på den.

Exempel på filsystem i windows:

- FAT
- NTFS
- ReFS

Två typer av filer:

Datafiler: Innehåller data, exempelvis textfiler, musik, video mm.  
Kataloger: Mappar osv, lagrar information om vilka filer och underkataloger som finns i en katalog.

### FAT

Äldre system för hårddiskar, används ibland idag för flyttbara enheter (USB-Minnen osv). Finns en del olika versioner, FAT16, FAT32, exFAT.

Två huvudstrukturer:

- File Allocation Table, information om alla block på enheten
- Root Directory

### NTFS

Står för NT File System, skapades för Windows NT. Använder ett 32-bitars system.

Håller koll på filer med hjälp av ett MFT (Master File Table). Denna fil innehåller information om strukturen av filsystemet samt information om alla filer och kataloger. Eftersom allt information tappas om MFT försvinner så finns en kopia, MFT Mirror.

NTFS är journalhanterande, innan data skrivs till vår partition så skrivs datan först till en loggfil, `$LogFile`. Därefter skrivs datan till block i vår partition. Detta skyddar mot fel vid skrivning, så om något går fel så finns datan fortfarande i loggfilen.

### ReFS

Står för Resilient File System, ett nytt filsystem för Windows Server. Tänkt att fungera bättre än NTFS för moderna miljöer. Går dock inte att använda som filsystem för boot, utan får användas för övriga diskar.

ReFS kontrollerar efter fel i datablocken för att öka tillförlitlighet. Den ökar också tillförlitlighet genom att skriva till nya datablock istället för att ändra gamla block vid ändringar till en fil. När den väl kontrollerat att inget är korrupt så släpps det gamla blocket.

Klarar filsystem upp till en Yottabyte, 1 000 000 000 000 000 000 000 000 Byte.

## Behörigheter

### Represenationer av användare

Användare har kontro på en dator eller i en domän, t..ex har vi alla konton i HKR.se domänen.

SID - Windows interna format av en s.k Security Identifier. Användare och grupper (men även datorer och tjänster) har ett SID.

När man försöker få åtkomst till något så skickas en Access Token med, vilket är användarens SID plus SID för dess grupper.

Varje fil har en ägare, samt en ACL (Access Control List), vilket är en lista över SIDs samt dess behörigheter (Typ av behörighet samt om de får den eller inte, Allow/Deny).

### Kategorier filbehörigheter

Basic

- De som normalt används när man sätter behörigheter
- Varje behörighet är en grupp av avancerade behörigheter

Advanced

- 14 mer grundläggande/specifika behörigheter
- Kombinationer av dessa används i basic behörigheterna

#### Basic

Dessa är de basic behörigheterna som finns

- Full Control
- Modify
- Read and execute
- List Folder Contents
- Read
- Write

#### Advanced

- Full Control
- Traverse Folder/Execute File
- List Folder/Read Data
- Read attributes
- Read extended Attributes
- Create Files/Write Data
- Create Folders/Append Data
- Write Attributes
- Write extended attributes
- Delete subfolders and Files
- Delete
- Read permissions
- Change permissions
- Take ownership
- Synchronize

Dessa kombineras sedan för att skapa basic behörigheterna

### Regler för behörigheter

- Behörigheter för en katalog gäller även för alla filer och underkataloger (om detta inte stängs av)
- Behörigheter med Allow slås ihop, dvs får du Read från en grupp och Write från en annan så får du både Read och Write
- Deny går före Allow, får du Read från en grupp men annan grupp har deny på Read, då får du också deny
- Specifika behörigheter (satta på t.ex en specifik mapp) gäller före ärvda behörigheter
- Om det inte finns en behörighet så antas att det är deny

#### Ägaren

Ägaren av en fil kan alltid sätta nya behörigheter och går därför inte att låsa ute. Dock kan en administratör sätta en ny ägare på en fil/mapp.

## NAS

Network Attached Storage, hårdvaruenhet eller filserver som gör filer tillgängliga över nätverk.

Finns olika protokoll, exempel:

- SMB
- NFS

### SMB

Server Message Block, skapat av microsoft för att dela resurser och kommunicera i ett windows-baserat nätverk. Det finns flera versioner, SMB 1/CIFS (avvecklat), samt SMB 2 och SMB 3.

Där finns också implementationer för andra OS, t.ex SAMBA som är SMB för Linux.

Använder ett antal portar:

- TCP 445
- UDP 137, 138 och TCP 137, 139 (NETBIOS)

Jobbar i två steg:

1. Autentisering

- Namn och lösenord
- Skickas automatisk om vi är i en domän, t.ex behöver i inte dessa i labbsalen då vi redan är inloggade i HKR.se domänen

2. Utdelning av resursen

#### Konfigurering av SMB

Finns lite olika sätt att göra på. Det enklaste sättet är att välja dela i utforskaren, men då kan vi inte göra alla inställningar.

I Server Manager kan vi också konfigurera SMB genom det som kallas shares.

I SMB finns två olika rättigheter som båda appliceras:

- Share, behörigheter specifikt för SMB
- NTFS, behörigheterna från filsystemet

#### Konfiguering av klient

Kan skriva ip-adressen direkt i ufortskare.  
Kan också bli mappat till en enhetsbokstav, t.ex som X: i labbsalen.

## SAN

Storage Area Network. Delar ut block som andra enheter kan använda som att de vore egna hårddiskar. Till skillnad från NAS så hanterar här mottagaren filsystem, behörigheter osv, i NAS så hanterar server det. SAN enheten bryr sig inte om vad som lagras på blocken som delas ut.

Använder LUN - Logical Unit Number för att identifiera sina utdelade block.

Protokoll för SAN:

- iSCSI
- FibreChannel

### iSCSI

Vi kommer labba med iSCSI för att dela ut block, iSCSI protokollet använder två termer:

- Target, den som delar ut block
- Initiation, den som ska ha blocket

Windows server kan fungera både target och initiator. Dvs den kan både dela ut delar av sin egna hårddisk till andra samt använda diskar från ett target.
