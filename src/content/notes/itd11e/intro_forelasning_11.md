---
title: Datateknisk introduktion - Föreläsning 11
order: 110
---

# Föreläsning 11 - Minneshantering och synkronisering

## Klassisk modell av minneshantering

I tidigare, simplare, datorer kördes ett program i taget. Därmed fick operativsystemet en del av minnet och det programmet kunde använda resten. I dagsläget används denna modell fortfarande i enklare små datorer, microchip osv.

Detta innebar att minnet inte behövde skyddas eftersom det inte fanns flera program i minnet, dock behövdes operativsystemets minnesdel fortfarande skyddas.

Detta system funkar dock inte i dagens datorn där vi behöver flera processer igång samtidigt.

## Minneshantering med flera processer

I dagsläget har vi många processer igång samtidigt, därmed måste vi dela upp minnet i flera små delar för varje process. Ett chip i datorn sköter detta, en så kallad MMU (Memory Management Unit). Denna ser till att processer inte skriver över varandra i minnet.

Om minnet är fullt så finns två alternativ, antingen så får vi låta bli att starta ny processer. Eller så får vi kasta ut processer som inte används tillfälligt, detta kallas swapping.

### Swapping

Swapping innebär enkelt fattat att delar av minnet som inte använts på lång tid flyttas ut till hårddisken för att ge plats åt något nytt som behöver minnet.

## Virtuell minnesadressering

**OBS: Inte samma som virtuella maskiner**

Ett system som underlättar delningen av minnet. Detta genom att varje process får en egen del av minnet som är virtuell, dvs den har inte direkt tillgång till arbetsminnet. Istället kombinerar MMUn delar av hårddisken (för swapping) och det fysiska arbetsminnet och tillsammans skapar dessa det virtuell minne som en process får tillgång till.

Här emellan finns ett så kallat page table, en tabell som översätter adressen som processen tror den sparat på till en faktisk adress i arbetsminnet eller nånstans på hårddisken.

Tabellen skulle kunna se ut något såhär:

| Virtuell plats | Fysisk plats |
| -------------- | ------------ |
| 0              | 5            |
| 1              | Disk         |
| 2              | 3            |

På så sätt behöver processen bara gå från adress 1 till 2 osv, och sen sköter MMUn att dessa är t.ex adress 5 i det faktiska minnet, eller nånstans på hårddisken mm. När programmet exekveras och CPUn behöver tillgång till det som finns på t.ex virtuell plats 2, så frågar den MMUn om den faktiska platsen, den kollar i vårt page table och svarar med fyskisk plats 3 i minnet.

### Pages och frames

Ett problem med detta är att om vi vill kunna översätta varje virtuell adress till en fysisk adress så blir vårt page table väldigt stort, med dagens arbetminnen pratar vi storleksordningar i gigabyte. Detta tar upp alldeles för mycket plats i minnet och är helt enkelt inte gångbart.

För att lösa detta så arbetar i verkliga scenarion inte MMUn med individuella adresser. Istället delar den upp det virtuella minnet i så kallade pages. Dessa kan ses som block av adresser. I ett verkligt scenario är en page ca 4000 adresser. Varje page motsvarar sedan en frame, ett lika stor antal adresser i det faktiska fysiska minnet. (Som tidigare nämnt kan virtuella adresser också motsvara data som blivt swappat och ligger på hårddisken, men hur dessa alla hör ihop kommer sen).

Vårt page table behöver därmed inte spara varje enskild adress, istället sparar de vilken page som motsvarar vilken frame. Detta genom att en del av den virtuella adressen motsvarar vilken page vi är i, och resterande visar var i pagen vi är. Man kan sedan översätta pagen till en frame, via vårt page table. Sedan visar den övriga delen var i framen är, samma del som visade vare i pagen vi var.

