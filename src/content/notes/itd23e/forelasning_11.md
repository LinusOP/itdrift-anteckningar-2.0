---
title: Föreläsning 11
order: 110
---

# Föreläsning 11 - Forts. Loopar och Listor & Switchar

## Forts. Loopar och listor

Ett vanligt användningsområde för loopar är att gå igenom det som finns i en lista. Enklast för detta är en Foreach-loop som vi pratat om tidigare. Men ibland vill vi skriva kod som behöver veta vilket varv vi är på också, vi använder då en vanlig For-loop.

Vi har redan tittat på hur vi kan gå igenom element i en lista med en vanlig For-loop, det ser ut såhär:

```powershell
# Skapa lista
$list = @(1, 2, 3, 4, 5);

for ($i = 0; $i -lt $list.Length; $i++) {
    # Hämta varje element ur listan
    $list[$i]
}
```

Denna loopen kommer gå igenom listan och skriva ut varje värde. Men varför detta funkar är inte helt enkelt att utläsa.

Först får vi konstatera vissa saker, framförallt att _positionerna_ i listor börjar på noll. I listan jag skapar ovan så ligger `1` alltså på plats noll, `2` på plats ett osv. Har vi en lista kan vi hämta värdet på en specifik plats som jag gjort ovan, här hämtar jag t.ex värdet på plats 0: `$list[0]`.

En annan viktig del att tänka på här är att längden på en lista kommer alltid vara ett över högsta positionen. Detta låter kanske konstigt men kollar vi på min lista ovan så ser vi att det stämmer. Listan har längden 5, det ser vi enkelt. Och högsta positionen blir ju fyra om vi räknar upp varje position. (0, 1, 2, 3, 4). Som vi ser slutar högsta positionen ett under längden. Detta kommer alltid vara sant.

Hur kan vi då applicera detta för att förstå koden ovan? Jo, vi går igenom vad loopen faktiskt gör. Loopen börjar med variabeln `$i` som vi är vana vid, denna börjar på noll. Varje gång vi loopar så ökar vi variabeln med ett (`$i++`).

Vi kör loopen sålänge variabeln är _mindre än_ längden på vår lista. Den kommeer alltså köra fram tills variabeln är 4, när den blir 5 så är den inte längre mindre än längden och loopen avslutas. Variabeln går alltså från 0 till 4, något bekant är detta ju exakt de positioner vi har i listan!

Genom att köra loopen sålänge vår variabel är _under_ längden, och förutsatt att variabeln börjar på noll (precis som positioner i listor), så kommer vår variabel alltid motsvara en position i listan.

Detta är också användbart med flera listor av samma längd. Med en Foreach kan vi bara gå igenom elementen i en lista åt gången, men med vår For-loop så kan vi använda `$i` som position i flera listor:

```powershell
# Skapa listor
$list1 = @(1, 2, 3, 4, 5);
$list2 = @(6, 7, 8, 9, 10);

for ($i = 0; $i -lt $list.Length; $i++) {
    # Hämta varje element ur våra listor
    $list1[$i]
    $list2[$i]
}
```

## Switchar

Switchar används för att enkelt kunna jämföra en variabel med många olika alternativ. De ser ut såhär:

```powershell
[int]$input = Read-Host "Skriv ett tal"

switch ($input) {
    1 { "Du skrev ett" }
    2 { "Du skrev två" }
    3 { "Du skrev tre" }
}
```

Vi tar in ett tal (och konvererar till en faktisk integer, `Read-Host` ger annars en string), vi ger sedan denna indata och ger till vår switch. Switchen tar variabeln och jämföra med alla de alternativ ja definierat, de som matchar kommer köras.

Det är vad switchar gör, tar in en variabel och jämför med våra villkor. De ställen där villkoren stämmer så kör den koden.

### Break

Viktigt att veta är att vår switch fortsätter att jämföra även när den har fått en matchning. Dvs att om vi uppdaterar vårt skript ovan till detta:

```powershell
[int]$input = Read-Host "Skriv ett tal"

switch ($input) {
    1 { "Du skrev ett" }
    2 { "Du skrev två" }
    3 { "Du skrev tre" }
    1 { "Ett igen!" }
}
```

Och kör det:

```
Skriv ett tal: 1

Du skrev ett
Ett igen!
```

Notera att båda mina villkor för `1` kördes. Den stannade alltså inte efter första utan fortsatte. För att stoppa detta använder man `Break`. Om vi bara vill skriva ut första matchningen för vår etta så ser skriptet ut såhär:

```powershell
[int]$input = Read-Host "Skriv ett tal"

switch ($input) {
    1 { "Du skrev ett"; Break }
    2 { "Du skrev två" }
    3 { "Du skrev tre" }
    1 { "Ett igen!" }
}
```

Skriptet kommer nu jämföra vår variabel med villkoren, nå vår etta, och köra koden. Den kommer sen se "Break" och avbryta resten av switchen.
