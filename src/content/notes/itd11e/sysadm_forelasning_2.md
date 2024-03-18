---
title: Systemadministration - Föreläsning 2
order: 210
---

# Systemadministration - Föreläsning 2

Sharepoint + Teams

## Repetition Laboration 1

### Distributionslista

Listan har en egen adress t.ex `dl@ado.nu`  
Användare läggs till manuellt i listan, inte automatiskt.

Epost skickad till listan blir vidarebefodrat till varje medlems privata brevlåda. Dvs att om person 1 raderar mejlet så har person 2 kvar det, för alla har i princip en kopia av mejlet.

### Dynamisk distributionslista

Fungerar precis som en vanlig distributionslista förutom det faktum att medlemmar läggs till automatiskt.

Istället ställer man in regler och parametrar som användare ska matcha, och matchar dessa så blir användaren tillagd som medlem automatiskt.  
Det kan t.ex vara att alla personer på en speciell avdelning eller liknande är medlemmar.

### Delad postlåda

I fallet med distributionslistor så har distributionslistan i sig inte en egen postlåda, den skickar bara vidare mejl till medlemmarnas egna postlåda.

Men mejladresser som är gjorda som delade postlådor har detta, det blir en egen postlåda, separat från användarens privata postlåda.

Man kan även svara mejl som att de kom från den delade postlådan. Har man t.ex en delad postlåda för it-support (`3030@hkr.se`) så kan användare som är tillagda i den delade postlådan svara som att det kom från den mejlen, inte från deras privata mejl.

Mejlen är också inte kopior, raderar en användare ett mejl i den delade postlådan så raderas det för alla.

## Sharepoint

Microsofts webbservertjänst. Började som ett fildelningsverkyg med sökmotor. Hanterar nu utöver filhantering också webbsidor, applikationer mm

### Uppbyggnad

**Se slides för diagram**

Windows server kör en tjänst som heter IIS (Internet Information Services, windows inbyggda webbserver), denna tjänsten kör i sin tur sharepoint som sedan hanterar resterande funktionalitet åt oss.

Sharepoint hanterar sedan interna webbsidor, publika webbsidor, filer, kalender mm.

### Hierarkin för en SharePoint site

Varje sharepointtjäns har en utgångspunkt, en s.k root site. Denna är en mall för alla andra sidor och från denna bygger vi ut våra olika sidor (subsites) som t.ex intranätet, publika hemsidan mm.

Varje subsite kan sen ha en page, dvs ett faktiskt innehåll eller en faktisk funktion.  
Root siten och alla dess subsites och pages tillsammans kallas site collection.

Se slides (slide 8) för vilka olika funktioner eller typer av pages det finns, t.ex Document Library, News post mm.

### Behörigheter

En behörighet get en användare tillgång till en fil, en mapp, eller en sida. Beroende på behörigheterna kan man även ha rättighet att ta bort eller redigera filer, sidor mm.

Behörigheter ärvs "neråt", dvs att har du en viss behörighet på en subsite så får du den behörigheten på alla pages under den, men inte på en annan subsite på samma nivå (dvs sidleds, se slide 7 och 13).

Man kan dock plocka bort så att en behörigheter inte ärvs neråt i de fall där det behövs. Om man t.ex har att folk allmänt får komma åt intranätet men inte vill att de ska se en specifik site så går detta.

#### Typer av behörigheter

- Read - Får gå in på sidan, ladda ner dokument, läsa sidor mm.
- Contribute - Får uppdatera, plocka bort och lägga till object på dokument
- Edit - Får uppdatera, plocka bort och lägga till object på dokument och listor på sidan
- Design - Får göra ändringar på designen på sidan
- Full Control - får förändra allt på sidan

#### Standardgrupper

Färdiga grupper som har en eller flera behörigheter från listan ovan

- Site owners (site admins)
  - Full Control
- Site members
  - Edit
- Site visitors
  - Read

## Hur hänger tekniken ihop? - Teams

Bygger på kod ifrån Skype, dvs chatt, samtal mm.

På detta har fler saker lagts till, t.ex integration med kalendern, mejlhantering mm.

Teams integrerar med andra or alla våra funktioner och samlar detta på en plats för samarbete.

### Package Policy

Precis som policys från exchange labben så finns där policys i teams.

Microsoft har även utformat en del paket med färdiga policys som man kan applicera utifrån olika användningsområden, t.ex för skolor, sjukvård mm.

Dessa paket kan man sedan utgå ifrån, redigera om där är någon inställning som inte passar organisationen, och sedan applicera på teams.  
Detta istället för att konfigurera varje behörighet från grunden, då paketen kanske till största del redan passar vår organisation med bara små ändringar.

## Laborationen

- Konfigurera sharepoint
  - Konfigurera sites, pages mm.
- Skapa grupper med olika behörigheter

## Rapportskrivning

Att tänka på:

- Inga personliga pronomen (jag, du, vi)
- Rubriknumrering
  - Har man en rubrik med nummer 1 och sedan en rubrik under denna så bör den numreras 1.1, följande underubrik 1.2 osv.
- Figurer
  - Figurtext - Ge bilder ett nummer och sedan en text som beskriver bilden
  - Referera till figurerna i texten, "[...] Se figur/bild 1."
  - Detta skrivs under bilden
- Tabeller
  - Numrera tabeller
  - Ha en beskrivande text för tabellen
  - Referera till tabellnumret i texten
  - Detta skrivs ovanför tabellen
