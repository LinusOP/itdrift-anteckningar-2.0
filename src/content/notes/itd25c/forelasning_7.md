---
title: Föreläsning 7
order: 70
---

# Föreläsning 7 - Webbsäkerhet

När man kollar på webbsäkerhet pratar man primärt om TLS (tidigare SSL), som är den standard som används för kryptering och skydd vid överföring på webben. TLS har två primära mål:

- Att avgöra om vi är anslutna till rätt sida (ingen ska kunna imitera t.ex en bank)
- Att skydda under dataöverföring via kryptering, både mot avlyssning och mot förändring av data

## Historik

I början av internet, ca mitten av 90-talet, så var mer eller mindre inget krypterat. Men mer och mer började känslig information skickas, banker började erbjuda tjänster över webben osv. Ett företag som på den tiden utvecklade webbläsare, netscape, började då utveckla ett system för detta. Det kallades SSL, Secure Socker Layer. Precis som alla standarder fanns där i början säkerhetsproblem, och SSL 1 uppdaterades snabbt till SSL 2, och senare SSL 3 som var den version som blev populär.

Som alltid blir där dock problem om flera olika företag försöker skapa standarder (microsoft skapade också en egen version) och efter ett tag bildade man istället en internet standard som kallas TLS, Transport Layer Security, specifikt TLS 1.0.

I dagsläget används TLS 1.2 och TLS 1.3, där TLS 1.3 är den nyaste (och säkraste) versionen. TLS 1.2 stöds fortfarande pga att TLS 1.3 är nytt och alla nätverk och system inte än stödjer det.

## PKI - Public Key Infrastructure

Hur vet vi att det är rätt server vi är anslutna till? T.ex när man går till sin bank, hur vet man att det faktiskt är ens bank man anslutit till? Allmänt vill vi se till att vi alltid når den site vi förväntar oss att nå.

Detta löser man genom privata och publika nycklar. När vi går till en sitem t.ex `dn.se` så presenterar servern ett certifikat, som innehåller dess publika nyckel, dess namn, samt en signature från en CA (certificate authority) som ganranterar att den nyckeln hör ihop med det namnet.

När webbläsaren då ansluter till en webbserver och får certifikatet så kontrollerar den att namnen matchar, att certifikatet är giltigt (inte utgånget samt signerat av en CA webbläsaren litar på). Den testar sen så att server har den korrekta privata nyckeln (med hjälp av den publika nyckeln i certifikatet).

Certifikaten som CAs använder för att signera certifikat för hemsidor är i sin tur tillagda i t.ex windows och i webbläsare, klienten litar alltså på alla certifikat som är signerade av dessa s.k root certifikat som följer med mjukvaran.

### Certifikat

När man går till en hemsida kan man titta på certifikatet som skickades med, där finns mycket teknisk information men viktigt är:

- Namn
- Ägare
- SAN (Subject alternative name, ett certifikat kan gälla för flera hemsidor)
- Giltighetstid
- Utfärdare (Issuer)

Allt detta tar utfärdaren och signerar, signaturen läggs sedan till filen och detta bildar i slutändan ditt certifikat.

Viktigt här är att en CA kommer inte signera bara för att man ber om det, det krävs även att man verifierar ägarskap över domänen, dvs att man är den man påstår. Försöker jag t.ex skapa ett certifikat för `linusop.se` så måste jag verifiera för min CA att jag äger den adressen, det finns lite olika metoder för detta, bl.a med hjälp av DNS.

CAs har också listor över certifikat som inte längre gäller, en s.k Certificate Revocation List, CRL. På så sätt kan man själv be en CA återkalla ett certifikat (om man t.ex råkat läcka sin privata nyckel) som då hamnar på CLR.

## TLS - Transport Layer Security

TLS börjar alltid med en handskakning, där både klienten och servern kommer överens om hur kryptering ska ske, vilka parametrar som ska användas, autentisering sker osv. Detta påbörjas med att klienten skapar en anslutning till port 443 på server, då sker följande:

1. Autentisering (Servern bevisar sin identitet med certifikat)
2. Klient och server kommer överens om algoritmer
3. Symmetriska nycklar skapas för kryptering

### Handskaking TLS 1.2

Handskakningen i TLS 1.2 skiljer sig från den i TLS 1.3, framförallt gäller att TLS 1.2 stödjer väldigt många fler algoritmer och därav måste servern och klienten komma överens. Handskakningen består av följaden:

1. Klient -> Server - Client hello
2. Klient <- Server - Server hello
3. Klient <- Server - Certificate
4. Klient <- Server - Server key exchange
5. Klient <- Server - Server hello done
6. Klient -> Server - Client Key Exchange
7. Klient -> Server - Change cipher spec
8. Klient -> Server - Finished
9. Klient <- Server - Change cipher spec
10. Klient <- Server - Finished

Notera att de förfrågningar som går på samma håll efter varandra (t.ex 2-5) kan alla ske i en förfrågan från servern till klienten.

### Skillnader i handskakning TLS 1.3

Som tidigare nämnt stödjer TLS 1.2 väldigt många olika algoritmer och metoder och är allmänt ganska "tugnt", något som gjordes med TLS 1.3 är att ta bort de flesta överflödiga algoritmer och metoder, på så sätt kan klienten mer eller mindre gissa vilka algoritmer som kommer användas. Detta gör att man kan ta bort ett steg i handskakningen och därmed går den något snabbare.

### Nyckelgenerering

_Kommer_
