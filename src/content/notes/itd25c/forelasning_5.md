---
title: Föreläsning 5
order: 50
---

# Föreläsning 5 - Lokal autentisering

Principen bakom autentisering är helt enkelt att bevisa vem man är, dvs att det är just du som faktiskt loggar in.

Exempel på autentiseringsmetoder:

- BankID
- Användarnamn & lösenord
- Biometrik
  - Fingeravtryck
  - FaceID
- Hårdvara
  - Bankdosa
  - Yubikey

## Autentiseringsprinciper

Det finns vissa s.k principer för autentisering, dvs vad en autentiseringsmetod bygger på, där finns 3 som räknas som huvudprinciper med 2 som är något ovanligare.

De tre huvudprinciperna är:

- Något man vet (Lösenord, pinkod, eller annat man kan komma ihåg)
- Något man har (Bankdosa, USB-nycklar, BankID (delvis), authenticator (mobilen))
- Något man är (Fingeravtryck, FaceID)

Utöver dessa finns de två ovanligare:

- Något man gör (hemligt mönster, gest osv)
- Plats man befinner sig på

### MFA - Multi-factor authentication (Multifaktorautentisering)

MFA bygger på att man kombinerar minst två av dessa principerna, t.ex att man skriver in både sitt lösenord samt får en kod till mobilen, då kombinerar man något man vet med något man har.

## Lösenord

När vi autentiserar oss lokalt så har vi en låg risk för avlyssning när data skickas, eftersom den bara skickas inom datorn. Ofta har lösenord använts i de här fallen men mer och mer gå vi över till andra metoder, lösenord fungerar ok sålänge de är tillräckligt långa.

När vi använder lösenordsautentisering är principen som så:

1. Användaren skapar ett konto, systemet får användarnamn och lösenord, det kör lösenordet genom en hashfunktion och sparar sen användarnamn tillsammans med hashvärdet i sin användardatabas.
2. När användaren ska logga in så hashas det lösenord som angavs, sedan kollar systemet upp användarnamnet och hämtar dess hash, sedan jämförs det sparade hashvärdet med det hasvärde som genererades från inloggningen. Matchar dessa så loggas användaren in.

Man sparar hashvärdet istället för lösenordet för att försvåra för en angripare som får tag på användardatabasen. Eftersom det inte (bör) gå att gå tillbaka från ett hashvärde till klartext så kan inte eller angriparen se lösenordne.

### Windows

Gamla windowsversioner använder LM-hash, eller LANMAN-hash, som är en väldigt dålig hashfunktion. LM-hash är dåligt eftersom det bara tillåter lösenord om max 14 tecken, samt att det delar upp lösenordet i två delar om 7 tecken vars hashvärden sedan sätts ihop, samt att det tvingar alla bokstäver till stora bokstäver innan den hashar. Det är därav väldigt enkelt att räkna ut alla kombinationer och hitta lösenordet, eftersom det inte finns så många kombinationer.

Nyare versioner av windows använder istället NT-hash. NT-hash tillåter länge lösenord och skiljer på stora och små bokstäver. Men även NT-hash har sina problem och går att knäcka. Microsoft vet om detta men har svårt att uppdatera pga bakåtkompabilitet, de har sagt att detta ska uppdateras i kommande windowsversioner.

I windows lagras lösenordet på olika ställen beroende på om det är en domänansluten dator eller inte. På en domänansluten dator lagras lösenorden på DC och cachas enbart lokalt för snabbare inloggning.

På en icke domänansluten dator lagras lösenord i den s.k SAM-databasen, som finns lagrad i `C:\Windows\System32\config\SAM`, som är krypterad. Dock finns nyckeln för detta lagrad i `C:\Windows\System32\config\system`, som där finns verktyg för att komma åt.

### Linux

