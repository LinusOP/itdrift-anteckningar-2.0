---
title: Föreläsning 7
order: 70
---

# Föreläsning 7 - Routern

## Repetition

IP-adresser är uppdelade i två delar, nät samt host.

Har vi en IP-adress såsom 192.168.1.**5**/24 så vet vi att `/24` är nätmsaken, som indikerar vilken del av adressen som tillhör nätet samt host. CIDR `/24` är detsamma som nätmask `255.255.255.0` som i sin tur egentligen är et bitmönster på 32 bitar. Delen 1or i bitmönstret visar sen den del av adressen som tillhör nätet.

I detta fall har vi 24 bitar till nätet, och 8 bitar till hosts. Detta ger oss $2^8=256$ adresser i det nätet, sen får vi ta bort 2, en för nätadressen och en för broadcast vilket ger $256-2=254$ användbara adresser för hosts.

**CIDR - Classless Inter-Domain Routing**

Vi har sen tidigare använt nätmasker såsom `/24`, detta kallas CIDR-notering och är ett sätt att dela upp adresser utan klasser (som nämndes i föreläsning 5). Siffra visar hur många 1or som är i början av vår nätmask (när man kollar på den binärt). Dvs `/24` är en nätmask med 24 1or följt av 8 0or.

Vi kan även ha nätmasker såsom `/10`, vilket decimalt skrivs `255.192.0.0`. Detta indikerar att de första 10 bitarna i adressen tillhör nätet, resterande tillhör hosts.

## Routern

Vanligtvis kallar vi enheten hemma för router, men denna gör mycket mer. Oftast är den en router, switch, WIFI access punkt, DHCP server, webbserver (för konfiguration), samt ibland modem.

Detta är inte det vi pratar om, de routers som vi kollar på är mer renodlade routers och hanterar t.ex inte switching osv.

### Router forwarding

Routern kollar mottagarens IP-adress, om det är till routern själv (dvs till routerns IP-adress och MAC-adress), den tar då han om det själv.

Om router däremot får en frame med sin egen MAC-adress men någon annans IP-adress så försöker den skicka vidare detta. Detta gör den genom att plocka bort lager 2 information, dvs MAC-adresser (eftersom den byter ut dessa).

Den kollar sen i sedan routing table och letar efter en matchande route att skicka vidare trafiken till, sen packar den en ny frame och skickar vidare.

#### Routing table

Routing table visar vilka nät routern har tillgång till samt var den ska skicka trafik för att nåt det nätet.

Ett routing table kan se ut som följande (för en router med 3 interfaces, G0/0 samt S0/0/0 och S0/0/1)

| Subnet       | Mask  | Next Router  | Out Interface |
| ------------ | ----- | ------------ | ------------- |
| `172.16.1.0` | `/24` | None         | G0/0          |
| `172.16.2.0` | `/24` | `172.16.4.2` | S0/0/0        |
| `172.16.3.0` | `/24` | `172.16.5.3` | S0/0/1        |
| `172.16.4.0` | `/24` | None         | S0/0/0        |
| `172.16.5.0` | `/24` | None         | S0/0/1        |

Vad visar då tabellen i detta fallet?

Först ser vi vilka tre nät som vår router är direkt ansluten till, detta är `172.16.1.0` (interface G0/0), `172.16.4.0` (int. S0/0/0), och `172.16.5.0` (int. S0/0/1). Dessa är de där "Next Router" är "None". Vi har även indirekt tillgång till 2 nät, detta är `172.16.2.0` samt `172.16.3.0`, dessa når vi genom routrar som är kopplade i nät vi har direkt tillgång till. Här visar "Next Router" vilken adress i dessa nät vi ska skicka till för att sedan nå nätet vi vill komma åt.

Vill vi t.ex nå `172.16.2.10` så har vi inte direkt tillgång till detta, men vi vet att vi kan skicka till `172.16.4.2` som är en router i ett nät vi har direkt tillgång till, och att den sen vet hur man kommer vidare till `172.16.2.0` nätet.

### Hur routing table byggs upp

Till skillnad från switchar som lär sig sin MAC-adress table automatiskt så krävs det från en router att man konfigurerar s.k "routes". Dessa kan vara statiska, dvs att vi som administratörer berättar för routern vilka väger den kan ta för att nå olika nät. Det finns också protokoll som gör att routers kan prata med varanda och automatiskt berätta vilka nät de har tillgång till, dvs "skicka till mig för att nåt nät x".

#### Statisk route

En statisk route kan sättas på två olika sätt. Vi kan antingen säga att vi ska skicka till en speciell adress i ett nät för att nå ett annat nät. Eller så kan vi säga att vi ska skicka ut på ett interface för att nå det nätet.

Kommandona kan alltså se ut som följande:

```
ip route 172.16.2.0 255.255.255.0 172.16.4.2
ip route 172.16.2.0 255.255.255.0 S0/0/0
```

Det första kommandot indikerar att om vi vill nå nät `172.16.2.0/24` så ska vi skicka till `172.16.4.2` (vilket bör vara en router i ett nät vi direkt har tillgång till)  
Det andra säger att vill vi nå nätet så skickar vi ut trafik på interface S0/0/0

Generellt är första alternativt bättre om vi i nät `172.16.4.0/24` har flera routers, eftersom vi då har flera möjliga som kan lösa problemet och då är det bättre att säga direkt vilken router vi ska skicka till av alla möjliga routers, i detta fallet en router i nätet `172.16.4.0` med adress `172.16.4.2`.

Vi måste också lägga till en route på motsvarande switch för hur den skickar paket tillbaka till routern vi utgått ifrån, annars kommer svaren inte fram.

#### Dynamisk route

Har vi många routers, och många nät så blir det snabbt oerhört många statiska routes vi ska konfigurera. Då använder man olika protokoll och system som listar ut dessa automatiskt. Det vi kommer använda i denna kurs är RIPv2, ett ganska simpelt routing protokoll.
