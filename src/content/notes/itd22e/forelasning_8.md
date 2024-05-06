---
title: Föreläsning 8
order: 80
---

# Föreläsning 8 - Containrar

En container är väldigt lik en virtuell maskin i det faktum att den skiljer appen från att köras direkt på operativsystemet, men där finns några viktiga skillnader.

När vi tittar på virtuella maskiner så bygger vi ofta upp detta i lager, först har vi en hårdvaran, följt av en hypervisor (vid typ-1 virtualisering), följt av våra virtuella maskiner. Varje virtuell maskin kör i sin tur ett eget operativsystem, sina egna program, och till slut sin tjänst/resurs. Detta är ganska ineffektivt, har vi 10 virtuella maskiner med windows server så kör vi 10 separata instanser av operativsystemet, vi har 10 separata uppsättningar av windows kod och program osv.

Det är här containrar kommer in, när vi kör containrar så kör vi ett operativsystem på vår hårdvara, vårt operativsystem kör sen en s.k container engine. När en container startas så körs den i en egen liten "bubbla", precis som en virtuell maskin, men alla containrar delar på bibliotek och kod från operativsystemet, de delar på grunderna kan man säga.

På så sätt kräver varje enskild container mycket mindre resurser och blir mindre i storlek.

## Docker

Ett av de vanligaste programmen/systemen för att köra containrar kallas docker. Docker kommer i flera delar, dels vår container runtime och dels ett gränssnitt för att styra denna. På windows t.ex så styr man genom ett grafiskt gränssnitt som kallas Docker Desktop, som sedan interagerar med vår container runtime som körs i bakgrunden och faktiskt styr våra containrar.

## Images

Containrar bygger på s.k images, dessa kan ses som färdiga definitioner för hur en container bör köras, samt vad en container ska inehålla. På så sätt så får den applikation som lever i en container alltid samma bibliotek och resurser för att köras, de kommer köras likadant oavsett om det är min eller din dator. Det innebär också att de är enkla att bara ladda ner o köra, de kräver inte att man installerar något innan osv.

Images laddas upp till s.k register (engelska registry), man kan köra sitt egna men ofta använder man ett centralt register. Docker kör t.ex ett som kallas Docker Hub, där vem som helst sedan kan ladda ner din image och köra. Det gör också att docker är ett smidigt sett att distribuera tjänster som du vill att andra ska kunna köra.

### Dockerfile

För att bygga en image krävs en definition, denna skapas i en fil som kallas "Dockerfile", denna fil definierar vad docker ska göra när den bygger din image. En image kan t.ex se ut såhär:

```dockerfile
FROM ubuntu:latest
CMD echo "Hello world!"
```

Denna säger att vi utgår från en anna image, i detta fall ubuntus färdiga image, och sedan ska vi köra ett kommando (`echo "Hello World"`). Jag kan sedan använda denna för att bygga en image, när någon kör den så kommer ubuntu startas och sedan kommandot köras. Ganska meningslöst såklart men ett bra exempel på hur man kan använda images för att automatiskt starta upp en tjänst i en container, samt bygga på andra images för att få grundfunktionalitet.

### Portabilitet

Vill vi köra samma sak 10 gånger så kan vi starta 10 containrar med samma image, på så sätt är containrar väldigt portabla och lätta att starta, ta bort, och starta igen, utan att något ändras mellan gångerna, just för att vi har den färdiga definitionen i form av vår image. Funkar inte en container t.ex så är lösningen helt enkelt att plocka ner den och starta en ny container med samma image.

## Kluster

En container är alltså ganska smidig, vi kan bygga en image i förhand och sen köra den när vi behöver, vi vet att den alltid kommer ha allt som tjänsten behöver inbakat i vår image och den är enkel att flytta. Men de har fortfarande samma problem som en virtuell maskin, om den slutar fungerar måste någon gå in och starta om osv. Och sålänge den är nere så kommer ingen åt vår tjänst.

För att lösa detta så kör man ofta containrar i kluster, där flera containrar kör samma tjänst och delar på ansvaret. Där finns några olika system för detta men ett vanligt är "Kubernetes", som ligger uppe på t.ex docker eller en annan container runtime och håller koll på allt.

I kubernetes har man en eller flera "noder", dessa är helt enkelt servrar där kubernetes har möjlighet att köra containrar. Kubernetes kommer sedan t.ex köra samma tjänst i en container på varje nod, går en ner så kan den styra trafiken till en annan medans den försöker start om den container som ligger nere (eller oftare helt enkelt radera den och skapa en ny av samma image, som diskuterat tidigare).

Kluster är helt enkelt ett sätt att få redundans bland containrar, det automatiserar också delar såsom att automatisk flytta containrar mellan noder och att starta om containrar som går ner, för att ha en optimal tjänst.

## Containrar i Azure

Som med det mesta så kan Azure också köra containrar. Detta innebär att Azure kör en container runtime åt oss, vi ger sedan Azure en image från ett register, de laddar ner den och startar en container åt oss enligt de specifikationer och den image vi ger.

Azure kan också köra Kubernetes, samma princip gäller att vi då kan be Azure kör ett antal noder och sedan köra containrar på dessa. Även här sköter Azure de underliggande systemen, runtimes osv.

Ofta kan det vara enklare att köra containrar i Azure eftersom att servrar, hårdvara, och runtimes hanteras av dem. Vi ger de helt enkelt en image och sen körs containern, men självklart innebär detta också något mindra kontroll i hur den körs.
