---
title: Föreläsning 13
order: 130
---

# Föreläsning 13 - PowerShell med AD

Ofta när vi arbetar med AD vill vi kunna automatisera saker samt hämta o ändra stora mängder objekt smidigt. Vi vill ofta även få fram mycket information snabbt.

När man installerar AD rollen får man automatiskt ActiveDirectory modulen tillagd i powershell som innehåller alla Cmdlets för att hämta och hantera information och objekt från AD.

Exempelvis:

- `Get-ADForest`
- `Get-ADDomain`
- `Get-ADDomainController`

Dessa kommandon hämtar grundläggande information om olika delar av vår domän och är en liten del av det man kan göra med powershell och AD.

Här är några kommandon för vanliga delar av AD som vi interagerar med:

## OU

### Skapa

I roten av domänen:

```powershell
New-ADOrganizationalUnit -Name test
```

På en specifik plats (i detta fall i OU "test" i domänen itdrift.local):

```powershell
New-ADOrganizationalUnit -Name test2 -Path "ou=test,dc=itdrift,dc=local"
```

### Hämta

Hämta alla:

```powershell
Get-ADOrganizationalUnit -Filter *
```

Hämta specifikt OU (OU test i detta fall):

```powershell
Get-ADOrganizationalUnit -Identity "ou=test,dc=itdrift,dc=local"
```

## Användare

### Skapa

I inbygda Users containern:

```powershell
New-ADUser -Name "Bob"
```

På en specifik plats:

```powershell
New-ADUser -Name "Bob" -Path "ou=test,dc=itdrift,dc=local"
```

När vi skapar användare kan vi skicka med en väldig massa alternativ, se [Microsofts dokumentation](https://learn.microsoft.com/en-us/powershell/module/activedirectory/new-aduser?view=windowsserver2022-ps#syntax)

### Aktivera

Notera att konton inte är aktiva som standard, vi måste därav aktivera dessa:

```powershell
Enable-ADAccount -Identity "liol0169"
```

### Hämta

Specifik användare:

```powershell
Get-ADUser -Identity "liol0169"
```

Flera med filter (hämtar alla vars namn börjar med "E"):

```powershell
Get-ADUser -Filter 'Name -like "E*"'
```

## Grupper

### Skapa

```powershell
New-ADGroup -Name TestGroup -GroupScope global -Path "ou=text,dc=itdrift,dc=local"
```

### Lägg till användare i grupper

```powershell
Add-ADGroupMember -Identity TestGroup -Members "liol0169"
```
