---
title: Datateknisk Introduktion - Föreläsning 2
order: 20
---

# Datateknisk Introduktion - Föreläsning 2

## Fortsättning på föreläsning 1

Notera att föregående föreläsning avslutades med genomgång av strategi 1 "Pusselmetoden".

### Fortsättning: Räkna från bas 10 till bas 2

Strategi 2: Dela med 2 metoden

Exempel 1: Konvertera $56_{10}$ till bas 2 (binärt):

1. Vi börjar med att dela vårt tal med 2
2. $\frac{52}{2} = 28$ => Skriv med decimal: 28,0
3. Ta decimaldelen och multiplicera med vår bas, 28,**0** => $0*2 = 0$ => Första siffran i vårt tal är 0
4. Ta kvarvarande heltal, 28, repetera => $\frac{28}{2} = 14$ => 14,**0** => Andra siffran är $0*2 = 0$ => Fortsatt är talet: **0**0
5. Fortsätt: $\frac{14}{2} = 7$ => 7,**0** => $0*2 = 0$ => Fortsatt är talet: **0**00
6. $\frac{7}{2} = 3,5$ => Här får vi 0,5 som decimaldel, principen är samma => $0,5*2 = 1$ => Fortsatt är talet **1**000
7. Eftersom vi använt vår decimal har vi 3 kvar, vi fortsätter med resterande tal som 3
8. $\frac{3}{2} = 1,5$ => $0,5*2 = 1$ => Fortsatt är talet **1**1000
9. Samma som i steg 7, vi tar heltalsdelen som är kvar: $\frac{1}{2} = 0,5$ => $0,5*2 = \bold 1$ => Fortsatt är talet **1**11000
10. Vår heltalsdel är nu 0, vi är klara, hela talet blir $111000_2$

Exempel 2: Räkna $17_{10}$ till bas 2

1. $\frac{17}{2} = 8,5$ => $0,5*2 = 1$ => Första siffran är 1
2. Notera att detta stämmer även överens med det faktum att ojämna tal alltid har en 1a längst till höger, jämna tal har en 0a
3. $\frac{8}{2} = 4$ => 4,**0** => $0*2 = 0$ => Andra siffran är 0, talet hittils: **0**1
4. $\frac{4}{2} = 2$ => 2,**0** => $0*2 = 0$ => Talet hittils: **0**01
5. $\frac{2}{2} = 1$ => 1,**0** => $0*2 = 0$ => Talet hittils: **0**001
6. $\frac{1}{2} = 0,5$ => $0,5*2 = 1$ => Talet hittils: **1**0001
7. Vår heltalsdel är nu 0, vi är klara, hela talet blir: $10001_2$

### Hexadecimala tal:

Tal i basen 16, används för att skriva ut binära tal kortare.

Använder symbolerna (siffrorna) 0-F: 1, 2, 3, 4, 5, 6, 7, 8, 9, A (10), B (11), C (12), D (13), E (14), F (15)  
Vi kan i praktiken representera 0-15 med en symbol.

#### Att räkna från hexadecimalt till decimalt

Principen blir den samma som i alla positionsbaserade talsystem. Vi räknar symbolens värde multiplicerat med basen upphöjt till positionen (position börjar på 0).  
Formel: $\text{symbol}*16^\text{position}$

Exempel på ett hexadecimalt tal: $\text{A5}_{16}$

$$
\begin{align*}
  \text{A} \negmedspace & \qquad 5 \\
  \vert & \qquad \lfloor \> \raisebox{-0.5em}{$5*16^0 = 5*1 = 5$} \\
  \lfloor & \> \raisebox{-0.5em}{\text{A}$_{16} = 10_{10}\Rightarrow10*16^1 = 10*16 = 160$} \\
\end{align*}
$$

Addera värdet för varje position: $160 + 5 = 165$  
$\text{A5}_{16} = 165_{10}$

Exemepel 2: $\text{A00}_{16}$

$$
\begin{align*}
  \text{A} \negmedspace & \qquad 0 \qquad 0 \\
  \vert & \qquad \, \vert \qquad \lfloor \> \raisebox{-0.5em}{$0*16^0 = 0$} \\
  \vert & \qquad \kern{2mu} \lfloor \> \raisebox{-0.5em}{$0*16^1 = 0$} \\
  \lfloor & \> \raisebox{-0.5em}{\text{A}$_{16} = 10_{10}\Rightarrow10*16^2 = 10*256 = 2560$}
