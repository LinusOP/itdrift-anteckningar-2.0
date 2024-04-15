---
title: Föreläsning 3
order: 30
---

# Föreläsning 3 - Kryptering som garanterar äkthet

Kryptering som vi pratat om innan har handlat om att stoppa angripare från att kunna läsa data, t.ex vid säker kommunikation. Dock är detta inte ett fullstädningt skydd, även om personer inte kan läsa inehållet så kanske de vet hur det kommer se ut, och kan då göra förändringar i det krypterade innehållet så att när mottagaren dekrypterar så är innehållet ändrat.

## Kryptografiska Checksummor

Lösningen här är att använda s.k checksummor, som är beräkningar på en fast längd (t.ex 128 eller 256 bitar) som "sammanfattar" inehållet. Inte så att vi förstår det, men på så sätt att om man stoppar in samma meddelande igen så får man tillbaka som checksumma.

Där finns nogra olika sätt att beräkna checksummor:

- Hashfunktioner
- Message Authentication Codes
- Digitala signaturer

### Hashfunktioner

Hashing är det enklaste sättet att beräkna checksummor. Man stoppar in ett meddelande av varierande längd och får ut en bitsträng av en bestämd längd. Viktigt är både att även små ändringar ger stora skillnader i resultat, samt att det är väldigt svårt att gå tillbaks och få ut texten från en given hash.

T.ex så om jag hashar en fil som innehåller texten "test" med funktionen MD5 (äldre, inte säker, funktion) så får jag resultatet `d8e8fca2dc0f896fd7cb4cb0031ba249`, lägger jag till så jag har innehållet "test!" får jag däremot `c7e111bbf92ca25ca5c80edf7278c172`, som vi ser är de väldigt olika trots att jag inte ändrade mycket.

Några olika hashfunktioner:

- MD4 (gammal, osäker)
- MD5 (bygger på MD4, osäker)
- SHA1 (bygger på MD5, osäker)
- SHA2 (bygger på MD5/SHA1, ibland SHA256, SHA512, säker men ska bytas ut)
- SHA3 (bygger på helt ny algoritm (Keccak), ny standard som ska byta ut SHA2)

#### Tillämpningar

1. Bevisa äkthet - Om man t.ex laddar ner filer (ofta i open source/linux världen) så ger de ofta en hash, man kan sedan beräkna hashen på filen man laddade ner och se om de matchar (dvs ingen förändrade filen medans du laddade ner)
2. Lösenord - När tjänster sparar lösenord så hashar de (förhoppningsvis) dessa innan, om någon sedan stjäl databasen så har de inte lösenorden utan den hashade versionen, som är väldigt svår att få tillbaka till textversionen av lösenordet
3. Skapa symmetriska nycklar - När vi använder symmetrisk kryptering används hashing ofta på nycklarna
4. Bitcoin och cryptovaluta

#### Kollisioner

En stor svårighet när man utvecklar hashfunktioner är kollisioner. Eftersom hashen är en fast längd så finns det bara ett visst antal kombinationer som resultate kan vara, det innebär att det kommer finnas olika meddelanden som ger samma hash.

Detta betyder att har man en dålig hashfunktion som gör det enkelt att hitta eller konstruera kollisioner så kan man ladda ner en fil där en angripare har skapat ett virus som ger samma hash som originalfilen, då vet man inte att det är fel fil man har fått.

Nya hashfunktioner (t.ex SHA3 varianterna) gör det väldigt svårt att konstruera eller skapa kollisioner på det här sättet.

### Message Authentication Code - MAC

Ett annat problem är att kan en mottagare ändra vår fil eller vårt meddelande så kan de också ändra hashen som vi skickar med, då faller såklart meningen med hashen eftersom de helt enkelt kommer skapa en ny hash med sitt virus och skicka båda. Vi som mottagare kommer då hasha filen, jämföra med den (nu falska) hashen som följde med och komma fram till att de matchar så vi måste fått rätt fil, trots att vi inte fått det.

Vad är lösningen? Vi blandar in en hemlighet. Principen är väldigt lik hashing men förutom meddelandet som ska hashas så blandar man också i en hemlighet. När vår angripare sen kommer och ska byta ut meddelandet och hashvärdet så har de inte hemligheten och kan inte skapa rätt hash. Mottagaren ser då att det inte stämmer.

När vi använder hashing med en hemlighet så kallar vi istället resultatet för MAC eller Message Authentication Code, kan även kallas Message Integrity Code eller MIC. De ger oss helt enkelt skydd mot att personer kan ändra i meddelandet och/eller ändra vår hash utan att vi märker det.

### Digitala signaturer

När vi använder message authentication codes så funkar dessa väldigt bra, men de förutsätter att sändare och mottagare litar på varandra och delar på en hemlighet. Ibland litar vi dock inte på den andra parten, och i detta fall fallerar principen med MACs.

Anta t.ex att Alice ska sälja en bil och Bob är villig att köpa den. Bob skickar till Alice att han är villig att köpa den för 20 000 kr. Bob och Alice möts och Bob får bilen, han ber sen banken skicka _10 000 kr_ till Alice. Alice anmäler såklart Bob men Bob har då ändrat sitt meddelande för att säga 10 000 istället, Alice visar meddelandet Bob skickade som säger 20 000, och nu står ord mot ord.

Lösningen är att signera de dokumenten som skickas fram och tillbaka, detta gör man genom att använda publika och privata nycklar. Man använder den privata nyckeln för att signera inehållet och bevisa att en specifik person signerade. Vem som helst kan sen med hjälp av den publika tillhörande nyckeln verifiera signaturen.

Tittar vi t.ex på vårt scenario ovan så om Bob hade signerat sitt meddelande om att han ska betala 20 000 så kan Alice bevisa att det är Bob som skickat det, hon har inte hittat på.
