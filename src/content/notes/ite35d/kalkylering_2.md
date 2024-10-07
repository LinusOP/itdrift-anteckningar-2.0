---
title: Kalkylering - Föreläsning 2
order: 420
---

# Föreläsning 2 - Kalkylering

En typ av kalkylering är en s.k produktkalkylering, som alltså avser att kalkyler hur man ska prissätta en produkt (fungerar tros namnet oftast även bra för tjänster).

Det finns tre syften med en produktkalkyl:

- Prissättning
- Kostnadskontroll
- Lönsamhetsanalys

Det fins även några olika metoder för att göra en sådan kalkyl:

- Bidragsmetoden (den vi kommer fokusera på)
- Självkostnadsmetoden
- Divisionsmetoden

## Bidragsmetoden

Bidragsmetoden går ut på att man beräknar prduketers s.k täckningsbidrag (TB). Täckningsbidraget ska täcka företagets fasta kostnader och dessutom ge vinst. Beräknar man detta för samtliga produkter ser man vilka produkter som bidrar mest till företagets gemensamma kostnader och då också vilken produkt som är mest lönsam.

Formeln för täckningsbidraget för en produkt: $\text{TB} = \text{intäkter} - \text{rörliga kostnader}$
Både intäkt och rörlig kostnad ska vara per st.

Relaterat till täkcningsbidraget är också täckningsgraden (TG), som visar lönsameten för en prdukt procentuellt. Alltså hur stor del av intäkterna från produkten som kan täcka de fasta kostnaderna.

Formeln för detta: $\text{TG} = \frac{\text{TB}}{\text{Intäkten}}$

Man kan även räkna ut ett s.k totalt täckningsbidrag (TTB), som då är på en total budgeterad volym istället för per st. Detta görs helt enkelt genom att multiplicera TB per st och den budgeterade volymen:
$\text{TTB} = \text{TB per st} * \text{volymen}$

## Trånga sektioner / Flaskhalsar

Om man har en resurs som är begränsad så att produktionskapaciteten inte räcker till kallas detta i kalkylsammanhang trånga sektioner eller flaskhalsar. Detta kan t.ex vara att man har en maskin som bara kan köra ett visst antal timmar.

Man måste då välja vilken produkt som ska prioriteras i den trånga sektorn. Detta gör man genom att beräkna på vilken produkt som har högst täckningsbidrag relativt till hur mycket av den trånga sektorn den belastar.

### Räkneexempel

> Anta att två produkter båda kan säljas i obegränsad mängd. Båda bearbetas i samma maskin som max kan köras i 1.500 h / år. Maskinen är fullt belagd och är därmed en trång sektor.
>
> Produkt A tar 4h att tillverka  
> Produkt B tar 1h att tillverka

Följande gäller:

|                | Produkt A | Produkt B |
| -------------- | --------- | --------- |
| Intäkt         | 1000 kr   | 400 kr    |
| Rörlig kostnad | 400 kr    | 200 kr    |

Först behöver vi beräkna TB för båda produkter:

- Produkt A - $1000 - 400 = 600$
- Produkt B - $400 - 200 = 200$

Sen behöver vi titta på hur detta står i relation till hur lång tid produkten tar i den trånga sektorn, dvs vad blir TB per timme i den trånga sektorn, detta görs enligt formeln: $\frac{\text{TB per st}}{\text{Tid i trång sektor}}$

Vi får då följande:

- Produkt A - $\frac{600}{4} = 150$
- Produkt B - $\frac{200}{1} = 200$

Vi ser då att trots att produkt A hade högre TB så får den ett lägre TB per timme i maskinen, så man bör välja produkt B.

## Ledig kapacitet

Ledig kapacitet är motsatsen till trånga sektorer, dvs man har kapacitet att sälja fler produkter utan att förändra sina fasta kostnader. Man kan då göra en s.k minimikalkyl, då man sätter priset ovanför den rörliga kostnaden och får ett TB, även om det inte är tillräckligt för att täcka alla fasta kostnader. Tanken är alltså att gå så lite minus som möjligt.

### Räkneexempel

> Produkt C säljs normalt för 400 kr/st. Dess rörliga kostnad är 250 kr/st och TB/st är därmed 150 kr/st. Försäljningen har gått trögt 2023 och endast 500 st produkter har sålts, vilket är hälften av vad som budgeterats.
>
> En kund vill köpa 500 st produkter i november men enbart om priset sänks till 300 kr/st

Följande gäller alltså för produkt C:

|                  | Produkt C |
| ---------------- | --------- |
| Intäkt           | 400 kr    |
| Rörlig kostnad   | 250 kr    |
| TB               | 150 kr    |
| Fast kostnad/år  | 50 000 kr |
| Såld volym       | 500 st    |
| Budgeterad volym | 1000 st   |

