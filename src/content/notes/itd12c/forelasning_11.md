---
title: Föreläsning 11
order: 110
---

# Föreläsning 11 - Subnetting (igen)

## Nätmasker med subnät

I en subnätmask kommer vi som mest ha en oktett som avviker. Detta eftersom en nätmask måste vara sammanhängade, dvs alla ettor måste vara i rad, och likaså alla nollor. `10001100` är med andra ord inte en godkänd nätmask.

På grund av detta kommer tre av oktetterna vara `255` eller `0` och en fjärde kan skilja sig. Tittar vi t.ex på en nätmask som `255.255.192.0` så ser den binärt ut som så:  
`1111 1111.1111 1111.1100 0000.0000 0000`.

Som vi vet måste alla ettor respektive nollor hänga ihop, därav kan vi inte efter vår "192" ha t.ex "128", då har vi ettor som kommer efter nollor (ej tillåtet) eller `192.255.255.0`, detta då det kommer nollor både i början och slutet, inte heller tillåtet.

Vi kan såklart även ha nätmasker där ingen skiljer sig, dvs vi enbart har 255 eller 0, dessa har vi ju set förra (t.ex `255.255.255.0`), regeln menar bara att som mest skiljer sig en oktett (och oktetterna innan är 255, oktetterna efter är 0).

### Omvandla nätmasker

När man omvandlar nätmasker (t.ex från CIDR till decimalt) är det binära tal man jobbar med.

Har vi en nätmask såsom `/18` så vet vi att detta innebär att masken innehåller 18 ettor. Den ser då ut såhär binärt:  
`1111 1111.1111 1111.1100 0000.0000 0000`

Konverterar vi sedan varje enskild oktett till ett decimalt tal får vi `255.255.192.0` som decimal representation.

Vi kan även konvertera på andra håller, t.ex konvertera `255.255.255.128` till binär och CIDR form.

Vi vet att 255 är 8 ettor, så första tre oktetterna är `1111 1111.1111 1111.1111 1111`, 128 koverterat binärt är `1000 0000` och vi får då den fulla binära representationen `1111 1111.1111 1111.1111 1111.1000 0000`.

Vill vi sedan ha CIDR representationen så räknar vi helt enkelt ettor dvs `/25`.

På så sätt kan vi konvertera nätmasker mellan CIDR, binär-, och decimalform.

## Analysera nät och subnät

Tittar vi på en IP adress såsom `193.1.1.88/26`, vad är nätid samt BC för dess nät?

Först får vi utgå från den binära representationen av IP adressen, den ser ut såhär:  
`1100 0001.0000 0001.0000 0001.0101 1000`

Tittar vi sedan på nätmasken ser den ut såhär:
`1111 1111.1111 1111.1111 1111.1100 0000` (26 ettor)

Vad vi då vet är att alla 1or i nätmasken representerar bitar som tillhör nätid:

`1100 0001.0000 0001.0000 0001.0101 1000` - IP Adress  
`1111 1111.1111 1111.1111 1111.1100 0000` - Nätmask

Detta get att `1100 0001.0000 0001.0000 0001.01` av IP adressen (första 26 binära talen) tillhör nät (och ändras inte), sista 6 bitarna tillhör host.

Vi vet också att ett nätid innebär att alla hostbitar är 0, och en BC får man av att alla hostbitar är 1.

Då får vi nätid: `1100 0001.0000 0001.0000 0001.0100 0000`, konverterat till decimalt får vi `193.1.1.64`  
Samt BC: `1100 0001.0000 0001.0000 0001.0111 1111`, konverterat decimalt: `193.1.1.127`.

På så sätt kan vi utifrån en IP-adress med nätmask få ut tillhörande nätid samt BC.

## "Magic Number"

Vi använder vår tidigare adress `193.1.1.88/26`.

Det första vi måste göra är att konvertera vår `/26` nätmask till en decimal representation, enligt tigare får vi: `255.255.255.192`.

Efter detta finns där några regler vi kan följa för IP-adressen:

- Är oktetten i nätmasken `255` så kopiera okteten i IP-aressen
- Är oktetten i nätmasken `0` så sätt IP-adressens oktett till 0
- Är oktetten varkesn `0` eller `255` så är det den _intressanta oktetten_ och vi använder denna för vårt magiska nummer

Vi har tre `255` oktetter i masken, vi kopierar motsvarade oktetter i adressen: `193.1.1.`

Vi har en intressant oktett, sista. Vi beräknar vårt magic number som så:  
$256 - x$ där x är värdet på vår sista oktett, i vårt fall: $256 - 192 = 64$.

Vårt "magic number" är **64**.

Vi kan nu utnyttja detta för att hitta alla nätid i vårt `/26` nät, detta genom att hitta multiplar av vårt magic number.

Dvs, första är `0` ($64 * 0$), andra är `64` ($64 * 1$), tredje är `128` ($64 * 2$), fjärde är `192` ($64 * 3$). Vi vet också därefter att det är alla nät eftersom vi har två subnätbitar (vi utgår från ett C-nät som vi subnettar) och vi vet sedan förra föreläsningen att det ger $2^2 = 4$ subnät.

Vi hittar sedan det tal som är närmast _under_ vår intressanta oktett i IP-adressen. Dvs intressanta oktetten är `88` i vår IP-adress, vi hittar då närmsta multipel av vårt magick number under detta nummer, i vårt fall `64`.

Detta är då vårt nätid, `193.1.1.64`.

Vi får även ut broadcast ur detta, det är närmsta _övre_ multipel, minus ett. Närmsta övre multipel för `88` är `128`, vår broadcast är då $128 - 1 = 127$.

Med hjälp av vårt magic number fick vi då ut både nätid och BC.
