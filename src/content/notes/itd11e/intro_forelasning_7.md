---
title: Datateknisk introduktion - Föreläsning 7
order: 70
---

# Datateknisk introduktion - Föreläsning 7

## Bitmönster

Ett bitmönster är egentligen bara en sekvens av bitar, t.ex så är detta två bitmönster:

```
0111
1011
```

Skulle vi sen ta dessa igenom en OR grind så jämför vi varje position för var för sig. Dvs att biten längst till höger i varje mönster är position 0, biten ett steg till vänster är position 1 osv.

Oftast ställer man upp detta som addition, något såhär:

$$
\begin{array}{c}
\phantom{\text{\scriptsize{OR}\space}} 0111 \\
\underline{\text{\scriptsize{OR}\space} 1011} \\
\phantom{\text{\scriptsize{OR}\space}} 1111
\end{array}
$$

Man utför sen den logiska operationen på bitarna som är ovanför varandra, en position i taget.

### Bitmasker

En mask är ett fast bitmönster som man använder på andra bitmönster för att få ut ett visst resultat.

Ex, om vi har bitmönstret `0110` och vi vill skapa en mask, ett bitmönster, som gör att alla bitar blir 0. Då kan vi i detta fall använda en AND operation med enbart 0or som mask.

$$
\begin{array}{c}
\phantom{\text{\scriptsize{AND}\space}} 0110 \\
\underline{\text{\scriptsize{AND}\space} 0000} \\
\phantom{\text{\scriptsize{AND}\space}} 0000
\end{array}
$$

Ett annat exempel är om man vill använda en mask som enbart ger 1or, då kan vi använda en OR operation med enbart 1or.

$$
\begin{array}{c}
\phantom{\text{\scriptsize{OR}\space}} 0110 \\
\underline{\text{\scriptsize{OR}\space} 1111} \\
\phantom{\text{\scriptsize{OR}\space}} 1111
\end{array}
$$

## Binär addition

Exempel tal i decimal form: $7 + 5 = 12$

Oftast ställer vi upp detta som så:

$$
\begin{array}{c}
\phantom{+0} 7 \\
\underline{+\phantom{0} 5} \\
\phantom{+} 12
\end{array}
$$

I binär form:  
$7_{10} = 0111$  
$5_{10} = 0101$

Additionen ser då ut såhär:

$$
\begin{array}{c}
\phantom{+\space} 0111 \\
\underline{+\space 0101} \\
\phantom{+\space} 1100
\end{array}
$$

Hur vi kommer dit är dock inte självklart. Men egentligen är principe samma som i decimal addition, vi använder minnessiffror.

Tittar vi i decimal form ser additionen ut såhär:

$$
\begin{array}{c}
\phantom{+} \underline{1}\phantom{0} \\
\phantom{+0} 7 \\
\underline{+\phantom{0} 5} \\
\phantom{+} 12
\end{array}
$$

Tittar vi då på den binära versionen är principen egentligen den samma, viktigt att tänka på är att du bara får använda 1or och 0or, därmed får du ofta en minnessiffra i binär addition.  
Om vi börjar med position 0 får vi detta:

$$
\begin{array}{c}
\phantom{+\space00} \underline{1} \phantom{0} \\
\phantom{+\space} 0111 \\
\underline{+\space 0101} \\
\phantom{+\space000} 0
\end{array}
$$

Varför blir det då minnessiffra här? Jo position 0 är värd 1, det vet vi sen innan. Adderar vi då två 1or, båda med värdet 1 så får vi 2. Men vi får inte skriva två, vi kan bara använda 0 och 1. Dock har ju nästa position värdet 2, det vet vi också sen innan, vi kan därmed sätta denna 2an i den kolumnen istället, då skrivet som en 1a i kolumnen med värde 2.

Ett annat sätt att kolla på detta är att se var $1_2 + 1_2$ blir, jo det blir ju $10_2$. Och tittar vi så är det egentligen detta vi har skrivit, bara att 0an är längst ner i vår uppställning, men 1an är längst upp som en minnessiffra.

Samma sak gäller om vi har 3 binära 1or att addera. Dvs $1_2 + 1_2 + 1_2 = 11_2$. Ställer vi upp detta får vi följande:

$$
\begin{array}{c}
\phantom{+\space} \underline{1} \phantom{0} \\
\phantom{+\space0} 1 \\
\phantom{+\space0} 1 \\
\underline{+\space\phantom{0} 1} \\
\phantom{+\space} 11
\end{array}
$$

Stegvis:

Tänk på att vi kan alltid lägga till 0or till vänster i ett tal utan att ändra värdet.

