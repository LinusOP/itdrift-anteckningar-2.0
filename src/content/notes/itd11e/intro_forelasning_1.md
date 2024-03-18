---
title: Datateknisk Introduktion - Föreläsning 1
order: 10
---

# Datateknisk Introduktion - Föreläsning 1

## Talsystem

Positionsbaserade talsystem

### Decimalt talsystem

Tecken 0-9

$$
\begin{align*}
  \text{2} \negmedspace & \kern{36mu} 1 \kern{36mu} 5 \\
  \vert & \kern{36mu} \, \vert \kern{36mu} \lfloor \> \raisebox{-0.5em}{Ental - $5 * 1$ (Egentligen $5 * 10^0$)} \\
  \vert & \kern{36mu} \kern{2mu} \lfloor \> \raisebox{-0.5em}{Tiotal - $1*10$ (Egentligen $1*10^1$)} \\
  \lfloor & \> \raisebox{-0.5em}{Hundratal - $1*101$ (Egentligen $1*10^2$)}
\end{align*}
$$

Formel: $\text{siffra} * 10^\text{position}$ (Ex: 8**6**489 - 6an är i position 3 (vi börjar på 0, från höger), värde: $6*10^3 = 6*1000 = 6000$)

### Binärt talsystem

Tecken 0 och 1

Exempel på varför vi behöver förstå binära tal:  
En IP adress ex: 192.162.0.10 är egentligen 32 1or och 0or, representerade i bas 10 för människors skull

Formel: $\text{siffra} * 2^\text{position}$ (Ex: 1**1**10 - 1an har position 2 (börja på 0, från höger), värde: $1*2^2 = 1*4 = 4$)

#### Terminologi:

Datorers minsta del är en bit, en 0a eller 1a.

$$
\begin{align*}
  \text{1} \negmedspace & \kern{36mu} 0 \kern{36mu} 0 \kern{36mu} 1 \\
  \vert & \kern{36mu} \quad \kern{36mu} \kern{36mu} \lfloor \> \raisebox{-0.5em}{Minst signifikanta bit (Least Significant Bit, LSB)} \\
  \lfloor & \> \raisebox{-0.5em}{Mest signifikanta bit (Most significant bit, MSB)}
\end{align*}
$$

Ett binärt tal med 8 bitar är en byte

#### Räkna bas 2 till bas 10

Exempel 1:  
Ex nummer: $1011_2$ (4 bitar)

$$
\begin{align*}
  1& \kern{36mu} 0 \kern{36mu} 1 \kern{36mu} 1 \\
  \vert& \kern{38mu} \vert \kern{40mu} \vert \kern{38mu} \lfloor \> \raisebox{-0.5em}{$1 * 2^0 = 1$} \\
  \vert& \kern{38mu} \vert \kern{39mu} \lfloor \> \raisebox{-0.5em}{$1 * 2^1 = 1*2 = 2$} \\
  \vert& \kern{36mu} \lfloor \> \raisebox{-0.5em}{$0 * 2^2 = 0*(2*2) = 0*4 = 0$} \\
  \lfloor& \> \raisebox{-0.5em}{$1 * 2^3 = 1 * (2*2*2) = 1*8 = 8$}
\end{align*}
$$

Addera varje positions värde: $8+0+2+1=11$

Exempel 2:  
Ex nummer: $101011_2$ (6 bitar)

$$
\begin{align*}
  1& \kern{36mu} 0 \kern{36mu} 1 \kern{36mu} 0 \kern{36mu} 1 \kern{36mu} 1 \\
  \vert& \kern{38mu} \vert \kern{40mu} \vert \kern{40mu} \vert \kern{40mu} \vert \kern{39mu} \lfloor \> \raisebox{-0.5em}{$1 * 2^0 = 1$} \\
  \vert& \kern{38mu} \vert \kern{40mu} \vert \kern{40mu} \vert \kern{39mu} \lfloor \> \raisebox{-0.5em}{$1 * 2^1 = 2$} \\
  \vert& \kern{38mu} \vert \kern{40mu} \vert \kern{39mu} \lfloor \> \raisebox{-0.5em}{$0 * 2^2 = 0$} \\
  \vert& \kern{38mu} \vert \kern{39mu} \lfloor \> \raisebox{-0.5em}{$1 * 2^3 = 8$} \\
  \vert& \kern{36mu} \lfloor \> \raisebox{-0.5em}{$0 * 2^4 = 0$} \\
  \lfloor& \> \raisebox{-0.5em}{$1 * 2^5 = 32$}
\end{align*}
$$

Lathundsvariant:  
Skriv ut varje positions värde, addera där du har en 1a

