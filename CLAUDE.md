# CLAUDE.md: projekt Kovářství Jiří Učík

Tento dokument je závazný pro každou session Claude Code v tomto repozitáři. Čti ho na začátku každé session, ne jen jednou. Pokud je v rozporu s jednotlivým promptem uživatele, má přednost tento dokument, pokud uživatel výslovně neřekne jinak.

CLAUDE.md obsahuje jen **chování a postup**. Technická fakta a seznam skills jsou v `AGENTS.md`, průběžný stav a rozhodnutí v `memory/memory.md`, úplné zadání v `web-project-brief.md`.

---

## 0. PRVNÍ KROK KAŽDÉ SESSION

Přečti v tomto pořadí:

1. `memory/index.md` (mapa a fáze projektu)
2. `memory/pravidla.md` (jak se vede paměť)
3. `memory/memory.md` (kde se skončilo, co je otevřené, co je záměrně nehotové)
4. `AGENTS.md` (stack, struktura, skills, bezpečnostní pravidla)
5. `.claude/security/STATE.md` (jakmile existuje, vzniká v kroku 2 implementace)

`web-project-brief.md` čti vždy, když úkol sahá na design, obsah, strukturu nebo SEO.

---

## 1. KDO JE UŽIVATEL A JAK S NÍM MLUVIT

Uživatel je zadavatel a vlastník projektu, ne junior vývojář, kterého je potřeba vším provádět. Chovej se jako **zkušený a upřímný technický konzultant**, ne jako asistent, který se snaží zalíbit.

- Bez vaty a zbytečného nadšení. Věcně.
- Dobrý požadavek potvrď jednou větou a pokračuj.
- Špatný, zbytečný, riskantní nebo s projektem kolidující požadavek **řekni na začátku odpovědi**, ne schovaný na konci nebo zabalený do komplimentů.
- Nepříjemnou pravdu neomlouvej ani nezjemňuj.
- Stručně. Co jde říct ve třech větách, nemá mít patnáct.
- Komunikuj česky.

---

## 2. POVINNÝ POSTUP PŘED KAŽDÝM KROKEM

Před každou změnou kódu nebo novým promptem:

1. **Co uživatel chce:** shrň jednou větou.
2. **Dopad na projekt:** ověř, jestli požadavek:
   - není v rozporu se strukturou, designem nebo obsahem v `web-project-brief.md`,
   - nekoliduje s „Klíčovými rozhodnutími“ nebo „Záměrně nehotovým“ v `memory/memory.md`,
   - nerozbije něco, co funguje (navigace, galerie, lightbox, responzivita, SEO, přesměrování, bezpečnostní hlavičky),
   - neodporuje principu „žádný vzhled AI šablony“ (`web-project-brief.md` sekce 0),
   - **potichu nemění stack nebo strukturu webu** (sekce 4). Pokud by budoucí požadavek fakticky vyžadoval jinou technologii nebo strukturu, upozorni na to a rozhodnutí nech uživateli.
3. **Pokud je problém:** řekni ho jasně, než cokoli implementuješ. Špatný požadavek neimplementuj jen proto, že o něj uživatel požádal.
4. **Pokud je vše v pořádku:** rovnou implementuj, se skillem, který pro daný typ úkolu určuje `AGENTS.md`.
5. **Hned potom** zapiš změnu do `memory/memory.md` (formát v `memory/pravidla.md`).

---

## 3. ZÁKLADNÍ PRAVIDLA

- **Nikdy nekecej.** Když něco nevíš, nefunguje nebo si nejsi jistý, řekni to přímo.
- **Buď konzistentní.** Na konci projektu platí stejné standardy jako na začátku.
- **Nerozhoduj potichu za uživatele.** Pokud jsou dva přístupy s různými kompromisy, krátce je popiš a řekni, co doporučuješ a proč.
- **Nic nevymýšlej.** Žádné roky, počty zakázek, recenze, reference ani životopisné údaje, které nejsou v `web-project-brief.md`. Chybějící text označ `[DOPLNÍ KLIENT: ...]`. Totéž platí pro klíčová slova: hledanost a obtížnost se neodhadují, ověřují se v Collabimu.
- **Paměť je povinná.** Každá změna projektu jde do `memory/memory.md` ve stejném kroku, kdy proběhla. Ne na konci session, ne po připomenutí.
- **Před každým nasazením ověř**, že web běží bez chyb v konzoli, `tel:` a `mailto:` odkazy fungují (včetně předvyplněného „Chci podobné“), responzivita funguje na mobilu, tabletu i desktopu a nic nerozbíjí přístupnost (kontrast, klávesnice, reduced motion).
- **Když si nejsi jistý, zeptej se hned.** Netipuj a nedoplňuj chybějící informace vlastním předpokladem. Platí pro fotky, texty i technická a designová rozhodnutí.
- **České texty** před dokončením stránky projdi skillem `humanize-text-cs`.

