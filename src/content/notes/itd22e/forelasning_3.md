---
title: Föreläsning 3
order: 30
---

# Föreläsning 3 - Autentiseringsmodellen emot Azure

Autentisering används som vi vet sen tidigare för att öppna upp en session. Det vi också vill är att åstadkomma s.k SSO, Single Sign-On, där vi inte behöver logga in med samma konto flera gånger. Går jag till en tjänst och loggar in med mitt Entra ID konto t.ex så vill jag inte senare behöva logga in igen på en annan tjänst om det är samma konto som ska användas.

## On-Premise/Lokalt

När vi använder ett lokalt AD så använder vi Kerberos (och i förlägning LDAP) när vi autentiserar oss, som vi vet sen innan. Vi autentiserar oss mot Authentication Server i KDC och får en TGT, vi använder sen vår TGT för att få tillgång till tjänster via Ticket Granting Servern i KDC.

## Molnet

När vi autentiserar oss emot Azure och molnet så används en metod som ser snarlik ut i funktion, men som egentligen fungerar något annorlunda i bakgrunden. Dock blir upplevelsen för användaren väldigt lik.

När en användare loggar in på en dator så går datorn iställer för KDC emot Azure och Entra ID och får då en s.k token för att bevisa att autentisering skett. Självklart kräver detta att man har en internetuppkoppling. Något som också är ett krav för att säkert kunna autentisera sig är en säker anslutning till/från Azure, detta görs med HTTPS.

Metoden som används för autentisering emot Entra ID är en version av OAuth 2.0 tillsammans med Open ID Connect (OIDC). OAuth är den del som handlar om hur vi autentiserar oss och skickar våra inloggningsuppgifter. OIDC är principen för hur vår identitet skickas tillbaka från Entra ID i vår token när vi autentiserat oss med OAuth. Dessa jobbar alltså med varandra och täcker olika delar, en för själva autentiseringen och en för att appar ska kunna få grundläggande uppgifter om oss (namn, mail osv).

### PRT - Primary Refresh Token

PRT är den token som skickas tillbaks till enheten när autentisering skett. Din PRT kan liknas vid en TGT i Kerberos, vi får en token som vi sedan kan använda för att bevisa att vi är autentiserade. När vi sedan försöker använda tjänster eller resurser så skickas vår PRT till Entra ID och vi får då tillbaka en Access Token (och en Refresh Token) som vi kan använda för att få åtkomst till tjänsten/resursen.

## Registrerad/Ansluten enhet

På en registerad enhet (när användare äger enheten men använder den för jobbet också) så behöver vi göra ytterliggare autentisering om vi t.ex försöker komma åt Azure, vi behöver alltså logga in på datorn med vårt privata konto och sen startar sessionen med Entra ID först när vi försöker komma åt en resurs och då loggar in.

På en ansluten enhet så påbörjas sessionen redan när vi loggar in i Windows (eftersom vi loggar in med vårt Entra ID konto), vi behöver därmed inte göra någon vidare autentisering när vi sedan försöker logga in i en tjänst eller resurs, vi har redan en PRT som vi kan använda för att bevisa att vi är autentiserade.
