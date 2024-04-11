---
title: Föreläsning 2
order: 20
---

# Föreläsning 2 - Microsoft Entra ID

Microsoft Entra ID, tidigare kallat Azure AD, är Microsofts molnbaserade system för kontohantering och autentisering. I entra finns två typer av konton, användarkonton och datorkonton/maskinkonton. Dock är maskinkontona här fokuserade på mer än bara windowsdatorer, för att hantera t.ex Apple-produkter.

## UPN-namn

Varje användare får ett UPN namn, som är en email-adress. Standardformatet är `<namn>@<miljö>.onmicrosoft.com`, t.ex: `linus@testlabb29481outlook.onmicrosoft.com`. Dock är dessa ganska långa och besvärliga, man kan därav lägga in egna domäner, i Entra kallas dessa enkelt "Custom domains". Vi kan t.ex lägga till hkr.se och då istället få `linus@hkr.se`, något mer lättläst.

Dock måste domäner köpas och valideras för att kunna användas, du kan alltså inte använda vilken domän du vill utan måste äga den.

## Roller

I Entra ID finns en massa olika roller, över 100 st. Men några är:

- Global administrator - Kan se och göra _allt_ i din miljö
- Global reader - Kan se allt men kan inte göra något
- Backup operator - Kan hantera backups (men inte radera)
- Backup reader - Kan titta på backups men inte göra något med dem

Roller används alltså för att tilldela olika behörigheter, både i Azure men även i Microsoft 365. Generellt är det rekommenderat att använda de inbyggda rollerna om det inte finns ett specifikt krav som de inte täcker. De täcker det mesta och följer det Microsoft anser är god praxis.

### God praxis

#### Lägsta möjliga behörigher

Användare ska inte få mer behörigheter en vad som krävs för att genomföra sina uppgifter. På så sätt undviker man att användarkonton som blir kapade visade sig ha tillgång till en massa administrativa funktioner som de inte hade behövt men som gjorde att angriparen kunde göra skada.

#### Just-in-time access

Är en funktion som gör att man kan lägga behörigheter som är tidsbegränsade, på så sätt kan man följa ovanstående men ändå ge högte behörigheter när det kan vara nödvändigt. Tidsbegränsade behörigheter kan ges av vissa administratörer.

#### MFA för admins

MFA, Multi-factor authentication, är ett system för att kräva mer än bara användarnamn och lösenord för att logga in. Det är alltså till för att höja säkerheten och göra det svårare att kapa konton.

Ofta ser man det i form av en "authenticator" på telefonen, där man får en sifferkod som man måste ange (som ändras var 30e sekund).Men även andra system finns, t.ex fysiska "nycklar" i form av ett USB-minne, kort (använd ofta inom vården), eller pinkoder.

## RBAC - Role-Based Access Control

Principen med att skapa roller och på så sätt dela ut behörigheter kallas RBAC. I Entra ID ser det ut såhär för att bestämma om någon har behörigheter:

1. Startar utan access
1. Hämtar vad som ska göras
1. Kontrollerar om behörighet redan har nekats (blockerar direkt i sådana fall)
1. Kontrollerar roll
1. Stämmer matchning med användare? (UPN, användning, plats för inloggning mm)
1. Andra krav för behörigheten? (t.ex måste använda MFA)
1. Om allt gick igenom och blev godkännt så ges behörigheten

## Skillnader Azure och on-premise

| Active Directory            | Entra ID                |
| --------------------------- | ----------------------- |
| Skog/Träd                   | Tenants och directories |
| DNS                         | Azure DNS               |
| Siter                       | Custom domain           |
| OU                          | Platt struktur          |
| Group Policy                | Azure                   |
| Användare & windows-datorer | Användare & Enheter     |

### Autentisering

I ett lokalt AD är vi vana vid hur autentisering funkar, datorn ansluts till domänen och ett konto i domänen kan sedan autentisera sig.

I Entra ID finns dock två varianter, det som kallas Entra ID registrerade och Entra ID anslutna enheter.

#### Registrerad

Registrerade enheter används om användaren äger enheten men vill komma åt resurser i miljön, t.ex en filutdelning. Man loggar in på datorn med ett privat konto men kan autentisera sig med sitt Entra ID konto för tillgång till resurser, dock inte alltid alla resurser beroende på policies.

#### Ansluten

Anslutna enheter är enheter som ägs av företaget och man loggar in på datorn med sitt Entra ID konto och funkar mer eller mindre som att vara ansluten till en lokar domän. Med anslutna enheter får man direkt tillgång till resurser utan vidare autentisering.