I Linux sparas användare, dess namn och grupper mm i en fil, `/etc/passwd`, denna fil har alla inloggade användare tillgång till. Dock sparas inte lösenordet i denna filen, istället gör man numera så att lösenordshasher spara i en annan fil, `/etc/shadow`, som man måste ha administratörsbehörighet för att komma åt.

En annan viktig sak som linux gör är att använda s.k salt. Detta innebär helt enkelt att varje användare får en slumpmässig sträng som läggs efter lösenordet innan det hashas. Anledningen är att skilja hashvärden även med samma lösenord, för att angripare inte ska kunna se om flera användare använder samma lösenord (ofta kanske ett svagare lösenord).

## Principen att knäcka lösenord

Som vi pratat om så sparar (bra) tjänster inte lösenord utan istället hashvärden av lösenord. Förutsatt att hashfunktionen är bra så går det inte att få tillbaka lösenordet från hashvärdet. Vad kan en angripare då göra? Jo, angriparen får helt enkelt gissa sig fram, dock finns där lite olika strategier för att inte gissa i onödan.

### Antal lösenord

Först och främst vill vi se hur många lösenord vi faktiskt måste gissa, vi måste då veta två saker, vi måste veta hur långt lösenordet kan tänkas vara, det kallar vi $L$, och sen behöver vi veta ur många olika alternativ varje tecken kan ha, t.ex stora och små bokstäver osv, detta kallar vi $N$.

Där finns några olika standardförfaranden vad gäller vilka tecken som används och hur många alternativ det ger per tecken:

1. Små bokstäver (engelska alfabetet) ger $N = 26$
2. Små och stora bokstäver ger $N = 52$
3. Små och stora bokstäver samt en siffra ger $N = 62$
4. Ovanstående samt inklusive ett specialtecken ger ungefär $N = 80$

För att sedan räkna ut hura många olika lösenord vi har så tar vi $N^L$, dvs alternativ per tecken upphöjt till längden

Om vi utgår från ett lösenord på 8 tecken, dvs $L = 8$ och utgår från teckenalternativ 1 så får vi $26^8 = 208 827 064 576$, ca 209 miljarder lösenord.

Utgår vi istället från alternativ 3 får vi $62^8 = 218340105584896$ eller ca 218 billioner lösenord.

### Problem med lösenord

Problemet med att räkna såhär är att lösenord är inte helt slumpmässiga, användaren ska trots allt också komma ihåg lösenordet. Därav väljer användare enklare lösenord som lättare går att komma ihåg, ofta bygger på vanliga ord osv. Angripare behöver därmed inte testa precis alla kombinationer utan kan istället använda listor på vanliga lösenord, vanliga ord som folk använder i sina lösenord osv.

Något som också används är listor med färdiga hashvärden, där personer har hashat t.ex de 10 000 vanligaste lösenorden med vanliga hasfunktioner, då är det bara att jämföra hashvärden och angriparen behöver inte beräkna något. Dessa kallas rainbow tables. De är också en viktig anledning till att använda salt med sina lösenord, då stämmer inte hashen av ett lösenord med hashen i listan, även om det är samma lösenord.

## Biometrik

Där finns många olika typer av biometrik, vanliga idag är fingeravtryck och ansiktsigenkänning. Generellt är att någon sorts sensor gör en avläsning på en eller oftast flera saker. På ansiktet kan det t.ex vara höjd och bredd, avstånd mellan ögon osv.

Här finns en viktig princip, nämligen att avläsningarna kommer vara olika var gång, du kanske inte håller fingret på läsaren likadant, du håller ditt ansikte olika avstånd från kameran osv. Därmed måste systemet hela tiden göra ungefärlig jämförelse där "nära nog" räcker.

Detta skapar vissa problem, om systemet är för slappt så blir risken större att man får en "false positive", dvs att man släpper in en annan person. Är man däremot för strikt så blir risken stor att man får "false negative", att rätt användare inte släpps in. Man behöver därmed hitta ett mellanläge där användaren slipper bli nekad ofta men som samtidigt är strikt nog för att inte släppa in obehöriga.
