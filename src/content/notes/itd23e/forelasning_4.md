---
title: Föreläsning 4
order: 40
---

# Föreläsning 4 - AD Siter

Tidigare har vi tittat på AD ut ett logiskt perspektiv. Skogar, domäner, träd mm. är sätt som vi kan strukturera ett AD för att enklare kunna administrera det.
Dock är ju detta inte hur vårt AD och vårt nätverk faktiskt är uppbyggt fysiskt.

För att resonera kring detta tittar vi på AD siter. Alltså den fysiska uppbyggnaden av ett AD, framförallt av nätverket som detta AD består av. Varför är detta viktigt?

Jo när vi tittar på ett nätverk, en site, så vet vi att vi kontrollerar allt inom siten. Allt inom siten kan även kommunicera snabbt och utan ett "långsamt" internet emellan. Siten representerar alltså enkelt sett vad som är "vårt".

Om vi då tänker att vi har flera fysiska kontor eller dylikt och dessa kopplas ihop av internet, då har vi inte längre bara en site, även om vi fortfarande bara har ett AD.
Funkar detta då? Ja, en klient i ena kontoret skulle kunna logga in genom att nå vår DC över internet. Men detta förutsätter såklart att internet funkar, vilket också blir svagheten i detta.

Lösningen är att ha en DC per site, där data replikeras mellan dessa. Även om internet mellan våra två siter då ligger nere så kan personal på båda siter logga in. Självklart kommer inte replikering ske förrän internet är igång igen men autentisering osv kan fortfarande ske.

Det är även viktigt här att se att bara för att vi har flera siter och flera DC så är detta fortf en logisk struktur, en skog eller t.o.m en domän
Vår logiska uppbyggnad och vår fysiska uppbyggnad är alltså helt skillda. Du kan ha en domän spridd på flera olika fysiska platser, och du kan lika gärna ha flera domäner på samma fysiska plats (och såklart kombinationer av båda dessa).

**Vad krävs då för våra siter?**

- Nätverk (subnät)
- Site namn
- Site-link (koppling mellan siter)

Har vi enbart en site så krävs såklart inte en site-link, vi har inte flera siter att koppla ihop. Site-link kan såklart ske över internet men sker ofta över en VPN.

**Hur vet en klient vilken DC som är i sin site?**

När en klient försöker logga in sker ett antal steg där ADn listar ut vilken site som klienten ligger i och ger den en DC att autentisera med.

1. Klient skickar att den vill logga in till AD DNS:er som svarar med lista på DC i hela skogen
2. Klient skickar sin IP till valfri DC i listan - DCn jämför med subnät och tillhörande siter
3. DC skickar tillbaks närmaste DC beroende på subnätet, finns en DC i siten med det subnätet används såklart den

På så sätt kan en klient lista ut vilken DC som tillhör dess site (om en DC finns där) och därmed använda den för inloggning.

## Filserver och siter

Om vi har flera siter med filservrar i en site som alla behöver nå så kan det snabbt skapa problem med mycket nätverkstrafik över vår uppkoppling. Det vore bättre att ha en filserver per site så att vi slipper att använda bandbredd mellan våra siter för detta.

Dock kan detta bli rörigt om användaren ska hålla reda på vilken filserver som är rätt för vilken site. Användaren ska slippa tänka på det.

Lösningen här är att använda DFS (Distributed File System) Namespace, en tjänst för att ha flera servrar som nås från en sökväg.
Med hjälp av DFS Namespace kan vi ha flera filservrar som alla finns under samma sökväg. I DFS görs det genom ett s.k namespace (ofta vår domän såsom `itdrift.local`).

En sökväg ser ut t.ex såhär: `itdrift.local\Share\Public`. Vi har då vårt namespace, följt av en namespace root (`\Share`), efter det kommer vår folder (`\Public`). Varje folder kan i sin tur ha s.k targets, dvs olika servrar som alla kommer dela ut vår folder.

När en klient sedan går till den är filservern kommer DFS välja närmaste server som finns som target för den foldern och välja åt oss, utan att användaren behöver fundera på detta.

Dock är detta bara en lösning för nå flera servrar från samma sökväg, om vi faktiskt vill ha samma filer på alla servrar krävs en till del, DFSr (DFS Replication). Detta är delen som replikerar filer mellan de olika filservrarna.

Kombinerat kan vi alltså ha flera filservrar med samma filer från samma sökväg, helt utan att användaren behöver fundera eller ens veta att detta sker.
