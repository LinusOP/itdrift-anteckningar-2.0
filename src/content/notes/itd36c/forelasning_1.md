---
title: Föreläsning 1
order: 10
---

# Föreläsning 1 - Introduktion systemhantering

Behovet av systemhantering växer snabbt när en miljö växer. Tänker man sig ett företag med 500 anställda där alla har en fast dator, en laptop när de jobbar hemma, och en jobbtelefon, då är det helt plötsligt 1500 enheter som ska hanteras. Dessutom har vi olika operativsystem, typer av enheter mm.

Det som krävs är kontroll över enheterna i miljön, vanliga kriterier är:

- God säkerhet
- Hantering av mjukvarubehov
- Backuplösningar
- System- och nätverksövervakning
- Automatisering

Vi har redan tittat på delar som bidrar, t.ex AD, nätverk, och säkerhet. Vi har också berört lite om uppdatering, övervakning, backup, och deployment. Men vi saknar en del, framförallt:

- Pakethantering för att dela ut mjukvara
- Övervakning av enheterna och användarens nyttjande av dem
- Antiviurshantering (något som vi även kommer kolla på i säk 2)
- Bra uppdateringshantering

De program vi kommer lära oss och använda under kursen för att lösa detta är en del av det Microsoft kallas för "Microsoft Intune family", där ingår bland annat:

- Configuration manager
- Intune
- Endpoint analytics
- Autopilot

Configuration manager (CM) är den lokala delen, alltså den vi kommer installera på servrar och köra i våra miljöer. Intune är däremot en del av Azure och därmed i molnet, detta låter en hantera fler typer av enheter än med enbart CM. Man kan koppla i ihop CM och Intune för att kunna nyttja båda tillsammans (men de kan även köras var för sig, med vissa begränsningar beroende på ens miljö).

## Configuration manager

COnfiguration manager installeras, som nämnt, på en server i din miljö. Den server som centralt styr din CM miljö kallas _site server_. CM består av ett flertal delar som först alla ligger samlade på din site server, men i större miljöer kan man dela upp delarna på olika servrar. De servrar som kör olika delar av CM kallas _site systems_ och dessa kommunicerar med din site server.

För att styra CM används _Configuration Manager Console_, som är en mjukvara som kan installeras på vilken dator som helst, som sedan kontaktar din site server. Man behöver alltså inte logga in på servern för att styra CM, utan detta kan göras från en eller flera datorer (t.ex datorerna för de personer på IT-avdelning som ansvarar över CM).
