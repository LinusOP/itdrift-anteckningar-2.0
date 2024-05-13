---
title: Föreläsning 9
order: 90
---

# Föreläsning 9 - Templates & Blueprint

## ARM-Templates

ARM-Templates står för Azure Resource Manager Templates och är ett sätt att definiera en eller flera resurser i Azure, dess inställningar osv. Man kan sedan ge Azure en template där varje resurs kommer skapas och konfigureras enligt denna.

### JSON

Templates skrivs i JSON, ett läsbart format som ofta används inom programmering, det kan se ut såhär:

```json
{
  "type": "Microsoft.Storage/storageAccounts",
  "apiVersion": "2021-08-01",
  "name": "Test",
  "location": "Test",
  "sku": "",
  "size": 1024
}
```

Ovanstående är inte en giltig ARM template men visar på grunderna i JSON formatet.

JSON är ett s.k "key-value" format, det vill säga man har någon sorts "nyckel" (namn) och sedan ett tillhörande värde, ovan har vi t.ex nyckeln `name` och dess tillhörande värde `Test`.

Typen av värdet måste inte vara text, utan kan även vara t.ex siffror (se `size` ovan), arrays (listor) och andra objekt. Här är t.ex ett exempel med både objekt och listor:

```json
{
  "text": "Text här",
  "siffra": 42,
  "lista-med-siffror": [1, 2, 3, 4],
  "lista-med-text": ["ett", "två", "tre"],
  "objekt": {
    "text": "Test",
    "siffra": 10,
    "lista-i-objekt": ["test1", "test2"]
  }
}
```

Man måste inte ha ett objekt som ligger "överst", detta är också helt giltig JSON:

```json
["ett", "två", "tre"]
```

Eller med objekt i en lista:

```json
[
  {
    "grundämne": "Litium",
    "typ": "Metall"
  },
  {
    "grundämne": "Kväve",
    "typ": "Gas"
  }
]
```

### Skapa eller skaffa templates?

Självklart kan man skriva en egen template utifrån sina egna behov, men förutsatt att man har generella behov (t.ex, om du nebart behöver en VM med Linux) finns där även färdiga templates. Man kan även ta en template och sen modifiera den utifrån sina behov.

Detta kan vara bra eftersom att en riktig template kan bli väldigt lång, se t.ex [Microsofts exempel](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/quick-create-template?toc=%2Fazure%2Fazure-resource-manager%2Ftemplates%2Ftoc.json#review-the-template) av en template för en Linux VM (notera att denna är längre än den måste va, de har med det mesta som går).

Man kan hitta templates på många ställen, ett vanligt ställe som administratörer/programmerare laddar up filer är [Github](https://github.com), se t.ex [Teds exempel](https://github.com/TedEkstrom/Easy-ARM-templates/blob/main/testdeploy.json) på en ARM template på Github.

Dessa kan sedan köras i PowerShell konsolen i Azure, ett exempel för att använda Teds template ser ut såhär:

```powershell
New-AzResourceGroupDeployment -ResourceGroupName ”test” -TemplateUri “https://raw.githubusercontent.com/TedEkstrom/Easy-ARM-templates/main/testdeploy.json”
```

## Blueprints

Som vi sett så kan det vara smidigt att kunna ha färdiga templates för o skapa resurser i ett Azure konto, t.ex templates för containrar, VMs osv. Men i större organisationer är det inte heller ovanligt att skapa separata tenants för avdelningar eller sektioner.

I dessa fall har man oftast standardiserade roller, policy osv. I dessa fall kan man skapa en blueprint som fungerar som en template fast för en hel tenant-miljö. Där finns även färdiga blueprints för att t.ex ha inställningar som följer vissa standarder eller lagar, tänk sjukvård osv.

Blueprints kan i sin tur innehålla ARM templates för att starta resurser när ens tenant har blivit skapad, dessa jobbar alltså tillsammans.
