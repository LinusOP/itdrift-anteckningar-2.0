---
title: Föreläsning 1
order: 10
---

# Föreläsning 1 - Intro, begrepp, och sårbarheter

Generellt finns där två termer vad gäller sårbarheter:

- Vulnerability - Sårbarhet
- Threat - Hot

Sårbarheter handlar om svagheter i program och mjukvara som kan användas för att gå förbi säkerhetsregler eller restriktioner.

Ett hot låter liknande men handlar mer om att där finns en angripare, eller potential för att en sårbarhet på något sätt ska utnyttjas. De går alltså samman men är inte helt likställda.

Sårbarheter finns överallt och på alla nivåer, dvs i tjänster och program, i operativsystem, och i hårdvara.

Exempel är Meltdown och Spectre, sårbarheter i processorer som bygger på ett designfel. I grund bygger sårbarheten på att processorer inte kör all kod i ordning, de kan förbered senare instruktioner och sen lagra resultate i cache medans tidigare kod fortfarande körs.

T.ex kanske man laddar in en fil från minnet innan det är säkert att användaren har tillgång (och kan då ge tillgång direkt när användarens behörigheter kontrollerats). En miss i designen av den här funktionen gjorde att den datan som lästes in i förtid kunde utnyttjas för att komma åt känslig information.

## Sårbarheter i mjukvara

Trots ovanstående finns de flesta sårbarheter i mjukvara, det kan var specifika program eller i operativsystem, hypervisors och liknande. Särskilt i mjukvara med mycket kod, Windows t.ex är ca 50 miljoner rader kod, Chrome är ca 7 miljoner rader. När man bygger så stora program är det nästan garanterat att någon sårbarhet missas, dessa kan vara osäker kod som missas men även misstag i hur man designat systemet.


