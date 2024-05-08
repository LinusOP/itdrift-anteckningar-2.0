---
title: Föreläsning 10
order: 100
---

# Föreläsning 10 - Nätverkssäkerhet & angrepp

När vi pratar om angrepp på nätverk finns det tre olika begrepp som ofta återkommer:

- Sniffing - Att lyssna av för att få någon information
- Flooding - Att skicka många paket i syfte att överbelasta
- Spoofing - Att låtsas vara någon annan, t.ex använda någon annans IP-adress

## ARP-poisoning (spoofing)

Vi antar att en angripare på något sätt är uppkopplade till vårt nätverk via en switch, och avlyssnar meddelanden med t.ex wireshark. I samma switch är en klient och en router kopplade, klienten skickar sedan en massa trafik ut på internet genom routern via switchen.

TIll en början får inte angripare mycket mer än ointressanta broadcastmeddelanden, resten skickar switchen enbart till rätt klienter och inte till alla. Vad angriparen då gör är att den skickar ut ett ARP meddelande som säger att dess MAC är MAC för default gateway i nätverket. Dvs att enheter som ska skicka till t.ex `192.168.1.1` ska skicka till angriparen, istället för routern.

Den kan på så sätt ta emot och lyssna av alla meddelanden som ska ut på internet. Den kan sedan skickar vidare dessa meddelanden till routern så att det inte märks av (anslutningen funkar fortfarande), den sitter helt enkelt i mitten och lyssnar.

## DoS - Denial of Service (flooding)

Anta att ett företag levererar en tjänst och vi vill stänga ner denna. Vad man då gör är att skicka så pass mycket trafik till dess servrar att inget annat kan komma fram, eller att routrar eller servern själv blir överbelastad. Detta kallas en DoS attack, eller Denial of Service.

### DDoS

Dock har vi som privatpersoner ofta mycket mycket lägre nätverkskapacitet än ett företag som t.ex facebook. Vad man då gör är en s.k distribuerad DoS, eller DDoS, där man samlar massvis med små klienter och sen skickar alla samtidigt så mycket trafik de kan. Har man tillräckligt många enheter kan man då skicka väldigt stora trafikmängder även om varje enskild enhet har en låg kapacitet. Detta görs idag ofta med s.k botnet, alltså hackade enheter som tas över (ofta utan att det märks) för att användas i atacker.

### Amplification

Något man också kan göra är att på olika sätt skicka ganska lite data men få väldigt många olika enheter att svara och då istället skicka svaret till vårt mål som vi vill angripa.

Detta kan t.ex göras med en fejkad IP-adress och DNS servrar. Om jag som angripare formulerar en DNS-uppslagning och säger att den kommer från vårt mål så kommer DNS servern skickar data till målet. Om vi då formulerar en fråga därsvaret blir ganska stort, samt skickar den till många olika DNS servrar så kommer väldigt mycket data skickas tillbaka till målet. Utan att jag som angripare behöver skicka så mycket data eller ha så många enheter.
