---
title: Föreläsning 5
order: 50
---

# Föreläsning 5 - Reflektion/Fördjupning Lagring & Introduktion AD

## Reflektion lagring och laboration 2

### Vanliga missförstånd med diskar

Har vi 2 diskar, C:\ och F:\ så tänker vi det som två separata, fysiska, diskar, men det måste inte vara det. Bokstäverna indikerar volymer, vi kan t.ex ha flera partitioner på samma disk, med varsin volym. Det kan också vara en virtuell disk, eller flera diskar i RAID eller i en storage pool som representeras av en enda volym.

### Storage pools

Anledning till att vi använder storage pools är att det är lättare att lägga till flera diskar utan att behöva manuellt göra om allt på en ny disk, såsom filstruktur, utdelningar osv.

Med storage pools kan vi även enkelt skapa redundanta virtuella diskar. T.ex med RAID1 eller RAID6.

### Utdelning

Vi kan dela ut hela volymer (från roten) eller en underkatalog. Dock är server manager något vilseledande här. Om vi i menyn bara klickar på att dela ut t.ex `I:\` så kommer windows server skapa en mapp som så: `I:\Shares` där den sen lägger utdelningar. Vill vi faktiskt dela ut från roten (som i vår labb) så måste vi sätta detta som en "Custom Path".

Gällande behörigheter finns där vissa saker att tänka på. Först det faktum att är vi inte i en domän så krävs ett konto _på servern_ för att komma åt en utdelning, det är den användarens behörigheter som gäller. Där finns också två olika behörigheter, dels de i filsystemet (NTFS) samt de som man kan sätta på en share. De mest restriktiva behörigheterna vinner.

### NTFS Behörigheter

Behörigheter ärvs från toppen. T.ex så är det standard i windows att Users gruppen får Read & Execute behörighet på roten. Detta kommer då ärvas till alla underkataloger om man inte stänger av det.

Där finns två olika typer av behörigheter, "Allow access" samt "Deny access". Oftast använder vi inte "Deny access" i praktiken då det snabbt blir rörigt. Detta då deny alltid slår allow.

## AD (Active Directory)

### Varför används AD?

Som vi märkt i våra labbar är det ganska rörigt när vi behöver lokala användare överallt. T.ex när vi gör utdelningar krävs det två konton, ett på datorn samt ett på servern. Vi behövde också göra alla våra ändringa på de individuella klientdatorerna.

I en organisation vill vi kunna använda konton på flera ställen, samt göra inställningar för alla användare eller klientdatorer från en central plats. Detta är vad AD bidrar med. Datorer som är kopplade till vår miljö autentiserar sig mot en central server, och behörigheter sätts centralt.

### Grundfunktioner i AD

AD fungerar som en katalogtjäns för som lagrar information om all IT hos en organisation.

Den ger oss också möjlighet att nå datorer, servrar, och andra resurser med namn istället för IP.

Som tidigare nämnt har vi också nu ett centralt konto, där autentisering sker med AD servern. AD servern sätter också behörigheter och inställningar för datorer osv, som sedan skickas ut till klienterna. Det innebär att vi kan logga in med samma konto på flera ställen och ha samma behörigheter överallt.

### Katalogtjänsten

Använder ett system som kallas LDAP (Lightweight Directory Access Protocol). Det är en databas där information om användare, datorer, samt tjänster lagras.

### Namnuppslag

Vår AD server fungerar också som en DNS server. Domänens namn blir en s.k DNS-zon som kan inehålla information om namn och deras respektive IP.

Har vi t.ex en domän med namn `itdrift.local` och en server med namn "FileSRV" och IP `192.168.10.10` så håller AD koll på detta och skapar en DNS-post som pekar "FileSRV" till den IPn. Har vi sedan en utdelning på den servern så kan vi för att nå denna skriva `\\FileSRV.itdrift.local\` istället för `\\192.168.10.10\` som tidigare.

### Autentisering

AD inehåller en central autentiseringsserver som kommer ta hand om alla förfrågningar om autentisering. Detta är ett s.k "Single-Sign-On" (SSO) system, dvs att vi kan använde ett enda konto för att logga in på flera ställen.

Användarnamn i AD kan skrivas på två olika sätt. Har vi t.ex ett konto med "roosan" i vår "itdrift.local" domän så kan vi skriva detta `itdrift\roosan` eller `roosan@itdrift.local`. Detta till skillnad från ett lokalt datorkonto där den lokala datorns namn används, t.ex `Dator1\Linus`.

På lokala konton hanteras konto av "SAM" (Secure Account Manager), och rättigheter mm. finns bara lokalt på datorn. I AD så sköts detta, som tidigare nämnt, av AD servern. Då finns där behörigheter både för vad vi får göra på den specifika datorn men också i hela domänen.

#### Kerberos

Kerberos är protokollet som används av AD för autentisering. Se slide 16 för diagram över hur Kerberos fungerar. Kort sagt finns där 3 delar, klienten, resursen vi vill nå (t.ex en server) samt ett s.k "Key Distribution Center" som består av två delar, en "Authentication server" samt en "Ticket Granting Server".

Vår klient börjar med att skicka inloggningsinformation (krypterat) till vår authentication server, är den en behörig användare får den en s.k "Ticket Granting Ticket" (TGT). Vi är då, enkelt sagt, inloggade i domänen.

Vill vi sen nå vår resurs så skickar vi vår TGT till vår "Ticket Granting Server", den kontrollerar då att vi är behöriga att komma åt resursen osv, är vi det så får vi en "Client to Server ticket", som vi slutligen skickar till vår resurs som då låter os logga in.

### Centraliserad konfiguration

För att skicka ut konfiguration mm till flera datorer används s.k "Group policy". Varje domän kan ha flera olika policys som sedan skickas ut till alla datorer/användare, eller den del av dem.

Vi skulle t.ex kunna sätta specifika regler i brandväggen, eller förhindra att användare installerar program mm.

### AD i framtiden

Precis som mycket annat så finns där AD som en molntjänst i Azure. Vanligt just nu är en hybridversion, där man har vissa delar lokalt och vissa delar i molnet.

I vissa fall låter företag också personer använda sina privata datorer på jobbet. Vi måste då också ta hänsyn till detta när vi konfigurerar vå miljö.

### AD begrepp

I AD har man det som kallas en skog, i denna finns träd som är domäner. Domäner kan också ha underdomäner. Det är helt normalt med en skog som bara har ett träd med en domän.

### Serverstruktur i AD

I vår skog kan vi t.ex ha en domän (träd), t.ex `itdrift.local`, i denna har vi först våra domänkontrollanter, som hanterar domänen. Sen har vi medlemsservrar som delar ut tjänster i domänen men inte hanterar domänen själv.
