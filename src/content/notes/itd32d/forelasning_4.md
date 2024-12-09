---
title: Föreläsning 4
order: 40
---

# Föreläsning 4 - Nutida malware & Antivirus

Nuförtiden är det ofta samma malware som används kontinuerligt. Tittar på på historik från t.ex 2022 till 2024 är det nästan alltid samma namn på malware som dyker upp i topp 10 listor. Eftersom dessa fortsätter fungera är det generellt sett inte värt det att skriva ny malware.

## Moderna malware

### Vanliga spridningsmetoder

De spridningsmetoder som är vanligast idag är:

- "Dropped" malware - Laddas ner av annan skadlig kod
- Malvertisement - Fejkad reklam som egentligen laddar ner malware
- Malspam - Email spam som laddar ner eller länkar till malware
- Network - "Vanlig" spridning av virus, dvs genom sårbarheter
- Multiple - Kombinationer av olika metoder

### Exempel på moderna malware

#### SocGholish

SocGholish är ett javascript baserat malware som distribueras genom falska eller hackade hemsidor. Det används som en metod för att sprida annan malware, dvs det är bara första steget i en attack. Det sprider malware genom att visa fejk-popups för uppdatering av webbläsaren och dylikt.

#### Agent Tesla

Agent Tesla är en spyware trojan som angriper windows via .NET-bibliotek. Som spyware så övervakar det användaren och loggar t.ex text man kopierar, vad man skriver i olika fält, användaruppgifter som är sparade mm. Det skickar sedan tillbaka denna datan via olika metoder, t.ex HTTP, FTP eller via chatt-appar som Telegram.

#### CoinMiner

CoinMiner är en payload som sprids via olika metoder, t.ex genom Malspam eller ett annat malware som SocGholish. Det untyttjar datorresurser hos offret för att köra bitcoin mining åt angriparen. Det innebär att datorn utför uträkningar på olika sätt som genererar bitcoin, fast som sedan hamnar i angriparens ficka.

### Cyber-crime-as-a-service

Dagens cyberattacker utförs ofta inte av enstaka angripare. Istället finns där stora grupper med mycket resurser som säljer tjänster till andra.

T.ex kanske en grupp är expert på ransomware-attacker och kan då sälja detta som en "tjänst" till angripare. På så sätt behöver personen som vill angripa en person eller ett företag inte själv veta något om hacking eller malware.

Dessa grupper och tjänster blir vanligare och stora attacker är oftast ett resultat av en grupp som säljer olika sorters attacker och som blir inhyrda för att utföra attacker åt någon annan.

## Antivirus

### När man skannar

Effektiva antivirus måste arbeta på flera "fronter", det är inte bara vid ett tillfälle man skannar.

### Hur man hittar skadlig kod

Det finns två huvudtyper av skanning eller analys som används, statisk och dynamisk.

Statisk analys innebär att man skannar koden hos ett program när det inte körs. Man tittar alltså på hur filerna ser ut när de är sparade. Fördelen här är såklart att koden aldrig behöver köras, malware som aldrig körs kan inte heller göra skada. Problemet är att moderna malware är väldigt svåra att upptäcka med statisk analys.

Dynamisk analys bygger på att programmet körs och sedan tittar man på hur programmet beter sig och vad det faktiskt gör. För- och nackdelar här är såklart tvärtom mot statisk analys. Eftersom programmet måste köras här så finns det potential för programmet att göra skada. Men det innebär att även kod som inte upptäcks som skadlig vid statisk analys kan upptäckas när den försöker utföra mistänkta handlingar.

### Metoder för detektering

Det finns olika sätt att faktiskt upptäcka skadlig kod vid de olika analyserna som görs, nämnvärt finns fyra olika saker att basera detektering på:

- Signaturer
- Heuristik
- Beteende
- AI/Machine Learning

#### Signaturer

Signaturer används för att detektera skadlig kod vid statisk analys. De är till för att enkelt hitta redan kända malware. Signaturer i detta fall ska inte förvirras med digitala signaturer, det är helt enkelt kännetecken som indikerar att ett program eller kod är skadlig. Olika antivirusleverantörer har egna databaser med signaturer.

Man tittar på allt möjligt som på något sätt kan identifiera ett specifikt malware. T.ex kan det vara IP-adresser eller domäner som den skadliga koden normalt sett kontaktar, eller filer den normalt sett inehåller, skapar, eller försöker komma åt.

Nackdelen med detektering via signatur är att den skadliga koden måste vara känd sen innan för att upptäckas. Och uppdateras den skadliga koden tillräckligt så att signaturen inte längre matchar så krävs en ny signatur.

#### Heuristik

Till skillnad från signaturer som är väldigt absoluta i sin detektering så bygger heuristik på "hur brukar malware göra/set ut?". Analys så som den beskrivs nedan är också statisk.

Man tar en fil som man misstänker kan innehålla malware, sedan görs s.k "reverse engineering" för att få fram källkoden av filen. Källkoden kan i sin tur analyseras för att se hur den beter sig, vad den försöker göra osv. Om detta stämmer överens med hur annan skadlig kod brukar bete sig så antar man att detta också är skadlig kod.

Fördelen här är att antivirusprogrammet inte sen tidigare behöver känna till den skadliga koden för att upptäcka att den är skadlig. Allt som krävs är att dne skadliga koden utför handlingar som setts tidigare eller som på andra sätt kan tolkas som skadliga.

Nackdelen är att man här kan få falska positiva resultat. Dvs att ett program som inte är skadligt ändå blir flaggat som skadligt. Med signaturer sker detta (i praktiken) nästan aldrig.

#### Beteende

Till skillnad från analys med signaturer och heuristik så är beteendeanalys dynamisk. Programmet måste köras för att beteendet ska kunna analyseras. Man tittar t.ex på hur programmet använder resurser, vilka filer som programmet använder, om det kontaktar någon IP-adress osv.

Detta har liknande för- och nackdelar som heuristik, man kan upptäcka malware baserat på vad det gör (inte bara om dess kod ser ut på ett specifikt sätt) men program som beter sig likt malware kan felaktigt bli flaggade. T.ex kanske man har en backuplösning som krypterar data och skickar denna till molnet, egentligen väldigt likt ransomware.

#### Machine learning/AI

Självklart måste AI få vara med, dock har antivirusleverantörer hållt på med detta länge. Principen är att man ger en algoritm exempel på säkra och osäkra program, på så sätt lär den sig (till slut) vad som kännetecknar antivirus.
