---
title: Föreläsning 8
order: 80
---

# Föreläsning 8 - Repition DHCP, Repetition datorer, Virtualisering & Hyper-V

## DHCP

DHCP används för att dela ut, bl.a, IP adresser i ett nätverk automatiskt. Detta görs genom DORA protokollet, se detaljer i föreläsning 7.

För att konfigurerar DHCP i Windows Server så installeras "DHCP" rollen.

### Vanliga fel

**Fel 1**

Ett vanligt fel är att inte exkludera statiska adresser i sitt DHCP scope. DHCP servern har nämligen ingen aning om vilka statiska IP adresser som redan är konfigurerade i nätverket, och litar blint på att den kan dela ut alla icke-exkluderade adresser som vi ger den.

Lösningen är ju då att exkludera det spann som vi använder som statisk adresser för t.ex servrar eller nätverksutrustning (routrar osv.).

**Fel 2**

Ett annat vanligt fel är att ha flera DHCP servrar i samma nät (och inte konfiguerar dem så att de samarbetar). Då kanske vissa klienter får ut fel DG, eller adresser i ett annat nät än det tänkta. Här gäller då att konfigurera våra DHCP så att de jobbar med varandra, alternativt se till så vi enbart har en DHCP server.

### DHCP Failover

Tillåter oss att ha redundans av DHCP i ett nät. Enkelt sett fungerar det som så att om den primära DHCP servern inte svarar så gör vår failover det istället. De delar konfiguration såsom scope, DG, och DNS som ska delas ut.

### DHCP Relay

Om vi har flera nät så vill vi kanske inte alltid ha en DHCP server i varje nät utan istället en central DHCP server. Vi kan då konfigurera routrar mellan näten att agera som DHCP relay. De skickar då DORA meddelanden i ena nätet till DHCP servern i andra nätet, och på så sätt kan samma DHCP server dela ut adresser i flera nät.

## Datorer

### Datorns delar

**CPU**

"Datorns hjärna"  
Delar: ALU, CU, Register

**RAM**

Snabbt, flyktigt minne som CPU arbetar med direkt.

**I/O enheter**

Kan vara lagrande eller icke-lagrande.

Saker såsom tangentbord, mus, skärm, hårddisk, USB-minne mm.

### Multitasking

Oftast vill vi göra mer än en sak samtidigt med vår dator. Detta gör vi delvis genom att använda en schemaläggare på CPUn (ofta med en round-robin algoritm) och därmed låta flera processer få använda CPUn utan att vänta på att föregående process blir helt klar. Vi kan även ha flera kärnor och trådar i processorn som kan arbeta samtidigt.

Här krävs att vi t.ex skyddar minnet, så att processer inte skriver över varandra, det görs med virtuella minnen och page table. Vi behöver också skydda I/O enheter så att flera processer inte kommer åt dessa samtidigt samt.

För att göra allt detta krävs stöd för det i hårdvaran, dvs processorn måste veta hur den ska hantera detta, det gör dock mer eller mindra alla nyare processorer.

## Virtualisering

Normalt sett har operativsystem full tillgång till hårdvaran, och förväntar sig att få arbeta med den utan restriktioner. Vill vi då ha flera operativsystem samtidigt så kommer det inte funka, chansen är stor att de kommer skriva över minne för varandra mm.

Lösningen här är att virtualisera. Som fungerar som ett lager mellan hårdvaran och varje enskilt OS, och ser till att där inte blir konflikter. Detta lager kallas en "hypervisor".

### Olika typer av hypervisors

Generellt finns två typer av hypervisors, typ 1 samt typ 2. Det finns också generellt två implementationer, mjukvara samt hårdvara.

#### Mjukvaruimplementation

En mjukvaru implementation fångat upp instruktioner från sina VM och skickar vidare till processorn. De omvandlar dessa till anrop som sker i en skyddad miljö, vilket skyddar från konflikter mm.

Denna implementation kräver inte stöd i hårdvaran men är mycket långsammare än en hårdvaruimplementation då den mer eller mindre fungerar som en emulator som låtsas vara en dator.

#### Hårdvaruimplementation

För effektivare virtualisering krävs hårdvara som stödjer detta, t.ex Intel VT-x eller AMD-V. Detta innebär att processorn har speciella instruktioner som enbart används av hypervisors. Hypervisorn gömmer då access till hårdvaran och det fysiska minnet och hanterar detta.

Denna typ av virtualisering kan också stänga av om den inte behövs, dvs vi kan stänga av så att processorn inte tillåter dessa instruktioner.

#### Typ 2

Typ 2 är den typ av hypervisor vi redan arbetat med, VMWare Workstation.

När vi använder en typ-2 hypervisor så har vi en host, det är OS som vi installerat hypervisorn på, samt guests, som är våra virtuella maskiner.

Dessa används oftast i labbmiljöer och för tester, detta då de använder en mjukvaruimplementation som ovan, och är långsammare än en typ 1 hypervisor.

Exempel:

- VMWare Workstation
- VirtualBox

#### Typ 1

En typ 1 hypervisor kör utan ett OS under sig. Dvs den har direkt tillgång till hårdvaran. Det innebär också att vi inte direkt har hosts/guests, eftersom vi inte har något host-OS, allt körs direkt på hypervisorn som sedan är det enda mellan VM och hårdvara.

Exempel:

- VMWare ESXi
- Microsoft Hyper-V

## Hyper-V

Hyper-V är microsofts hypervisor och finns därmed implementerad som en roll i Windows Server.

Trots att vi installerar hyper-v som en roll efter att vi installerat vårt OS så är det en typ-1 hypervisor. Det funkar som så att när vi installerar rollen så lägger den sig emellan OS och hårdvaran och "tar över" hårdvaran.

