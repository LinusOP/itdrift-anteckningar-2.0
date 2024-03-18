---
title: Föreläsning 5
order: 50
---

# Föreläsning 5 - IP, CIDR, och Fragmentering

## Konfigurering av switchar

När vi under laborationer kopplar oss till console porten på en switch (eller router), vilket vi kommer göra med serialkablar, så kommer vi ha möjlighet att komma åt dess terminal.

I ciscos terminal finns där tre lägen, "user mode", "enable mode", och "config mode". Där vi har olika åtkomst och kan göra olika saker.

Viktigt är att veta att vi måste inte skriva ut hela kommandon, vi behöver enbart skriva så långt så att de vi skrivit enbart passar ett kommando. Dvs skriver vi t.ex "en" så vet switchen att det enda kommandot som passar är "enable". Men finns där fler kommandon som börjar med "en" så får vi fortsätta skriva tills det bara passar ett kommando.

När vi ansluter kommer det se ut som så:

```sh
Switch>
```

Pilen längst fram (`>`) indikerar att vi är i "user mode".

Vi kan därifrån inte göra så mycket, utan måste ta oss in i enable mode:

```sh
Switch> en
Switch#
```

Som vi ser så ändras tecknet efter "Switch" och `#` indikerar att vi är i enable mode.

Härifrån kan vi göra vissa ändringar men för den mesta konfigurationen krävs att vi är i config mode. För att komma dit används följande:

```sh
Switch# conf t
Switch (config)#
```

Här indikerar parentesen att vi är i config mode. Vi kan nu t.ex konfiguerar ett specifikt interface.

```sh
Switch (config)# int g0/1
Switch (config-if)#
```

Här kan vi sedan utföra saker såsom att öppna eller stänga detta interface osv.

### Port security

Något som också kan vara viktigt är att inte låta vem som helst ansluta till en port, vi kan då låsa en port till en specifik MAC-adress, vilket innebär att enbart den specifika enheten kan ansluta.

## IP-Paket

Precis som när vi kollat på lager 2 och dess header så har varje IP-Paket en header, där finns ett antal fält, se slide 15 för föreläsningen för en bra representation.

Vissa fält kollas på senare, men några nämnbara:

- Version - Indikerar IP versionnummer (4 = IPv4)
- Internet Header Length (IHL) - Antalet 32 bitars ord i headern, oftast 5 men kan va mer
- Total length - Längden av headern + data, mäts i antalet byte
- Source & Destination - Anvsändarens samt mottagarens IP-adress
- Time To Live (TTL) - Anger antalet gånger detta paket får routas innan det slängs, för att undvika oändliga loopar
- Protocol - Anger om det finns protokoll i datan, t.ex TCP, UDP osv
- Header checksum - Används för felkontroll, likt FCS i headern i en frame (lager 2)

## Klasser IP-adresser

I original specifikation för IP fanns 3 klasser av när för unicast, A, B, och C där varje klass är ett mindre nät än föregående

Nätmasker som vi ofta stöter på kan löst kopplas till en klass, men detta är inte riktigt hela sanningen

| CIDR  | Normalt           | "klass" | Lös översättning | Antal IP-adresser                |
| ----- | ----------------- | ------- | ---------------- | -------------------------------- |
| `/8`  | (`255.0.0.0`)     | A       | Mycket stort     | $2^{24} - 2 \approx 16 miljoner$ |
| `/16` | (`255.255.0.0`)   | B       | Stort            | $2^{16} - 2 \approx 65000$       |
| `/24` | (`255.255.255.0`) | C       | "Normalt"        | $2^8 - 2 = 254$                  |

I verkligheten är ett klass A nät ett nät där adressen (binärt sett) börjar med 0, resterande 7 bitar i första oktetten indikerar nät och resterande 24 bitar (3 oktetter) indikerar host.

Dvs `0xxx xxxx` i första oktetten. Detta ger oss nätadresser från 1.0.0.0 till 127.0.0.0

Klass B har 1 och sen 0 i första oktetten, `10xx xxxx`, detta ger ett spann 128.0.0.0 - 191.255.0.0

Sist, klass C, `110x xxxx`, ger spann 192.0.0.0 till 223.255.255.0

Dock har man numera delat upp varje klass i mindre nät. T.ex ett vanligt Klass C nät idag använder ofta `192.168.0.0/24`, vilket ingår i klass C men inte egentligen är ett helt C nät. Detta är det vi ser i tabellen ovan. Anledningen är helt enkelt att ett litet företag på 10 anställda förmodligen aldrig hade behövt ett helt Klass C nät.

## CIDR notering

Idag använder vi dock inte klasser för IP adresser, istället används CIDR. Vilket är ett system för att dela upp IP adresser, inklusive adresserna i våra tidigare klasser.

CIDR står för "Classless Inter-domain Routing"

Det är detta vi egentligen använder när vi skrive en nätmask som `/24`.

Som diskuterat visar siffran hur många 1or vi har i nätmasken, vilket indikerar hur stor del av vår IP-adress som används för nät kontra hosts.

Har vi t.ex ett nät: `192.168.1.0/24` där vi har 254 möjliga adresser, men vi vill dela upp detta, så kan vi sätta en nätmaks `/26` och därmed indikerar att två bitar i sista oktetten också används för nät.

När man införde CIDR införde man också vissa nät som är privata, dessa ser ni på slide 23.
