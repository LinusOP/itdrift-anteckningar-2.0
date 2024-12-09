---
title: Föreläsning 6
order: 60
---

# Föreläsning 6 - Gruppering med collections

Collections, eller grupperingar, behövs för att kunna hantera flera objekt samtidigt. T.ex vill man kanske rulla ut vissa program till vissa datorer, men inte alla.

Precis som i AD kan vi manuellt gruppera objekt (datorer, användare osv) i CM. Men till skillnad från AD kan vi även har grupper som automatiskt fylls på utifrån vissa regler.

## Regler

Reglerna bygger på olika attribut hos objekten. Man kan t.ex skapa en grupp som inkluderar alla datorer som CM inte känner till. Man kan även begränsa vilka objekt som dina regler/sökningar körs emot.

### Limiting collections

Oavsett vilken typ av regel man använder när man skapar en grupp så kan man ge gruppen en s.k limiting collection. Man väljer då en annan grupp som fungerar som urval för den nya gruppen. Detta kan vara användbar dels för att se till att man bara väljer från objekt man förväntar sig, samt för att förhindra belastning på databasen.

### Direct rules

De enklaste reglerna är s.k direktregler. Dessa är statiska, du gör en sökning efter enheter och väljer sedan bland de resultat du får vilka som ska ingå i din grupp. Dessa gör det enkelt att skapa grupper och lägga till medlemmar men de kräver mer administration eftersom de är helt manuella.

### Query rules

I mer avancerade scenarion används query rules. Dessa bygger på SQL frågor som körs mot CM databasen. Den största fördelen med dessa är att de kan köras med intervaller. Det innebär att gruppmedlemmarna kan updateras automatiskt.

SQL frågorna kan byggas upp på två sätt. CM har ett gränssnitt där man med hjälp av menyer kan skapa många olika sorters frågor. Detta gör att man inte måste förstå SQL språket helt för att skapa frågor. För mer avancerade frågor kan man också skriva SQL direkt.

Här är ett exempel på en SQL fråga som väljer objekt baserat på Windows version:

```sql
SELECT * FROM SMS_R_System WHERE SMS_R_System.Build LIKE "10.0.21996"
```

### Include och exclude

Där finns två regler till, nämligen include och exclude regler. Dessa baseras på andra gruppers medlemmar. Man kan t.ex skapa en grupp som inkluderar medlemmarna från flera olika grupper. Man kan även skapa sådana grupper men exkludera medlemmar från några grupper.

T.ex kan du skapa en grupp som inkluderar alla datorer men exkluderar servrar. Detta kan vara enklare än att manuellt inkludera alla olika typer av enheter förutom servrar.

Om om ett objekt inluderas av en regel men exkluderas av en annan så vinner exkluderingen.
