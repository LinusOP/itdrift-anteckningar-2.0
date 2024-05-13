---
title: Föreläsning 11
order: 110
---

# Föreläsning 11 - Skydd nätverksangrepp - Brandväggar

Principen bakom brandväggar är att när trafik kommer från internet så kommer ett IP-paket, brandväggen packar då upp paketet och kontrollerar om det bör anses OK eller inte.

Brandväggar har utvecklats mycket genom åren, både pga att angrepp har blivit mer sofistikerade, samt då hårdvaran blivit bättre och därmed hinner brandväggen göra fler och mer komplicerade kontroller på ett paket innan det måste skickas vidare (för att behålla hastigheten).

Tittar vi på en router så är den enbart intresserad av delar av paketet, nämligen destinationen (förutsatt då att man inte har ACL osv). En brandvägg kollar istället på hela paketet, och är därmed ofta långsammare, men kan idag (beroende på hur mycket man betalar) uppnå acceptabla hastigheter.

## Paketfilter

De första/simplaste versionerna av brandväggar är paketfilter, de kollar enbart på header information, specifikt IP-headern samt TCP/UDP headern, anledningen var prestanda. Detta fungerar som när vi jobbat med ACL regler, där kan man inte filtrera på datan i ett paket, utan enbart avsändar-/mottagarinformation (adresser, portar osv).

Precis som när vi jobbat med ACL så gäller det att man har koll på interface, in och ut på dessa osv. Reglerna skrivs också något annorlunda men principen är lik, man filtrerar på hela eller delar av våra headers och sätter sedan allow/deny.

### Stateful filtering

När vi filtrerar paket väldigt simpelt som ovan så kan vi få vissa problem. Om vi t.ex har en klient som ska nå en server ute på internet, då skickar klienten ut ett TCP SYN meddelande, får ett SYN/ACK tillbaka och svarar slutligen med ACK.

Om en angripare försöker kartlägga var kienter finns/om de går att nå så kan den ju också försöka skicka TCP meddelanden och se om den får svar. Vi kan då blockera SYN meddelanden, ingen på utsidan ska få påbörja en TCP uppkoppling med vår klient, men om vi även blockerar SYN/ACK så kommer inte heller serverns svar dit och nu kan inte klienten nå servern. Vi hamnar i ett dilemma.

Lösningen här är att ha s.k state, alltså ett minne. Vad en stateful brandvägg gör är att hålla koll på vilka klienter som skickar ut ett SYN meddelande för att upprätta TCP trafik, och sedan tillåter den bara SYN/ACK svar från adressen dit SYN meddelandet skickades.

Om det kommer ett SYN/ACK där brandväggen inte redan har noterat ett SYN meddelande från insidan så blockeras detta. Generellt håller den alltså koll på TCP uppkopplingar, var de är i sitt förfarande (SYN, SYN/ACK, ACK (uppkopplad)) och mellan vilka adresser detta sker, för att kunna blockera falska TCP meddelanden.

## NAT

Då de flesta brandväggar nu är stateful så är de redan väldigt bra på att hålla koll på klienter och dess anslutningar, därav är brandväggar ofta lämpliga för olika sorters NAT konfigurering. De är ofta också kapabla till att filtrera och tillåta/blockera uppkopplingar baserat på regler i samband med NAT, t.ex port-forwarding.

## Proxy

Man kombinerar ofta brandväggar med proxy-servrar. Dessa är servrar som ligger utanför brandväggen och som all trafik skickas igenom. Dessa kan användas t.ex för att blockera vissa sidor, gömma IP-adresser från internet (tänk NAT) osv. De ligger helt enkelt som ett extra lager mellan nätverket och internet för att öka säkerheten och ha större kontroll över trafiken.

## Deep packet inspection

Slutligen kommer man till de modernaste brandväggarna, dessa kollar helt enkelt på allt i ett paket, inklusive datan. På så sätt kan de skydda mot t.ex virus, spam osv. Men självklart krävs det mer prestanda och mer avancerade brandväggar för att göra detta utan att hastigheten sjunker rejält, och de är därmed de dyraste. Dessa kallas även application-layer firewall.

## Att bygga nätverk med brandväggar

Det enklaste sättet att ha en brandvägg är att helt enkelt sätta den mellan ditt nätverk och internet, detta fungear brar förutsatt att all angrepp och faror kommer utifrån. Men om vi behöver få in viss trafik (tänk webbserver) så finns också risk för att få in virus eller andra skadliga saker, och när något väl är inne i nätverket så kollar inte brandväggen det.

Lösningen är att bygga nätverket i flera zoner, där förbindelser mellan zonerna går igenom brandväggar, på så sätt har vi intern säkerhet.

### DMZ

En vanlig sådan zon (finns redan konfigurerad i vissa brandväggar) kallas DMZ, vilket kommer från det millitära DeMilitarised Zone. Detta är en sorts neutral zon som varken befinner sig ute på internet men inte heller helt inne i vårt lokala nätverk. Här har man t.ex webbservrar och andra tjänster som ska gå att nå från internet. Man sätter sedan en brandvägg mellan internet och vår DMZ, och sen ytterliggare en mellan vårt lokala nätverk och DMZ.

### Zero trust

Även om DMZ är en bra början så kanske man sedan i sitt lokala nätverk vill dela in zoner, t.ex klienter och interna servrar osv, även här kan man ju ha en insider som angriper. Till slut så blir det svårt att veta vad som är insida/utsida på en brandvägg, vilka zoner man ska lite på och inte osv. Vad man då kan göra är att helt enkelt inte lita på någon, där varje paket till och från varje klient kontrolleras, detta kallas zero trust och är en av de mest säkra men också paranoida sätten att bygga nätverk.
