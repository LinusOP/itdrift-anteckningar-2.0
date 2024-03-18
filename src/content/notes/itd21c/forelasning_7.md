---
title: Föreläsning 7
order: 70
---

# Föreläsning 7 - Wildcardmask & ACL

## Wildcardmask

Wildcardmasker används för att bilda grupper eller listor av specifika adresser. Detta är inte det samma som en nätmask, även om de i vissa fall kan kännas ganska lika, inte minst i sitt utseende.

En wildcardmask ser ut ungefär som en inverterad nätmask. Dvs att har vi en nätmask som `/24` så är den decimalt `255.255.255.0`, "tillhörande" wildcardmask ser då ut som `0.0.0.255`, det vet vi sen OSPF och EIGRP.

Men vad innebär detta? Jo, i wildcardmasker så gäller att (binärt sett) så betyder 0 att vi vill ha en match, och 1 att vi inte behöver matcha.

Vi kan alltså se det såhär om vi antar att vi har en regel som säger att matcha `192.168.1.0` med wildcardmasken `0.0.0.255`.

Vi ser då att första tre oktetterna (`192.168.1.`) måste matcha, de har en nolla i wildcarsmasken, och sista oktetten kan vara vad som, för där har vi enbart ettor i wildcardmasken (255 = `1111 1111`).

Wildcardmasker kan vara mindre än 255, dvs `0.0.0.63` är en fullt giltig wildcard mask (och säger att första 26 bitarna ska matcha, sista 6 kan vara vad som (63 = `0011 1111`)).

### Skillnad mot nätmask

Vid enklare wildcardmasker ser de mer eller mindre alltid ut som inverterade nätmasker. Dock är det inte alltid så. Den största skillnaden är att ettorna i en nätmask måste vara kontinuerliga, dvs de måste vara i rad.

Titta t.ex på `/8` eller `255.0.0.0`, binärt blir detta `1111 1111.0000 0000.0000 0000.0000 0000`, detta ser inte konstigt ut och funkar precis som vi tidigare lärt oss. Men vi kan _inte_ ha en mask som ser ut som `255.0.255.0`, det är inte tillåtet för ettorna blir inte kontinuerliga.

Detta är dock helt tillåtet i wildcardmasker. Vi kan alltså välja helt och hållet vilka bitar som ska matcha och inte. Vi kan t.ex ha en regel med masken `0.255.0.255` och IP `192.0.10.0` så ska första och tredje oktetten matcha, men andra och sista oktetten kan vara vad som, och ändå matcha vår regel.

## ACL

ACL - Access Control List - är listor som kan filtrera trafik in och ut ur en router. Hur hör dessa då ihop med wildcardmasker? Jo, vi använder wildcardmasker i våra regler för att bestämma vilka adresser våra regler ska gälla.

Hur fungerar de då? Jo, enkelt kan man säga att man skapar grupper av regler, man sätter sen dessa regler på interface, och säger om de ska gälla inkommande eller utgående trafik (från routerns perspektiv).

Varje regel i denna gruppen är sedan ett filter, samt om det som matchar filtrer bör släppas igenom eller blockeras.

En sådan grupp ser ut något såhär:

```
Router(config)# access-list 1 permit 192.168.1.0 0.0.0.255
```

Vad betyder detta då? Jo, vi definierar en ACL med nummer 1, vi lägger till en regel till denna som är av typen "permit", dvs det som matchar bör släppas igenom. Vad matchar då? Jo då tittar vi på vår sista del, `192.168.1.0 0.0.0.255`, och tillsammans med det vi vet om wildcardmasker vet vi att detta matchar alla adresser om börjar med `192.168.1.` där sista oktetten kan vara vad som.

Vi måste även applicera vår regel på ett interface:

```
Router(config)# int g0/0
Router(config-if)# ip access-group 1 in
```

Vi säger då att vår ACL med nummer 1 bör appliceras på all _inkommande_ ("in" i slutet) trafik på interface `g0/0`

**Några viktigt principer**

- Varje ACL har en s.k "implicit deny", längst ner på varje lista finns en osynlig regel som blockerar allt som inte berörts av en tidigare regel.
- ACL använder "first-match logic", dvs den första regeln i en grupp som matchar ett paket är den som gäller. Har vi alltså två regler där den första blockerar alla adresser i nätet `10.1.1.0` men den andra regeln släpper igenom trafik specifikt från `10.1.1.100` så kommer inte den igenom, för den fångas först av den första regeln som blockerar.

### Standard Numbered ACL

När vi skapar ACL så finns där några olika typer av dessa, den enklaste är en s.k standard ACL. Dessa filtrerar enbart på avsändar-IP. Dessa identifieras med tal, specifikt i spannen 1-99 och 1300-1399. Dvs skapar du en lista med något nummer från dessa spann så blir det en standard ACL.