\end{align*}
$$

Addera värdet för varje position: $2560 + 0 + 0 = 2560$  
$\text{A00}_{16} = 2560_{10}$

#### Att räkna från decimalt till hexadecimalt

Samma princip som dela med 2 metoden, men vi delar med 16 pga att basen är 16.

Exempel 1: $47_{10}$

1. $\frac{47}{16} = 2,9375$
2. Ta decimaldelen, multiplicera med vår bas: $0,9375 * 16 = 15$ => konvertera till hexadecimal symbol 15 = F, första symbolen är F.
3. Repetera med vår heltalsdel, 2: $\frac{2}{16} = 0,125$
4. Ta decimaldelen: $0,125 * 16 = 2$, fortsatt är vårt tal **2**F
5. Vi har en 0a kvar som heltal, vi är klara. Vårt tal är $\text{2F}_{16}$

Notera:  
Har du en heltalsdel som är _under_ 16 kan du placera detta direkt och sen avsluta.  
Dvs steg 3 ovan är onödigt, vi hade direkt kunnat sätta vår 2a längst till vänster.  
Detta pga att vi egentligen tar $\frac{2}{16} * 16$, detta blir alltid 2 då division och multiplikation med samma tal tar ut varandra: $\frac{2}{\cancel{16}} * \cancel{16} = 2$.  
Precis som att $\frac{5}{10} * 10$ blir 5 ($\frac{5}{10} = 0,5 \rightarrow 0,5 * 10 = 5$).  
Eftersom att talet är mindre än 16 vet vi också att delar du detta med 16 så blir resultatet mindre än 1 och vi har ingen heltalsdel över, vi kommer därmed kunna avsluta efteråt. Precis som ovan avslutar vi direkt efter steg 3-4 där vi hanterar 2an (som är mindre än 16).

Exempel 2: $156_{10}$

1. $\frac{156}{16} = 9,75 \rightarrow 0,75 * 16 = 12$ => Hexadecimal symbol 12 = C, första symbolen (siffran) är C
2. $\frac{9}{16}$ => Då vår heltalsdel är under 16 kan vi placera denna direkt i positionen, och detta blir sista talet => Fortsatt är talet **9**C
3. Vi är klara, hela talet är $\text{9C}_{16}$

Hade vi velat göra det uförligt istället för vår genväg i steg 2, för tydlighetens skull, ser det ut såhär:

1. $\frac{156}{16} = 9,75 \rightarrow 0,75 * 16 = 12$ => Hexadecimal symbol 12 = C, första symbolen (siffran) är C
2. Repetera med 9an som är kvar: $\frac{9}{16} = 0,5625$
3. Ta decimaldelent: $0,5625 * 15 = 9$, fortsatt är vårt tal **9**C.
4. Vi är klara, vi har 0 kvar som heltal, hela talet är $\text{9C}_{16}$

Man _måste_ inte använda genvägen, resultate blir samma. Är man osäker är det bättre att göra alla stegen tills man får 0, såsom i exempel 1.

#### Att räkna från hexadecimalt till binärt (och tillbaka)

```
Dec. Hex.  Binärt
0     0     0000
1     1     0001
2     2     0010
3     3     0011
4     4     0100
5     5     0101
6     6     0110
7     7     0111
8     8     1000
9     9     1001
10    A     1010
11    B     1011
12    C     1100
13    D     1101
14    E     1110
15    F     1111
```

Med hjälp av denna "fusklapp" kan vi konvertera hexadecimalt till binärt enkelt.

Exempel tal: $\text{B3}_{16}$

$$
\text{B}_{16} = 1011_2 \\
3_{16} = 0010_2
$$

Slå ihop delarna:

$\text{B}\enspace3 \Rightarrow 1011\enspace0011 \Rightarrow 10110011_2$

Ta ett längre tal: $\text{A647}_{16}$

$$
\text{A}_{16} = 1010_2 \\
6_{16} = 0110_2 \\
4_{16} = 0100_2 \\
7_{16} = 0111_2
$$

