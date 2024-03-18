---
title: Datateknisk introduktion - Föreläsning 10
order: 100
---

# Föreläsning 10 - Processer

## Köra ett program

- Program lagras som filer på hårddisken
- När vi kör ett program så laddas detta in i arbetsminnet
- När programmet laddats in i arbetsminnet och börjar köras så blir det en process

## Process

En process är som sagt kod från ett program som ligger lagrat i arbetsminnet för att köras.  
Processen arbetar sedan med arbetsminnet för att lagra data som den använder, läsa in filer mm.  
Processen jobbar oftast också med I/O enheter, t.ex skrivare, nätverk mm.

### Typer av processer

**Interaktiva**:  
Tar emot data från användaren, det som vi oftast tänker på när vi tänker på ett program, t.ex Word osv  
Kan vara grafiska eller textbaserade

**Bakgrundsprocesser**:  
Körs i bakgrunden och tar därmed inte direkt emot något från användaren men kan reagera på händelser från OS eller program.

**Tjänster**:  
Speciella bakgrundsprocesser som hanteras direkt av OS, i Windows fall Service Manager. Kallas för Daemon i Linux.

### Exempel körning av ett program

1. Programmet startas (CPU) - Delen vi diskuterade ovan, programmet läses in i minnet mm.
2. Väntar på adress (I/O) - När du skriver en adress, tangentbordet är vår I/O enhet
3. Tolkar adress (CPU) - Översätter en adress (aftonbladet.se) till en IP (182.16.12.83)
4. Skickar förfrågan till server över NIC (CPU + I/O) - Vi använder nätverkskortet för att nå webbservern
5. Väntar på data (I/O) - Även om det känns som att hemsidan visas snabbt så tar det ganska långt tid från processorns perspektiv
6. Presenterar sidan på skärmen (CPU + I/O) - Programmet använder processorn och "ritar upp" hemsidan, sen använder den skärmen som I/O enhet för att visa sidan
7. Avslutas (CPU) - Processen avslutas

**Se slides föreläsning 10, slide 7 för diagram över uppdelning mellan I/O och CPU (ej skalenlig)**  
Som vi ser så väntar processorn ganska mycket, vi vill därför kunna göra något annat när CPUn ej används av detta program, därmed behöver vi något som hanterar processerna och schemalägger vad som ska hända i nästa steg.

## Processhantering

Är det system eller den teknik som hanterar processer i OS.
Jobbar t.ex med:  
Att starta och avsluta processer  
Att låta andra program använda CPUn när nuvarande program t.ex väntar på I/O eller liknande och CPUn är ledig.  
Avgöra vilka resurser som processer ska ha tillgång till

### Schemaläggningsalgoritmer

För att låta flera program använda processorn samtidigt måste vi avgöra i vilken ordning processerna ska ha tillgång till CPUn.

#### FIFO

First in, first out

Det program som startades först får ha tillgång till CPUn tills det att processen avslutas eller frivilligt lämnar CPUn innan nästa process i kön får tillgång till CPUn

**Fördelar**:

- Enkelt att implementera
- Kräver minst stöd i hårdvaran
- Inga extra processbyten, processer byts bara i CPUn när de avslutas eller lämnar

**Nackdelar**:

- Långa svarstider då processor väntar på att föregående program ska bli klara

#### Round-robin

Här delar vi upp processorns tid i lika delar, varje process får sedan en del åt gången, efter varje gång som en process använt sin tid så kollar man om den är klar, är den inte det så hamnad den längst bak i kön igen. Därmed går man igenom varje process om och om igen tills alla är klara.

**Fördelar**:

- Sänker svarstider, eftersom att om vi har ett program som kräver mycket tid så får andra processer tid emellan fö att göra sitt
- Mer rättvis

**Nackdelar**:

- Många processbyten och varje enskild process tar ju längre tid

#### Prioritet

Här får olika processer högre eller lägre prioritet vilket bestämmer hur snart de får tillgång till processorn. Tänk en kö där vissa processer får gå före.

Generellt matchar detta närmare hur vi som användare förväntar oss att saker ska funka, klickar vi t.ex i ett program så vill vi ju att något ska hända snabbt, därmed är input från användaren ett exempel på något som get en process högre prioritet.

Även processer som sköter viktiga saker is OS får högre prioritet. Och saker som körs i bakgrunden, t.ex nedladdningar kan prioriteras ner.

**Fördelar**:

- Matchar hur vi vill att datorn ska prioritera

**Nackdelar**:

- Svält - En process med låg prioritet kanske aldrig får tillgång till processorns

**Att lösa svält**:

För att lösa detta så används tiden som en process fått vänta på att få tillgång till CPUn som en del i prioriteten. Dvs får den vänta länge så ökar processen tills den får tillgång.

### Schemaläggning av processer i windows

- Bygger på prioritet
- Två prioriteter
  - Basprioritet
  - Dynamisk prioritet

Basprioriteten är den prioritet som används när processen startar och utgår ifrån.

Den dynamiska prioriteten ändras b.la utifrån användaren, om användaren t.ex skriver nåt i ett program, klickar upp det i förgrunden osv så ökar prioriteten. Detta så att vi upplever att programmen vi interagerar med är snabba och har korta svarstider.

Den dynamiska proriteten ökas också om en process väntat länge, för att undvika svält som förklarat innan.

Finns även realtidsprocesser, dessa har _alltid_ högst prioritet.

### Processtillstånd

- Start
- Redo
- Exekverar
- Blockad/Väntar
- Stopp

**Start**: Programmet laddas in i minnet och förbereder allt den behöver för att köras

**Redo**: Programmet är redo att köras, det lägger sig i kön för att få tid med processorn.

**Exekverar**: Programmet får tid med processorn och körs i en viss tid

**Blockad/Väntar**: Programmet väntar på en resurs eller ett svar från nätverk mm, andra processer får tid med processorn.

**Stopp**: Processen avslutas

Redo/Exekverar/Blockad är de tre tillstånd som schemaläggaren kollar på. Om en process är redo så kollar den på algoritmen (FIFO, Round-Robin, Prioritet) och lägger processen i kön enligt dessa.

När processen väntar på något så blir den blockad och schemaläggaren går vidare i kön med en annan process.

När processen får det den väntade på så blir den redo igen och schemaläggaren vet att den bör ingå i kön för att få tid med processorn igen.

Detta upprepas tills processen är klar och går till stopptillståndet.