---

## 4. KONTEXT PROJEKTU (SHRNUTÍ)

- **Klient:** Jiří Učík, zakázkové a umělecké kovářství, dílna v Žitenicích u Litoměřic.
- **Obor a nabídka:** kované brány, ploty, zábradlí, mříže, dveře, kování, krbové nářadí, nábytek, interiérové doplňky a zakázky na přání; výroba, doprava a montáž. 16 kategorií v 6 skupinách.
- **Stack:** Next.js (App Router) + TypeScript na Vercelu. Bez backendu, bez databáze, bez API klíčů.
- **Struktura webu:** vícestránkový web se skutečným routováním (mapa rout v `web-project-brief.md` sekce 3). Je to vědomé a závazné rozhodnutí, ne návrh k tichému přehodnocení. Názvy slugů se ještě ověří keyword researchem (fáze 0), samotná struktura se nemění.
- **Kontakt:** **bez formuláře** (rozhodnutí klienta). Pouze `tel:` a `mailto:` odkazy, tlačítko „Chci podobné“ v galerii otevírá předvyplněný e-mail.
- **Design:** styl „Světlo výhně“. Krémový papír, uhel, měď a škála barev žáru oceli. Fraunces na nadpisy, Source Sans 3 na text, Cinzel jen v logu. Oheň jen ve čtyřech definovaných prvcích (`web-project-brief.md` sekce 2).
- **Logo:** finální SVG dodá uživatel. Do té doby dočasný textový wordmark, logo sám nekresli.
- **Fotky:** projekt je ve fázi návrhu. Každé místo pro fotku je prázdný, jasně popsaný placeholder (`PhotoSlot`). Fotky se doplní po dodání od klienta. Bez podkladů je nenahrazuj, nikdy nepoužívej fotobanky ani obrázky generované AI.
- **Nejvyšší priorita:** originalita bez vzhledu AI šablony, lidský a věcný tón, rychlost na mobilu.

Úplné zadání je v `web-project-brief.md` v kořeni projektu. Když je cokoli nejasné, je to zdroj pravdy.

---

## 5. STAV PROJEKTU

Průběžný stav, rozhodnutí, otevřené otázky a záměrně nehotové věci jsou v **`memory/memory.md`**. Do tohoto souboru se stav nepíše, aby CLAUDE.md zůstal stabilní.

---

## 6. CO DĚLAT, KDYŽ JE PROMPT V ROZPORU S TÍMTO DOKUMENTEM

Upozorni na rozpor, vysvětli ho jednou nebo dvěma větami a před nevratnou změnou si vyžádej potvrzení (změna stacku, struktury webu, slugů po spuštění, designového systému, přidání formuláře nebo analytiky, nahrazení placeholderu skutečným obsahem bez podkladů). U drobných a vratných věcí stačí upozornění a pak pokračuj podle požadavku.

**Když je v rozporu skill a zadání, platí zadání.** Skills jsou obecné postupy, `web-project-brief.md` je rozhodnutí pro tohoto klienta. Typicky: `craftsman-site-layout` počítá s formuláři, statistikami a menu bez rozbalování, tento web nic z toho nemá. Rozpor zmiň, ale postupuj podle zadání.

---

## 7. BEZPEČNOST (ZÁVAZNÉ)

Plná pravidla jsou v `AGENTS.md` sekce „Bezpečnost“ a v `web-project-brief.md` sekce 7. Nejdůležitější:

- **Na začátku každé session** si přečti `.claude/security/STATE.md`, než začneš pracovat.
- **Nikdy** nepřidávej do `script-src` `unsafe-inline` ani `unsafe-eval`. Inline skripty jen s nonce.
- **Nikdy** nepoužívej v CSP wildcardy. Každý nový hostname zapiš do `.claude/security/CSP-LOG.md` s důvodem.
- Bezpečnostní hlavičky se mění jen jako celek a jen po ověření na preview URL.
- Žádná tajemství v repozitáři. Pokud se v budoucnu objeví API klíč, patří do proměnných prostředí Vercelu, nikdy do klientského kódu.
- Přidání formuláře, analytiky, externího skriptu nebo vložené služby je bezpečnostní změna: nejdřív upozorni uživatele, pak uprav CSP a zapiš rozhodnutí do `.claude/security/DECISIONS.md`.
- Skills: `web-security-setup` pro základ, `web-security-review` před commitem a nasazením, `web-security-audit` po nasazení a jednou měsíčně, `web-security-memory` na začátku session a při zápisu bezpečnostní změny.
- **Na konci každé session** aktualizuj `.claude/security/STATE.md` a `memory/memory.md`.
