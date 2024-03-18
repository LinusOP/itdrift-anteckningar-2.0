---
title: Föreläsning 6
order: 60
---

# Föreläsning 6 - EIGRP forts.

## Kostnad (metric) i EIGRP

**Formel:**

$$
\text{Metric }(M) = \left(\frac{10^7}{\text{Lägsta länkhastighet }(l)} + \text{Sammanlagd fördröjning }(s)\right) * 256
$$

Lägsta länkhastighet $(l)$ mäts i Kbps.  
Sammanlagd fördröjning $(s)$ mäts i 10-mikrosekunder (1 mikrosekund = $\mu s$, $s$ mäts då i tiotals $\mu s$, dvs fördröjning med värde 1 är en fördröjning på 10 $\mu s$)

### Exempel beräkning 1:

Vi utgår från nätet nedan och kostnaden från R1 till Y.

![](/itd21c/f6/fig1.png)

R1 har två vägar, genom R2 samt genom R4. Vi börjar med R2:

#### R2

Lägsta länkhastigheten $(l)$ är 100 Mbps. Detta är 100 000 Kbps, dvs $10^5$ Kbps.

Sammanlagd fördröjning är $10 + 10 + 2$, vi delar alltså fördröjning i mikrosekunder med 10 för att få hur många tiotals mikrosekunder det är.

Här kan man tänka lite som att om vi har 220 kronor (addera fördröjningar), hur många tiokronor har vi? 22 st.

$$
M\text{(R2)} = \left(\frac{10^7}{10^5} + 22\right) * 256 = 31232
$$

#### R4

$l = 500\text{Mpbs} = 5 * 100\text{Mbps} = 5 * 10^5$  
$s = \frac{10 + 10 + 10 + 20}{10} = \frac{50}{10} = 5$

Sätter vi in i vår formel:

$$
M\text{(R4)} = \left(\frac{10^7}{5 * 10^5} + 5\right) * 256 = 6400
$$

Som vi ser är R4 en mycket billigare väg än R2 för att R1 ska nå nät Y.

### Default-värden hastighet och fördröjning

| Hastighet | Hastighet (Kbps) | Potensform  | Fördröjning (µs) |
| --------- | ---------------- | ----------- | ---------------- |
| 10 Mbps   | 10 000           | $10^4$ Kbps | 1000             |
| 100 Mbps  | 100 000          | $10^5$ Kbps | 100              |
| 1 Gbps    | 1 000 000        | $10^6$ Kbps | 10               |
| 10 Gbps   | 10 000 000       | $10^7$ Kbps | 10               |

## Konvergens

För varje subnät som ska lagras i routingtabellen beräknas följande punkter:

- Feasible Distance (FD) - Lägsta kostnad från den router man utgår ifrån till målet
- Reported Distance (RD) - De kostnader som de närmsta grannarna har räknat ut och skickar vidare till den router man utgår ifrån

Med hjälp av dessa utser man två routrar som blir extra viktiga:

- Successor - Nästa router man går igenom, blir alltså bästa vägen till målet
- Feasible Successor - Näst bästa routern, kan ses som backup till vår successor

Successorn är ganska enkel att se, det blir den väg från routern man utgår ifrån med lägst kostnad, dvs lägst FD.

Feasible successor är lik, det blir den med näst bäst väg, men här finns ett villkor, RD _måste_ vara lägre än vår FD för successor.

![](/itd21c/f6/fig2.png)

Tittar vi t.ex ovan så får vi R4 som successor, samt R3 som feasible successor. Men R3 kan enbart vara feasible successor för att dens RD är lägre än den 7000 som är FD för **R4** (vår successor).
