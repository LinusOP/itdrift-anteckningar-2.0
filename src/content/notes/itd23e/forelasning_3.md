---
title: Föreläsning 3
order: 30
---

# Föreläsning 3 - Forts. AD Uppbyggnad och struktur

## Reflektion labb 1

### Replikering och nya domänkontrollanter

I labb 1 när vi skapade och anslöt en andra DC fick vi alternativet att välja från vilken existerande DC som vi vill hämta konfigurering och data, varför spelar det roll?
Jo, GC - Global Catalog. En DC som också är GC innehåller hela databasen, när vi ansluter till en domän vill vi replikera databasen från en DC med just detta.

### DNS inställningar på DC

Med en DC var det tydligt hur DNS skulle vara inställt, alla klienter använde vår DC som DNS och DCn använde sig själv (`127.0.0.1`). Men med två DC hur gör vi då?
I dessa fall bör varje DC använda sig själv som primär DNS server, och den andra som alternativ server. Klienter i nätverket bör ha den ena som primär och den andra som alternativ, oftast blir det naturligt att DC1 blir den primära.

## FSMO (eller Master Roles)

FSMO - Flexible Single Master Operations är ett antal (5) speciella rollen som en specifik domänkontrollant tar hand om. Vissa av rollerna är unika i en hel skog, vissa är per domän.

Rollerna är:

- Schema master (en per skog)
  - Har hand om modifikationer i schemat
- Domain naming master (en per skog)
  - Har hand om domäner i skogen
- PDC emulator (en per domän)
  - Har hand om lösernordsändringar
  - Verifierar autentisering åt andra DC om det krävs
  - Hanterar GPO
- Infrastructure master (en per domän)
  - Hanterar referenser till andra domäner i skogen
- RID master (en per domän)
  - Sköter ID och SID i domänen

Om man inte gör några ändringar kommer ens första DC ha samtliga roller. Detta innebär dock att om den DCn går ner så kan resterande DC inte göra något nytt. De kan ofta fortsätta en stund att arbeta själva, men till slut kommer de behöva interagera med rollerna.

## Grupper

I AD är det viktigt att skilja på en grupp och ett OU. Grupper används för att samla rättigheter, OU är till för administration och används enbart för att organisera objekt i en domän.

### Typer av grupper

I AD finns två typer av grupper:

- Security group
  - Används för behörigheter
- Distribution group
  - Används t.ex för maillistor

Varje grupp kan ha ett av tre s.k scopes:

- Domain local
  - En domain local grupp kan enbart användas inom en specifik domän
- Global
  - En global grupp kan nås från vilken domän som helst inom en skog
- Universal
  - Unviversal grupper kan använda inom din skog och inom andra anslutna skogar
