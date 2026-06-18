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

## Automatsko ažuriranje (GitHub Releases)

Aplikacija sad sama provjerava ima li nove verzije (kratko nakon pokretanja, i
preko izbornika **Pomoć → Provjeri ažuriranja…**). Ako postoji nova verzija na
GitHub Releases stranici repozitorija, korisnik dobije ponudu da je preuzme;
nakon preuzimanja, ponudi se ponovno pokretanje koje primjenjuje ažuriranje.
Spremljene ploče ostaju sačuvane.

### Kako objaviti novu verziju (za tebe, kao izdavača)

1. U `package.json` povećaj broj `"version"` (npr. `1.1.0` → `1.2.0`).
2. Potreban je GitHub **Personal Access Token** (jednom, postavi kao varijablu
   okruženja `GH_TOKEN`) da electron-builder može objaviti datoteke na GitHub:
   - GitHub → Settings → Developer settings → Personal access tokens →
     Generate new token (classic) → dovoljna ovlast `repo`.
   - U Command Promptu (samo u toj sesiji): `set GH_TOKEN=tvoj_token_ovdje`
3. Pokreni:
   ```bash
   npm run publish:win
   ```
   Ovo izgradi instalaciju **i** je odmah postavi kao novi GitHub Release —
   korisnici koji već imaju instaliranu stariju verziju automatski dobivaju
   ponudu za ažuriranje sljedeći put kad otvore pričAjmo (ili odmah, preko
   Pomoć → Provjeri ažuriranja…).
4. Prva instalacija koju korisnik dobije (npr. preko Google Drive linka) mora
   već imati ugrađen auto-updater (ova verzija ga ima) da bi buduća ažuriranja
   stizala automatski.

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
