---
title: Föreläsning 11
order: 110
---

# Föreläsning 11 - Modulering

## Bakgrund

Hittils har vi pratat om rena signaler, men dessa skickar egentligen ingen data. För att skicka data med vår signal måste vi också ändra signalen, för att skilja på 1or och 0or. Detta kallas modulering.

För att modulera har vi några verktyg, vi kan till viss del ändra vår frekvens, men eftersom frekvensen avser "var vi lyssnar" så kan vi inte ändra den för mycket.

Vi kan ändra vår amplitud, vilket är höjden på vår kurva. Se bilden nedan, där den blå kurvan har en dubbel amplitud jämfört med den röda.

![](/itd21c/f11/fig1.png)

Vi kan även ändra vår fas, vilket är var kurvan korsar X-axeln. VI tar helt enkelt vår kurva och skjuter den lite sidled. Se bilden nedan där gröna kurvan är förskjuten i fas.

![](/itd21c/f11/fig2.png)

## Hur man modulerar

När vi modulerar så ändrar vi som nämnt signalen. Varje individuell ändring kallas en symbol. En symbol är alltså varje ställe där mottagaren kan uppfatta en ändring och få ett nytt värde, en ny bit. Som nämnt ovan kan vi ändra olika saker med signalen för att modulera den.

### BPSK - Binary Phase-Shift Keying

Det enklaste sättet att modulera är binär fasförskjutning, BPSK, där vi ändrar fasen mellan två olika värden. Tidigare har det nämnts att man kan beskriva kurvorna som rotationer kring en cirkel. Exakt hur eller varför är inte helt aktuellt men jag nämner det för att det innebär att vi kan beskriva fasen med som en vinkel.

Med binär modulation kan vi alltså ta två vinklar, enkelt 0° och 180° då de är motsatta. Vi kan alltså säga att är fasen 0° i en symbol så är vår bit en nolla, är den 180° så är det en etta. Varje gång vi modulerar (i varje symbol) så kan vi skicka en bit.

En annan faktor är ju då hur ofta vi kan modulerar. Om vi kan modulera 1000 gånger i sekunden så kan vi skicka 1000 bitar i sekunden, alltså 1kb/s. Kan vi modulera en miljon gången så kan vi skicka 1 Mb/s osv. Vi kan även vända på det och säga om vi kan modulera 1000 gånger i sekunden så har vi en symboltid på 1 ms, (en tusendels sekund).

### QPSK - Quadrature Phase-Shift Keying

För att öka hastigheten kan vi såklart modulera snabbare, dvs sänka symboltiden. Men vi är ganska ineffektiva med våra faser, just nu använder vi bara 0° och 180°, men vi kan skilja mindre skillnader. Säg att vi istället använder följande tabell för faser och vilka bitar de representerar:

| Fas  | Bitmönster |
| ---- | ---------- |
| 0°   | 00         |
| 90°  | 01         |
| 180° | 10         |
| 270° | 11         |

Om vi använder detta så kan vi skicka två bitar i varje symbol (varje gång vi ändrar signalen), vi kan alltså dubbla hur mycket data vi kan skicka i samma mängd symboler! Denna version kallas kvadratisk fasförskjutning, vi använder fyra faser.

### Kombinationer i symbol

Innan vi tittar vidare måste vi konstatera mer tydligt att antalet kombinationer i varje symbol representerar hur många bitar vi kan skicka. Som vi ser ovan så dubblade vi antalet kombinationer och gick då från en bit till två per symbol. Detta gäller generellt, går vi till 8 kombinationer så kan vi skicka tre bitar per symbol, 16 kombinationer ger 4 osv.

Generellt gäller att har vi 16 kombinationer så har vi x bitar per symbol: $2^x = 16$, x i detta fallet blir ju 4. Det är alltså så att $\log_2 n = x$ där n är antalet kombinationer och x då blir antalet bitar. Har vi t.ex 16 kombinationer så stämmer det ju att $\log_2 16 = 4$.

### QAM - Quadrature Amplitude Modulation

I teorin skulle vi kunna dela in vår fas i mindre och mindre vinklar, men detta blir snabbt nästintill omöjligt att detektera av vår mottagare. Hur gör vi? Jo vi modulerar _också_ med hjälp av amplituden. QAM använder våra fyra fasen sen tidigare, men modulerar också på amplituden. På så sätt kan vi få flera olika kombinationer i varje symbol. Den skrivs ut antingen QAM _nummer_ där numret är antalet kombinationer, alternativt _nummer_-QAM, t.ex QAM 64 eller 64-QAM.

Den lägsta versionen av QAM är QAM 16, vilket innebär att den har 16 olika kombinationer i varje symbol. Det vet vi ju då innebär 4 bitar per symbol. Den nyaste, som används i WiFi 6, är QAM 1024. $\log_2 1024 = 10$, vi kan skicka 10 bitar i varje symbol med den!

I verkligheten fungerar QAM något mer avancerat genom att dela upp i flera strömmar och modulerar på både sinus och cosinus osv, men exakt hur det funkar är inte särskilt aktuellt, det viktiga är att vi kan se t.ex QAM 256 och förstå vad det innebär, samt hur många bitar vi får per symbol (8 i detta fall).
