---
title: Systemadministration - Föreläsning 1
order: 200
---

# Systemadministration - Föreläsning 1

Slides för denna föreläsning innehåller många listor och bilder. Rekommenderar att ni har dessa uppe vid sidan om.

## Vad är molnet/molntjänster?

### Vad är en server?

- Hårdvaran
  - I princip samma dator som en "vanlig" PC - Vilka komponenter som avänds är samma, handlar mest om kraften hos komponenterna
  - Stöd för mer minne och fler diskar
  - Mer processorkraft/fler kärnor
  - Redundant strömförsörjning - Dvs blir det strömavbrott finns där alternativ försörjning, t.ex batteri eller generator
- Operativsystemet
- Tjänsten

### Vad är molnet?

- Molnet är inget mer än en server som någon annan äger
- Andra har hand om vissa saker, t.ex att ha han om och byta ut hårdvara.

#### IAAS, PAAS, och SAAS

- IAAS = Infrastructure as a service
- PAAS = Platform as a service
- SAAS = Software as a service

Se lista över skillnader på slides för föreläsningen

Handlar generellt om hur mycket ansvar vi har och hur mycket ansvar det företager vi köper tjänsten av har.
Ex: IAAS så har vi hand om operativsystemet medans vid SAAS har leverantören hand om detta. (Se slides för samtliga områden och vem som har ansvar)

## Miljön

Vår laborationsmiljö kommer bestå av tre virtuella servrar:

Virtuell server/dator = En dator/server som skapas digitalt inuti en annan dator.

- Exchange
  - Hanterar epost med brevlådor, regler mm.
  - Hanterar behörigheter för epost
- DC = Domain Controller
  - Styr miljön
  - Administrerar användare
  - Delar denna information med övriga delar
- Sharepoint
  - Samlar dokument
  - Kan konfigurera webbsidor mm.
  - Kan fungera som intranät (internt system för info i ett företag)
  - Kan ha olika behörigheter för olika dokument och användare

Vi alla har nog jobbat i en miljö: HKR kontot ligger i en miljö med liknande delar som ovan

De olika delarna har separata ansvar men är ihopkopplade och "pratar" med varandra.

DCn har ett namn, t.ex ado.nu - En användare kan då få epostadressen adam.mohammed@ado.nu  
Precis som vår HKR mail, namn.efternamn0000@**stud.hkr.se** ("stud" delen innebör att vi ligger i en egen del av HKR miljön)

Andra delar som förklarades under föreläsninge:

- DNS - Domain Name System
  - ÖVersätter adresser (t.ex ado.nu) till ip-adresser (t.ex 192.168.0.11)
  - Kommer förklaras mer i nästa kurs (Infrastrukturella serversytem 1)

## Prenumerationer och licenser

När man köper en prenumeration får man ett antal licenser.  
Olika prenumerationer ger olika mycket, hos Microsoft 365 är den mest täckande prenumeration E5 (Enterprise 5)

Varje användare behöver en licens, för varje prenumeration finns en kostnad per licens, dvs per användare.  
Licenserna kan sedan få olika appar mm. knutet till sin licens.

Se slides för tabell över olika Office 365 och Microsoft 365 prenumerationer och vad man får som exempel.

### Hur väljer man licens?

Kolla på:

- Hur många användare finns?
- Vilka krav på applikationer mm finns?
- Vilken budget finns?

### Autentisering mot molnet

När vi öppnar outlook sker följande:

1. Datorn kontaktar Office/Microsoft 365 servern
2. Servern kontrollerar att där finns en licens för outlook
3. Servers kollar med domänkontrollanten (DC) att du är en giltig användare med en giltig postlåda
4. Allt detta går tillbaka till servern som skickar datan outlook behöver tillbaks till användaren.

## Exchange-server

- Microsofts e-postserver
  - Släpptes 1996 som ersättare till MS Mail 3.2
- Skyddar nätverket genom att filtrera ut mejl som kan va skadliga

Se slides för grafik över hur flödet ser ut när man skickar epost.

Vanliga felmeddelanden visas i slides.

### Typiska hot

- SPAM
  - Oönskad reklam
  - Mejl som skickad för att överflöda inboxen
- Phishing mejl
  - Någon som försöker lura dig att klicka på länkar eller göra saker genom länkar som ser riktiga ut men som är farliga.
  - T.ex "Ditt lösenord har gått ut för Facebook, byt det här: LÄNK" där länken ej är från det riktiga Facebook
- Virus

### Säkerhetsfilter (Exchange Online Protection)

Skyddar vår exchange server från hoten ovan

Filter:

1. Antivirusprogram - Kollar bifogade filer mm.
2. Egna regler - Företaget kanske vill blockera vissa domäner, ip-adresser mm.
3. Spam filter - Letar efter fraser, domäner, adresser mm som är kända för spam

### Inkommande och utgående mejl

Man skiljer normalt sett på inkommande och utgående mejl

Oftast är det inkommande man framförallt kontrollerar, särskilt utanför vår egen miljö.

### Policy

En policy visar något som kan hända och vad vi då vill göra.

T.ex om det kommer ett mejl med ett virus kontakta administratören med informationen.

Dessa finns oftast på fler ställen än bara exchange

### Mejlgrupper

Finns olika sorter:

- Distributionslista
  - Lägg till vissa användare som specifikt ska få mejl om man mejlar listan
  - Skickar mer eller mindre en kopia till varje person i listan. Radera en person ett mejl så finns det kvar hos alla
- Dynamisk distributionslista
  - En lista som själv listar ut vilka användare som bör ingå i listan baserat på regler, istället för att vi måste lägga till manuellt
  - Fungerar i övrigt som en vanlig distributionslista
  - Kan basera regler på t.ex avdelning mm
- Delad postlåda
  - En ny egen epostlåda med egen mejladress
  - Raderar en person ett mejl försvinner det för alla
  - Kan även skicka mejl som kommer från postlådans adress istället för sin egna

## Rapportskrivning

Rapport för laboration 1

- Var krävs? 2-3 skärmdumpar för varje uppgift till rapporten samt att ni beskriver hur ni går tillväga för att lösa uppgiften
- Svara på frågorna i labbmanualen
- Inga referenser krävs (enbart för denna första)
- ChatGPT får **inte** skriva rapporten eller delar av den åt er.
- Inlämningsdatum: 1a Oktober
- Skrivs enskilt