$$
\begin{array}{c}
\phantom{+\space} 1 \\
\phantom{+\space} 1 \\
\underline{+\space 1} \\
\end{array}

\Rightarrow

\begin{array}{c}
\phantom{+\space} \underline{1} \phantom{0} \\
\phantom{+\space0} 1 \\
\phantom{+\space0} 1 \\
\underline{+\space\phantom{0} 1} \\
\phantom{+\space0} 1
\end{array}

\Rightarrow

\begin{array}{c}
\phantom{+\space} \underline{1} \phantom{0} \\
\phantom{+\space} 01 \\
\phantom{+\space} 01 \\
\underline{+\space 01} \\
\phantom{+\space} 11
\end{array}
$$

I steg två, varför får vi en 1a längst ner samt en 1 i minnessiffra? Jo för att $1 + 1 + 1 = 3$ men vi får inte skriva 3, så vi får dela upp talet bland våra kolumner, i detta fallet en etta till andra kolumnen (positionsvärde 2) samt en till första kolumnen (positionsvärde 1). 0orna i sista steget har jag lagt till för tydlighetens skull, vi adderar helt enkelt $1 + 0 + 0 + 0 = 1$, även om där inte måste stå 0or.

Tycker man detta är krångligt finns där två regler man kan använda sig av:

$1 + 1 = 0$ med 1 som minnessiffra  
$1 + 1 + 1 = 1$ med 1 som minnessiffra

## Binär subtraktion

Precis som med additionen så är binär subtraktion egentligen samma sak som decimal subtraktion. Tittar vi på ett tal som:

$13 - 7 = 6$ och ställer up det så får vi:

$$
\begin{array}{c}
\phantom{-} 13 \\
\underline{-\phantom{0} 7} \\
\end{array}

\stackrel{\text{3-7 "går" inte}}{\Rightarrow}

\begin{array}{c}
\phantom{-0} \underline{10} \\
\phantom{-} \bcancel{1}3 \\
\underline{-\phantom{0} 7} \\
\end{array}

\Rightarrow

\begin{array}{c}
\phantom{-0} \underline{10} \\
\phantom{-} \bcancel{1}3 \\
\underline{-\phantom{0} 7} \\
\phantom{-0} 6
\end{array}
$$

Vi lånar alltså från större tal när vårt subtraktion i en viss kolumn hade blivit negativ. Samma princip gäller i binär subtraktion.

Dvs.

Tar vi talen: $1110_2 - 0101_2$ och ställer up detta:

$$
\begin{array}{c}
\phantom{-\space} 1110 \\
\underline{-\space 0101} \\
\end{array}
$$

så ser vi direkt att vi måste låna då vår allra första kolumn inte "går" (självklart går det egentligen, precis som i decimal subtraktion, men vi vill inte ha negativa tal).

Då gör vi det:

$$
\begin{array}{c}
\phantom{-\space000} \underline{2} \\
\phantom{-\space} 11\bcancel{1}0 \\
\underline{-\space 0101} \\
\end{array}
$$

Notera att vi här skriver en tvåa ovan, detta ser ju såklart konstigt ut, vi jobbar ju med binära tal och kan inte ha tvåor! Men man gör ofta så och det underlättar i tänkandet.

Fortsätter vi sen så tar vi helt enkelt i vår första kolumn $2 - 1 = 1$

$$
\begin{array}{c}
\phantom{-\space000} \underline{2} \\
\phantom{-\space} 11\bcancel{1}0 \\
\underline{-\space 0101} \\
\phantom{-\space000} 1
\end{array}

\stackrel{\bcancel1 = 0 \text{ ger "noll minus noll"}}{\Rightarrow}

\begin{array}{c}
\phantom{-\space000} \underline{2} \\
\phantom{-\space} 11\bcancel{1}0 \\
\underline{-\space 0101} \\
\phantom{-\space00} 01
\end{array}

\stackrel{1 - 1 = 0}{\Rightarrow}

\begin{array}{c}
\phantom{-\space000} \underline{2} \\
\phantom{-\space} 11\bcancel{1}0 \\
\underline{-\space 0101} \\
\phantom{-\space0} 001
\end{array}

\stackrel{1 - 0 = 1}{\Rightarrow}

\begin{array}{c}
\phantom{-\space000} \underline{2} \\
\phantom{-\space} 11\bcancel{1}0 \\
\underline{-\space 0101} \\
\phantom{-\space} 1001
\end{array}
$$

Kollar vi så ser vi också att detta stämmer, $1110_2 = 14_{10}$ och $0101_2 = 5_{10} \Rightarrow 14 - 5 = 9 \Rightarrow 9_{10} = 1001_2$
