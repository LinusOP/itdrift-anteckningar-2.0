---
title: Föreläsning 10
order: 100
---

# Föreläsning 10 - Subnetting

## Problem gällande antal IP adresser

Historiskt sett så delade man upp IP adresser i tre klasser, A, B, och C. Där A är absolut störst, B är stort, och C är litet.

Dessa har vi tittat på innan, men som repetition kan vi titta på ett C-nät:

Total antal bitar i en IPv4 adress: 32  
Nätadress: 24 bitar  
Hosts: 8 bitar

Nätmasken blir då, som bekant, `255.255.255.0` (eller `/24` med CIDR notering)

Antalet host vi får då kan vi beräkna med: $2^8 - 2 = 256 - 2 = 254$, vi subtraherar 2 då vi har en nätadress och en broadcastadress som inte får användas. Generell kan vi räkna $2^h - 2$ där h är antalet hostbitar för att får ut antalet hostadresser.

I början var detta ofta tillräckligt, de flesta behövde bara ett C-nät.

Men när datorer väl blev populära så fick många företag fler datorer, som alla behövde IP adresser. Då började man begära B-Nät, dessa har dock 16 hostbitar, vilket ger $2^{16} - 2 = 65534$ hosts. Har man då bara 1000 hosts så blir det ett oerhört slöseri med adresser.

**Lösningen**

För att undvika detta kan vi använda privata adresser. T.ex 192.168.0.0, 192.168.1.0, ..., 192.168.15.0 (16 olika C-nät) Dessa funkar i vissa fall, men dessa översätts i slutändan till en publik IP (s.k NAT, något vi kollar på i senare kurs).

Alternativ 2 är just subnetting. Vi delar upp stora nät (ex B-nät) i mindre delar för att inte slösa. Detta görs genom att använda andra nätmasker än `/8`, `/16`, eller `/24`.

## Olika adresser i ett nät

Kollar vi på ett C-nät, t.ex `192.168.1.0/24` så har vi följande viktiga adresser:

`192.168.1.0/24` - Nätadress/Nätid  
`192.168.1.1/24` - Vanligtvis en router (notera att det måste inte vara det)  
`192.168.1.2-254` - Adresser för hosts (notera att `.1` också är en host adress, det är bara vanligt att den använd till vår router)  
`192.168.1.255` - Broadcast-adress

## Introduktion subnetting

Definitionen ur föreläsningens slides lyder:

> Den modernare betydelsen är ett nätverk som har fått sin adressmängd från ett större IP-nät genom subnetting. Med större IP-nät menas i detta fall A,B eller C-nät.
>
> Ni är bekanta med nätverksadressen 198.1.1.0 /24
> Låt säga att vi skulle vilja ha fyra mindre nät med 40 hosts i vardera nät. Hur ska vi lösa det... fundera på det, vi kommer att återkomma till problemet

Jo, det vi då göra är att dela upp vårt C-nät (`198.1.1.0/24`) i mindre delar. Hur gör vi detta?

Enkelt sett får vi låna bitar från hostbitarna för att använda till nät. Vi har just nu 24 nätbitar och 8 hostbitar. För att räkna ut hur många bitar som krävs för att antal nät gäller $2^s = n$ där s är hur många bitar som går till vårt subnät och n är antalet subnät vi behöver/får. Vi vill ha 4 nät, därmed $2^s = 4$, svaret blir då 2 bitar ($2^2 = 4$).

Vi vill alltså ha följande förfarande:

Nätbitar: 24  
Subnätbitar: 2  
Hostbitar: 6

Notera att vi kan inte ändra våra nätbitar, vi är tilldelade nätet `198.1.1.0/24` externt, vi styr inte över detta och kan inte ändra det. Vi styr bara över sista oktetten.

Vad händer då med vår nätmask?  
Jo precis som att `/24` indikerar 24 ettor i vår nätmask så har vi ju nu totalt 26 ettor, våra givna nätbitar, 24 plus 2 som vi lånar från hostbitarna (våra subnätbitar).

Detta ger `/26` som nätmask för våra fyra nät, vi får totalt alltså 26 nätbitar. Det kan också skriva decimal: `255.255.255.192` (`1111 1111.1111 1111.1111 1111.1100 0000` binärt (26 ettor)).

Viktigt är att när vi delar upp vårt nät i fyra subnät så får varje subnät ett eget nätid, en egen broadcast-adress osv. Hur räknar vi ut dessa då?

Jo vi har ju tidigare kollat på `/24` nät. Där vet vi att har vi enbart nollor (binärt) i våra hostbitar så har vi ett nätid. Har vi enbart ettor har vi en broadcast adress. Tittar vi på våra binära tal för vårt nät `198.1.1.0/24` så får vi:

(Notera att i ett riktigt binärt tal har vi såklart inga punkter, men det indikerar här vilken oktett vi är i).

Nätmask: `1111 1111.1111 1111.1111 1111.0000 0000`

Dvs att första 24 bitarna ska matcha för att tilhöra vårt nät (de ska vara `198.1.1.`), sista oktetten är där det kan skilja och fortfarande tillhöra samma nät.

Vad är då vårt nätid binärt? Jo det är ju just när alla hostbitar är 0, dvs: `1111 1111.1111 1111.1111 1111.0000 0000`
Vår broadcast-adress får vi när all hostbitar är 1, dvs: `1111 1111.1111 1111.1111 1111.1111 1111`

Våra första nät ser då ut som följande:

| Nätid        | Default Gateway (DG) | Hostadresser | Broadcast  |
| ------------ | -------------------- | ------------ | ---------- |
| 198.1.1.0/26 | 198.1.1.1            | 198.1.1.2-62 | 198.1.1.63 |

Vårt nätid och vår DG ser normala ut, det känner vi igen, men var får vi hostadresserna och broadcast adressen ifrån?

Jo nu har vi ju 26 nätbitar, först våra fasta `198.1.1.`, sen i sista oktetten får vi då 2 bitar för nät (vårt subnät), samt 6 bitar för host. Dvs vår sista oktett kan delas upp binärt: `00 xxxxxx`. Där "x" används för hostbitar.

I vårt andra subnät får vi istället `01 xxxxxx` osv. På så sätt kan vi räkna ut att vår broadcast ska vara `00 111111` eller decimalt: 63. Samma gäller för alla nätid men då såklart med hostbitarna satta till 0.

Fortsätter vi då får vi följande adresser:

| Nätid          | Default Gateway (DG) | Hostadresser    | Broadcast   |
| -------------- | -------------------- | --------------- | ----------- |
| 198.1.1.0/26   | 198.1.1.1            | 198.1.1.2-62    | 198.1.1.63  |
| 198.1.1.64/26  | 198.1.1.65           | 198.1.1.66-126  | 198.1.1.127 |
| 198.1.1.128/26 | 198.1.1.129          | 198.1.1.120-190 | 198.1.1.191 |
| 198.1.1.192/26 | 198.1.1.193          | 198.1.1.194-254 | 198.1.1.255 |

Vill vi kolla att t.ex broadcast-adressen i vårt tredje nät stämmer så kollar vi på sista oktetten binärt: `10 xxxxxx`. `10` som första bitar då vi är började med subnät `00`, sedan `01` och nu `10`. Vår broadcast är då att alla x ska vara 1, dvs `10 111111`. Vilket vi kan räkna om till decimalt och då få: 191.

Notera att vi enbart kan göra detta för att vi vet att nätmasken är `/26`, på så sätt vet vi att vi tar 2 bitar från sista oktetten för nät och att det är 6 hostbitar kvar.
