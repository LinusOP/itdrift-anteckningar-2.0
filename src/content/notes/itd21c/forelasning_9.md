---
title: Föreläsning 9
order: 90
---

# Föreläsning 9 - Radiosignaler

WiFi är något vi alla känner till men för att förstå det måste vi kolla på radiosignaler och strålning.

Generellt kan vi säga att WiFi kräver två saker, något som skickar en signal samt något som tar emot den. I enheter samt access punkter sitter båda delar, så att de både kan skicka och ta emot. På så sätt kan de "prata" med varandra trådlöst.

## Elektromagnetisk strålning (EMS)

Elektromagnetiska strålning kan nästintill liknas vid ljus. Det innebär att precis som ljus så har radiovågor en frekvens och en våglängd.

När laddade partiklar accelereras så genereras denna strålning. Likaså när strålningen passerar laddade partiklar så accelereras dessa, detta kallas induktion. Det är detta som händer i antenner, antingen så accelererar vi partiklar för att generera EMS eller så väntar vi på att partiklar ska mötas av EMS och accelereras så vi kan läsa av detta.

Denna strålning är det som bildar radiovågor och som används för att skicka data.

## Radiovågor

Radiofrekvens motsvarar radiovågor med frekvensen 3 KHz till 300 GHz. Växelström i detta frekvensband kan bära radiosignaler. Vilket motsvarar våglängder mellan 1 mm till 100 km.

När vi tittar på radiovågor tittar vi ofta på vågor, som ser ut något såhär:

![](/itd21c/f9/fig1.png)

(Ignorera siffrorna, detta är bara för att visa en våg)

Utifrån detta finns två principer, dels frekvensen. Frekvensen är hur många gånger per sekund som vågen går ner och sen upp och sen till mittlinjen igen, en full upp, ner, och tillbaks. Våglängden är hur långt det är mellan dessa punkter, alternativt distansen mellan två "kullar" eller "dalar", detta blir samma.

Frekvens mäts i Hz och skrivs ut "f", och är helt enkelt numret för hur många gånger per sekund som vågen gör en full våg. Dvs en frekvens på 10 Hz innebär att det sker 10 gånger per sekund.

Våglängden skrivs ut med grekiska bokstaven lambda, $\lambda$ och mäts i meter.

Utöver detta behöver vi beröra periodtid. Det är hur långt tid det tar för vågen att göra "en våg", dvs samma som vi definierat i frekvensen. Tiden för en sådan upp, ner, och tillbaka. Denna skrivs ut med stora "T", den mäts i sekunder.

Vi kan utifrån dessa tre definiera en formel

$$
f = \frac{c}{\lambda} = \frac{1}{T}
$$

Denna använder även "c", detta är ett fast värde och representar ljusets hastighet. Generellt kan man förenkla den till 300 000 000 m/s (exakt 299 792 458 m/s), kan även skrivas $3 * 10^8$ m/s. Man kan alltså bara mata in den i formeln där "c" används.

## Kanaler

Användning av frekvenser för radiotrafik styrs av internationella och nationella regler. Vissa frekvensområden, s.k band, är "fria". Dvs att vem som helst får sända där. Ett exempel är det s.k ISM bandet, vilket står för Industrial, Scientific, Medical. I detta spannet finns t.ex både 2.4 GHz samt 5 GHz, vilka är de som (i störst utstreckning) används för WiFi.

Varje band delas in i kanaler så att flera olika saker kan sända i samma band utan att krocka helt, har vi för många krockar får vi inte fram några signaler alls.

## Förluster

När radiovågorna sprider ut sig i ett rum så kolliderar de med massvis med partiklar i rummet. När detta sker får vi förluster i signalen. Detta kallas free space path loss, FSPL. Högre frekvenser dämpas mer över samma sträcka. Därav har 2.4 GHz wifi längre räckvidd än 5 GHz.

## Brus

När vi sänder och tar emot signaler så tar vi också ofta upp många andra signaler. Dessa övriga signaler skapar en brusnivå som måste "överröstas". Dock kan vi inte enkelt öka sändningseffekten, och en ökad brusnivå skapar därför problem.

## Interferens

Interferens skapas av andra signaler som stör, som en del av bruset. Dessa kan t.ex komma från andra wifi enheter som överlappar och/eller sänder på samma kanaler. Alternativt andra signalkällor t.ex bluetooth osv.
