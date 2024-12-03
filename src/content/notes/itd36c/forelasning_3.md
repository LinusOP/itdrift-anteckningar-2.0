---
title: Föreläsning 3
order: 30
---

# Föreläsing 3 - Siter

En site är, likt inom AD, en plats eller ett nätvker där klienter och system kan kommunicera. Man kan ha flera siter förutsatt at där finns en uppkopling mellan dessa (de måste alltså vara två olika nätverk med routes emellan). Dock _behövs_ inte flera siter bara för att man har flera nätverk eller flera fysiska platser.

Tvärtom vill man oftast inte dela upp i flera siter om man inte behöver, man använder istället boundaries för att skilja enheterna, förutsatt att uppkoplingen mellan de fysiska platserna är bra. Det är enbart om man har problem med den kopplingen som man behöver sekundära siter.

## Typer av siter

Där finns tre typer av siter, primär, sekundär och "CAS" (Central Administration Site).

### Primär site

Den primära siten är den som skapas när man först installerar configuration manager. Det är den enda typen som kan köras för sig själv och innehåller alla grundfunktioner eller roller som behövs. Här måste vi också ha en SQL databas (fullskalig Microsoft SQL Server). Primära siter har vissa (höga) begränsningar, t.ex kan den ha upp till 150 000 Windowsklienter.

### Sekundär site

Sekundära siter kan (logiskt nog) inte skapas för sig själva. Dessa ligger som "child-sites" under din primära site. Den sekundära siten kör en egen databas (kan köra MS SQL Express eller full MS SQL), databasen från den primära siten replikeras sedan dit. På så sätt kan den sekundära siten agera på egen hand utan koppling till den primära siten (med en del begränsningar). Man kan t.ex inte ansluta klienter till den sekundära siten, konfigurering kan inte heller ske. Detta måste gå igenom den primära.

### Central Administration Site - CAS

CAS används i större miljöer där man vill ha flera primary sites, tänk t.ex att man har flera kontor i flera länder och vill ha en primary site per land. Man kan (endast) ansluta primära sites till CAS, och sedan ansluta secondary sites till dessa (om man vill/behöver). Upp till 25 primära siter kan anslutas till en CAS.
