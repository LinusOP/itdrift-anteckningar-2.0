---
title: Datateknisk Introduktion - Föreläsning 3
order: 30
---

# Datateknisk Introduktion - Föreläsning 3

## Fortsättning på förläsning 2

Föregående föreläsning avslutades vid konvertering till/från decimalt och binärt med decimaler.

### Prefix

Se slides för föreläsningen för tabeller över prefixen och dess värden decimalt och binärt.

Vad innebär prefixen egentligen?

Exempel på vanlig vikt angiven i kg, vad betydet kilogram?

1000 gram, kilo = 1000 (tusen)

Andra exempel: Lagring på datorn säger man ofta GB, gigabyte.
giga = miljard

Systemet som dessa följer:

Över 0, t.ex. mega (10⁶) eller tera (10¹²) så skrivs prefixed med stor bokstav.  
Undantaget är hekto och kilo pga att stort H och stort K redan används vetenskapligt.

Varje gång vi ökar eller minska prefix ökar vi med en faktor av tusen, förutom vid deka och hekto samt deci och denti, då dessa används vardagligt.

Generellt stämmer det dock, kilo = 1 000 -> mega = 1 000 000

#### Prefix med tvåpotenser

Se slides för tabell över jämförelse mellan decimala prefix och binära prefix.

Skriver vi t.ex. att en hårddisk har 150GB, dvs 150 000 000 000 Byte så är detta ungefärligt. Egentligen lagrar håddrisken binär data och har 150GiB, dvs 150 gibiByte.
gibi (Gi) = 2³⁰ = 1 073 741 824 Byte

Så 150 GB är ungefär (men inte exakt) lika med 150 GiB (som är det datorn i vetkligheten lagrar.)

#### När används detta?

När man kollar på minne och lagring hos en dator så kommer detta hanters mer i detalj.

## Början på föreläsning 3

Se slides för föreläsning 3 för definition på logiska grindar

### Logiska kretsar

Tar bitar (dvs 1or eller 0or) som signal in, genrerar sedan bitar som utsignal baserat på insignalen.

Fyra grundfunktioner:

- NOT
- AND
- OR
- XOR

Det är dessa grindar eller grundfunktioner som används för att bygga upp digitala kretsar.

#### NOT / Inverterare

Sanntingstabell:

| A (Insignal) | Y (Utsignal) |
| ------------ | ------------ |
| 0            | 1            |
| 1            | 0            |

Skickar vi in en bit med värde A, får vi ut en bit med värde Y. I detta faller ser vi att grinden gör precis som namnet visar, inverterar vår bit.

#### AND / Och-grind

Notera att till skillnad från NOT så tar denna grind emot två bitar, det gör dessutom samtliga grinda efter detta.

Sanningstabell:

| A   | B   | Y   |
| --- | --- | --- |
| 0   | 0   | 0   |
| 0   | 1   | 0   |
| 1   | 0   | 0   |
| 1   | 1   | 1   |

Denna grind använder dessa två insignaler A och B och ger endast ut en 1a då både A **och** B är 1. Båda våra insignaler måste alltså vara 1 för att vi ska få ut 1.

#### OR / Eller-grind

Sanningstabell:

| A   | B   | Y   |
| --- | --- | --- |
| 0   | 0   | 0   |
| 0   | 1   | 1   |
| 1   | 0   | 1   |
| 1   | 1   | 1   |

Denna grind ger ut 1 då A **eller** B är 1. Minst en av insignalerna måste va 1 för att grinden ska ge ut 1.

#### XOR / Exklusiv eller-grind

Sanningstabell:

| A   | B   | Y   |
| --- | --- | --- |
| 0   | 0   | 0   |
| 0   | 1   | 1   |
| 1   | 0   | 1   |
| 1   | 1   | 0   |

Denna grind ger ut 1 då A **eller** B är 1 men _inte_ om båda är 1. Generellt innebär det att är signalen samma (Både A och B är 1 eller både är 0) så får du 0, är de olika så får du ut 1.

#### NAND / Icke och-grind

Sanningstabell:

| A   | B   | Y   |
| --- | --- | --- |
| 0   | 0   | 1   |
| 0   | 1   | 1   |
| 1   | 0   | 1   |
| 1   | 1   | 0   |

Denna grind ger 1 alla gånger då A och B inte är 1. Men är båda insignaler 1 så är utsignalen 0.  
I praktiken detta en AND och NOT grind kombinerat. Dvs att tar man utsignalen för en AND grind och inverterar (går igenom en NOT grind) så får man utsignalen för en NAND grind.

### Att skapa sanningstabeller

Exmepel på frågor kring en logisk krets:

1. Skapa sanningstabell för kretsen
2. Vad blir utsignalen om A = 1 och B = 0

Exempel på logisk krets:

A och B => XOR => C => NOT => Y  
C är här en mellansignal, dvs utsignalen från XOR grinden som sedan går in i NOT grinden innan vi får vårt slutgiltiga utsignal

