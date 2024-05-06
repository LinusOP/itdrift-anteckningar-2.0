---
title: Föreläsning 8
order: 80
---

# Föreläsning 8 - VPN & IPSec

De grundläggade protokollen för internet är osäkra, när internet skapades tog man inte hänsyn till kryptering osv. och där finns risk för både avlyssning och modifiering, samt brister i autentisering (att veta att man pratar med rätt server/klient). Exempel på dessa protokoll: IP, TCP, UDP, HTTP, Telnet, FTP.

För att lösa detta har det skapats olika tillägg till protokoll för säkerhet och kryptering, t.ex TLS som tillägg till TCP (används även för HTTPS). WiFi har WEP, WPA och WPA2, och för IP paket använder vi VPN protokoll såsom IPSec.

Allmänt har de flesta säkra protokoll liknande principer, det sker en handskakning/autentisering, enheterna förhandlar om algoritmer och initierar protokollet, sedan krypteras trafiken med symmetrisk kryptering, nästan alltid AES.

## Vanliga VPN förbindelser

VPN står för Virtual Private Network, det är ett sätt att koppla ihop nätverk på ett säkert sätt över internet. Detta kan göras med ett antal olika metoder och protokoll. Nedan kommer vanliga användningsområden för VPN förbindelser.

### Remote Access VPN

En vanlig använding för VPN på företag är när användare är utanför lokalerna och ska ha tillgång till interna resurser, då används en VPN server som har tillgång både till det interna nätverket och internet. En användare ansluter till VPN servern och får då en krypterad "tunnel" över internet till det interna nätverket, för enheter på det interna nätverket ser det ut som att klienten är lokalt ansluten.

### VPN mot internet

Som nämnt kan VPN förbindelser även användas för att komma åt saker på internet anonymnt, då ansluter man till en VPN server som istället låter en ansluta till internet via den. Det kan t.ex användas för att se ut som att ens IP adress kommer från ett annat land. Resurserna/tjänsterna som man ansluter till får en anslutning från VPN servern och kan därmed inte se originalavsändaren.

### Site-to-site VPN

Man kan även ansluta två lokala nätverk med en VPN, genom att skapa en VPN förbindelse mellan två routrar eller VPN servrar. Då kan denna förbindelse användas av samtliga enheter i båda nätverken utan att varje individuell klient behöver en VPN klient och egen förbindelse, det blir mer eller mindre osynligt för klienterna att de går över en VPN tunnel. Detta används mestadels om man har flera centrala kontor där det kan finnas tjänster och resurser som alla måste ha tillgång till, oavsett vilket kontor man sitter på.

## Principen för VPN

Principen för en VPN är relativt simpel, anta att du har en dator hemma, som får en IP adress från din internetleverantör (ISP) `99.1.1.99`, och företaget du jobbar för har en VPN server med IP adress `50.1.1.50`, inne i företagets nätverk används IP adresser i `192.168.1.0/24`, och specifikt vill vi komma åt servern `192.168.1.10`.

Först ansluter klienten till VPN servern och autentiserar sig. Detta paket skickas som vanligt med avsändare `99.1.1.99` och mottagare `50.1.1.50`. När klienten är autentiserad och allt är klart för att starta en VPN förbindelse så kommer VPN servern ta en _intern_ IP (VPN servern har ett spann av adresser den kan använda/tilldela), t.ex `192.168.1.100`, och tilldela till klienten, dessa kallas virtuella hosts.

VPN klienten som körs på klientens dator skapar då ett separat interface som får denna adress. När något på klienten försöker skicka data till servern så skapas ett paket med _VPN adressen_, dvs avsändare `192.168.1.100`, mottagare `192.168.1.10` i IP headern, plus datan som ska skickas.

VPN klienten tar sedan hela paketet och lägger i ett nytt paket, där de tidigare paketet läggs i data delen. En ny IP header sätts sen på detta, med de faktiska internet adresserna dvs avsändare `99.1.1.99` och mottagare `50.1.1.50`, det gamla paketet som ligger i data krypteras helt.