$\text{A} \enspace 6 \enspace 4 \enspace 7 \Rightarrow 1010 \enspace 0110 \enspace 0100 \enspace 0111  \Rightarrow 1010011001000111_2$  
Notera att vi ofta skriver det binära i grupper om 4, för att enkelt kunna tyda det, och då varje grupp om 4 är en hexadecimal symbol.

På andra hållet:

Exempel: $10110101_2$ hexadecimalt

Dela upp i grupper om 4 => 1011 0101  
Använd fusklappen:

$$
1011_2 = \text{B}_{16} \\
0101_2 = 5_{16}
$$

$1011 \enspace 0101 \Rightarrow \text{B} \enspace 5 \Rightarrow \text{B5}_{16}$

Exempel då vi inte enkelt kan dela upp det binära talet i grupper om 4:

Tal: $110010_2$  
Precis som i ett decimalt tal får vi lägga till 0or till vänster. $0015 = 15$

Använd samma princip, lägg till 0or tills vi får ett tal vi enkelt kan dela upp i 4or:  
**00**110010 => **00**11 0010

Använd metoden som ovan:

```
Binärt: 0011  0010
Hexadec:  3     2
```

$110010_2 = 32_{16}$

#### Tal med decimal

Exempel: 11,11 (bas 2)

Här vill vi skapa två grupper om 4a, notera att en grupp inte får ha ett komma i mitten, därav blir detta två.

Som nämnt innan kan vi lägga till nollor till vänster, som i ett decimalt tal. Samma sak gäller till höger om kommat. Dvs. 56,7 = 56,700000  
Generellt kan man säga att man får lägga till nollor på ytterkanterna av tal utan att påverka dess värde.

Använd principen:  
$11,11 = 0011,1100$

Översätt med vår "fusklapp"

$$
0011_2 = 3_{16} \\
1100_2 = 12_{10} = \text{C}_{16}
$$

$11,11_2 = \text{3,C}_{16}$

## Början på slides för föreläsning 2

### Maximala värden

Vad är det största värdet som vi kan representera med ett visst antal tecken eller siffror?

Formeln: $\text{basen}^\text{antalet siffror} - 1$

Exempel: Vad är det största talet vi kan beskriva med 4 siffror i basen 10?

$10^4 - 1 = 10 000 - 1 = 9999$ (Ganska självklart för oss när man ser det decimalt)

Samma princip gäller i t.ex bas 7

Största talet med 3 siffror i bas 7:  
$7^3 - 1 = 343 - 1 = 342$

### Konvertera binärt till/från decimalt med decimaldel/binaldel

Decimaldel / Binaldel:  
Är delen efter kommat, i 8,94 är ,94 decimaldelen. Termen "binaldel" är namnet på denna del i ett binärt tal. Dvs att i 1010,01 är ,01 binaldelen, siffrorna efter kommat kallas binaler istället för decimaler.  
Detta måste man inte kunna och nedan kallar jag dessa oavsett bas för decimaldel och decimaler, för enkelhetens skull.

(I hexadecimala tal kallas delen för hexaldel, och siffrorna kallas hexaler)

#### Binärt till decimalt

Exempel tal: $1001,011_2$ till bas 10

Använd positionernas värde, precis som i föreläsning 1:

$$
\begin{align*}
  1& \qquad 0 \qquad 0 \qquad 1, \qquad 0 \qquad 1 \qquad 1 \\
  \vert& \qquad \, \vert \qquad \, \vert \qquad \> \vert \qquad \enspace \vert \qquad \> \vert \qquad \, \lfloor \> \raisebox{-0.5em}{Position -3: $1*2^{-3} \rightarrow$ Se nedan} \\
  \vert& \qquad \, \vert \qquad \, \vert \qquad \> \vert \qquad \enspace \vert \qquad \> \lfloor \> \raisebox{-0.5em}{Position -2: $1*2^{-2} \rightarrow$ Se nedan} \\
  \vert& \qquad \, \vert \qquad \, \vert \qquad \> \vert \qquad \kern{7mu} \lfloor \> \raisebox{-0.5em}{Position -1: $0*2^{-1} \rightarrow$ Se nedan} \\
  \vert& \qquad \, \vert \qquad \, \vert \qquad \, \lfloor \> \raisebox{-0.5em}{$1 * 2^0 = 1$} \\
  \vert& \qquad \, \vert \qquad \, \lfloor \> \raisebox{-0.5em}{$0 * 2^1 = 0$} \\
  \vert& \qquad \kern{2mu} \lfloor \> \raisebox{-0.5em}{$0 * 2^1 = 0$} \\
  \lfloor& \> \raisebox{-0.5em}{$1 * 2^3 = 8$}
