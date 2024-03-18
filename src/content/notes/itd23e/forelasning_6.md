---
title: Föreläsning 6
order: 60
---

# Föreläsning 6 - AD Skog & LAPS

## AD Skog

När vi skapar en domän skapas också en skog, det vet vi sen tidigare. Denna första domän blir en s.k root-domän, vår skog kommer dela namn med vår root domän (t.ex `itdrift.local`). Som vi också vet sen tidigare kan vi lägga till fler domäner i två varianter, child (delar namn t.ex `example.itdrift.local` som child av `itdrift.local`) samt tree (delar inte namn).

### Replikering i skogen

När vi kollar på replikering så är det viktigt att kolla på om en DC är Global Catalog (GC) eller inte. En DC som är GC kommer alltid vilja ha all data, information för alla domäner (oavsett om den är ansvarig för den eller inte) osv. Specifikt blir detta schema,t konfigurationen, och all domänspecifik information för alla domäner.

En DC som inte är GC kommer däremot välja ut enbart den information som den måste ha för att fungera. Detta kommer bli schemat, konfigurationen, och informationen för sin egen domän.

Som ni ser kommer alla domäner få ut schemat och konfigurationen. Det är den domänspecifika informationen som skiljer.

### Kommunikation i skogen

När vi har flera domäner i en skog behöver dessa kunna kommunicera med varandra. Framförallt innebär detta att de måste veta hur de når varandras DNS zoner. Detta då DNS zonen innehåller ett flertal poster relaterat till autentisering, LDAP osv.

Hur gör vi då? Jo vi skapar helt enkelt conditional forwarders från varje DC till varje annan domän en dens egna. Har vi t.ex två domäner `itdrift.local` och `example.com` så ska alltså all DC för `itdrift.local` ha conditional forwarders till `example.com` och vice versa.

Det är också viktigt att våra DC har sig själva (`127.0.0.1`) som DNS server, så att den svarar själv på allt den kan. Annars är det lätt att frågor om vissa domäner och tjänster hamnar fel.

### Siter i skogen

Om vi har ett antal domäner i en skog, måste dessa vara i samma site? Måste de vara i varsin site? Faktum är att det spelar ingen roll. De kan alla ligga i en site, de kan ligga i olika siter. Några kan ligga i en site och några i en anna. Vi kan t.o.m ha två olika DC i samma domän i två olika siter.

Siter och domäner är helt separata. Siter bryr sig inte om viken domän något är i, och en domän bryr sig inte om dess delar är i olika siter. Vi bestämmer helt över hur våra siter ska se ut och vad som ska ligga i dem.

### Grupper i skogen

När vi skapar grupper har vi sett tidigare att det finns tre typer:

- Domain Local
- Global
- Universal

Dessa tre typer behöver kombineras för att få en så logisk struktur som möjligt i vår skog. Kort satt handlar det om vilka grupper som ska spridas mellan domäner, vilka som ska vara för en domän osv.
Här finns ett specifikt system man bör följa, den kallas **IGDLA**:

- Identitet (ID)
- Global
- Domain Local
- Access

Vad innebär då detta? Jo, vi har våra användare (ID) som ligger i våra domäner. Vi lägger sedan dessa i globala grupper i vår domän, t.ex har vi kanske `students.itdrift.local` med en grupp för ekonomistudenter.

Vi skapar sedan Domain Local grupper i domänen där vår tjänst/resurs ligger. I dessa grupper lägger vi våra globala grupper. Vi sätter sedan våra behörigheter (access) på våra domain local grupper.

Man går alltså uppifrån och ner, användare (ID) läggs i globala grupper som läggs i domain local grupper som ges rättigheter (access).

**Notera att IGDLA behöver enbart användas när man har flera domäner i en skog, men det kan vara bra att göra så från början för att förenkla expansion**

#### Varför använder vi inte global överallt?

Aneldningen har att göra med AD och vilka grupper som kan vara medlemmar var. Kortfattat kan man säga att en global grupp kan vara medlem i grupper i andra domäner, men kan enbart ha medlemmar från sin egna domän. Domain local fungerar tvärtom, den kan ha medlemmar från andra domäner men kan enbart vara medlem i grupper i sin egna domän.

Därav får vi använda global för de grupper vi vill ska vara tillgängliga från andra domäner, men domain local för de grupper som ska hämta grupper från andra domäner.

I praktiken blir det då att de grupper med användare blir globala, så att de kan användas i andra domäner.  
Våra grupper med behörigheter blir domain local, så att de kan hämta användare från andra domäner.

### LAPS

På våra servrar finns lokala konton utöver våra domänanslutna konton. Dessa har dock en del skillnader och nackdelar gentemot domänanslutna konton:

- Kan enbart användas lokalt
- Inte centralt administrerat
- Lösenord kan vara enkla
- Löenordet statiskt
- Säkerheten enklare

Dessa kan göra det svårt och jobbigt att jobba med lokala konton, trots detta finns där gånger då de behövs.

Lösningen till detta är LAPS, Local Administrator Password Solution. LAPS gör så att DC kan ansvara för lokala administratörskonton. Framförallt löser den problemen med statiska och svaga lösenord.

Det roterar lösenord automatiskt med jämna mellanrum, och ser till att lösenordet är starkt. Det ser också till att varje enhet har ett unikt lösenord för sitt lokala adminkonto.

#### Hur fungerar LAPS?

LAPS fungerar med hjälp av GPO. Enheten hämtar GPOn för LAPS och kör den, när den körs sätter enheten själv ett nytt administratörslösenord med rätt inställningar utifrån GPO. Sedan skickar den även tillbaka det nya lösernordet till DC så att administratörer i domänen kan få tillgång till det.
