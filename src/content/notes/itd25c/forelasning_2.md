---
title: Föreläsning 2
order: 20
---

# Föreläsning 2 - Kryptering: Skydd mot avlyssning

Vi skickar hela tiden ut data på internet, men vi vet inte vem så skickar den vidare åt oss, vem som äger routrar och infrastruktur påväg till vårt mål. När data skickar kallar vi den för "data in transit" och när den har kommit fram och lagrats kallas den "data at rest". Kryptering kan användas för att i båda fallen skydda mot att andra kan hämta och förstå datan.

## Historiska krypton

### Caesar

Ett av de första krypton (påstås det iallafall) användes av romerska kejsaren Caesar, och var ett krypto för att kryptera text. Det bygger på att man bestämmer en nyckel i form an en bokstav, man skriver sedan alfabetet en gång, sen skriver man det en gång till under fast man börjar på sin hemliga bokstav. Antar vi t.ex att vi har nyckeln "F" så ser vårt alfabete ut som så:

![](/itd25c/f2/fig1.png)

Om vi då vill skriva "hej" så använder vi istället bokstaverna under som stämmer överens, "h" blir
"m", "e" blir "m" och "j" blir "o". Vårt "hej" krypterat blir då "mjo" krypterat.

Dock är caesarkryptot långt ifrån helt säkert, framförallt har vi problemet med att vi bara har 26 (i engelska alfabetet) möjliga nycklar. Det är därmed ganska enkelt att bara testa varje bokstav som nyckel tills du får fram riktiga ord, utan att det tar allt för långt tid. Att testa alla nycklar på sådant sätt kallas "brute-force".

### Substitution

Inom kryptografi är det ganska vanligt att någon skapar ett krypto, som någon sedan knäcker (t.ex som Caesarkryptot) och då behöver man uppfinna ett nytt krypto.

Substitutionskryptot är en utveckling av Caesar där vi istället för att bara förskjuta alfabetet helt kastar om ordningen. Dvs vi väljer en slumpvis bokstav att översätta varje bokstav till. T.ex följande (förkortat till bokstäverna som krävs för "hej" för enkelhet):

![](/itd25c/f2/fig2.png)

I detta fallet blir "hej" då istället "ktc" när vi krypterar det med vår nyckel. Till skillnad från vårt tidigare krypto är det inte rimligt att försöka gissa alla nycklar, detta då vi får $2^{88}$ olika kombinationer, vilket är ca 309 kvadriljoner kombinationer ($3,09 * 10^{26}$).

## Moderna krypton

På 1900-talet skapade tyskarna Enigma, vilket de använde under andra världskriget. För att knäcka detta utvecklades en av de första datorerna. Vi började alltså blanda in maskiner i det hela. På grund av detta fick man utveckla ny krypton som klarade av att stå emot datorer. I dagsläget används flera olika algoritmer med väldigt långa nycklar för att på ett säkert sätt kryptera t.ex internettrafik.

**Sidospår: Förkortningar för exempel**

Inom kryptografi finns en del vedertagna förkortningar. Generellt kallar man det man ska kryptera för "M", ibland ser man annars "plaintext" (alltså klartext). Ofta kallar man sin nyckel för "K" och det som krypteras för "C". Att kryptera kallar man "E" (encrypt) och dekryptera för "D" (decrypt). Man brukar även säga att de två parter som skickar till varandra kallas för Alice ohc Bob, istället för t.ex person 1 och 2.

### Symmetrisk kryptering

Symmetrisk kryptering innebär att man krypterar och dekrypterar med en nyckel. Vid symmetrisk kryptering säger vi alltså att K är samma både vid E och D. Symmetrisk kryptering kommer i två varianter:

- Block-krypton (engelska: block cipher)
- Ström-krypton (engelska: stream cipher)

Enkelt kan man se det som att block-krypton krypterar samlingar av data i taget. En av de mest populära varianterna är AES, som använder block om 128 bitar, eller 16 byte. Den krypterar alltså 16 bytes åt gången, block för block.

Ström-krypton krypterar istället kontinuerligt genom att generera slumpmässiga tal som bygger på vår nyckel. Har man samma nyckel kan man generera samma "slumpmässiga" tal. På så sätt kan man kryptera och dekryptera genom att generera tal med samma nyckel, utan nyckeln kommer talen se helt slumpmässiga ut och man kommer inte kunna lista ut vad följande tal bör bli.

Gemensamt för moderna symmetriska krypton är att våra nycklar är väldigt stora. AES t.ex använder 128, 192, eller 256 bitars nycklar. Även den minsta nyckeln, 128 bitar, ger oss $2^{128}$ olika kombinationer av nycklar. Det blir 340282366920938463463374607431768211456 olika kombinationer, eller ca 340 Sextiljoner. Som jämförelse finns det va $2^{77}$ sandkorn i Saharaöknen.

Exempel på gamla algoritmer som **inte** ska användas:

- RC4
- DES

Exempel på moderna algoritmer:

- AES
- RC6
- Serpent
- Twofish
- ChaCha
- Salsa20

Generellt är moderna algoritmer säkra och väldigt snabbar, dvs de klarar av att kryptera vid även hastigheter som t.ex Gigabit.

#### Problem med symmetrisk kryptering

Det stora problemet met symmetriska kryptering är just nycklarna. Eftersom båda parter måste känna till de på förhand så blir det svårt att hantera och dela ut nycklar till andra. Varje gång man skulle kryptera något så måste man alltså i förväg dela nycklar, inte hållbart.

### Öppen nyckel-system (Public key cryptography)

För att lösa problemet med att dela nycklar med varandra utvecklades "public key cryptography". Som använder två olika nycklar, en privat och en publik, som kan användas för att dela nycklar med varandra.

Om Alice vill skicka något till Bob så genererar hon ett s.k nyckelpar, en publik och en privat nyckel. Den privata får Alice inte dela med någon, men den publika kan on skicka till Bob. Bob kan då ta sitt meddelande, M, och kryptera med hjälp av den publika nyckeln han fick av Alice. När Alice sen får det krypterade meddelandet kan hon använda sin privata nyckel för att dekryptera det och får ut M igen.

Skillnaden mot den symmetriska krypteringen är att även om du har den publika nyckeln kan du inte dekryptera, bara kryptera. Det innebär att om Alice även skickat den publika nyckeln till någon annan så kan de inte dekryptera Bobs meddelande.

Viktigt är också att du kan inte lista ut den privata nyckeln med hjälp av den publika nyckeln. Annars hade systemet såklart inte funkat.

#### RSA

En av de vanligaste algoritmerna/systemen för öppna nycklar kallas RSA-systemet och bygger på ganska simpel matematik. Man väljer två heltal som man kallar p och q, t.ex 5 och 7, och multiplicerar. $5 * 7 = 35$. Man använder sedan 35 som publik nyckel och talen separat (5, 7) som privat nyckel. Använder man väldigt stora tal (måste vara primtal) så blir det väldigt snabbt realistiskt omöjligt att gissa sig till vilka två tal som man multiplicerade.