#### 1. Skapa sanningstabellen

Sanningstabell med våra insignaler:

| A   | B   | C   | Y   |
| --- | --- | --- | --- |
| 0   | 0   |     |     |
| 1   | 0   |     |     |
| 0   | 1   |     |     |
| 1   | 1   |     |     |

Sedan lägger vi på mellansignalen C, vilket är utsignalen från vår sanningstabell för XOR.

Sanningstabell med C tillagt (Se Y på XOR tabellen)

| A   | B   | C   | Y   |
| --- | --- | --- | --- |
| 0   | 0   | 0   |     |
| 1   | 0   | 1   |     |
| 0   | 1   | 1   |     |
| 1   | 1   | 0   |     |

Slutgiltig sanningstabell, då tar vi C igenom vår slutgiltiga NOT grind:

| A   | B   | C   | Y   |
| --- | --- | --- | --- |
| 0   | 0   | 0   | 1   |
| 1   | 0   | 1   | 0   |
| 0   | 1   | 1   | 0   |
| 1   | 1   | 0   | 1   |

#### 2. Svara på frågan med hjälp av tabellen

Tabellen ger att A = 1 och B = 0 ger Y = 0

#### Fler exempel:

Notera att denna krets _inte_ är samma som den i slides.

```
A => NOT (D) =======> |
                      | => AND => Y
B och C => AND (E) => |
```

Här har vi tre insignaler, A, B, och C, två mellansignaler D och E och en slutgiltig utsignal Y.

Notera att vi här ska ha 8 olika rader, då 2³ = 8, där 3 är antalet insignaler och 2an har med basen att göra. Kan vara bra att ha för att kolla att man har fått med alla kombinationer.

Sätt först ut alla kombinationer av våra insignaler:

| A   | B   | C   | D   | E   | Y   |
| --- | --- | --- | --- | --- | --- |
| 0   | 0   | 0   |     |     |     |
| 0   | 0   | 1   |     |     |     |
| 0   | 1   | 0   |     |     |     |
| 0   | 1   | 1   |     |     |     |
| 1   | 0   | 0   |     |     |     |
| 1   | 0   | 1   |     |     |     |
| 1   | 1   | 0   |     |     |     |
| 1   | 1   | 1   |     |     |     |

Sedan sätter vi ut värden för vår delsignal D. Notera att denna signal _enbart_ beror på värdet av A. D följer tabeller för NOT grind ovan.

| A   | B   | C   | D   | E   | Y   |
| --- | --- | --- | --- | --- | --- |
| 0   | 0   | 0   | 1   |     |     |
| 0   | 0   | 1   | 1   |     |     |
| 0   | 1   | 0   | 1   |     |     |
| 0   | 1   | 1   | 1   |     |     |
| 1   | 0   | 0   | 0   |     |     |
| 1   | 0   | 1   | 0   |     |     |
| 1   | 1   | 0   | 0   |     |     |
| 1   | 1   | 1   | 0   |     |     |

Sedan sätter vi ut värden för delsignal E. Här kollar vi _enbart_ på B och C samt tabellen för AND ovan. Notera att vi ska ignorera A, den rör inte delsignal E.

| A   | B   | C   | D   | E   | Y   |
| --- | --- | --- | --- | --- | --- |
| 0   | 0   | 0   | 1   | 0   |     |
| 0   | 0   | 1   | 1   | 0   |     |
| 0   | 1   | 0   | 1   | 0   |     |
| 0   | 1   | 1   | 1   | 1   |     |
| 1   | 0   | 0   | 0   | 0   |     |
| 1   | 0   | 1   | 0   | 0   |     |
| 1   | 1   | 0   | 0   | 0   |     |
| 1   | 1   | 1   | 0   | 1   |     |

Med detta kan vi slutligen sätta ut Y. Här kollar vi _enbart_ på D och E och använder oss av XOR tabellen ovan. A, B, och C ignorerar vi för Y, dessa har redan hanterats när vi fick fram D och E.

| A   | B   | C   | D   | E   | Y   |
| --- | --- | --- | --- | --- | --- |
| 0   | 0   | 0   | 1   | 0   | 1   |
| 0   | 0   | 1   | 1   | 0   | 1   |
| 0   | 1   | 0   | 1   | 0   | 1   |
| 0   | 1   | 1   | 1   | 1   | 0   |
| 1   | 0   | 0   | 0   | 0   | 0   |
| 1   | 0   | 1   | 0   | 0   | 0   |
| 1   | 1   | 0   | 0   | 0   | 0   |
| 1   | 1   | 1   | 0   | 1   | 1   |

Om vi nu använder dessa kan vi besvara en fråga såsom vad är Y då A = 1, B = 1, C = 1.

Kollar vi på tabellen ser vi att alla insignaler som 1 har vi längst ner, och där är Y = 1. Svaret är därmed 1.

När vi väl har vår tabell kan vi sen sätta in vilka insignaler som helst och sedan få ut en utsignal, som ett facit.
