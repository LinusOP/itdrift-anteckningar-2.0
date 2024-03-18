---
title: Föreläsning 7
order: 70
---

# Föreläsning 7 - Deployment

När vi installerar windows på en dator och konfigurerar språk, tangentbordslayout osv. Detta funkar fint om man har en eller två datorer. Har man 500, då funkar det mindre bra. Det är här deployment kommer in.

Deployment är alltså helt enkelt automatisering av installationsprocessen. Genom att förbereda installationspaket med färdiga inställningar och program osv. kan dessa sedan skickas ut över nätverket till samtliga datorer.

## Vanlig boot

När en dator startar upp sker först en POST (Power-On-Self-Test). Efter detta går BIOS/UEFI igång, här försöker datorn sen hitta något att boota ifrån. Oftast är detta såklart ett vanligt operativsystem, men det kan även vara ett USB, en skiva, eller nätverket.

När vi installerar windows hemma är det ofta ett USB eller en skiva, i dagsläget oftast ett USB. Hur funkar detta?

1. Datorn läser in MBR från USB
1. MBR pekar på bootloader, ett litet OS (max 512 KB), detta OS är det som sedan tar processen vidare. Detta kallas PXE (Pre-eXecution Environment)
1. Bootloadern läser in boot-filen (faktiska installationsprogrammet för t.ex windows)
1. Bootloadern lämnar över till boot-filen

Det är sedan bootfilen som är det vi känner igen, det är den som startar upp och frågar efter språk tangenbord, användarnamn osv.

På windows heter bootloaderns WinPE (Windows Pre-executed Environment). WinPE är sedan där vi väljer version av windows, hårddisk osv. Sedan lämnar denna över till bootfilen för installationen som körs.

## Boot från deployment server

För att kunna använda en deployment server med windows server används WDS (Windows Deployment Services).

När en dator istället ska läsa boota över nätverket från en deployment server krävs att vissa saker är förberedda, utöver såklart en deployment server. Framförallt krävs en DHCP server som delar ut information till klienter om att där finns en deplyment server och var den finns, samt som kan ge klienterna en IP innan operativsystemet är igång.

När en dator startar och ska boota från nätverket är ett antal protokoll involverade.

Först måste datorn ha en IP, detta är såklart ett krav för att kunna kommunicera i nätverket. Men, vi har inget operativsystem som kan kommunicera med vår DHCP server.
Då används först ett gammalt protokoll som heter BOOTP (Boot Protocol), som letar efter DHCP servrar och ser till att datorn får en IP samt får information om vår deployment server.
I DHCP servern kallas det som pekar på vår deployment server "PXEClient" i DHCP options.

Datorn har då tillräckligt med information för att kunna börja hämta saker från deployment servern. Detta görs över ett protokoll vi sett i Nät 2, TFTP. Precis som vid en vanlig boot läses först en bootloader in, t.ex WinPE.

Bootloadern laddar i sin tur in vilka installationspaket som finns på vår deployment server. Man får sedan välja vad som ska installeras varpå bootloadern hämtar rätt paket via TFTP, och läser in detta. Det är sen detta paket som faktiskt sköter installationen av operativsystemet.

### Svarsfil

Det som förklarats ovan är jättebra då vi slipper ha installationsfiler på USB eller liknande. Men det finns fortfarande ett problem, vi måste fortfarande göra en massa val i menyer och under installationen. Vår installation är med andra ord inte helt automatiserad.

Dock går detta att lösa, man kan skapa en s.k svarsfil som enkelt sett redan har svaren till frågorna som ställs i installationsprocessen.

Denna kan skapas på lite olika sätt, t.ex via en [hemsida](https://www.windowsafg.com/). Denna fil läggs sedan till på deployment servern och används vid installation för att automatisera svaren.

## Installationfaser för windows (passes)

Vi kan konfigurera de installationspaket vi i WDS, detta delas upp i ett antal faser (passes) som

1. WindowsPE
1. Specialize
1. Audit User
1. OOBE System

Dessa är alltså faserna som installationen går igenom, och i varje fas kan olika saker konfigureras och ställas in.
