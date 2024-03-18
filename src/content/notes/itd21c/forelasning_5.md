---
title: Föreläsning 5
order: 50
---

# Föreläsning 5 - EIGRP

EIGRP - Enhanced Interior Gateway Routing Protocol - Är ett dynamiskt routingprotokoll utvecklat av Cisco. Precis som RIP är EIGRP ett distance vector protokoll, till skillnad från OSPF som är ett link state protokoll.

## Distance vector vs link state

![](/itd21c/f5/fig1.png)

Om vi tittar på ett enkelt nät som ovan, vad skickas mellan routrarna beroende på olika routingprotokoll? T.ex från R2 till R1.

**Distance vector**

I distance vector protokoll som RIP kommer R2 enbart berätta om "slutmålen", dvs näten den har vägar till, samt hur många hopp det är dit. Så R1 vet enbart att R2 finns, vilka nät den bör skicka vidare till R2 för att nåt, och en kostnad.

**Link State**

I link state protokoll så skickas hela topologin, dvs R2 skickar allt den vet om hela nätet till R1. På så sätt kan R1 själv lista ut hur hela nätet ser ut, baserat på information från alla sina grannar (i detta fallet enbart R2), och bygga sin egen routingtabell med bästa vägar.

## EIGRP

Även om EIGRP är ett distance vector protokoll så skiljer det sig en del från RIP.
Framförallt är där en stor skillnad i hur EIGRP beräknar sin kostnad. Som vi pratat om innan finns där problem med att RIP bara baserar kostnad på hopp, det är därför OSPF använder länkhastighet. EIGRP är likt OSPF, det använder länkhastighet, men också fördröjning.

Vad innebär detta då? Jo, utöver bara länkhastigheten så beräknas fördröjningen för varje interface. I praktiken gör det att vägar med väldigt många hopp _eller_ väldigt långsamma interface får något högre kostnad.

### EIGRP grannar

Precis som OSPF så etablerar EIGRP grannar med närliggande routrar. Som de andra routingprotokoll vi tittat på skickar EIGRP också multicastmeddelanden, dock på olika adresser. EIGRP skickar multicast på `224.0.0.10` (OSPF på `224.0.0.5` eller `224.0.0.6`, RIP på `224.0.0.9`).

Det finns även vissa krav för att blir grannar, följande krävs för att två EIGRP routrar ska bli grannar:

- Authentication (password) måste stämma
- Tillhöra samma autonoma system (ASN)
- Källans IP måste vara inom samma subnät som det subnät som det lokala interfacet
- Samma K-värden, men det ingår inte i kursen

När de blir grannar så utbyter de information, dock i en enklare procedur än OSPF. Efter detta så skickar routrarna hello-meddelanden mellan varandra (och inget annat). När ändringar sker så skickas enbart ändringarna ut till grannar. På så sätt skickar EIGRP routrar väldigt lite mellan varandra efter deras första utbyte (då skickas fullständing information).

#### Utbyte av topologi

Hur funkar då utbytet av informationen mellan routrar inom EIGRP? Jo, som nämnt innan så är ju EIGRP ett distance vector protokoll, dvs det utbyter _inte_ hela topologin med sina grannar. Istället skickar R2 vidare sina kostnader för `23.0` och `24.0` nätet till R1, plus att R1 såklart vet kostnaden för länken i `12.0` nätet.

Dvs till skillnad från RIP där en router bara kan kostnaden mellan sig själv och sina grannar, så känner den i EIGRP också till kostnaden "ett hopp bort". R1 vet alltså vilka kostnaden R2 använde för att räkna, R2 vet R3s kostnad, osv.

Anledningen till varför R1 behöver R2s kostnader "till höger" kommer vi se bättre i nästa föreläsning men kortfattat gör dett att konvergenstiden blir mycket lägre. Dvs tiden det tar mellan att en förändring sker i nätet och att routrarna kan uppdatera sina routingtabeller baserat på dessa förändringar.

### Konfigurera EIGRP

```
R1(config)# router eigrp 1
R1(config-router)# network 192.168.5.0 0.0.0.255
```

Vad är 1an i första raden? Jo det är vårt s.k ASN, Autonoma System Nummer. Detta måste vara samma för att routrar ska bli EIGRP grannar. Enkelt sett kan man se det likt area i OSPF (även om det finns skillnader).

I andra raden ser `network` kommandot likadant ut som i OSPF, bara utan arean (då vi har vårt ASN innan detta istället).

Vad gör då egentligen det här network kommandot? Jo, enktelt sett gör routern två saker, först letar den efter _interface_ som matchar adressen och wildcard masken. De interface som matchar kommer då att börja skicka ut hello-meddelanden för att hitta grannar

När grannar har hittats och etablerats så kommer routern skicka ut information om de nät som matchande interface ligger i.

I praktiken så om vi har ett kommando såsom `network 192.168.10.0 0.0.0.255`, och ett interface med adressen `192.168.10.1/24`. Då hittar routern först detta interface, och börjar skicka hello-meddelanden där. Sedan kommer den annonsera det interfacets nät, dvs `192.168.10.0/24` till sina grannar.
