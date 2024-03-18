---
title: Föreläsning 10
order: 100
---

# Föreläsning 10 - Decibel & Signal/Brus

## Signalstyrka

När vi kollar på trådlös överföring så är signalsytrkan viktig, till skillnad från vid trådbunden överföring. Har vi sämre signalstyrka så blir också överföringshastigheten sämre.

Många olika saker kan påverka vår signalstyrka, avståndet spelar stor roll men där finns också andra faktorer. En faktor är t.ex effekten. Effekten anges i watt (W) och är mätningen på den energi som används i ett visst ögonblick.

### Jämförelse av signalstyrka

Det är ofta viktigt att kunna jämföra olika signalstyrkor. Vill vi t.ex veta vilken av två accesspunkter vi har bäst anslutning till så måste vi jämföra våra signalstyrkor till båda dessa.

Problem uppstår dock när vi kollar på vilka siffror vi faktiskt kan få på grund av den väldigt höga förlusten när radiovågor färdas genom luft.

Föreställ dig en sändare som skickar ut radiovågor, och en mottagare. Om sändaren sänder med effekten 100 mW, så får mottagaren ksk ta emot något i stilen 0,000031262 mW. Anledningen till detta är att vår signal upplever FSPL, Free Space Path Loss, som diskuterades i förra föreläsningen. Den får helt enkelt förluster.

Föreställ dig nu att vi har en till mottagare, som är närmare vår sändare. Denna sändare får **100 gånger** bättre signalstyrka. Den får alltså en mycket bättre signalstyrka! Men om vi tittar på effekten som den tar emot, så blir denna 0,0031262 mW. Den första sändaren fick 0,000031262 mW. Helt plötsligt ser vi att det blir svårt att jämföra vilken av signalerna som är bäst. Båda är väldigt nära varandra rent numärt, men egentligen är ju en 100 gånger bättre (vilket gör jättestor skillnad för vår överföringshastighet).

## Decibelskalan

För att lösa vårt dilemma ovan så använder vi decibelskalan, varför löser den vårt problem? Jo den är en logaritmisk skala. Men vad tusan betyder det? Jo först kollar vi lite på vad en logaritm är, och sen kan vi kolla på vad en logaritmisk skala är.

### Logaritmer

Om vi tittar på ett enkelt tal såsom $10^x = 1000$, så kan ganska enkelt komma fram till att x måste vara 3, för vi vet att $10^3 = 1000$. Vi sökte alltså vad vi ska ta tio upphöjt till för att får tusen. Det är exakt det som logaritmen av tusen är. Dvs att $\log 1000 = 3$, logaritmen av ett tal är det vi måste ta 10 upphöjt för att få det talet. Vill man se detta matematiskt innebär det att $n^{\log n} = n$.

### Logaritmisk skala

Med hjälp av logaritmerna ovan kan vi få fram skalor som inte ökar linjärt. Tittar vi på en linjär skala, t.ex en linjal, så är skillnaden mellan 0 och 10 såklart 10, skillnaden mellan 10 och 20 är också 10 osv... Men i en logaritmisk skala är detta inte fallet, istället för att öka med +10 så ökar vi i decibelskalan med _gånger_ 10. Dvs skillnaden mellan 10 decibel (dB) och 20dB är 10 _gånger_, inte +10. Varje hopp om 10dB är samma sak som en tio gångers skillnad.

Vad ger detta oss då? Jo, utan att härleda formeln matematiskt så kan man jämföra effekter med formeln $10 * \log \frac{P2}{P1}$. Tittar vi på våra värden från innan så kan vi t.ex mata in P2 som vår mottagna effekt, och P1 som vår sändningseffekt (och göra detta för båda våra mottagare). Vi matar alltså in $10 * \log \frac{0,000031262}{100}$ samt $10 * \log \frac{0,0031262}{100}$ så får vi ett svar på ca 45dB samt ca 65dB, här är det myckelt enklare att se att vi har en ganska markant skillnad.

### Genvägar

På grund av förhållanden i decibelskalan så finns där vissa givna decibelvärden som vi kan använda. Vi vet ju t.ex redan att en skillnad om 10dB representerar en tio gångers ökning. Ett annat bra värde är 3dB, som ungefär representerar en fördubbling. På så sätt vet vi att 13dB är ungefär dubbelt så stort som 10dB, skillnaden är 3dB alltså är styrkan dubbelt så stor.

| Förändring i styrka | Värde i dB |
| ------------------- | ---------- |
| x2                  | 3dB        |
| x10                 | 10dB       |
| /2                  | -3dB       |
| /10                 | -10dB      |

Dessa gör att man lättare kan resonera kring enkla skillnader i decibelstyrkor och då förstå vilken skillnad de faktiska styrkorna har.
