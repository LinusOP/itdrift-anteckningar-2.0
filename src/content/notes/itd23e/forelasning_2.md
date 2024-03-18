---
title: Föreläsning 2
order: 20
---

# Föreläsning 2 - AD Uppbyggnad & Struktur

## Repetition på struktur - Forest, Tree, Domain

![](/itd23e/f2/fig1.png)

Här har vi en enkel överblick över två skogar. I vår vänstra forest har vi en domain (`itd.local`) med en child domain. Som vi ser delar denna delar av sitt namn med sin parent. En child domain kommer alltid ligger under samma huvuddomän som sin parent (i detta fallet `itd.local`). En tree domain däremot kan ha ett helt annat namn.

Viktigt att poängtera är att inom en skog så har alla tillgång till allt. Syftet med t.ex en child domain eller en tree domain är alltså inte att separera behörigheter. Utan enbart för administration.

Däremot har vi vår andra forest till höger, emellan dessa två kommer man inte per automatik åt tjänster och resurser. De är helt separata. Däremot kan man skapa en kopplig där emellan (streckade pilen).

## DC - Domain Controller / Domänkontrollant

En DC ansvarar för en domän. Den kör ett antal tjänster som krävs för AD:

- LDAP
- DNS
- Kerberos
- Group Policy

En DC har också verktyg för att kontrollera och administrera vår domän. T.ex för att hantera DNS, användare osv.

Utöver detta lagrar också vår DC datan som krävs för att allt ska funka, som nämnt i förra föreläsningen en lagras en databas, loggar osv.

### Databasen

Active Directory använder sig av en s.k objekt-orienterad databas för att lagra objekt såsom användare, grupper, datorer osv.

Varje objekt i databasen har attribut bundna till sig. T.ex kan en användare ha ett namn, en epost, ett lösenord osv. bundet till sig. Beroende på vilken typ av objekt det är kan tillgängliga attribut se olika ut, en dator behöver ju t.ex inte ett efternamn.

I databasen finns även sätt att organisera flera objekt. Detta görs genom OU, Organisational Units. Dessa kan ses lite som mappar, och kan innehålla användare, grupper, datorer osv.

Det finns även en annan sorts "mapp", en CN eller containers. Dessa är liknande men inte samma sak som en OU. `Users` som finns som standard i en domän är t.ex en container, men vi skapar OU när vi vill organisera användare inom t.ex avdelningar. Dock tittar vi mer på skillanderna när vi kolla på group policies.

#### Schema

Scheman avgör vilka objekttyper som finns och vilka attribut som finns för en viss objekttyp. Ett schema kan ses som en ritning eller ett recept över vad vi kan göra i vår skog. De definierar helt enkelt vilka objekt som kan finnas och vad de kan ha för attribut.

Vill man kan man ändra i scheman, dock gör man enbart detta om man måste.

### Functional level

När man skapar en domän anges också en "Functional Level". Denna nivån indikerar vad domänen är kapabel att göra. Det stämmer alltså överrens med versionen av Active Directory som används. När en ny version av AD släpps så introduceras en högre functional level.

Nyare version är bakåtkompatibla med en lägre functional level, dvs windows server 2016 kan jobba på functional level 2012.

En skog har också en functional level, DC i skogen kan inte ha en functional level som är lägre en skogens, den sätter alltså lägsta gränsen.

Dock kan DC i en skog ha högre nivåer, och dessa DC kan kommunicera med DC av lägre nivå. Dock kommunicerar de ju då enbart de saker som båda stödjer, baserat på den lägsta nivån av de båda. Dvs har du en DC med nivå 2016 och en med nivå 2012 så kan de kommunicera men enbart de saker som stöds i 2012.
