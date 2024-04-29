---
title: Föreläsning 6
order: 60
---

# Föreläsning 6 - Autentisering över nätverk

När vi autentiserar oss över nätverk, oftast internet, finns där många nya problem. Framförallt handlar det om att andra personer kan lyssna av trafik enkelt och därmed plocka ut t.ex lösenord eller andra uppgifter om de skickas i klartext. Där finns även s.k replay-attacker, där en angripare samlar paket som skickas till servern och sedan spelar upp dessa igen och på så sätt kan se ut som klienten, även med krypterad kommunikation där angriparen inte exakt vet inehållet.

## Challenge - Response

Challenge-response bygger på att servern skickar en uppgift till klientent där förutsättningen är att bara klienten kan lösa uppgiften och ge rätt svar. Traditionellt sätt görs detta genom att servern och klienten delar en hemlighet, t.ex lösenord.

Generellt finns några problem, dels gäller det att varje gång servern skickar en uppgift så måste den vara ny, annars är det enkelt att göra replay attacker. Ett annat problem är att en angripare kan se både uppgiften och lösningen, det enda okända är lösenordet. En angripare kan då spara flera challenges och deras lösning, och till slut kanske knäcka hemligheten om den är svag.

Challenge-response förutsätter också att vi redan har en delad hemlighet, vilket gör att där måste finnas ett system för att dela denna separat från challenge-response systemet.

### Public key

Man kan även använda public key system för att autentisera sig med challenge response. Ofta bygger detta på digitala signaturer, dvs att den som ska autentisera sig får något som den ska signera, en nonce eller tidsstämpel t.ex, den signerar och skickar tillbaka detta och den som frågar kan då verifiera med den publika nyckeln att signaturen stämmer.

Detta är t.ex principen bakom BankID, där bankerna har en lista över personnummer och matchande publika nyckel, och när vi loggar in i bankid signerar vi med vår privata nyckel som sedan verifieras av banken med hjälp av listan.

Denna typ av challenge response lider till viss del av samma problem som med lösenord, att angriparen kan samla information och till slut kanske kan knäcka hemligheten, även om det är svårare. Det är också ett något mer komplicerat system.

### Över krypterad tunnel

En vanlig lösning för detta är hybridlösning, där publika nycklar avänds för att servern ska bevisa sin identitet (jag vet att det faktiskt är t.ex min bank jag loggar in på). Sedan etableras en krypterad tunnel med TLS/HTTPS, över denna kan nu en klassisk challenge-response med lösenord göras utan att en angripare lika enkelt kan lära sig av det. Detta funkar fortfarande okej men bättre system finns.

## Federated ID

Något vi ofta ser är knappar med t.ex "Logga in med Google", "Logga in med Facebook" osv. Detta är ett exempel där någon annan går i god för din identitet. Detta kallas federated ID, och är användbart då servern och klienten inte behöver ha en existerande relation, med delade hemligheter osv. Istället etableras detta mellan klienten och den tjänst som går i god, t.ex google eller facebook. Förutsatt att servern litar på denna tjänsten kan klienten då autentisera sig.
