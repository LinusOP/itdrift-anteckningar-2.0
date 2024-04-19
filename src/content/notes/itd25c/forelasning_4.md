---
title: Föreläsning 4
order: 40
---

# Föreläsning 4 - Kryptering i praktiken

## AES med större mängder data

Tidigare har vi tittat på AES, det vanligaste blockkryptot, som tar in block á 128 bitar (16 byte). Vad gör vi då om vi har en större fil, säg 256 byte? Jo, vi delar såklart upp filen i delar om 16 byte styck. När vi gör detta kallas det ECB (Electronic Codebook) mode, vi delar upp filen och krypterar varje block var för sig.

Dock finns där vissa problem med detta, om vi har ett meddelande där flera av de här delarna är samma, (t.ex innehåller de kanske "hej"), då får vi också flera krypterade block som är samma. Då ger vi en angripare en del information om hur vårt meddelande ser ut. Lyckas dessutom en angripare på något sätt lista ut en del av vårt meddelande vet de nu alla delar som innehöll samma dats.

### Andra modes

AES modes är inget vi kommer behöva kunna, de som designar protokoll kommer att välja lämpliga AES modes och det är inget som man ofta själv behöver kunna på djupet, men det kan vara bra att känna igen. Jag skriver lite om dem nedan då det nämndes på föreläsningen.

#### CBC-mode (Cipher Block Chaining)

CBC är ett av de mode som är designade för att försöka lösa ovanstående problem, innan man börjar kryptera så väljs ett slumtpal, en s.k initialization vector (IV) väljs och adderas med första blocket innan det krypteras, man tar sedan det krypterade värdet från detta och kombinerar med nästa block, tar resultatet av krypteringen där och adderar med nästa osv.

#### CTR-mode (Counter)

Principen för CTR är liknande CBC, men det man krypterar är vår IV ihoplagd med en räknare, som börjar på 0 och tickar uppåt, man tar sedan kryptovärdet från detta och adderar med vårt block, som sedan blir vårt slutgiltiga kryptovärde.

## Krypteringsnycklar

En viktig princip är att vi inte bör använda samma nyckel för länge, får en angripare tillräckligt med data kan de till slut kanske börja lista ut meddelanden.

### Session key

Som nämnt tidigare bör vi inte använda samma nyckel för länge, ett sätt att lösa detta är att ha en huvudnyckel, eller master key, som man sedan använder för att generera nycklar osm bara används under en session. Varje ny session genererar man en ny nyckel.

Dock behöver vi fortfarande skapa en master key, och här finns då några olika lösningar.

### Pre-Shared keys

Ett sätt att dela ut en master key är att helt enkelt sprida den på ett annat sätt. T.ex använder vi detta med WiFi, din router och din laptop behöver kunna samma nyckel (lösenordet), och vi delar ut detta lösenordet helt utanför nätverket.

### Key Distribution Center

Något som vi hört sen innan är KDC, något som windows använder i AD miljöer på sina domänkontrollanter. En KDC genererar nycklar för varje användare i ett nätverk, något som kan liknas vid vår TGT i AD. Principen för ett KDC är att alla liter på KDC men ingen litar på någon annan användare.

Om sen Alice vill kommunicera med Bob så ber Alice om en gemensam nyckel så att de kan kommunicera med varandra. Hon bevisar vem hon är med hjälp av sin egna nyckel. KDC genererar då en nyckel som både Alice och Bob kananvända, och krypterar den med Alice nyckel innan den skickas till henne (så att ingen kan komma åt den).

KDC gör sedan samma sak, men den krypterar den gemensamma nyckeln med Bobs nyckel, och skickar med till Alice (eftersom hon bad KDC om den gemensamma nyckeln). Dock kan Alice inte skicka öppna den, men hon kan skicka den till Bob, och han kan såklart öppna den och får då också den gemensamma nyckeln. Nu delar Alice och Bob en nyckel, genom KDC, och kan skicka krypterade meddelanden till varandra utan att någon annan användare har möjlighet att lyssna.

Kravet för att KDC ska funka är att alla har en nyckel som KDC också känner till (funkar därmed inte när vi har för många användare, t.ex på internet, men funkar med begränsade grupper t.ex i AD). KDC blir också en s.k single-point-of-failure, dvs faller KDC så faller hela systemet. Ett annat problem är att KDC kan se all trafik, och läsa allt, för den vet alla nycklar. Ute på internet vill man inte get den sortens makt till någon enskilt organisation eller person.

### Public-key

Publika nycklar har vi tittat på tidigare och principen är ju att varje person har en privat och en publik nyckel. Den publika nyckeln skickas ut till alla och den privata nyckeln behåller man för sig själv.

Om Alice och Bob vill prata med varandra och behöver en gemensam nyckel så är det enklaste sättet att en av dem, t.ex Alice, genererar en nyckel. Hon använder sedan Bobs publika nyckel och krypterar den gemensamma hon genererade. Hon skickar sedan denna till Bob, som är den enda som kan dekryptera meddelandet med sin privata nyckel. När han gjort detta har de nu en gemnsam nyckel att använda med t.ex AES.

### Diffie-hellman

Något som kan vara ett problem med ovanstående är att enbart Alice är ansvarig för att generera den gemensamma nyckeln, något man inte alltid vill.

I Diffie-hellman så delar Alice och Bob på en gemensam publik nyckel, och genererar varsin privat nyckel. De använder sedan de gemensamma delarna med sina privata nycklar för att generera varsin publik nyckel, dessa delar de med varandra. Så Bob får Alice publika nyckel, och tvärtom. De kan sedan använda sina privata nycklar med varandra publika, och generera en gemensam privat nyckel.

I detta systemet är båda med och genererar den gemensamma privata nyckeln som sedan används för kryptering.

### MITM - Man-In-The-Middle

Ett problem som vi inte tittat på tidigare är att någon kan sitta i mitten, mellan Alice och Bob, och byta ut nycklar på ett sådant sätt att den också kan ta del av den gemensamma nyckeln utan att Alice eller Bob märker detta

![](/itd25c/f4/fig1.png)

### Digitala Certifikat

Lösningen här är att använda signaturer, men om Alice själv signerar meddelandet till Bob så behövs ju hennes nyckel för att verifiera, så om angriparen kan byta hennes nyckel kan han också signerar med en annan nyckel.

Lösningen är att där finns vissa betrodda organisationer som signerar de publika nycklarna åt folk, som alla litar på. Dessa kallas Certificate Authorities eller CAs. Dessa har s.k rotcertifikat, eller root certificates, som alla litar på. Dessa används sedan för att signera publika nycklar åt t.ex Alice. När Bob sedan får Alice nyckel kan han kolla om den är signerad av en betrodd CA, och vet då att den är genuin.
