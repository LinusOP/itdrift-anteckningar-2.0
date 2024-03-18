---
title: Föreläsning 3/4
order: 30
---

# Föreläsning 3/4 - OSPF

## Repetition router och routing

Som vi diskuterat tidigare är routerns uppgift att koppla ihop flera _olika_ IP-nät (subnät). Varje interface på routern har en egen IP-adress och ligger i ett eget nät. När routern tar emot IP-paket kollar den om den har en egen väg dit (direkansluten) eller om den vet en router att skicka vidare till för att nå nätet. Detta kollar den i routingtabellen.

Specifikt är detta logiken en router följer:

- Är destinationen "directly connected" till routern?
  - Skicka direkt till mottagare
  - Annars gå till nästa steg
- Finns en route till nätet?
  - Skicka till "next hop"
  - Annars gå till nästa steg
- Finns default route (gatway of last resort)?
  - Skicka till den
  - Annars gå till nästa steg
- Inga fler steg
  - Skicka ICMP "Destination Unreachable" datagram till avsändaren

Viktigt här är vår "default route", det är alltså dit en router skickar om den inte har någon annan väg, resterande har vi kollat på innan.

### Hur byggs vår routingtabell upp?

- Directly connected - När vi är direkt anslutna till ett nätverk läggs detta till i routingtabellen
- Statisk route - Routes som manuellt konfigureras med kommandon
- Dynamiska protokoll - Routingprotokoll såsom RIP och OSPF som dynamiskt lär sig routes till olika nätverk

Tänk på att en router lär sig inte routes per automatik (som en switch), vi måste ge den routes eller dynamiska protokoll för att lära sig dessa.

## OSPF

OSPF är precis som RIP ett dybamiskt routing protokoll där routrar delar med sig om vägar till nätverk. OSPF är dock inte samma sorts dynamiska protokoll då OSPF är ett s.k Link State Protocol.

Kollar man på konfigurationen av OSPF liknar den RIP ganska mycket.

RIP:

```
R(conf)# router rip
R(router)# network 192.168.1.0
R(router)# network 192.168.2.0
```

OSPF:

```
R(conf)# router ospf 1
R(router)# network 192.168.1.0 0.0.0.255 area 0
R(router)# network 192.168.2.0 0.0.0.255 area 0
```

Några skillnader:

1. Som vi ser på första raden sätter vi en etta efter `router ospf`, detta har med att man kan ha flera OSPF instanser igånge samtidigt, vi kommer _alltid_ sätta en etta här.
1. Efter nätadressen sätter man en _wildcard mask_, detta kan liknas vid en omvänd nätmask (inte riktigt men nära nog)
1. Efter dett sätter vi ett area-nummer, detta berör vi senare men kortfattat kan OSPF delas in i flera areor för att minska hur många routrar som måste uppdateras vid ändringar i topologin

## Internets uppbyggnad - Interna och externa protokoll

Var passar OSPF (och andra interna protkoll som EIGRP och RIP) in? Och hur skiljer de sig från externa protokoll?

Tittar vi på internets uppbyggnad ser det förenklat ut såhär:

![](/itd21c/f3/fig1.png)

Här kommer mycket nytt på samma gång men kortfattat gäller följande:

ASN (Autonomous System Number) - Nummer för ett AS - Ett AS är ett internt nätverk, t.ex hos ett stort företag eller en ISP. Internet är uppdelat i flera AS, alla har ett nummer (ASN).

Inom ett AS används ett s.k IGP (interior gateway protocol), dessa är t.ex OSPF, RIP, EIGRP eller IS-IS. I bilden ser vi nätverk med OSPF och EIGRP, det är dessa som täcks i kursen.

Däremot måste vi också koppla ihop våra interna nätverk, detta görs med BGP - Border Gateway Protocol - ett protokoll specifikt för att koppla ihop AS. Detta är det enda protokoll som används för detta men ligger också utanför kursen och är inget vi kommer prata om.

Som vi ser använder vi alltså OSPF (och andra interna protokoll) inom interna nätverk.

## Kostnader i OSPF

Uträkningen för kostnaden i OSPF är enkel och bygger på länkhastighet (likt STP i princip), men där finns en fälla.

Formeln ser ut såhär:

$$
\text{kostnad} = \frac{\text{referensbandbredd}}{\text{länkhastighet}}
$$

Det är dock också här vår fälla finns, och den är en kombination av två saker:

- Referensbandbredden är som standard 100 Mb/s
- Lägsta kostnad är 1 (värdet avrundas uppåt till 1 om det är en decimal)

Dvs. att en länk med hastighet 100 Mb/s och 1 Gb/s (1000 Mb/s) får samma kostnad:

$$
\frac{100}{100} = 1
$$

blir det samma som

$$
\frac{100}{1000} = 0,1 \approx 1 \text{(avrundat uppåt)}
$$

Hur löser vi då detta? Jo vi ändrar helt enkelt referensbandbredd, en bra referens kan vara 10 Gb/s (10 000 Mb/s)

Då får vi istället:

$$
\frac{10000}{100} = 100
$$

vilket är större än

$$
\frac{10000}{1000} = 10
$$