$$
\begin{align*}
  1& \kern{36mu} 0 \kern{36mu} 1 \kern{36mu} 0 \kern{36mu} 1 \kern{36mu} 1 \\
  \vert& \kern{38mu} \vert \kern{40mu} \vert \kern{40mu} \vert \kern{40mu} \vert \kern{39mu} \lfloor \> \raisebox{-0.5em}{Värde 1} \\
  \vert& \kern{38mu} \vert \kern{40mu} \vert \kern{40mu} \vert \kern{39mu} \lfloor \> \raisebox{-0.5em}{Värde 2} \\
  \vert& \kern{38mu} \vert \kern{40mu} \vert \kern{39mu} \lfloor \> \raisebox{-0.5em}{Värde 4} \\
  \vert& \kern{38mu} \vert \kern{39mu} \lfloor \> \raisebox{-0.5em}{Värde 8} \\
  \vert& \kern{36mu} \lfloor \> \raisebox{-0.5em}{Värde 16} \\
  \lfloor& \> \raisebox{-0.5em}{Värde 32}
\end{align*}
$$

1 finns på position 5, 3, 2, 0 vilka har värdena: 32, 8, 4, 1  
$101101_2 = $32 + 8 + 4 + 1 = 45_{10}$

## Räkna bas 10 till bas 2

Exempel, konvertera $54_{10}$ till bas 2

Strategi 1 "Pusselmetoden":

Skriv ut varje värde för varje position upp tills vi når talet.  
64 32 16 8 4 2 1

Sedan ignorerar vi första talet (Sätter du en etta på 64 är du över 52, därmed kan den inte användas för att beskriva 52)  
Sedan börjar vi subtrahera talen från vänster, talen vi kan subtrahera blir 1 i vårt binära tal, resterande 0. Målet är att inte ha något kvar, men vi får inte vara under 0.

$$
\begin{align*}
  3&2 \kern{36mu} 16 \kern{36mu} 8 \kern{36mu} 4 \kern{36mu} 2 \kern{36mu} 1 \\
  \vert& \kern{52mu} \vert \kern{44mu} \vert \kern{40mu} \vert \kern{40mu} \vert \kern{39mu} \lfloor \> \raisebox{-0.5em}{$0 \rightarrow 0-1=-1$ vilket bryter vår regel ovan, därmed 0} \\
  \vert& \kern{52mu} \vert \kern{44mu} \vert \kern{40mu} \vert \kern{39mu} \lfloor \> \raisebox{-0.5em}{$1 \rightarrow 2-2=0$ Vilket ger att vi är klara, vi har nått 0, allt till höger är 0} \\
  \vert& \kern{52mu} \vert \kern{44mu} \vert \kern{39mu} \lfloor \> \raisebox{-0.5em}{$1 \rightarrow 6-4=2$} \\
  \vert& \kern{52mu} \vert \kern{43mu} \lfloor \> \raisebox{-0.5em}{$0 \rightarrow 6-8 = -1$ (Får ej vara under 0, därmed får positionen 0)} \\
  \vert& \kern{52mu} \lfloor \> \raisebox{-0.5em}{$1 \rightarrow 22-16=6$} \\
  \lfloor& \> \raisebox{-0.5em}{$1 \rightarrow 54-32=22$} \\
  -&-------------- \\
  1& \kern{50mu} 1 \kern{40mu} 0 \kern{40mu} 1 \kern{40mu} 1 \kern{40mu} 0 \kern{4em} = 110110_2
\end{align*}
$$

## Frågor under föreläsning

**Hur mycket ska man utveckla på tentor?**

Står det t.ex "Vad blir 1010 decimalt?" då krävs endast svar, "10".  
Dock kan man rädda en del av poängen om man visar sin tankegång, även om man i slutändan får fel svar.  
Därför är det oftast värt att utveckla mer än vad man _måste_ för att vara på den säkra sidan.

**Finns där gamla tentor på canvas?**

Ja, dessa kan vara något efter eller sakna vissa saker, då kursen uppdaterats, men kan ändå vara bra att ha

**Finns där gränser för U och G på tentor, hur funkar det??**

Ja det finns det, olika för lärare och kurser.

"Standard Erictenta"  
(Poänggränserna brukar även vara liknande för tentor från andra lärare som Ted osv)  
Totalt - 50p  
VG - 40p  
G - 25p

(Får man _alla_ rätt får man en pizza (enbart för Erics tentor))

**Vad händer när man lägger till nollor på binära tal?**

I slutet händer inget, dvs 101 -> **0**101 är samma tal, precis som i decimala system, 67 = **0**67 (osv)

I början så händer dock något, titta decimalt, 13 -> 13**0**, stor skillnad.  
Samma princip i binära tal, 101 = 5, 101**0** = 10

## Övrigt

**Mer om tentor från Eric**

Tentor delas normalt upp i huvuduppgifter eller kategorier där det krävs poäng i varje kategori för godkänt.  
Klarar man alla delar utom en får man komplettera specifikt i den kategorin.
