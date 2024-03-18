---
title: Datateknisk introduktion - Föreläsning Forts. 6
order: 65
---

# Datateknisk introduktion - Föreläsning Forts. 6

# Grundläggande ellära - Forts.

## Föreläsning 6 - Repetition

**Ohms lag: $U = R*I$**

### Storheterna

Ström ($I$) mäts i Ampere (A)  
Spänning ($U$) mäts i Volt (V)  
Resistans ($R$) mäts i Ohm ($\Omega$)

### Resistans

**I serie**  
$R_{tot} = R_1 + R_2 + ...$

**Parallellt**  
$R_{tot} = \frac{R_1 * R_2}{R_1 + R_2}$ (Gäller enbart om man har två motstånd)

## Föreläsning Forts. 6

**Ny storhet: Effekt, mäts i Watt (W)**

### Potentialvandring

Spänningspotentialen kan man kort sagt säga är hur gärna strömmen vill vandra i en viss riktning. Högre spänningspotential innebär en högre skillnad och därmed att strömmen mer gärna vill röra på sig. Om man går tillbaks till vår jämförelse med vattenslangen från förra föreläsningen så kan man säga att potentialen är trycket.

Säg att vi har följande krets:

![](/intro_forelasning_6_forts/krets.png)

Vi vill veta spänningspotentialen i varje punkt (C, A, B), nere till vänster har vi jord och därmed är det per definition en potential 0V där.

Vi kan räkna spänningen över varje resistor genom att använda ohms lag:

$$
U_{R_1} = 0,5 * 50 = 25\text{V} \\
U_{R_2} = 0,5 * 30 = 15\text{V} \\
U_{R_1} = 0,5 * 20 = 10\text{V} \\
$$

För att sedan se spänningspotentialen i varje punkt kan vi subtrahera spänningen innan och spänningen som tappats hittils. Dvs:

$$
C = 50\text{V} \\
A = C - U_{R_1} = 50 - 25 = 25\text{V} \\
B = A - U_{R_1} = 25 - 15 = 10\text{V} \\
$$

Punkten C är direkt efter spänningskällan som har spänningen till 50V och har därmed spänningspotentialen 50V.

I Punkten A har vi tappat 25V och har därmed 25V kvar, osv.

Som vi ser så har vi I punkten B 10V kvar, precis det som tappas av $R_3$ och därmed stämmer det med 0V vid vår jord nere till vänster.

Potentialen faller alltså efter varje motstånd, i början är "trycket" väldigt högt och strömmen vill väldigt gärna röra sig i kretsen. Varje motstånd sänker "trycket" något och potentialen faller efter varje. Potentialen i en punkt är den originalpotentialen minus alla fall i potential innan punkten.

### Strömdelning

I en punkt där strömmen delar sig så rör sig mer ström i den riktning där motståndet är lägst.

Se en fågel på en elledning, strömmen delar sig ju tekniskt sett och går våde längs med ledningen samt igenom fågeln, men fågeln har mycket mycket högre resistans jämfört med ledningen och därmed går den absoluta majoriteten av strömmen igenom ledningen istället för fågeln.

Samma princip gäller om man har två parallelkopplade resistorer.

Formeln för detta: $I_1 = I * \frac{R_2}{R_2 + R_1}$  
Detta gäller då komponenterna ser ut som såhär:
![](/intro_forelasning_6_forts/krets2.png)

### Effekt

Formeln för effekt: $P = U * I$

Effekt är hur strömmen och spänningen hänger ihop. Har du t.ex en dammsugare som behöver en spänning på 1000V och an ström på 1A för att drivas så har den effekten 1000W. Detta kan även skriva som 1 kW.

Har man något som har effekten 1000w eller 1kW och låter denna dra ström i en timme, då har man förbrukar 1kWh, något som många kan känna igen när de betalar elräkningen.