Detta blir snabbt väldigt förvirrande beskrivet i text. Därmed kollar vi på ett väldigt förenklat exempel på detta. I detta fall ett minne med 16 minnestplatser.  
Notera att för att förenkla så representars datan med bokstäver. Varje bokstav kan ses som representera en byte, det är helt enkelt lättare att se A på två ställen än `00101100` och se att dessa visar samma data.  
Känns bilden otydlig finns här [originaltabellen](https://docs.google.com/spreadsheets/d/1cGI82iBArWegkd4JeSvZOW9J54OZ2xVKnP6gLcGMRT8/edit?usp=sharing).

![](/intro_forelasning_11/virtMem.png)

Som vi ser i vår bild så har vi två processer som körs, process 1 och process 2. Dessa har båda varsett virtuellt minne. Notera att varje virtuellt minne är lika stort som vårt fysiska arbetsminne, processerna tror alltså att de har tillgång till hela minnet, men operativsystemet lurar helt enkelt processerna att tro detta.

Varje virtuellt minne är uppdelat i fyra pages. I arbetsminnet finns motsvarande fyra frames.

Notera att i varje adress så motsvarar de första två bitarna vilken page/frame vi är i, och de andra två bitarna var i den pagen/frame vi är. Notera också att de sista två bitarna är likadana i varje page/frame. Dvs i page `01` har vi fyra platser, `00`, `01`, `10`, `11` osv. Samma platser finns i page `11`. Detta innebär att vi kan "återanvända" dessa två sista bitarna oavsett vilen page/frame vi är i.

Om processorn då kör kod från process 1 och får instrkutionen att hämta datan på adress `0101` så kommer den att fråga MMUn var detta egentligen är. Vår MMU kommer kolla i vårt page table för process 1, se att vi fråga efter page 01 (**01**01) och se att detta motsvar frame `11`. Den svarar med att page `01` motsvarar frame `11` och eftersom våra två andra bitar är samma i varje page/frame så kan processorn kolla i frame `11` på plats `01` (01**01**), dvs adress `1101` i vårt arbetsminne, och hittar den rätta datan, **F**.

Notera att i början nämnde vi att utan pages/frames så måste vi ha ett page table med lika många platser för översättningar som vi har adresser i vårt minne. Men med pages/frames som i exemplet ovan så är vårt page table mycket mindre. Detta då varje adress inte översätts, utan bara vilken page som motsvarar vilken frame.

Nackdelen är att om vår processor som ovan vill använda data A, dvs den i adress `0000` hos process 1 så ligger denna på disk. Detta ser vi i vårt page table för process 1, page `00` ligger på disk och adress `0000` är en del av den pagen. Man kan då inte bara swappa in den adressen i minnet, utan måste swappa in hela page `00` för att komma åt en av adresserna i den pagen. Se nedan för hur detta funkar.

### Page fault

Ett page fault sker då processorn frågar MMUn om en del av minnet som ligger på disk. Som i vårt exempel ovan. Om processorn kör process 2 och ska ha tillgång till det som finns på den virtuella adressen `1001` så kommer den fråga vår MMU som meddelar att page `10` (**10**01) ligger på disk, vi får då ett _page fault_. Detta eftersom att processorn inte har direkt tillgång till hårddisken på det sätt som den har till arbetsminnet och inte kan plocka den datan.

Vad som händer då är att MMUn swappar in page `10` till en ledig plats i arbetsminnet (finns inte en ledig plats så får något annat först swappas ut). I vårt fall t.ex frame `01`. Man får sedan uppdatera page table för process 2 för att visa att page `10` inte längre ligger på disk utan nu motsvarar frame `01` och sedan så startar processorn helt enkelt om med att be MMUn om var `1001` har för fysisk adress och eftersom vi swappat in den pagen så kan den nu svara med `0101` och fortsätta.

## Synkronisering

Processer behöver i vissa fall tillgång till resurser och I/O enheter. T.ex skrivaren, eller nätverket mm.

Försöker flera processer dock använda skrivaren samtidigt blir det inte bra och dessa kommer nog skriva över varandra.

Det man då använder är något som kallas "Mutual Exclusion". Detta innebär att en process stänger ute andra processor från en resurs. Detta kallas att processen går in i en kritisk sektor, där får bara en process vara i taget. Dock kan en process inte vara i en kritisk sektor för evigt, då får inte andra processer tillgång till resursen.

### Binär semafor

Hur man i praktiken gör ovanstående är med något som kallas en binär semafor. Detta är helt enkelt ett värde som visar att en process är låst eller inte. Därmed "binär", den har bara dessa två värden. Lite som när man står vid ett övergångsställe vid ett trafikljus, du har antingen röd eller grön gubbe. Har du röd gubbe använder en annan process (en bil) resursen (vägen) och du får inte gå. Har du grön gubbe så får du gå och bilen får stanna och får inte köra. När du gått över så slår gubben över till rött igen och en ny bil kan köra (använda resursen). På så sätt turas man om och alla får använda resursen till slut men det blir inga kollisioner.