Vårt första OS, dvs det vi använde för att installera rollen blir i princip en VM då, men är speciell. Den kallas parent eller root och används för att hantera övriga VM samt konfigurera hyper-v och hårdvara.

Övriga VMs som vi skapar kallas istället för children.

**För att se arkitekturen av Hyper-V se slide 27 för föreläsningen**

### Typer av VM i Hyper-V

**Gen 1**

Första generation av Hyper-V VM är den äldsta standarden. Den motsvarar hur OS fungerar med BIOS (till skillnad från det nyare UEFI). Den här typen har bäst kompabilitet.

**Gen 2**

Den moderna standarden för Hyper-V VMs. Motsvarar UEFI istället för BIOS. Kan dock enbart köra på servrar/OS versioner som stödjer dessa och har därmed sämre komabilitet.

Notera att det går inte att konvertera mellan dessa igenom Hyper-V. Krävs isåfall tredje-parts program.

### Virtuella diskar

Hyper-V jobbar med två typer av virtuella hårddiskar:

- VHD
- VHDX

Där VHD motsvarar Gen 1 och VHDX motsvarar Gen 2. Där är också vissa skillnader i funktioner som enbart stöds i det nyare VHDX.

Dessa fungerar på liknande sätt som VMDK filerna i VMWare.

### Virtuella Maskiner

Tre viktiga typer av filer:

- Virtuella Maskinen
  - Representerar hårdvaran och konfigurationen
  - Jobbiga namn på filerna. De döps efter VM unika id, GUID.
  - Gäller att skapa kataloger där detta lagra för organisation
- Virtuella diskar (diskuteras ovan)
- Snapshots
  - Tillåter oss att spara en representation av hur en VM är vid ett visst tillfälle
  - Kan återgår till ett tidigare läge med hjälp av snapshots, t.ex om en inställning går fel

### Konfiguration av Hyper-V

För att konfigurera hyper-v används "Hyper-V Manager2".

Med hjälp av detta kan vi skapa virtuella maskiner, diskar, och switchar (används för nätverk). Vi kan även importera och exportera virtuella maskiner.

Hyper-V manager används både för att konfigurera vår server/tjänst samt våra klienter. Dvs det används båda för att konfigurera själva Hyper-V tjänsten och inställningar för varje VM.

**Se slide 32 och 34 för bilder av konfigurering av tjänst respektive klient i Hyper-V Manager**

### Dynamiskt minne

När vi skapar våra VM i workstation så har vi satt en fast mängd minne för varje VM. Men detta kan vara ineffektivt om vår VM inte använder så mycket minne.

I Hyper-V kan vi då sätta ett dynamiskt minne, vi konfigurerar då ett min och max, sedan listar Hyper-V ut när den måste reservera mer minne åt vår VM, upp till vårt max. Det gör att vi kan ha flera VM på samma server som delar på minnet på ett mer effektivt sätt.

### Gränser för VM

Precis som i workstation kan vi begräns resurser för våra VM. Vi kan t.ex begränsa hur mycket CPU vår VM får utnyttja. Eller hur hög nätverskhastighet den får har mm.

### Kommunikation mellan VM

I teorin ska varje VMs OS köra helt oberoende av varandra helt och hållet. Detta är ju säkert, det finns ingen risk att man läcker nån data mellan OS.

Dock finns där ibland behov för kommunikation mellan olika OS eller mellan vår parent och något child.

#### Kommunikation från parent till child

Vissa saker är bra om vår parent kan skicka med till ett child. T.ex så vill man nog gärna att klockan ska vara den samma på alla VMs. Man vill också veta om VM är avstängd osv.

Detta görs med hjälp av "integration services" som körs på vårt child och förenklar konfiguration och drift av våra VM.

#### Kommunikation mellan OS

Där finns även en funktion som heter "Enchanced Session mode" och fungerar like VMware tools. Det tillåter t.ex drag-n-drop av filer mm.

Dock innebär detta ju att där finns en väg för kommunikation mellan våra olika OS och kan därmed vara en risk för dataläckor.

### Flytta VM mellan servrar

Här finns tre olika principer

#### Export / Import

Den enklaste metoden, man exportera från en server, flyttar sin exportfil och improtera på en annan server. Detta kräver dock att man stänger ner sin VM och den är därmed avstängd under den tid det tar för export och import.

#### Live Migration

I detta fall samarbetar två Hyper-V servrar. När man startar en live migration så börjar den VM kopieras från ena servern utan att stoppas, när den är färdig så stoppas den på originalservern och startas på den nya servern, men är igån där emellan.

#### Kluster

Här kommunicerar flera servrar och sköter flytten automatiskt. Dvs börjar en server bli överbelastad så flyttas VMs till en annan hyper-v server automatiskt utan att man själv måste starta flytten.

## Checkpoints

Tar en överblicksbild av en VM. Man har då möjlighet att återställa till den virtuella maskinens läge när man tog sin checkpoint. Bra att använda t.ex då man gör uppdateringar osv.

Finns två typer:

- Productions - Återställer inte inställningar gjorda i applikationer
- Standard - Återställer hela maskinens läge

## Nätverk i Hyper-V

I hyper-v skapar och arbetar man med virtuella switchar. Dessa har en obegränsad mängd portar. De kan också använda VLAN för att isolera maskiner kopplade till samma switch.

Dock finns där begränsningar, det finns inget sätt att routa mellan olika virtuella switchar enbart med hjälp av hyper-v. Isåfall får man skapa en VM som agerar router mellan de olika näten.
