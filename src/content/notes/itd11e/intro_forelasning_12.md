---
title: Datateknisk introduktion - Föreläsning 12
order: 120
---

# Föreläsning 12 - I/O, Drivrutiner, RAID, och Filsystem

**Missat från föreläsning 10 först**

## Föreläsning 10 - Deadlock

Deadlock sker när flera processer alla behöver ett flertal resurser

## Föreläsning 12 - Kommunikation CPU och I/O

**Begrepp: DMA**:

DMA, Direct Memory Access, innebär att vissa I/O enheter får direkt tillgång till arbetsminnet.

### I/O (Input/Output) i OS

Vi vill inte att ett program har direkt tillgång till hårdvara eller I/O-enheter. Det kan innebära säkerhetsproblem eller problem om programmen är dåligt programmerade eller skadliga.

Istället skyddas operativsystemet hårdvaran genom att alla program måste gå igenom operativsystemet för att nå hårdvaran.

### Lager i OS

För att komma åt enheter direkt så krävs tillgång till skyddade instruktioner. Dessa vill vi som sagt dock inte att program har tillgång till. Därav delar vi upp operativsystemet i flera lager, enkelt sagt är varje lager en säkerhetsnivå.

Högst upp har vi användarnivån, denna har minst tillit. Här körs vanliga program och det är denna nivå vi interagerar med.

Under detta har vi kärnan, det som kallas kernel. På kernelnivå arbetar stora delar av operativsystemt och här har processer tillgång till det allra mesta. De kan t.ex läsa skyddade delar av minnet osv.

Emellan kernelnivå och hårdvaran självt ligger drivrutinerna. Drivrutiner är mer eller mindre en samling instruktioner för hur man interagerar med en enhet. Dvs de översätter ett kommando från operativsystemet till ett eller flera kommandon som enheten faktiskt förstår.

### Drivrutiner

I windows kan drivrutiner båda köras i usernivå och kernelnivå, men kernelnivå är absolut vanligast eftersom drivrutinen då kan vara mer effektiv i hur den hanterar sin enhet.

Vissa enheter stödjer också det som kallas Plug and Play (PnP), det är en teknik som låter enheten berätta för operativsystemet var drivrutiner kan hämtas. Vilket gör att vi själva inte måste ladda ner dem.

### IRQ och IRQL

IRQ står för Interrupt ReQuest. Detta är en signal som vissa enheter kan skicka till processorn för att säga att något händer. T.ex skickar tangentbordet en IRQ när man trycker på en knapp för att berätta att ett knapptryck kommer.

IRQL är Interrupt ReQuest Level, vissa IRQ kan ha högre prioritet och avbryter då IRQ med lägre prioritet.

## Filsystem

Filsystemet finns eftersom användaren inte bryr sig om var på den fysiska hårddisken som data lagras. Istället så döljer operativsystemet detta och presenterar filerna på ett sätt som är lättare för oss att tolka.

De flesta filsystem bygger på en hierarkiskt struktur, kataloger och filer är i andra kataloger osv.

### FAT

FAT, File Allocation Table, är ett tidigare filsystem. Hade inte stöd för filrättigheter. Används fortfarande på t.ex USB-minnen osv. Använder en tabell som visar var filer sparas.

### NTFS

Det filsystem som används i windows idag. Stödjer filrättigheter, kryptering, och komprimerade enheter.

## Disk

Servrar behöver ofta mer lagring jämfört med en vanlig dator eller arbetsstation.  
För servrar är inläsningen av data från hårddisken ofta en flaskhals, dvs något som drar ner prestandan eftersom andra delar får vänta på detta. För servrar kan också datan vara väldigt viktig och därmed behöver extra skydd.

För att lösa detta används bl.a snabbare diskar men också en teknik som kallas RAID.

### RAID 0

**Föreläsning 12 - Slide 20**

Sammankopplar två eller flera fysiska diskar och använder dem som att de vore en, datan sprids jämt mellan båda diskarna. Framförallt ökar detta prestandan, dvs hur snabbt vi kan läsa och skriva från/till hårddiskarna.

Har du två hårddiskar på 1TB vardera så får du en kapacitet på 2TB.

### RAID 1

**Föreläsning 12 - Slide 21**

Här sammankopplas två diskar och sedan speglas de. Dvs att samma data finns på båda diskar. Detta innebär att går ena disken sönder så har du en kopia på den andra disken. Denna sortens skydd (att något kan gå sönder utan att du förlorar all data) kallas redundans.

Nackdelen är att har du två 1TB diskar så får du en kapacietet på 1TB.

### RAID 5

**Föreläsning 12 - Slide 22**

Här sammankoplar man ett flertal diskar, när man sedan lagrar data så beräknas också det som kallas en checksumma, en representation av en fil, detta kallas paritetsdata. Dessa checksummor lagras sen tillsammans med datan på varje disk. Om en disk sen skulle gå sönder så kan man använda dessa checksummor för att återskapa datan som fanns på den söndriga disken.

Viktigt är att paritetsdatan för en fil lagras på en annan disk än där datan lagras. Annars förlorar man ju i vissa fall båda datan och checksumman och kan då inte återskapa filen.

Nackdelen här är också att en viss kapacitet, dock inte lika mycket som i RAID 1.  
I en RAID 5 försvinner effektivt kapaciteten av 1 disk. Dvs har du 5 diskar på 2TB så försvinner 2TB från dina totala kapacitet 10TB och du har en effektiv kapacitet på 8TB.

### RAID 6

Samma princip som RAID 5 men istället för en cheksuma så skapas två checksummor per fil. Man har då mer redundans men man förlorar kapaciteten av två diskar istället för en.

Dvs har vi 5st 2TB diskar så får du en effektiv kapacitet på 6TB då 4TB (2 x 2TB) försvann till paritet.

### RAID 10

Här kombinerar man två olika RAID-tekniker, i detta fall 1 + 0. Dvs att man skapar ett ett antal RAID 1 diskar, två speglade diskar. Man tar sen dessa och kopplar samman med RAID 0. Har vi t.ex disk A, B, C, och D så speglar vi kanske disk A och B (dessa skapar disk X, som är en RAID 1 disk), man gör samma sak med C och D (och får RAID 1 disk Y). Man tar sedan X och Y och skapar en RAID 0 med dessa. På så sätt får du säkerhet (redundans) _och_ prestanda.

### RAID 50

Här kombineras istället RAID 5 och RAID 0. Man skapar flera RAID 5 diskar och kopplar sedan varje RAID 5 disk tillsammans med RAID 0. Principen är lik RAID 10 men du förlorar mindre kapacitet till redundans jämfört med RAID 10.
