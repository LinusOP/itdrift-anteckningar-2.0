---
title: Föreläsning 3
order: 30
---

# Föreläsning 3 - Malware

Malware är skadlig kod, det är huvudbegreppet som all skadlig kod faller under där det sedan finns underkategorier såsom virus, maskar, och trojaner. Där finns en hel del tillfällen då de olika typerna går in i varandra, det är alltså mindre viktigt med exakt vilken typ av malware något är (förutom på tentan).

Malware agerar normalt sett i två faser, spridning och payload. Spridningen är alltså hur den skadliga koden kom in i ditt system. PAyload handlar om vad den gör när den väl är där.

## Virus

Virus är ett klassiskt malware, ibland kallas all malware för "virus". Enkelt sett fungerar virus genom att infektera en fil med skadlig kod, t.ex ett program. När programmet körs så letar de upp andra filer och infekterar dessa. Detta fortsätter sedan när de filerna körs osv.

Den första filen kan t.ex vara ett program man laddar ner från en skadlig hemsida. Detta kanske i sin tur infekterar ett annat program som man sedan delar med sig av till en kompis, som då får viruset. På så sätt hoppar viruset från dator till dator.

Självklart körs slutligen skadlig kod till slut, i många fall väntar dock viruset på att vissa vilkor ska uppfyllas. Detta för att inte direkt märkas, på så sätt kan det spridas under längre tid ouppmärkt.

Dagens program och operativsystem gör dock detta något svårare. Detta då program i flera fall är signerade, infekteras filen så stämmer inte dess hash överens med signaturen och man vet då att filen ändrats. Därmed behöver virus hitta filer som ändras men som kan innehålla kod.

Exempel på såna filer är office-filer, t.ex word filer. Office-paketet har nämligen ett skriptspråk till word, excel mm. Men dessa filer förväntas ju ändras, när man skriver i dokumentet, därmed kan de inte signeras. Denna kombination gör filerna bra för virus.

## Maskar

Till skillnad från ett virus som kräver en värdfil att infektera så är maskar fristående program eller skript. De bygger på svagheter i OS och tjänster och utnyttjar exploits som ger remote code execution.

När skriptet körs på ett system så letar de efter 10 slumpmässiga IP-adresser eller andra system, försöker utföra samma exploit, och där de funkar så kopierar skriptet sig själv till den nya maskinen och repeterar. Detta kallas att maskar är "självreplikerande".

Självklart kan masken efter denna spridning också köra någon form av skadlig kod på systemet självt, precis som virus.

## Trojaner

Trojaner är program med skadliga sidoeffekter. De utger sig alltså för att vara användbara program (och fungerar ofta mer eller mindre som dessa), men de kör också annan skadlig kod. De kan även gömma sig på hemsidor och dylikt.

Detta låter mycket som virus men syftet här är inte att sprida sig, utan enbart att ta sig in på datorn och köras. Man försöker alltså lura användaren till att ladda ner det "användbara" programmet för att sedan köras.

Trojaner delas ofta upp i vilken typ av payload de har, t.ex:

- Trojan-downloader - Laddar ner skadlig kod, t.ex ett rootkit
- Trojan-spy - Stjäl information från datorn
- Password-stealer - Spelar in tangentryckningar för lösenord
- Randomware - Krypterar filer och kräver pengar för att avkryptera

## Rootkit

Ett rootkit är en typ av payload i malware, det är alltså den skadliga koden som köra efter spridning, i fas två. Rootkits är verktyg för att få fullständiga behörigheter i ett system som sedan kan nyttjas på olika sätt.

Generellt försöker rootkits efter installation att dölja sig själva genom att byta ut systemfiler, installera sig djupt ner i operativsystemet eller i kerneln osv. Syftet är att inte märkas för att kunna behålla administratorbehörigheterna.