Vad blir nytt TB om vi då väljer att sälja för det lägre priset?  
$\text{TB} = 50\text{kr / produkt} = 300 - 250$

Eftersom vi får en täckning, dvs priset överstiger fortfarande de rörliga kostnaderna, så är det värt det att ta ordern eftersom företaget ändå har ledig kapacitet som inte utnyttjas.

Ordern innebär ett totalt täckningsbidrag på 25 000 kr ($500 * 50 = 25 000$). Ordern bidrar alltså till att täcka de fasta kostnaden med något (även om det är mindra än man önskar) och förbättrar ju alltså överlag företagets resultat med 25 000 kr (eftersom de fasta kostnaderna finns oavsett om vi tar orderna eller inte).

## Forts. kostnader i kalkyler

Som tidigare nämnt finns där några olika sätt att titta på kostnader i kalkyler. Hittils har vi framförallt tittat på rörliga och fasta kostnader, som man använder när man tittar på volymer.

Men där finns ju också några andra kostnader:

- Vid beslutsfattande
  - Samkostnader
  - Särkostnader
- För att skilja på olika produkters kostnader
  - Direkta kostnader
  - Indirekta kostnader

### Samkostnader och särkostnader

När vi ska fatta ett beslut så är samkostnader de kostnader som inte påverkas, dvs de är gemensamma oavsett beslut. Särkostnaderna istället är de kostnader som påverkas av beslutet.

Har vi t.ex en lokal och ska besluta vad vi ska tillverka i lokalen så är lokalkostnaden en samkostnad, den betalar vi för oavsett vad vi ska tillverka. Men vad vi tillverkar är en särkostnad, olika produkter som tillverkas har olika kostnader.

## Självkostnadsmetoden

De direkta och indirekta kostnaderna tittar vi på som nämnt när vi ska beräkna och skilja på produktkostnader, dessa används inom självkostnadsmetoden (en annan metod för en produktkalkyl), som är den vanligaste metoden.

Till skillnad från bidragsmetoden så fördelas i denna metoden alla kostnader ut på produkter. Direkta kostnader är kostnader som kopplas direkt till en viss produkt eller tjänst. Indirekta kostnader är kostnader som inte direkt kan kopplas och istället rör flera produkter. Dessa fördelas ut på produkterna utifrån lämpliga fördelningsnycklar.

### Direkta och indirekta kostnader

Direkta kostnader är som nämnt de kostnader som kan kopplas direkt till en produkt. Det kan t.ex vara kostnader för material eller kostnader för personalen som direkt arbetar med tillverkningen av produkten.

De indirekta kostnaderna är istället saker som inte är kopplade till en viss produkt. T.ex lokalhyra, lönekostnader för annan personal (t.ex en inköpare som köper in material för flera produkter), en maskins avskrivningkostnad om maskinen används till flera produkter.

De indirekta kostnaderna behöver alltså delas upp på olika produkter, och hur man delar upp en kostnad beror på vad kostnaden är. Det kan t.ex handla om tid, hur mycket tid lägger vår inköpare per produkt. Vanliga fördelningsnycklar:

- Tid
- Antal
- Kvm
- KWh
- Direkt material
- Direkt lön

### Andra begrepp

Några övriga begrepp som kan stötas på är:

- Kostnadsslag - Olika typer av kostnader, t.ex råvaror, lokalhyra osv
- Kostnadsställen - Ett visst ställe eller en viss funktion där kostnader uppstår, t.ex en viss avdelning
- Kostnadsbärare - Den enskilda produkt eller order som ska bära både sina direkta och indirekta kostnader

### Räkneexempel

> En industri har fyra produktionsavdelningar. De har en lokalhyra om 1.200 000 kr/år samt administrationskostnader för IT och ekonomi om 800.000 kr/år.
>
> Svetsavdelningen står för 20% av lokalytan och administrationskostnaden fördelas lika mellan företagets samtliga avdelningar.
>
> Varje år svetsas 10.000 detaljer fördelade på två olika produkter:  
> A) 2.000 st och B) 8.000 st.  
> – Produkt A) har råmaterialkostnader om 100 kr och bearbetas för 50 kr.  
> – Produkt B) har råmaterialkostnader om 80 kr och bearbetas för 75 kr.

Följande gäller för produkterna:

|                   | Produkt A | Produkt B |
| ----------------- | --------- | --------- |
| Beräknad årsvolym | 2000 st   | 8000 st   |

#### Kostnadsslag

Först behöver vi hitta de olika kostnadsslagen, vi har ett antal direkta kostnader: Råa material, bearbetning (lön). Samt ett par indirekta kostnader: Lokalhyra och administration (IT och ekonomi).

#### Kostnadsfördelning direkta kostnader

