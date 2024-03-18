---
title: Datateknisk Introduktion - Föreläsning 4
order: 40
---

# Datateknisk Introduktion - Föreläsning 4

## Vad är en dator?

### Ursprunget

Kommer från början av den engelska titeln för jobbet "Computer", någon som arbetade med att utföra matematiska beräkningar.

### Dagens dator

Dagens betydelse är att det är en digital programmerbar beräkningsmaskin.

Bygger på något som kallas von Neumann-arkitektur

Har en CPU/Processor, innehåller:

- Styrenhet (som styr samtliga delar i datorn)
- Aritmetisk/Logisk enhet - Utför beräkningar

Har också ett minne som lagrar data åt processorn

Mellan processorn och minnet sitter ett antal "bussar", dvs vägar där information kan gå emellan dessa två.

- Styrsignal/Kontrollbuss - Berättar för minnet vad den ska göra, vad nästa steg är.
- Adressbuss - Berättar för minnet _var_ (vilken plats) i minnet som processorn vill att steget ska utföras
- Databuss - Den buss där processorn eller minnet skickar själva datan.

Exempel, data lagras:

1. Processorn (styrenheten) skickar en signal över kontrollbussen att den vill att minnet ska lagra en viss data
2. Processorn skickar sen över adressbussen var i minnet som den vill att datan ska lagra
3. Processorn skickar till slut över databussen den data som den vill ha lagrade i minnesplatsen den tidigare specificerade

Exempel, data hämtas:

1. Processorn (styrenheten) skickar en signal över kontrollbussen att den vill att minnet ska hämta viss data
2. Processorn skickar sen över adressbussen var i minnet som datan den vill ha finns
3. Minnet skickar till slut över databussen den data som processorn bad om

### Minnet

Minnet är indelat i s.k "Celler", varje cell har ett eget nummer som är dess adress.
När processorn skickar en plats över adressbussen är det egentligen dess nummer som den skickar, då vet minnet vilken cell den ska lagra datan i.

### CPU/Processorn

Processorn utför instruktioner, flera instruktioner i sekvens bilder att program.  
Normalt sett körs dessa instruktioner i ordning, undantag finns (S.k Hopp, tas senare)

Intern struktur:

- Kontrollenhet/Styrenhet
  - Ansvarar för exekvering (utförning) av instruktioner
  - Tolkar och styr övriga delar
- Aritmetisk Logisk Enhet (ALU)
  - I princip en kalkylator
  - Utför logiska operationer
- Register (minnesplatser) - Se nedan

#### Register

En cell eller ett register kan lagra ett antal bitar, n-bitar. Detta är klassiskt sett 8, dvs en Byte.  
Moderna datorer arbetar ofta med 64 bitar.  
Har två funktioner:

- Lagra data
- Hämta data

Se slides för diagram över hur dessa delar kommunicerar

#### Instruktionscykel

1. Hämta instruktion - Vad ska vi göra?
2. Avkoda instruktion - Förstå vad instruktionen innebär
3. Beräkna effektiv adress -
4. Exekvera - Faktisk utförning av instruktionen
5. Skriv resultat - Visa vad intstruktionerna ledde till

#### Typer av processorer

Olika processorer stödjer olika typer av instruktioner.

Finns 4 grundtyper av moment processorn kan utföra:

- Läs/Skriv till/från minnet
- Matematisk/Logisk beräkning
- Hopp (ett bryt i den ordning som instruktionerna annars är i)
- I/O Instruktion - In/Out, dvs något som kommer utifrån (mus, tangentbord mm) eller som ska ut (skicka något till en skärm mm)

RISC/CISC - Olika typer av processortyper, är fokuserade på olika problem

- RISC - Reduced Instruction Set Computing (Små snabba beräkningar)
- CISC - Complex Instruction Set Computing (Stora komplexa beräkningar)

Moderna processor är oftast en blandning då de behöver klara båda typer av beräkningar

#### Processorstandarder

Instruktionsuppsättning:

- x86 - 32 bitar
- x64 - 64 bitar

Antalet bitar anger bussbredden, dvs hur mycket data som kan skickas samtidigt över en buss

#### Processorinstruktioner

Aritmetikinstruktioner:

- Utför matematiska operationer på heltal
- Utför logiska operationer, som AND, XOR mm.

Flyttalsinstruktioner:

Flyttal är alltså datorns version av tal med decimaler.  
Dessa instruktioner utför matematiska operationer på dessa flyttal.

Minnesinstruktioner:

Som visat ovan, är de instruktioner som används för att lagra eller hämta från minnet mm.

Hoppinstruktioner:

Tillåter program att bryta ordningen som instruktioner sker i. Som sagt ovan utför processorer normalt sett instruktioner sekventiellt, dvs i tur och ordning. Dessa instruktioner bryter den ordningen och ger processorn möjlighet att påbörja en ny instruktion mitt i ordningen.

Anropsinstruktioner:

Tillåter processorn att anropa funktioner, dvs små samlingar instruktioner som kan återanvändas, få tillbaka ett resultat och sen fortsätta där den var.

Systeminstruktioner:

Instruktioner som är "skyddade", de är bara avsedda för operativsystemet och inte för enstaka program.  
Är instruktioner som förhindrar krockar, t.ex om två program försöker lagra något i minnet så ser dessa till at de inte lagrar på samma plats.

#### Övriga interna delar i processorn

**Ej klar, saknas i slides**

AGU - Address Generation Unit

MMU - Memory Management Unit:

Cache

### Att lösa problem med processorn

#### Lösningsstrategi

- Förstå problemet som ska lösas, vad är vårt problem
- Dela in problemet i mindre steg, processorn behöver att vi delar upp det
- Skriv steg för steg en beskrivning för hur problemet ska lösas, vi måste veta alla steg innan vi börjar, detta kallas en algoritm
- Skriv lösningen som en samling av instruktioner som processorn faktiskt förstår, detta är et program

#### Exempel på algoritmer

Problem: Hitta det största talet bland 5 tal som finns lagrade i minnet

En lösning:

1. Ta det första talet och spara detta i ett register i processorn
2. Ta nästa tal, jämför dessa. Det tal som är störst lagrar vi nu i registret istället.
3. Reptetera för samtliga tal, när vi är klara vet vi att det tal som är i registret är det största
4. Skriv ut talet i registret

Att skriva instruktioner som ovan kallas att skriva pseudokod, det är alltså inte kod som datorn eller processorn faktiskt förstår utan något som får oss att förstå hur problemet ska lösas.
