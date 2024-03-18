---
title: Datateknisk Introduktion - Föreläsning 5
order: 50
---

# Datateknisk Introduktion - Föreläsning 5

Se slides för diagram och bilder.

## Datorns delar i mer detalj

Datorn har tre olika huvudsystem:

- CPU (Processor)
- Minne
- I/O

Alla dessa tre är ihopkopplade och kan därmed "prata" med varandra.

### CPU/Processor

Har tre huvuddelar (egentligen mycket mer, men dessa är de vi kollar på):

- ALU (Arithmetic Logic Unit) - Gör beräkningar, hanterar logik mm.
- CU (Control Unit) / Styrenhet - Kontrollerar andra system, är den som styr processorns övriga delar och avkodar instruktionerna för resten av dessa delar
- Register - Processorns egna lagringsplatser, inte så stor plats men väldigt snabbt.

### Arbetsminne / Primärminne / RAM (Random Access Memory)

Har två huvuddelar:

- Den del som lagrar datan
- Den del som lagrar adresser

Lite som en tabell:

(Den decimala delen finns inte i datorn, det är för att visa oss vilken plats det är i exemplet, datorn arbetar ju binärt)

| Decimalt | Adress | Data        |
| -------- | ------ | ----------- |
| 0        | `000`  | `0010 0010` |
| 1        | `001`  | `1001 0011` |
| 2        | `010`  |             |
| 3        | `011`  |             |
| 4        | `100`  |             |
| 5        | `101`  |             |
| 6        | `110`  |             |
| 7        | `111`  |             |

I detta fall sparar vi en byte (8 bitar) i varje minnesplats. Normalt sett är detta 64 bitar, 8 bytes.  
Mer om detta nedan under bussar.

#### Kategorier på minne

- Flyktiga - Försvinner strömmen så försvinner datan
- Läs/SKrivbara
  - ROM (Read Only Memory) - Exempel: CD-ROM
  - RWM (Read Write Memory)
- Direktaccess, Cykliska, Sekventiella
  - Direkaccess, RAM (Random Access Memory)
  - Processorn kan direkt komma åt dessa, utan mellanhänder (t.ex en hårddisk har en kontroller som ligger emellan, och är därmed inte direktaccess)

**Se slides för illustration över minneshierarkin**

#### Andra bregrepp

- Cacheminne
  - Kopia som används mellan olika nivåer i hierarkien
  - Snabbare minne inehåller kopior av data från långsammare minne
  - Oftast menar man med cacheminnet snabbare mindre kopior av vissa (ofta viktiga) delar av arbetsminnet
- Buffert - Lagrar tllfälligdata medans den förs över mella olika enheter
- ECC och paritet
  - System som kan hitta fel i minnet och rätta till det

## Hur samarbetar dessa?

Processorn kan då t.ex ha en instruktion som betyder följande:

1. Ta data från minnesadress 0 (`000`) till $\text{R}_0$ (Där $\text{R}_0$ är en av platserna i registret som diskuterat ovan, specifikt plats 0)
2. Ta data från minnesadress 1 (`001`) till $\text{R}_1$
3. Addera $\text{R}_0$ och $\text{R}_1$ och spara i $\text{R}_2$
4. Lägg datan från $\text{R}_2$ i minnesadress 4 (`100`)

Ett annat exempel skulle kunna vara:

1. Ta data från minnesadress 0 (`000`) till $\text{R}_0$ (Där $\text{R}_0$ är en av platserna i registret som diskuterat ovan, specifikt plats 0)
2. Ta data från minnesadress 1 (`001`) till $\text{R}_1$
3. AND $\text{R}_0$ och $\text{R}_1$ och spara i $\text{R}_2$
4. Lägg datan från $\text{R}_2$ i minnesadress 4 (`100`)

Registrena ser då ut något såhär:

| Register     | Data        |
| ------------ | ----------- |
| $\text{R}_0$ | `0010 0010` |
| $\text{R}_1$ | `1001 0011` |
| $\text{R}_2$ | `0000 0010` |
| $\text{R}_3$ |             |

Och minnet hade i slutet sett ut såhär:

| Decimalt | Adress | Data        |
| -------- | ------ | ----------- |
| 0        | `000`  | `0010 0010` |
| 1        | `001`  | `1001 0011` |
| 2        | `010`  |             |
| 3        | `011`  |             |
| 4        | `100`  | `0000 0010` |
| 5        | `101`  |             |
| 6        | `110`  |             |
| 7        | `111`  |             |

I detta fall har vi hanterat data i en Byte, 8 bitar åt gången.  
I dagsläget hanterar (de flesta) datorer data i 64 bitar i taget.

## Bussar och bussbredd

Bussbredd: Hur mycket data (hur många bitar) som kan gå över bussen samtidigt, eller i taget.

Bussar mellan CPU och arbetsminnet:

- Kontrollbuss
- Adressbuss
- Databuss

Generellt om man pratar om t.ex en 64 bitars dator så innebär det att bussbredden på databussen är 64 bitar.

## Exempel på beräkningar med detta

Har vi ett arbetsminne på 16GB, hur många bitar behövs för adressering? Dvs, vad är bussbredden på vår adressbuss.

Först måste vi kolla på mängden data vi ska lagra, samt hur mycket vi lagrar per plats. På så sätt vet vi hur många adresser vi behöver.

Om vi antar att vi har en modern dator som arbetar i 64 bitar så sparar vi 64 bitar per plats. Dvs 8 bytes per plats.

Hur många bytes kan vi lagra? Vi lagrar 16GB. En GB = $2^{30}$ bytes. (Egentligen borde vi skriva GiB, se slides föreläsning 2, men vi använder enkelt här att GB är $2^{30}$ inte $10^9$)

Därmed lagrar vi $16 * 2^{30}$ bytes.  
Detta är dock en jobbig uträkning, vi skriver därmed om 16 som $2^4$.  
Detta ger oss $2^4 * 2^{30}$, använder vi våra regler nedan ger det $2^4 * 2^{30} = 2^{4+30} = 2^{34}$

Vi lagrar därmed $2^{34}$ bytes i vårt minne. Dock lagrar vi ju mer än en byte per plats, vi behöver därmed inte så många adresser som bytes vi lagrar.

Vi lagrar specifikt 8 bytes per plats, vi behöver därmed en åttondel så många adresser.

Detta get $\frac{2^{34}}{8}$, än en gång en ganska svår uträkning som den står nu.  
Vi gör om vår åtta till en potens: $\frac{2^{34}}{2^3}$.  
vi kan nu använda våra regler nedan: $ = \frac{2^{34}}{2^3} = 2^{34-3} = 2^{31}$.

Detta är mängden adresser vi behöver, detta innebär att vi behöver 31 siffror för att kunna beskriva alla olika kombinationer av adresser som behövs. Antalet kombinationer/variationer: $2^{31}$ get att varje kombination kommer vara ett 31 tecken stort tal.

Normalt sett hade man gått till närmaste 2-potens, dvs 32. Men allra minst behöver vår adressbuss ha en bredd på 31 bitar för att kunna skicka adresser som är långa nog för att där finns en till varje adressplats i vårt minne.

### Potens reglerna

Krävs för att förstå uträkningen ovan

$a^x + a^y = a^{x+y}$  
$\frac{a^x}{a^y} = a^{x-y}$
