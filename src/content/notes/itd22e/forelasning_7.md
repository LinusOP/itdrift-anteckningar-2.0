---
title: Föreläsning 7
order: 70
---

# Föreläsning 7 - Storage Accounts och Failover

## Storage accounts

Storage accounts i Azure är ett isolerat konto där man kan samla olika storage services, man kan skapa flera för t.ex olika projekt eller dylikt. Där finns 4 olika typer i Azure:

- Blob Storage
- Azure Files
- Azure Queues
- Azure Tables

De vanligaste är blob storage och azure files men alla har olika användningsområden.

### Blob storage

För att använda blob storage använder man s.k containers. Man kan skapa flera containers i samma storage account för att enkelt kunna gruppera data efter användingsområde. Dock kan man inte skapa mappar i en container, där i lagras all data i en stor lista utan organisation.

Syftet med blob storage är framförallt att andra program kan använda detta för fillagring och sköter då organisationen själva. T.ex om man har en streamingtjänst, då lagrar man videofiler i blob storage och har sedan en separat databas över vilken fil som tillhör vilken film osv. Datan är enbart tillgänglig via HTTP/HTTPS.

En container kan konfigureras på lite olika sätt:

- Hot
- Cool
- Cold
- Archive

De tre första är s.k online tiers, dvs man har alltid tillgång till denna datan. Skillnaden mellan dessa är kostnad för lagring samt åtkomst. Hot lagring används för data som hämtas ofta, varje dag. Lagring kostar mycket men åtkomst kostar inget. Cool landra någonstans mittemellan och cold kostar lite för lagring men mycket för åtkomst. Vilken tier man väljer beror ju på vad för data man lagrar och hur ofta man kommer hämta den.

Archive är en s.k offline tier, det innebär att man inte alltid har åtkomst till datan direkt utan kan få vänta, ibland upp till ett antal timmar, för åtkomst till datan. Dock är lagringen är väldigt billig, så det kan vara lämpligt för t.ex data som man måste lagra enligt lag (tänk banker, myndighet eller dylikt) men som man väldigt sällan faktiskt behöver komma åt.

### Azure files

Azure files är helt enkelt utdelningar i Azure, precis som de vi skapat på filservrar. Till skillnad från blob storage så kan denna typ enkelt monteras på en dator via SMB (eller NFS) och läggs då till som en nätverksmapp.

En viktig sak är att om man försöker montera

### Azure Queue storage

Azure queue storage är en s.k meddelandekö, där tjänster kan skicka meddelanden och andra tjänster kan hämta dessa. Huvudprincperna är att meddelanden alltid lägg i ordning, samt att de kan vänta i kön (dvs de måste inte hämtas direkt). Detta används mest av utvecklare som en del av större applikationer, men vissa applikationer man sätter i drift kan behöva en kö som man då skapar.

### Azure Tables

Azure tables är en enklare databas, där man kan lagra s.k strukturerad data. Dvs data som följer (iaf till mesta del) en given struktur. Det kan t.ex vara en lista över varor i err lager, lista över användare osv. Alla användare kommer ha ett namn, adress, telefonnummer osv, därav följer de samma struktur. Även denna tjänst används framförallt av utvecklare och nyttjas i/av applikationer och är inget som man själv använder, men kan behöva sätta i drift åt applikationen.

### Skydd mot radering

I båda blob och files kan man aktivera s.k soft delete. Detta innebär att när en användare raderar en fil så raderas de inte egentligen, utan blir bara osynlig, efter ett antal dagar (kan ställas in) så raderas den på riktigt. Detta innebär att man enkelt kan återställa filer som någon råkar radera.

### Skydda data

När man lagrar data i ett storage account kommer denna alltid krypteras, antingen används en nyckel som Azure hanterar åt en, eller så kan man själv hantera nyckeln. Självklart är det enklare att låta Azure hantera nyckeln, de ser till att den byts ut när det är lämligt, lagras säkerts osv. Men i teorin kan Azure då också dekryptera datan och komma åt den. Man kan då istället hantera nyckeln själv, i ett s.k Azure Key Vault

## Redundans och backups

När man sätter upp en miljö behöver man också se till den är i drift även vid problem, detta gäller även i Azure. I Azure arbetar man med s.k availability sets eller availability zones med sina virtuella maskiner,

Availability sets innebär att man skapar flera VMs som jobbar tillsammans i ett s.k kluster men som ligger i olika "Fault domains", där alla servrar i en fault domain delar på ström och nätverk. Som standard sprids ett kluster ut mellan tre fault domains, det innebär att även om en går ner så kommer din tjänst fortsätta fungera.

Det samma gäller med uppdateringar, man kan lägga de olika VMs i ett kluster i olika upgrade domains, där de uppdateras i omgångar, t.ex en per dag. På så sätt uppdteras inte alla dina VMs samtidigt.

Om man inte känner att olika platser i ett datacenter räcker så kan man använda availability zones iställer, då sprids dina virtuella maskiner ut mellan flera olika datacenter i en region, för att ha skydd mot "natural distasters", t.ex översvämningar, bränder eller jordbävningar.
