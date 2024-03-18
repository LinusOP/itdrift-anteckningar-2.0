---
title: Föreläsning 8
order: 80
---

# Föreläsning 8 - PowerShell intro

## Bakgrund

Målet när PowerShell skapades var att skapa en modern kommandotolk med ett kraftfullt skript-språk. Tidigare va funktioner ofta indelade i enskilda konsol-applikationer, istället ville man att dessa är mer centraliserade.

Syftet är framförallt att kunna förenkla och automatisera repetiva uppgifter. T.ex skappa många konton på samma gång.

## Uppbyggnad

PowerShell har två huvudsakliga delar. Dels så har vi kommandotolken, som kan användas för att start program och applikationer eller för att köra och tolka kommandon. I PowerShell kallas kommandon för "Cmdlets".

Den andra delen utöver kommandotolken är skriptfunktionaliteten, dvs möjligheten att kombinera flera kommandon i en fil som sen kan köras flera gånger, som ett eget litet program. Med andra ord är PowerShell också ett programmeringsspråk.

### Cmdlet

Cmdlets är kort för "Command-lets", som tidigare nämnt är Cmdlets våra kommandon i PowerShell. Tanken är att en cmdlet bara ska utföra en sak, dvs samma kommando ska inte göra 8 olika saker samtidigt.
Istället bör flera cmdlets kombineras för att utföra komplexa uppgifter, på så sätt är varje enskild cmdlet ganska simpel men tillsammans kan de kombineras för att bygga komplexa strukturer.

Cmdlets returnerar s.k objekt. Objekt kan ses lite som tabeller med två kolumner, ett namn och ett värde. Se det som attribut i AD, där varje attribut hade ett namn och sen ett värde som vi kan ändra.

Cmdlets är nästan alltid uppbyggda efter strukturen **Verb**-**Substantiv**, dvs man har ett substantiv för vad man agerar på, och ett verb för vad man gör. Några exempel:

- `New-ADUser` - Ganska självklara, skapar en användare i AD
- `Get-ADUser` - Hämtar information om en användare i AD
- `Set-ADUser` - Uppdaterar information om en användare i AD

Beroende på vilken cmdlet man använder så kan man ge olika input, tittar vi t.ex på [dokumentationen för `Set-ADUser`](https://learn.microsoft.com/en-us/powershell/module/activedirectory/set-aduser?view=windowsserver2022-ps) så finns där ganska mycket vi kan uppdatera... Därav är det viktigt att tänka på att det är inte en förväntan att man ska memorera allt detta, utan snarare kunna använda hjälp kommandon med mera för att ta reda på det.

### Utmatning till fil

Precis som när vi tidigare jobbat med kommandotolken så kan vi skicka utmatningen från ett kommando till en fil med `>`, t.ex `Get-Process > process.txt`. Vi kan även använda `>>` för att lägga till på slutet av en fil istället för att skriva över innehållet.

### Pipe eller pipeline

Om vi vill skicka utdata från ett kommando till ett annat så används ett s.k pipe, `Cmdlet1 | Cmdlet2`. På så sätt kan vi hämta information med ett kommando och sen använda den informationen i ett annat kommando.

## Intro till Cmdlets

För att kunna använda PowerShell måste vi också veta vilka vi cmdlets vi har och hur man använder dessa.

### Hjälp - `Get-Help`

För att få hjälp om vad en cmdlet gör, hur de fungerar mm. så används kommandot `Get-Help`. Vi kan t.ex använda `Get-Help New-ADUser` för att se vad vi kan göra med vår cmdlet `New-ADUser`.

Man kan också sätta `-whatif` på slutet av cmdlets för att se vad som händer om man kör dem, istället för att faktiskt köra dem.

#### Uppdatera hjälp

För att kunna använda `Get-Help` måste man först uppdatera hjälptexterna, detta görs med `Update-Help`.

### Kommandolist - `Get-Command`

Vill vi enbart ha en lista över cmdlets mm så används `Get-Command`. Här får vi även med en del andra program och verktyg i listan.
