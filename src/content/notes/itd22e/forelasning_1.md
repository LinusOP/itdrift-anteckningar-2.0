---
title: Föreläsning 1
order: 10
---

# Föreläsning 1 - Inledning till Azure

## Vad är Azure?

Azure är Microsofts samling av molnbaserade tjänster. Azure täcker hela spektrumet, dvs IaaS, PaaS, och SaaS (termer som vi kollar på senare).  
Andra motsvarande tjänster från andra företag:

- AWS (Amazon Web Services) - Störst av alla i branschen
- GCP (Google Cloud Platform)
- Alibaba Cloud
- Oracle Cloud

I vårt fall är Azure mest relevant för att vi arbetar i, mer eller mindre, enbart i Microsoftmiljöer. T.ex så har Microsoft en unik möjlighet att erbjuda tjänster som integreras med Windows, såsom Entra ID (i princip AD i molnet).

## Skillnader mot traditionell deployment

Traditionellt sett så har ett företag egna servrar, där deras tjänster körs och deras data lagras. Detta byggs på många olika delar. Vi har den fysiska hårdvaran som vi köper in, vilket ger oss lagring och processorkraft. Vi bygger sedan våra VMs på detta, som behöver uppdateras, hållas säkra, mm. Vi behöver brandväggar, verktyg för autentisering, nätverk som förvaltas mm.

När vi arbetar i molnet tittar vi istället på kapacitet. Vi köper en viss kapacitet av Azures datacenter i form av processorkraft, lagring, mm. Vi använder sedan denna kapacitet för att köra appar, skapa VMs, lagra data mm. Delen med säkerhet, uppdateringar, antivirus, nätverksutrustning mm sköter Microsoft.

Självklart hjälper detta oss mycket, vi får en färdig miljö att bygga på, där Microsoft står för en stor del av det jobb som krävs för att driva miljön. Självklart innebär det också då att vi är begränsade till vad Azure låter oss göra, och de tjänster de tillhandahåller.

## IaaS, PaaS, SaaS

När vi pratar molntjänster ser vi ofta dessa tre förkortningar, de representerar mer eller mindre hur mycket vi ansvarar över kontra hur mycket den som tillhandahåller molntjänsten ansvarar över.

### IaaS - Infrastructure as a Service

IaaS innebär att leverantören tillhandahållet hårdvara som vi får använda, man skulle kunna se det som servrar/VMs i molnet. Leverantören sköter hårdvaran, ger den uppkoppling, sköter en hypervisor, och ser till att vi enkelt kan skapa och hantera dessa virtuella maskiner. Det som sedan körs på systemen sköter vi, dvs applikationer, uppdateringar av OS mm.

### PaaS - Platform as a Service

PaaS kan vara något svårare att definiera men det innebär i princip att man får ett definierat system för hur man kan köra appar och tjänster. Om vi t.ex ska köra en webbserver så hade vi med IaaS själva kört en VM och installerat en webbserver som vi sedan håller i drift. Med PaaS får vi ett färdigt gränssnitt för att ladda upp och köra webbfiler, men själva driften av webbservern sköter leverantören.

PaaS är alltså en färdig grund där vi kan köra applikationer utan att tänka på hur de körs, med operativsystem, servrar, uppdateringar, säkerhet, och allt vad det kan innebära.

### SaaS - Software as a Service

SaaS är den typen av tjänst vi som privatpersoner ofta interagerar med. Det är tjänster som tillhandahålls i färdigt format. T.ex GMail/Hotmail, Dropbox mm. Istället för att vi själva ska installera och hålla tjänster och applikationer i drift så sköter någon annan hela driften här. Allt vi som köper tjänsten behöver göra är att konfigurera tjänsten som vi vill ha den och sen nyttja den.

## Byggstenar i molnet

Beroende på vilket moln man använder och vilket typ av tjänst (IaaS, PaaS, SaaS) man köper så får man bygga upp sin miljö på olika sätt. Dock finns där vissa principer som är generella och kommer finnas i någon version överallt. Specifikt handlar det om identitet, kontroll, och gruppering.

För att personer ska få använda dina tjänster måste de ha en identitet, så att systemet vet vem som försöker komma åt något. För att kunna säkerställa någons identitet så behöver vi kontrollera denna, dvs någon form av autentisering behöver ske. Sist behöver vi kunna gruppera och organisera de här identiteterna. Vi kan även gruppera maskiner, applikationer osv.
