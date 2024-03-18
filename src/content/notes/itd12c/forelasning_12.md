---
title: Föreläsning 12
order: 120
---

# Föreläsning 12 - Subnetting med VLSM & NAT

## Subnetting

**Scenario**

- En organisation har ett klass C-nät
  - 194.47.46.0
- Totalt har de 174 hosts som behöver IP
  - 2 st datasalar/kontorslanskap med ca 50 host i vardera
  - 2 st personalkategorier med ca 20 host i vardera
  - 3 st nät för lite it-infrastruktur ca 10 host i vardera
  - 2 st punkt-till-punkt förbindelser (mellan routrar)
- Hur kan vi subnetta?

**Viktiga formler**

Antal hosts: $2^H - 2$ (där H är antalet hostbitar)  
Antal subnät: $2^S$ (där S är antalet bitar lånade till subnetting)

Vi skriver också lite tvåpotenser till senare:

$2^1 = 2$  
$2^2 = 4$  
$2^3 = 8$  
$2^4 = 16$  
$2^5 = 32$  
$2^6 = 64$  
$2^7 = 128$

(-2 för hosts)

Om vi då kollar på ett av våra nät från vårt scenario, t.ex ett av våra kontorsnät:

Vi ska ha 50 hosts, hur många bitar krävs för att får plats? Tittar vi på våra tvåpotenserser vi att det blir 6, för då får vi 62 hosts.

Vi får då S=2 och H=6. Men vi S=2 ger 4 subnät, vi behöver minst 9 nät, hur får vi ihop det? Vi får använda olika nätmasker i de olia näten.

Om vi ställer upp våra nät i en tabell:

| Namn          | Hosts | H   | S   | CIDR | Nätmask         | Magic number   | Nät-ID     | BC     |
| ------------- | ----- | --- | --- | ---- | --------------- | -------------- | ---------- | ------ |
| Kontor 1      | 50    | 6   | 2   | /26  | 255.255.255.192 | $256-192 = 64$ | `.0 /26`   | `.63`  |
| Kontor 2      | 50    | 6   | 2   | /26  | 255.255.255.192 | 64             | `.64 /26`  | `.127` |
| Personal 1    | 20    | 5   | 3   | /27  | 255.255.255.224 | 32             | `.128 /27` | `.159` |
| Personal 2    | 20    | 5   | 3   | /27  | 255.255.255.224 | 32             | `.160 /27` | `.191` |
| IT 1          | 10    | 4   | 4   | /28  | 255.255.255.240 | 16             | `.192 /28` | `.207` |
| IT 2          | 10    | 4   | 4   | /28  | 255.255.255.240 | 16             | `.208 /28` | `.223` |
| IT 3          | 10    | 4   | 4   | /28  | 255.255.255.240 | 16             | `.224 /28` | `.239` |
| Punkt - Punkt | 2     | 2   | 6   | /30  | 255.255.255.252 | 4              | `.240 /30` | `.243` |
| Punkt - Punkt | 2     | 2   | 6   | /30  | 255.255.255.252 | 4              | `.244 /30` | `.247` |

(ID och BC utgår från 194.47.46.x)

All information kommer egentligen från H och S, där vi bestämt H med hjälp av antalet hosts och våra tvåpotenser. Vet vi H vet vi också S ($8 - H = S$ i ett C-nät). Med hjälp av detta kan vi också få fram CIDR, nätmask, och magick number. Se föreläsning 11 för exempel på hur man konverterar dessa.

Att subnetta på detta sätt, med olika nätmasker per nät, kallas VLSM - Variable Length Subnet Mask.

**Resterande föreläsning gick till uppgifter i helklass, gå på föreläsningarna 😉**
