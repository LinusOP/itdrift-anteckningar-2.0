---
title: Föreläsning 10
order: 100
---

# Föreläsning 10 - Villkor och Loopar

För att kunna kolla på loopar behöver vi kika på några av de delar som vi kommer använda när vi bygger våra loopar.

## Listor

En stor del av det man använder loopar till är att göra något för varje objekt i en lista. Men vad är en lista?

En lista är en speciell sorts variabel som inehåller flera värden. Vi kan antingen ge en lista värden när vi skapar den, eller skapa en tom lista som senare fylls med värden.

```powershell
# Tom lista
$tom = @();

# Lista med värden
$full = @(10, 20, 30, 40, 50);
```

## Jämförelser

När vi skriver och använder loopar så kommer vi behöva jämföra värden på vissa ställen. Powershell har många sätt att jämföra men dessa är några av de viktigaste:

- Mindre än - `-lt` (less than)
- Mindre än eller lika med - `-le` (less than or equals)
- Lika med - `-eq` (equals)
- Större än - `-gt` (greater than)
- Större än eller lika med - `-ge` (greater than or equals)

Vi kan även kolla om något _inte_ är lika med något annat, `-ne` (not equals).

Dessa kan vi använda för att kontrollera om värdet av en variabel har ett visst värde jämfört med något annat. T.ex kan vi kolla om en variabel `$a` är störra än 10 med koden `$a -gt 10`.

## Loopar

Loopar används för att repetera delar av koden i ett skript. Där finns olika sorters loopar beroende på vad vi har för information och vad vi behöver, t.ex så om vi vet hur många gånger loopen behöver köras eller inte. Där finns även, som nämnt ovan, loopar specifikt för att gå igenom listor.

### For-loop

En for-loop är en typ av loop som vi använder när vi vet hur många gånger vi vill loopa. En enkel for loop ser ut såhär:

```powershell
for ($i = 0; $i -le 5; $i++) {
    '$i equals ' + $i;
}
```

Här är många delar, först och främst har vi delen i första raden inom parenteserna. Detta avgör hur många gånger loopen kommer köras, och har tre delar som delas av semikolon.

Koden i första delen körs **en gång innan** loopen börjar, och i vårt fall skapar vi variabeln `$i` och ger den värdet noll, `$i = 0`. Här skapar vi variabler som vi vill använda i vår loop och inte behöver senare. Vi kan skapa vilken variabel som helst men normen inom programmering är att man använder `i` inom loopar.

Andra delen är vårt villkor för att stanna loopen, i vårt fall används `$i -le 5`. Alltså är villkoret att `$i` ska vara mindre än eller lika med 5. Denna koden körs **innan** varje varv, och kollar om vi får sant eller falskt. Förutsatt att vi får ut sant (i vårt fall, att `$i` är mindre än eller lika med 0) så körs nästa varv. Är villkoret däremot falskt så avslutas loopen.

Sista delen är något vi vill göra **efter** varje varv. I vårt fall så körs koden `$i++` vilket helt enkelt betyder "öka i med 1". Så efter varje varv så ökar vi värdet på `$i`, hade vi inte gjort detta så hade variabeln aldrig nått 5 och vårt stopp-vilkor hade aldrig uppfyllts.

Efter detta har vi den kod som faktiskt körs varje varv, alltså delen mellan våra "måsvingar" (`{ }`). I vårt fall har vi kod som skrive ut texten "\$i equals " och sedan lägger på värdet av `$i` i slutet. Första varvet får vi alltså utdata som "\$i equals 0", efter det "\$i equals 1" osv.

Generellt kan man se att vi har två delar, det inom parentesen som bestämmer hur loopen ska köras, och det inom måsvingarna som är vad som ska köras i varje varv.

#### For-loop med listor

Något annat man kan göra är att använda en for-loop för är att loopa över värdena i en lista. Generellt då är att man börjar med sin `$i` variabel på 0 och kör loopen sålänge värdet är mindre än längden på listan.

Det ser ut något såhär:

```powershell
$list = @(1, 2, 5);

for ($i = 0; $i -lt $list.length; $i++) {
    # Gör något med varje värde i listan
    $list[$i]
}
```

### Foreach-loop

En foreach-loop är lik en for-loop, men är specfikt utformad för att göra det enklare att göra något för varje värde i en lista, istället för den rörigare versionen ovan. En foreach-loop ser ut såhär:

```powershell
$list = @(1, 2, 5);

foreach ($el in $list) {
    # Skriv ut värdet på $el
    $el
}
```

Här ser vi att vi inte har flera delar inom parentesen, utan bara en. Det som koden inom parentesen säger är att vi vill skapa en variabel `$el` som innehåller ett värde från lista (dessa kallas element, därav förkortningen "el", detta är inte ett krav men gör det lätt att förstå vad variabeln innehåller). Helt enkelt "för varje element i (in) listan, lägg det i `$el` och kör loopen ett varv".

Varje gången loopen körs så kommer nästa värde i listan kopieras in i vår variabel `$el`. Detta börjar på första värdet och görs till det inte finns fler värden i listan. Dvs i varje varv har vi enkel tillgång till det akutella värdet.

I övrigt är principen densamma som i for-loppen, dvs vi kör koden inom måsvingarna tills loopen är klar. Skillnaden här är att vi inte själva bestämmer hur många gånger loopen ska köras, när den ska stanna osv. Istället löser powershell detta åt oss baserat på hur listan ser ut.

### While-loop

En while-loop fungerar lite annorlunda från de andra looparna vi kollat på. Istället för att ha en bestämd längd eller basera längden på t.ex en lista så säger vi helt enkelt "kör så länge...". En while loop ser ut såhär:

```powershell
$svar = 10
$inData = Read-Host "Skriv ett nummer"

while ($inData -ne $svar) {
    $inData = Read-Host "Skriv ett nummer"
}
```

Här använder vi Cmdlet `Read-Host`, den låter helt enkelt användaren skriva in ett värde till vårt skript. Vi definierar även en variabel med "rätt svar" i `$svar`.

Det vår while-loop då gör är att den kollar om det användaren skriver in är lika med vårt svar, är det **inte** det så frågar den igen. Eftersom vi omöjligt kan veta hur många försök detta kommer ta så kan vi inte använda en for-loop. Men while-loopen kör tills vårt villkor inte längre stämmer (i vårt fall körs den sålänge vår indata inte är lika med vårt svar), därav behöver vi inte veta exakt hur många försök som krävs i förväg.

## Villkor

Vi har pratat om villkor i relation till loopar en del, men ibland vill vi mer generellt styra om kod körs eller inte beroende på om ett villkor är uppfyllt. Detta görs med en "if-sats". Dvs, "om" något stämmer så körs viss kod. If-satser ser ut såhär:

```powershell
$a = 7;

if ($a -gt 5) {
    Write-Host '$a är större än 5'
}
```

Detta är så enkelt som att "om \$a är större än 5 kör koden", där i detta fallet koden helt enkelt är att skriva ut att värdet är större än 5. Om villkoret inte uppfylls (t.ex om \$a var 4) så hoppas koden inom måsvingarna helt enkelt över.

### Else

Ibland vill vi göra något både om vårt villkor stämmer, och något annat om det inte stämmer. Om vi fortsätter från vår kod ovan och vill lägga till att "om \$a är mindre än 5, skriv ut detta" så hade koden sett ut såhär:

```powershell
$a = 7;

if ($a -gt 5) {
    Write-Host '$a är större än 5'
} else {
    Write-Host '$a är mindre än (eller lika med) 5'
}
```
