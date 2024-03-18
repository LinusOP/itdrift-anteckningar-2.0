---
title: Föreläsning 9
order: 90
---

# Föreläsning 9 - Introduktion Skript

Skriptfiler i powershell är vanliga textfiler med flertalet powershell kommandon (cmdlets) i, skillnaden mot en vanlig textfil är att filändelsen är `.ps1`.

Detta betyder också att vi skulle kunna öppna notepad eller valfri annan texteditor och skriva kommandon, och sedan spara med `.ps1`, men det är inte optimalt.

Istället vill vi oftast använda en utvecklingsmiljö, dessa kommer hjälpa till när man skriver sitt skript samt med att testa koden. Detta då vi ute på arbetsplatser inte bara vill köra ett otestat skript på en massa servrar osv.

Vanliga editors att använda:

- Visual Studio Code - generell code editor, behöver ladda ner dess powershell plugin
- Powershell ISE - Kommer med powershell, det vi kommer använda

**Kommentarer**

I sitt skript vill (och bör) man ofta förklara vad som händer, då kan man skriva kommentarer genom att börja en rad med `#`.

## Variabler

I skript vill vi ofta spara något och använda det senare, eller göra så att vi kan återanvända ett kommando med lite olika data.

Variabler deklareras med ett dollartecken: `$variabel`, vi kan sen använda denna variabeln på flera ställen och får ut dess värde.

**Exempel**

Säg att vi har ett skript som skapar en DNS zon och lägger till lite records. Vi vill då använda samma zon flera gånger, t.ex `example.com`. Det kan då se ut såhär:

```powershell
$zone = "example.com"

Add-DnsServerPrimaryZone -Name $zone -ZoneFile "example.org.dns"

Add-DnsServerResourceRecordA -Name "SRV01" -ZoneName $zone -IPv4Address 192.168.0.10
Add-DnsServerResourceRecordA -Name "SRV02" -ZoneName $zone -IPv4Address 192.168.0.20
```

Som vi ser så behöver vi bara skriva ut vår zon en gång, och kan sen återanvända denna flera gånger.

### Variabeltyper

I powershell finns där olika typer av data, det finns ganska många olika men här är några viktiga:

- String
  - Används för text
  - Skrivs ut inom citationstecken: `$string = "Hej"`
- Integer
  - Används för heltal
  - Skrivs ut direkt: `$integer = 5`
- Boolean
  - Används för sant (`$true`) eller falskt (`$false`)
  - Skrivs ut direkt: `$boolean = $true`
