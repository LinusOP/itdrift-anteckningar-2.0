---
title: Föreläsning 9
order: 90
---

# Föreläsning 9 - Säkerhet i WiFi

När vi kollar på WiFi finns där några problem, framförallt är det väldigt lätt att avlyssna eftersom signalerna skickas fritt i luften samt att protokollet är väldigt väldefinierat, dvs man vet exakt vilka frekvenser som används, hur meddelanden skickas osv.

Lösningen för att skydda mot avlyssning är som vanligt kryptering, och genom tiden har där kommit ett antal protokoll för att försöka skydda trafik på olika sätt.

## WEP - Wired Equivalent Privacy

WEP var det första försöket att skyda trådlös trafik. Tanken var att man skulle ha samma skydd som om man vore kopplad till en switch (då hub) med kabel. Det innebär t.ex att om två enheter är kopplade till samma AP så var inte syftet att skydda trafiken mellan dessa två, enhet 1 kunde alltså lyssna på trafik till enhet 2, syftet var enbart att skydda från utsidan. Detta eftersom att det fungerade så om flera enheter var kopplade till en hub.

I praktiken innebar detta att alla enheter delade på samma krypteringsnyckel, så något som en enhet krypterade kunde både APn och samtliga andra enhter avkryptera. Krypteringsnyckeln var helt enkelt WiFi-lösenordet. Nyckeln var antinge 40 eller 104 bitar, med algoritmen RC4 (som idag anses osäker, den går att knäcka).

RC4 använde en 64 eller 128 bitars nyckel, som vi ser är detta 24 bitar mer än nyckellängden i WEP, anledningen är att när man skapade krypteringsnyckeln till RC4 kombinerade man lösenordet med en 24 bitars IV, dvs slumpmässiga bitar, hela detta användes sedan som nyckel. Detta innebar (förutom den korta nyckellängden och dåliga algoritmen) att stora delar av nyckeln alltid var samma, därav var det mycket enklare att knäcka den.

### Autentisering

Precis som alltid måste man i WEP autentisera sig, klienten måste alltså bevisa att den vet nyckeln. Detta görs i WEP med en simpel challenge-response, klienten säger att den vill ansluta, APn svarar då med ett meddelande som den ber klienten att kryptera. När APn tar emot det testar den att avkryptera, lyckas det så kunde klienten lösenordet och är autentiserad.

### Sårbarheter

Som tidigare nämnt är RC4 inte säkert, nedan följer några stora problem

- Strömchiffer har extra behov av message authentication codes (något WEP inte har)
  - Enkelt att ändra i kryptotexten o få giltig klartext
- Samma nyckel får inte återanvändas
  - Kända sårbarheter om liknande nycklar används (härav problemet med de 40/104 bitar som alltid är samma i nyckeln)
- Om angripare samlar flera krypterade meddelanden och kan gissa delar (t.ex BSSID osv som skickas med) och samlar flera sådana par så kan den till slut knäcka nyckeln
  - Enkelt att göra vid autentiseringen, läsa av meddelandet som klienten ska kryptera (klartext) och sedan det krypterade svaret, då väldigt enkelt att samla par med kryptotext/klartext.

Överlag knäcktes WEP väldigt snabbt, bara några år som det ansågs säkert. Det första man gjorde var att stänga av autentiseringen, man lät alla ansluta och skickade sen helt enkelt ut dem om deras paket inte var giltigt krypterade, men man behöver en bättre lösning.

## WPA - WiFi Protected Access

Som alltid när det skapas en standard så arbetar man också med en bättre&nyare standard som ska byta ut det gamla till slut. När man använde WEP så började man jobba på en algoritm som skulle använda AES, skydda integritet med message integrity codes (message authentication codes) osv.

Men eftersom WEP knäcktes så snabbt behövde man en snabb lösning, och då skapade man WPA. WPA använde fortfarande RC4 men löste några av de värsta problemen med WEP, framförallt mer slumpmässiga session keys samt message integrity codes. RC4 användes fortfarande pga att man enkelt skulle kunna uppgradera existerande routrar till WPA, man ville alltså kunna använda WPA på samma hårdvara och kunde därav inte använda AES.

De saker man la till i WPA ovanpå WEP kallas TKIP (Temporal Key Integrity Protocol), för att försöka öka säkerheten jämfört med enbart WEP. Detta var alltså _säkrare_ än WEP, men egentligen inte helt säkert.

## WPA2

Till slut gick man faktiskt över till WPA2, det protokoll som faktiskt använder AES istället, stödjer ordentliga message integrity codes osv. WPA2 används ofta fortfarande idag i många fall (även om det nu också finns WPA3).

Notera att man med WPA2 tekniskt sett kan använda TKIP, men aldrig bör göra det då det inte är säkert. Hela anledningen till WPA2 är att komma bort från det som gjorde både WEP och WPA/TKIP osäkert.

WPA2 finns i två varianter, PSK (Pre-Shared Key) som bygger på wifi-lösnord, samt Enterprise som bygger på inloggningar, precis som det vi använder med Eduroam. Dock är principen i båda att varje klient ska ha en egen nyckel, man ska skydda från avlyssning även internt.

### PSK

I PSK så skapas en "pairwise master-key" som är en kombination av lösenordet och SSID som hashas, utifrån denna skapas sedan individuella nycklar för varje ansluten klient. Det är detta de flesta använder hemma eller på mindre företag.

### Enterprise

I Enterprise så hanterar inte APn själv autentiseringen utan de skickas vidare till en central server som då hanterar användarkonton och sköter autentisering, mellan dessa används ofta protokollet RADIUS.

När en användare försöker ansluta så skapas en förbindelse mellan klienten och autentiseringsservern som på olika sätt krypteras eller skyddas, med hjälp av et protokoll som kallas EAP. När klienten sen autentiserat sig så skickar servern ett meddelande till APn att klienten är autentiserad, den skickar då en nyckel till APn och till klienten via sin krypterade förbindelse.

APn och klienten använder sedan då vanlig WPA2 med en delad nyckel, skillnaden ligger helt enkelt i hur autentiseringen sker och var nyckeln skapas.
