---
title: Datateknisk introduktion - Föreläsning 6
order: 60
---

# Datateknisk introduktion - Föreläsning 6

# Grundläggande ellära

Se slides för diagram över kopplingar mm.

## Elektrisk laddning

Elektroner som rör sig. Tittar man t.ex på ett batteri har man en positiv sida och en negativ sida, där det är en skillnad i elektriska laddningar. När sidorna kopplas samman så vill de elektriska laddningarna jämnas ut och de flödar då från ena polen till andra.

## Ström

Ström skrives $I$.  
När man mäter ström så använder man enheten Ampere (A)

Ström är enkelt förklarat förflyttningen av en elektrisk laddning.

Man skulle kunna likna det enkelt vid en vattenslang, där är strömmen den mängd vatten som flödar igenom slangen. (Egentligen är det antalet elektriska laddningar som rör sig).

## Spänning

Spänning skrives $U$ (boken skriver dock V).  
Mäts i volt (V).

Spänningen beskriver hur hög skillnaden är i elektrisk potential.  
Enkelt sagt kan man säga att det är som trycket om vi fortsätter med liknelsen till vattenslangen. Dvs hur mycket vill vattnet röra sig från ena sidan till andra.

## Resistans

Resistans skriver $\text{R}$.  
Mäts i ohm ($\Omega$)

Resistan är motståndet i ett material. Dvs hur svårt det är för ström att röra sig igenom ett material.  
Fortsätter vi med vår liknelse till en slang så kan det liknas vid hur tjock eller smal slanger är, en väldigt tunn slang är det svårt för vattnet att röra sig igenom.

### Resistans - Seriekoppling

Har men en krets med flera motstånd kopplade efter varandra så läggs resistansen för dessa motstånd ihop.

Har man en krets som så:

```
====R1===R2=====
```

(`=` är ledning/kabel, `R` är motstånd (notera att dessa är inte officiella utan något jag hittat på))

Så kan man lägga ihop resistansen för dessa. Den totala resistansen kan därmed räknas  
$R_{tot} = R_1 + R_2$

Har R1 en resistans på 1 ohm och R2 en resistans på 2 ohm så är den total resistansen 3 ohm

### Resistans - Parallellkoppling

I detta fall kopplas motstånden inte "efter varandra" som ovan, utan istället brevid varandra. Något såhär:

```
        ======R1======
        =            =
=========            ==========
        =            =
        ======R2======
```

Här är det något svårare att visualisera det totala motståndet och hur mycket ström som går igenom varje motstånd.

Om man tänker en slang som delar på sig, där det är lika lätt att åka på båda sidor, så går en lika stor mängd vatten på båda sidor av delaren. Samma princip gäller gär. Har ena motståndet en högre resistans så går där en mindre mängd ström igenom det motståndet och en större mängd igenom det andra. Precis som att en slang som delas upp i en stor del och en liten del har mer vatten på den stora delen, med låg resistans.

Formel:

$$
\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2}
$$

Har man enbart två motstånd kan denna skrivas om såhär, en lättare version att hantera:

$$
R = \frac{R_1 * R_2}{R_1 + R_2}
$$

## Ohms lag

Ohms lag är följande:  
$U = R * I$

Viktigt att veta är att man kan skriva om detta beroende på vad man vill ha fram.

Vill man t.ex ha fram $I$ och har $U$ och $R$ så kan detta skrivas $I = \frac{U}{R}$ och detta går att göra för att få fram en formel för samtliga delar av ohms lag genom att följa reglerna för ekvationslära.

### Exempel

**Ex 1:**

Har man en krets med en spänning på 20V och en ett motstånd med resistans 4 k$\Omega$ och vill ha fram spänningen kan detta alltså lösas:  
$\frac{20}{4000} = 0,005 = 5\text{mA}$ (5 milliampere).

**Ex 2:**

En krets med följande motstånd samt ström:

$$
R_1 = 10\Omega \\
R_2 = 20\Omega \\
R_3 = 30\Omega \\
I = 2\text{A}
$$

Vad är spänningen U?

Här krävs två saker, först behöver vi veta vad den total spänningen är, sen behöver vi använda denna tillsammans med strömmen och Ohms lags för att räkna ut spänningen.

Först resistansen:  
$R_{tot} = R_1 + R_2 + R_3 = 10 + 20 + 30 = 60\Omega$

Detta kan vi sen stoppa in i Ohms lag:  
$U = R * I = 60 * 2 = 120\text{V}$

Svaret är $U = 120\text{V}$

Vill vi räkna spänningen över ett av motstånden så kan vi också göra detta. Spänningen över $R_1$ är t.ex $10 * 2 = 20\text{V}$.

Vi kan med andra ord använda Ohms lag på delar av vår krets utan problem.

Vi kan även se att summan av spänningen över varje motstånd blir spänningen vi fick fram:

$$
\begin{align*}
&U_1 = R_1 * I = 10 * 2 = 20\text{V} \\
&U_2 = R_1 * I = 20 * 2 = 40\text{V} \\
&U_3 = R_1 * I = 30 * 2 = 60\text{V} \\
&U_{tot} = U_1 + U_2 + U_3 = 20 + 40 + 60 = 120\text{V}
\end{align*}
$$
