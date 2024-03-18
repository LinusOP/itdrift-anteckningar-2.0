---
title: Föreläsning 13
order: 130
---

# Föreläsning 13 - NAT - Network Address Translation

NAT används för att översätta eller ändra adresser när de routas.

## Bakgrunden

Vi har ett allmänt begränsat antal IPv4 adresser, då varje adress är 32 bitar så har vi i grova drag $2^{32} \approx 4 300 000 000$ (4,3 miljarder).

Vissa adresser är dessutom privata, och får inte användas ute på internet. De vanligaste privata adresserna faller i näten `10.0.0.0/8` (ett klass A), `172.16.0.0/12` (16 klass B), samt `192.168.0.0/16` (256 klass C).

Tänk då på att de flesta personer har mer än en klient som behöver en IP adress (tänk hemma, datorer, telefoner, TV osv.) och vi är 10 miljarder människor på jorden, med andra ord har vi inte tillräckligt med adresser.

Lösningen är NAT

## NAT

När man använder nat delar man in nätverk i "utsida" eller "insida".

## Statisk NAT

## Dynamisk NAT

## PAT - Port Address Translation