Vi behöver sedan fördela våra kostnader, först de direkta:

|                             | Produkt A | Produkt B |
| --------------------------- | --------- | --------- |
| Beräknad årsvolym           | 2000 st   | 8000 st   |
|                             |           |           |
| Råmaterial/st               | 100 kr    | 80 kr     |
| Bearbetning/st              | 50 kr     | 75 kr     |
| Totala direkta kostnader/st | 150 kr    | 155 kr    |

#### Kostnadsfördelning indirekta kostnader

Sedan ska vi fördela indirekta kostnader på kostnadsställen (de direkta kostnaderna är ju kopplade till produkten redan så vi vet var de kostnaderna uppstår). Specifikt gör vi detta för svetsavdelningen.

Administrationskostnaden skulle fördelas jämnt på våra fyra avdelningar, dvs $\frac{800 000}{4} = 200 000$.

Lokalkostnaden behöver vi däremot fördela på kostnadställen med hjälp av en fördelningsnyckel, i detta fall vore yta en lämplig nyckel och vi vet att svetsavdelingen nyttjar 20%, så de bör bära 20% av kostnaden: $1 200 000 * 0,20 = 240 000$

#### Kostnadsfördelning kostnadsbärare

Slutligen ska vi fördela ut samtliga kostnader på våra kostnadsbärare, alltså våra produkter. Här behöver vi än en gång en fördelningsnyckel, i detta fall vet vi att vi svetsar totalt 10 000 produkter, varav 8000 är produkt B och 2000 produkt A, då är volym en bra nyckel.

Administrationskostnad per produkt är $200 000 / 10 000 = 20$  
Lokalkostnad per produkt är $240 000 / 10 000 = 24$

Därav kan vi knyta följande till varje produkt:

|                               | Produkt A | Produkt B |
| ----------------------------- | --------- | --------- |
| Beräknad årsvolym             | 2000 st   | 8000 st   |
|                               |           |           |
| Råmaterial/st                 | 100 kr    | 80 kr     |
| Bearbetning/st                | 50 kr     | 75 kr     |
| Totala direkta kostnader/st   | 150 kr    | 155 kr    |
|                               |           |           |
| Lokalhyra/st                  | 20 kr     | 20 kr     |
| Administration/st             | 24 kr     | 24 kr     |
| Totala indirekta kostnader/st | 44 kr     | 44 kr     |
|                               |           |           |
| Total kostnad/st              | 194 kr    | 199 kr    |

Vi ser alltså att produkt A har en självkostnad på 194 kr och produkt B har en självkostnad på 199 kr. Nu vet vi vad varje produkt har för total kostnad, med de direkta och indirekta kostnaderna fördelade på rätt sätt.

Dock saknar vi vinsten i vår kalkyl, som krävs för att få fram ett försäljningspris. I detta exempel kräver ägarna 10% i avkastning, så vi får följande:

- Produkt A
  - Vinstpåslag 10% - $194 * 0,1 = 19,4 \approx 19$
  - Försljningspris - $194 + 19 = 213$
- Produkt B
  - Vinstpåslag 10% - $199 * 0,1 = 19,9 \approx 20$
  - Försljningspris - $199 + 20 = 219$

Sätter vi in detta med den total produktionsvolymen och alla våra siffror:

|                               | Produkt A  | Produkt B    | Totalt       |
| ----------------------------- | ---------- | ------------ | ------------ |
| Beräknad årsvolym             | 2000 st    | 8000 st      | 10 000 st    |
|                               |            |              |              |
| Råmaterial/st                 | 100 kr     | 80 kr        | 840 000 kr   |
| Bearbetning/st                | 50 kr      | 75 kr        | 700 000 kr   |
| Totala direkta kostnader/st   | 150 kr     | 155 kr       | 1 540 000 kr |
|                               |            |              |              |
| Lokalhyra/st                  | 20 kr      | 20 kr        | 200 000 kr   |
| Administration/st             | 24 kr      | 24 kr        | 240 000 kr   |
| Totala indirekta kostnader/st | 44 kr      | 44 kr        | 440 000 kr   |
|                               |            |              |              |
| Total kostnad/st              | 194 kr     | 199 kr       | 1 980 000 kr |
|                               |            |              |              |
| Vinstpålägg 10%               | 19 kr      | 29 kr        | 198 000 kr   |
| Försäljningspris              | 213 kr     | 219 kr       | 2 178 000 kr |
|                               |            |              |              |
| Totala intäkter               | 426 800 kr | 1 751 200 kr | 2 178 000 kr |
| Totala kostnader              | 388 000 kr | 1 592 000 kr | 1 980 000 kr |
| Total vinst                   | 38 800 kr  | 159 200 kr   | 198 000 kr   |

Ovanstående är alltså vår fullstädniga självkostnadskalkyl.
