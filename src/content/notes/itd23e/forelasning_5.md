---
title: Föreläsning 5
order: 50
---

# Föreläsning 5 - GPO

GPO - Group Policy Object, är policyer som klienter hämtar från AD så att alla följer samma regler. I detta syfte är Policy = Regel. Många säger att man "skjuter ut" GPOer till klienter, men detta stämmer inte riktigt. DC skickar ut vilka GPOer som finns, men det är klientens ansvar att hämta dessa från AD och applicera dem.

En GPO har två aspekter att tänka på, dels vad den gäller (vilken regel/inställning mm.) samt var den ska appliceras. Var den ska appliceras har enkelt sett två alternativ, antingen kan de appliceras på roten eller på specifika OU.

Här ser vi också skillnaden mellan OU och Container som vi pratat om tidigare. GPO kan appliceras på ett OU, men inte en container.

## När appliceras GPO?

När en GPO skapas appliceras den inte automatiskt någonstans. Istället måste man okså länka en GPO till var den ska appliceras. Som tidigare nämnt länkas den alltså här till antingen roten eller OU. En GPO kan vara länkad på flera ställen samtidigt.

Utöver detta appliceras bara en GPO om det finns lämpliga objekt i OUn där den är länkad. När man redigerar en GPO kan man göra inställningar för antingen datorer eller användare (eller båda). Om man gjort inställningar för användare på en GPO men det inte finna några användare där en är länkad så appliceras den såklart inte.

## Delar av GPO

En GPO består av två delar. Kort sagt har man delen som identifierar och definierar en GPO, samt delen som klienter hämtar och applicerar.

### GPC - Group Policy Container

GPC är den del som lagras i AD och som vi redigerar när vi vill ändra vad en GPO ska göra.
Precis som allt i AD har en GCP attribut:

- ID (Ett GUID som unikt identifierar en GPC)
- Namn
- Rättigheter

Denna delen skickas ut till klienter så att de kan hitta vilka de bör hämta.

### GPT - Group Policy Template

GPT lagras inte i AD utan är filer som ligger i SYSVOL mappen. Dessa filer ligger i en mapp som döps efter GUID på tillhörande GPC. Mappen innehåller sedan de filer som krävs för att kunna applicera vår GPO.

### Hur dessa används tillsammans

Först skickar en DC ut vilka GPO som finns, den skickar ut GPC delen. Här får klienten då alltså reda på vilket GUID som GPCn har mm. När klienten sen ska hämta och applicera GPOn så söker den i policy mappen i SYSVOL efter mappen med samma namn som GPC GUID. Den vet då att dessa hör ihop, hämtar inehållet, och applicerar.
