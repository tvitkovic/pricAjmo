# pričAjmo — desktop aplikacija

*Komunikacijske ploče i piktogrami za potpomognutu komunikaciju (AAC)*
Izradio: **Tomislav Vitković, mag. rehab. educ.**

Offline editor komunikacijskih ploča i piktograma (AAC), zapakiran kao prava
desktop aplikacija pomoću **Electrona**. Aplikacija radi bez interneta, a ploče
se spremaju lokalno na računalo (preživljavaju zatvaranje i ponovno pokretanje).

> Sva logika nalazi se u datoteci `app.html` (ista kao samostalna verzija). Ovaj
> projekt je samo „omotač" koji je prikazuje u zasebnom prozoru s vlastitom
> ikonom, izbornikom na hrvatskom i dijalozima za spremanje izvezenih datoteka.

---

## 1. Što vam treba

- **Node.js 18 ili noviji** — preuzmite s https://nodejs.org (LTS verzija).
  Provjera da je instaliran: u terminalu/command promptu upišite `node -v`.

## 2. Pokretanje (probni rad)

U mapi projekta (ondje gdje je ovaj `README.md`) otvorite terminal i upišite:

```bash
npm install      # jednokratno – preuzima Electron i alate
npm start        # pokreće aplikaciju u prozoru
```

## 3. Izrada instalacijske datoteke

`electron-builder` gradi instalacijski paket **za operacijski sustav na kojem
pokrećete naredbu** (Windows installer se gradi na Windowsima, .dmg na macOS-u,
AppImage/.deb na Linuxu):

```bash
npm run dist          # za trenutni sustav
# ili izričito:
npm run dist:win      # Windows  -> dist/…Setup….exe   (NSIS instalacijski program)
npm run dist:mac      # macOS    -> dist/….dmg
npm run dist:linux    # Linux    -> dist/….AppImage i ….deb
```

Gotov paket nalazi se u mapi **`dist/`**.

- Na **Windowsima** instalacijski program nudi izbor mape i automatski stvara
  **prečac na radnoj površini** te u **izborniku Start**.
- Na **macOS-u** otvorite `.dmg` i povucite aplikaciju u Applications.
- Na **Linuxu** `.AppImage` je samostalan (dvoklik), a `.deb` se instalira kroz
  upravitelj paketa.

---

## Ikona

Ikona se nalazi u mapi `build/` (`icon.png` 1024×1024 za macOS/Linux,
`icon.ico` za Windows). Ako želite svoju ikonu, zamijenite te datoteke
(zadržite imena i veličine) i ponovno pokrenite `npm run dist`.

## Napomene

- Ako želite **digitalno potpisati** aplikaciju (da Windows/macOS ne prikazuju
  upozorenje o nepoznatom izdavaču), potrebni su certifikati za potpisivanje;
  pogledajte dokumentaciju electron-buildera: https://www.electron.build
- Za izradu Windows instalacijskog programa **na Windowsima** ne treba ništa
  dodatno; za gradnju za drugi sustav (npr. Windows paket s Linuxa) potreban je
  Wine i dodatna podešavanja.
- Izvoz ploča (PNG / SVG / PDF / JSON) i pojedinačnih piktograma radi kroz
  dijalog „Spremi kao". Ispis i „Spremi kao PDF" dostupni su preko izbornika
  **Datoteka → Ispis** ili tipke **Ctrl/Cmd + P**, te unutar same aplikacije
  kroz **Izvoz**.

## Licence piktograma

- **ARASAAC** simboli: © Vlada Aragona (autor Sergio Palao), licenca
  **CC BY-NC-SA** — pri korištenju navedite autorstvo. https://arasaac.org
- **Ugrađeni piktogrami** ove aplikacije su izvorni i slobodni za uporabu.
- **PCS** simboli (Tobii Dynavox) su zaštićeni i **nisu** uključeni.