\end{align*}
$$

Potenser med negativa tal:  
$2^{-1}$ kan skriva som $\frac{1}{2^1} = \frac{1}{2} = 0,5$  
$2^{-2}$ kan skriva som $\frac{1}{2^2} = \frac{1}{4} = 0,25$  
$2^{-3}$ kan skriva som $\frac{1}{2^3} = \frac{1}{8} = 0,125$

Generell regel: $x^{-y} = \frac{1}{x^y}$ eller i fallet med binära tal: $2^{-y} = \frac{1}{2^y}$

Applicera ovan:

$$
\begin{align*}
  1& \qquad 0 \qquad 0 \qquad 1, \qquad 0 \qquad 1 \qquad 1 \\
  \vert& \qquad \, \vert \qquad \, \vert \qquad \> \vert \qquad \enspace \vert \qquad \> \vert \qquad \, \lfloor \> \raisebox{-0.5em}{Position -3: $1*2^{-3} = 1 * \frac{1}{2^3} = 1 * \frac{1}{8} = 1 * 0,125 = 0,125
$} \\
  \vert& \qquad \, \vert \qquad \, \vert \qquad \> \vert \qquad \enspace \vert \qquad \> \lfloor \> \raisebox{-0.5em}{Position -2: $1*2^{-2} = 1 * \frac{1}{2^2} = 1 * \frac{1}{4} = 1 * 0,25 = 0,25
$} \\
  \vert& \qquad \, \vert \qquad \, \vert \qquad \> \vert \qquad \kern{7mu} \lfloor \> \raisebox{-0.5em}{Position -1: $0*2^{-1} = 0 * 1 * \frac{1}{2^1} = 0 * 1 * \frac{1}{2} = 0 * 0,5 = 0
$} \\
  \vert& \qquad \, \vert \qquad \, \vert \qquad \, \lfloor \> \raisebox{-0.5em}{$1 * 2^0 = 1$} \\
  \vert& \qquad \, \vert \qquad \, \lfloor \> \raisebox{-0.5em}{$0 * 2^1 = 0$} \\
  \vert& \qquad \kern{2mu} \lfloor \> \raisebox{-0.5em}{$0 * 2^1 = 0$} \\
  \lfloor& \> \raisebox{-0.5em}{$1 * 2^3 = 8$}
\end{align*}
$$

Precis som tidigare adderar vi sedan, heltalsdel och decimaldel var för sig:  
Heltalsdel: $8 + 1 = 9$  
Decimaldel: $0,25 + 0,125 = 0,375$

Lägg ihop delarna: $9 + 0,375 = 9,375$  
$1001,011_2 = 9,375_{10}$

#### Decimalt till binärt

Vi använder svaret från ovan, enbart för att då ser vi enkelt om vi har rätt svar.

Räkna $9,375_{10}$ till bas 2

Börja med heltalen, $9_{10}$ till bas 2:  
Använd metoder från föreläsning 1 eller fusklappen ovan: $9_{10} = 1001_2$

Talet hittils: $1001,xxx$ ($x$ är våra okända decimaler)

Nu decimaldelen:  
Multiplicera decimalen med basen: $0,375 * 2 = 0,75$

Första talet, till vänster om kommat (**0**,75) sätter vi ut, talet är nu $1001,0xxx$

Multiplicera sedan decimaldelen av svaret igen med basen:  
$0,75 * 2 = 1,5$ => Sätt ut talet till vänster om kommat: talet är nu $1001,01xxx$

Multiplicera decimaldelen av svaret:  
$0,5 x 2 = 1,0$ => Sätt ut heltalet: $1001,011xxx$

Vi har inga decimaler kvar, vi är klara.

$9,375_{10} = 1001,011_2$