På så sätt får vi en tydlig skillnad mellan 100 Mb/s och 1 Gb/s precis som vi vill. Vill man skilja på hastigheter högre än 10 Gb/s (ovanligt, men vissa nätverk kan använda upp till 100 Gb/s) så höjer man helt enkelt referensen.

### Hur OSPF använder kostnaden väg

**Denna del examineras inte, jag orkade inte skriva hela förklaringen, se slides för föreläsning 4**

OSPF använder en algoritm som kallas Dijkstras algoritm eller Dijkstras Shortest Path First. Detta är en algoritm för att beräkna kostnaden mellan punkter i en graf.

Dijkstras algoritm fungerar lite som vi själva gör, där den räknar kostnad till alla punkter i en graf (typ ett nätverk) samt håller reda på hur den tog den vägen. På så sätt kan den lista ut bästa väg till samtliga noder.

Kolla slides för föreläsning 4 för en detaljerad genomgång.

## OSPF kommunikation mellan routrar

Routrar som "pratar" OSPF gör detta med s.k multicast-adresser. Alltså adresser där flera (men inte alla) enheter lyssnar på samma adress. För OSPF är det adressen `224.0.0.5`.

Routrar som vill skicka OSPF-meddelanden till andra gör alltså det genom att skicka ut paket med destinationen `224.0.0.5` som alla andra routrar som kör OSPF lyssnar på. Om en router inte kör OSPF kommer den helt enkelt ignorera paket med denna adress.

När två routrar börjar "prata" OSPF med varandra kallas det att de blir grannar. Först skickar de "OSPF hello" meddelanden, där de etablerar sin kontakt med varandra. Sedan har de ett utbyte av information. Dessa utbyten kallas LSA, Link State Advertisement. Den information som skickas fram och tillbaka lagras på varje router i en s.k LSDB, Link State DataBase.

Varje routers LSDB innehåller information kring hela nätet (i routerns OSPF area). Det är med hjälp av denna information som topologin för nätverket kan bestämmas, bästa vägar räknas ut osv.

### Villkor för att bli grannar

När routrar börjar "prata" OSPF med varandra och ser om de blir grannar så finns där vissa villkor för att de faktiskt ska bli det.

- Samma area
- Samma subnät
- Hello och Dead timer ska vara samma

Där finns några andra villkor men de ligger utanför kursen.

### Strategi för att skicka ut topologin

När routrar är grannar ska de som nämnt skicka ut LSA meddelanden för att dela information, men beroende på hur de är ihopkopplade så skickas denna ut på olika sätt.

#### Point-to-point

När två routrar är direkt kopplade med varandra, utan något emellan, så finns där inte så många olika sätt att skicka ut LSA. De skickar helt enkelt de till varandra, detta är den enkla versionen.

#### Non-point-to-point

Detta sker när vi har switchar mellan flera routrar, något i denna stilen:

![](/itd21c/f3/fig3.png)

Ska alla routrar här dela med sig av sin information och skickar hello meddelanden till alla andra routrar får vi en himla massa trafik. Med många routrar i samma nätverk kan detta bli problematiskt. Hur löser man detta?

Jo, i OSPF finns där i varje nätverk två speciella routrar, DR och BDR. Dessa står för Designated Router samt Backup Designated Router. Vår designated router blir då den enda router i ett nätverk som samtliga andra routrar utbyter information med. BDR är helt enkelt en backup om DR försvinner.

Kollar vi på vår skiss har vi kanske t.ex R2 som DR. Då skickar enbart R2 ut hello meddelanden, och kollar helt enkelt vilka länkar som funkar och inte funkar. När något ändras så uppdaterar den sin databas och meddelar alla andra routrar i nätverket. På så sätt skär man ner på trafiken i ett nätverk.

### Dynamiska uppdateringar

När skickas då LSA ut? Dvs när sker det uppdateringar mellan routrar?

Det finns några saker som skapar uppdateringar:

- Upptäcker nya grannar
- Inget svar från en granne
- Interface går ner

När något av detta sker hos en router så gör den följande:

1. Egna databasen uppdateras
1. Skickar information till grannar
1. Grannar uppdaterar sina databaser och skickar vidare till sina grannar
1. Detta fortsätter tills alla är uppdaterade

LSA har även livslängs, 30 min, därefter sker uppdateringar.

## Wildcardmask

OSPF använder wildcardmasker när man konfigurerar nätverk som ska delas ut, som vi såg överst i exemplet på konfigurering.

Enkelt sett blir en wildcardmask en omvänd nätmask, t.ex:

| Decimalform       | CIDR  | WC            |
| ----------------- | ----- | ------------- |
| `255.255.255.0`   | `/24` | `0.0.0.255`   |
| `255.255.0.0`     | `/16` | `0.0.255.255` |
| `255.255.255.255` | `/32` | `0.0.0.0`     |

Wildcardmasker har dock skillnader från nätmasker, de behöver t.ex inte ha alla binära ettor (255) i rad osv. De ser också något annorlunda ut när det gäller ojämna (subnät) nätmasker. T.ex `255.255.255.128` -> `0.0.0.127`. Men detta kommer vi se över mer i senare föreläsningar vad gäller ACL mm.