På så sätt kan någon som avlyssnar på internet bara se att en VPN förbindelse används, men den faktiska datan och din interna VPN IP adress samt serverns adress är helt dolda och krypterade.

När VPN servern får detta paket så packar den upp det gamla paketet, avkrypterar, och har då den faktiska mottagaren (servern), den faktiska datan osv. Den skickar sedan vidare detta, som att det kom från `192.168.1.100` hela tiden.

När svar kommer så vänds adresserna helt enkelt men principer är den samma.

### Split Tunneling VPN

Ibland vill vi inte att all trafik ska gå över vår VPN tunnel. Om vi utgår från vårt exempel ovan där vi ansluter till ett företag för att nå en intern resurs så vill vi kanske inte att även vår trafik till spotify går via företaget. Dels för att det är onödigt och dels för att prestandan (hastighet, latens osv) ofta är sämre.

Man kan då använda s.k split tunneling, där enbart viss trafik (antingen från vissa appliaktioner, eller med vissa regler för mottagare osv) går via VPN tunneln, och annan trafik går direkt ut på internet via den vanliga internetanslutning.

## Protokoll

När man läser om VPN eller söker på olika VPN lösningar så får man ofta upp information om olika VPN protokoll, därför kan de vara bra att känna till några vanliga, samt något man bör undvika:

- PPTP - Gammalt microsoft protokoll, väldigt snabbt men inte säkert!
- L2TP/IPsec - Microsofts modernare version, L2TP för anslutning (Layer 2 Tunneling Protocol) som kombineras med IPSec för kryptering
- IKEv2 IPSec - Ren IPSec som används för alla delar av VPN förbindelsen, mer om IPSec senare
- OpenVPN - Bygger på TLS, väldigt vanligt för klienter till VPN förbindelse mot internet
- WireGuard - Nyare protokoll, väldigt vanligt i open source och i Linux-system

## IPSec

IPSec är ett nytt lager i IP-stacken och läggs in som en ny header mellan IP headern och TCP headern. Där finns två versioner av headern, Authentication Header (AH) eller Encapsulating Security Payload (ESP).

AH används när man vill skydda paketet mot modifiering, men utan kryptering. Kan vara användbart för att garantera ett pakets integritet. ESP används när man vill skydda mot modifiering _och_ avlyssning, då krypteras även inehållet i paketet.

När IPSec används så är det en av dessa som används, antingen AH för enbart integritetsskydd eller ESP för både integritetsskydd och kryptering.

### Handskakning

När IPSec initieras så sker en handskakning för att skapa en session, inom IPSec kallas dessa för Security Associations.

Först sker en autentisering mellan de parter som ska skapa tunneln, antingen med certifikat, eller användarnamn/lösenord osv. När detta skett så skapas en security association där den host man är ansluten till sparas samt algoritm och nycklar som används för den förbindelsen. För varje ny IPSec förbindelse som skapas på en host så skapas en separat security association.

#### Protokoll

För att skapa dessa sessioner så finns där olika protokoll, dessa protokoll bygger på ISAKMP (Internet Security Association and Key Management Protocol) som är ett ramverk för autentisering och förhandling om krypteringsmetoder och nycklar.

Ett av dessa protokollen är IKEv2 (Internet Key Exchange version 2), som implementerar ISAKMP med hjälp av certifikat.

## Modes

IPSec kan köras i två lägen, beroende på i princip hur mycket av anslutningen man vill at IPSec ska ansvara för. Vilket läge som ska användas bestäms i handskakningen precis som allt annat. Totalt kan IPSec alltså köras i tre olika lägen, ESP eller AH headern i antingen Transport eller Tunnel mode.

### Transport mode

Här sköter IPSec enbart kryptering/integritet (beroende på om man kör AH eller ESP), och låter ett annat protokoll sköta själva tunneln, dvs att ändra IP headers osv. Detta är även aktuellt när man inte använder en tunnel alls men av något annat skäl vill kryptera eller skydda.

### Tunnel mode

Här hanterar IPSec även tunneln och sköter bytet av IP mellan de som används på internet och de som används internt i tunneln/det virtuella nätverket, precis som förklarat innan kring tunnlar.
