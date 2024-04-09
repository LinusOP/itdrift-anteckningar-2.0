---
title: Föreläsning 1
order: 10
---

# Föreläsning 1 - Säkerhetskonceptet

För att förstå säkerhet så måste vi förstå en del begrepp och koncept, framförallt måste vi se på vad vi tänker när vi pratar om säkerhet. På svenska betyder säkerhet flera saker, men översätter vi till Engelska får vi två ord, security och safety.

I detta fall kollar vi på security. Kort sagt kan man säga att vi har något som ska skyddas från en fiende, t.ex måste vi skydda vår data (lösenord, känsliga uppgifter mm), hårdvara, mjukvara, samt kommunikationslänkar (nätverk).

För att åstadkomma detta krävs någon form av skydd som vi bygger upp runt vår infrastruktur. När man pratar om säkerhet pratar man ofta om två sidor, red team och blue team. Där red team är angriparen och blue team är de som försöker skydda.

Dock ska man skilja på en riktig angripare och red team. Red team testar ditt system för att hitta sårbarheter så att de kan åtgärdas. Båda sidor jobbar alltså för att stärka skyddet. När man pratar om riktiga angripare pratar man istället ibland om black-hat eller black-hat hackers (ibland refererar man också till red team som white-hat).

## Begrepp

Generellt finns en del begrepp för säkerhet som helhet:

- Datasäkerhet (Computer security) - En traditionell syn på att vi ska skydda en dator från intrång
- Cybersecurity - När internet blev aktuellt började också angrepp komma från internet, därmed behöver man också skydda mot detta, vilket inte datasäkerhet alltid behandlar
- InfoSec (Information Security) - Handlar mer specifikt om information

Andra begrepp som är viktiga och finns på många ställen inom säkerhet:

- Authentication (autentisering) - Att bevisa sin identitet, att du är du

## Angrepp

Historiskt sett har kända angrepp ofta varit ganska harmlösa. I början handlade det oftast om att får något att visas på skärmen, sprida någon text mm. Men redan på 90 och 00-talet började angripare inse att man kunde tjäna på angrepp. T.ex genom att angripa banker, eller stora och förmögna företag.

I dagsläget ser vi dock ofta nyheter om angrepp där syftet nästan alltid är skada och/eller att tjäna pengar. Bland annat ser vi mycket av det som kallas nation-state angripare. Dvs angripare som är relaterade till eller finansierade av stater och nationer. Kända nationer som gör detta är bland annat Kina, Ryssland, USA, Nord Korea, Israel, Iran mm, men även Sverige utför cyberverksamhet militärt. Även stora hacker-grupper finns, ibland är dessa kopplade till stater, och ibland hels individuella.

Exempel på attacker:

- Ransomware
- Dataläckor
- DDOS-attacker

## Skydd

Hittils har vi kollat mycket på attacker och angripare. Men huvudmålet är såklart att skydda oss från dessa angrepp. VI gör detta genom att applicera olika skydd för att uppnå de tre målen nedan.

### CIA (inte _den_ CIA)

När vi pratar skydd har vi 3 huvudmål, med ackronymen CIA (ställs ofta upp som en triangel).

#### C - Confidentiality (Skretess)

Att skydda från obehöriga. Särskilt aktuellt vad gäller data, alltså att du inte ska kunna komma åt t.ex känsliga uppgifter. Men det gäller egentligen all data du inte är behörig till. Även att nyttja hårdvara du inte får nyttja.

#### I - Integrity (äkthet, riktighet)

När vi hör integrity tänker vi ofta integritet, men här handlar det om att kunna lite på att någor är äkta. T.ex ska du kunna lita på att ett mail från Skatteverket faktiskt kommer därifrån. Det handlar även om att saker är oförändrade, dvs att laddar du ner ett program så får du det du klickade på och inte något annat program.

#### A -Availability (Tillgänglighet)

Vi ska inte bara skydda data från obehöriga eller angripare, vi ska också se till att de som är behöriga ska ha tillgång till något. T.ex att en hemsida är uppe, data går att komma åt mm. Generellt handlar det alltså om att se till att saker hålls i drift och resurser hålls tillgängliga utan att angripare kan stänga ner dessa.

### Typer av skydd

Generellt finns där tre olika kategorier skydd kan hamna i (dock arbetar vissa i flera kategorier).

#### Förebyggande

Detta är det mest självklara, vi vill försvåra angrepp, t.ex genom antivirus, kryptering mm.

#### Detektering

Om vi blir angripna vill vi upptäcka detta, så att vi kan reagera och försöka stoppa angreppet.

#### Återställning

Om vi har blivit angripna, hur återställer vi saker? T.ex om vi behöver installera om en dator, har vi system för att återställa till en fungerande miljö igen? Backups osv.
