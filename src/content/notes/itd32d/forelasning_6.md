---
title: Föreläsning 6
order: 60
---

# Föreläsning 6 - Säkerhet utifrån människan

Angrepp handlar inte bara om att skydda enheter, användare och personer i organisationen är också sårbarheter. När man gör attacker som bygger på personer eller den "mänskliga faktorn" kallas detta för _social engineering_.

Angrepp baserade på social engineering är oftast simpla från ett tekniskt perspektiv. Ändå är de oftast effektiva, dvs de fungerar ofta med relativt lite jobb.

Exempel på social engineering:

**Pretexting/Impersonation**

Låtsas vara t.ex en arbetare från kommunen, bygg/service, eller annan organisation som personer litar på. Ofta handlar det om att agera som att man vet vad man håller på med och som att man hör hemma där. Generellt används någon form av rekvisita, typ jacka med logga, varselväst eller annat som får en att se pålitlig ut.

**Phishing**

Något vi har pratat om innan, skicka falska mejl eller andra meddelanden för att få folk att klicka på länkar, logga in på fejkade hemsidor, eller liknande.

**Should surfing/eavesdropping/pigybacking**

Generellt att tjuvlyssna, kolla lite extra på skärmar man inte får, eller allt annat där man "spionerar". Personer berättar ofta mer än de tänker på.

## Varför funkar social engineering?

Människor vill oftast vara vänliga eller hjälpsamma om de kan. Man vill oftast gå folk till mötes om de ber om något, särskilt om de verkar bestämda, stressade, eller liknande.

Några olika mekanismer används vid social engineering:

- Auktoritet - Peka på en person i auktoritetsposition och hävda att man arbetar åt/med dem, t.ex en chef eller liknande.
- Övertalning - Helt enkelt att tjata tills man får igenom det man vill
- Konsensus - Att man på olika sätt försöker få folk att tro att _alla_ gör något, t.ex logga in på en sida eller använda en app osv. Personer vill passa in, så om andra gör något och hyllar det vill man gärna också göra samma sak.
- Brist/exklusivitet - "Det finns bara tre datorer kvar till det här priset, tryck på länken nedan för att komma till erbjudandet", en klassisk teknik för att skapa tidspress och därmed få folk att inte vara lika nogranna
- Förtroende - Bygga upp (eller redan ha) en relation eller förtroende hos någon och utnyttja detta. Eller vara så självsäker att man verkar pålitligt/betrodd.

Dock är människan inte bara ett problem. Personer vill göra rätt, och om man faktiskt utbildar om säkerhetsproblem och förklarar varför de fungerar och vad som kännetecknar angrepp så kan personer agera säkrare.

## Systematiskt säkerhetsarbete

I organisationer måste säkerhetsarbete ske systematiskt. Man kan inte bara köpa in den coolaste och senaste tekniken för att det verkar intressant. Man kan inte heller låta bli med säkerhet, det blir bra mycket dyrare i längden. Därmed måste man ha system och metoder för att balansera kostnader, säkerhet, och den juridiska aspekten.

### Steg 1 - Identifiera tillgångar och hot

Första steget i att kunna arbeta med säkerhet systematiskt är att vet vad som behöver skyddas. Vad finns det för system och data som behöver skyddas? När man väl vet vad som ska skyddas så behöver man identifiera hot som finns, dvs vad behöver man skydda mot.

Detta kan göras på olika sätt, självklart kan man internt helt enkelt funder och diskutera, möten, brainstorming osv. Man kan även titta på och diskutera med andra som har liknande system eller data, i vissa branscher finns givna regler eller ramverk osv. Slutligen kan man använda sig av penetrationstester, dvs att en tredje part försöker angripa i syfte att hitta sårbarheter.

När man identifierar hot så bör man utgå från CIA, Confidentiality, Integrity, Availability, som vi sett innan. Men där finns också en något mer specifik ackronym: STRIDE. STRIDE bygger på vilka hot som kan finnas, dvs det beskriver problem inte lösningar, men där finns alltid en motsvarande "lösning"

- **S** - Spoofing - Authenticity, kan något eller någon utge sig för att vara något annat.
- **T** - Tampering - Integrity, kan något förändras/raderas på ett sätt som det inte borde
- **R** - Repudiation, kan man identifiera vem som gjort något
- **I** - Information disclosure - Confidentiality, kan personer komma åt information de inte bör komma åt
- **D** - Denial of service - Availability, är tjänster/information tillgänglig när den behövs
- **E** - Elevation of privilege - Authorization, kan personer komma åt eller utföra funktioner de inte har behörighet för

Utifrån dessa punkter kan man då identifiera specifika hot i system och tjänster som kan kopplas till någon av punkterna. Det är alltså ett generellt ramverk som passa in på de flesta problem.

#### Riskbedömning

När man identifierat de hot som finns, behöver de bedömas. Man behöver alltså gå igenom varje hot och se, vad blir konsekvenserna om det blir verklighet och hur sannolikt är det att det inträffar? Risken är i sin tur produkten av dessa, dvs stor konsekvens och hög sannolikhet innebär högre risk.

Riskbedömningen kan göras utifrån två aspekter, kvantitativ och kvalitativ.

**Kvantitativ**

Den kvantitativa metoden är rent ekonomisk, dvs vad kostar det i pengar varje gång ett angrepp sker och hur sannolikt är det, på så sätt kan man mer eller mindra få fram en årskostnad på hotet. T.ex om det är 50% chans att ett angrepp stoppa produktion i 1 dag varje år, och det kostar 100 000 att åtgärda (komma ikapp i produktion) om det händer, så får man en effektiv årskostnad på 50 000kr/år.

Detta missar en hel del dock, t.ex vad händer om angreppet innebär obehörig tillgång till känslig data, hur ser det ut för kunder, finns där konsekvenser man missar osv. Det är helt enkelt inte tillräckligt noga.

**Kvalitativ**

Eftersom den kvantitativa metoden inte direkt är bra nog så används ofta den kvalitativa. Den bygger på samma principer, dvs sannolihet och konsekvens, men man baserar det på flera olika delar. Manskapar nivåer med konsekvens 1-4 och sannolikhet 1-4. Man delar sedan in varje hot i en av nivåerna av båda kategorierna. Slutligen kan man få fram en risk genom att multiplicera nivån från varje kategori, t.ex en låg risk men väldigt hög konsekevens får $1 * 4 = 4$, medans väldigt hög konsekvens och risk får $4 * 4 = 16$, betydligt högre.
