# memory/memory.md — živý stav projektu

Co se skutečně stalo, kde projekt je a proč. Pravidla formátu: `memory/pravidla.md`. Zadání a fakta o klientovi: `web-project-brief.md`. Bezpečnost (až vznikne): `.claude/security/STATE.md`.

## Aktuální stav

- **Projekt:** web pro Kovářství Jiří Učík (zakázkové a umělecké kovářství, Žitenice u Litoměřic), doména kovarstviucik.cz.
- **Fáze:** fáze 1 (kroky 1–13) hotová s pracovními slugy (2026-10-05). Všechny stránky z brief §3 existují, build 40 stránek. Probíhá fáze 2 (2026-10-06): krok 14, pak 15. Krok 16 (produkce) čeká na fázi 0.
- **Stack:** Next.js 16.3 (App Router, Turbopack) + React 19.3 + TypeScript 5.9, CSS Modules + tokeny v `src/styles/tokens.css`, Vercel (projekt `kovarstvi-ucik`, zatím jen preview). Bez backendu, databáze, API klíčů a formuláře.
- **Skilly:** 14 lokálních v `.claude/skills/`, přehled v `AGENTS.md` §6.
- **Další krok:** kroky 14–15 hotové (2026-10-06). Fáze 3 je připravená předem (2026-10-06), checklist je v `memory/faze-3.md`. Ostře se spustí až po fázi 0 (keyword research) a kroku 16 (přesměrování, doména, produkce).

## Klíčová rozhodnutí

Bez výslovného pokynu uživatele se znovu neotevírají. Zdroj: `web-project-brief.md` a `CLAUDE.md` ve stavu k 2026-10-05.

- **2026-10-05** — Vícestránkový web se skutečným routováním podle mapy rout v brief §3 (16 kategorií v 6 skupinách). Next.js (App Router) + TypeScript, Vercel. Závazné.
- **2026-10-05** — Slugy v brief §3 jsou pracovní, ověří se keyword researchem ve fázi 0 a schválená tabulka bude v `memory/keywords.md`. Struktura rout se tím nemění, po spuštění se nemění ani slugy. Jedno hlavní slovo = jedna stránka, města bez vlastních stránek.
- **2026-10-05** — Postup ve fázích 0–3 podle brief §12. Vlastní git repo vznikne `git init` ve složce projektu ve fázi 1, krok 1 (kvůli Vercelu).
- **2026-10-05** — Bez poptávkového formuláře (rozhodnutí klienta). Kontakt jen `tel:` a `mailto:`, „Chci podobné“ otevírá předvyplněný e-mail. CSP `form-action 'none'`.
- **2026-10-05** — Bez analytiky a cookies, proto bez cookie lišty a bez zásad ochrany osobních údajů.
- **2026-10-05** — Fonty přes `next/font` (self-hosted), žádné Google CDN za běhu.
- **2026-10-05** — Design „Světlo výhně“: tokeny a typografie podle brief §2, oheň jen ve čtyřech prvcích, jediný ornament je voluta.
- **2026-10-05** — Logo: dočasný textový wordmark v Cinzel, dokud uživatel nedodá SVG. Logo Claude nekreslí.
- **2026-10-05** — Fotky: jen `PhotoSlot` placeholdery, nikdy fotobanky ani AI obrázky. Data v `src/content/`.
- **2026-10-05** — Mapa na Kontaktu jako iframe Mapy.cz, mapka regionu na úvodu jako SVG ilustrace.
- **2026-10-05** — Bezpečnost: enforcing CSP od prvního dne (nový projekt), `style-src 'unsafe-inline'` jako vědomý kompromis kvůli Next.js, HSTS bez `preload`.
- **2026-10-05** — Přesměrování 301 ze starého WordPress webu přes `redirects()` v `next.config` (známé adresy v brief §8).
- **2026-10-05** — Styly: CSS Modules + globální tokeny jako CSS proměnné v `:root` (žádný Tailwind). Důvod: plná kontrola nad detailem, žádná závislost navíc, menší riziko „Tailwind/shadcn vzhledu“ (brief §0). Rozhodl uživatel.
- **2026-10-05** — Pořadí: fáze 1 kroky 1–5 (git, Next.js, bezpečnost, tokeny, layout, komponenty) proběhnou před fází 0, protože na slugech nezávisí. Fáze 0 (keyword research) musí proběhnout **před krokem 6** (data, routy kategorií, SEO). Vědomá odchylka od pořadí v brief §12, rozhodl uživatel.
- **2026-10-05** — Keyword research (fáze 0) se přesouvá **na konec stavby, před nasazení na produkci**. Vědomě přepisuje rozhodnutí z 2026-10-05 („fáze 0 před krokem 6“). Kroky 6–13 se staví s pracovními slugy, title, H1 a meta z brief §3; po fázi 0 se přepíšou v `src/content/`. Po spuštění se slugy nemění. Rozhodl uživatel.
- **2026-10-05** — Měď `--copper` (#B5532B) má na papíře jen 4,33:1, pro malý text a text tlačítek neprojde AA. Přidán odvozený `--copper-ink` #AF502A (4,58:1), měď ztmavená o 2 % světlosti. `--copper` zůstává pro velký text, linky a plochy. `--iron` na uhlu má 2,32:1, na tmavých plochách se místo něj používá `--paper-dim` (papír 68 % + uhel, ~7:1). Brief §2 to výslovně povoluje.
- **2026-10-05** — Next.js 16: `middleware.ts` se jmenuje `proxy.ts` (funkce `proxy`). CSP s nonce je v `src/proxy.ts`, ostatní hlavičky v `next.config.ts`, obojí ze `src/lib/security.ts`. Nonce vynucuje dynamické renderování všech stránek (`connection()` v root layoutu), kompromis v `.claude/security/DECISIONS.md` 005.
- **2026-10-05** — Paměť: pět dokumentů (`CLAUDE.md`, `AGENTS.md`, `memory/index.md`, `memory/pravidla.md`, `memory/memory.md`) + `memory/activity.log` plněný hookem. Průběžný stav se vede jen tady, ne v `CLAUDE.md`. Důvod: na pokyn uživatele, skill `project-memory-system`.

## Otevřené otázky

Čeká na uživatele nebo klienta. Po zodpovězení smazat a odpověď přesunout do Rozhodnutí/changelogu.

- Výkon Úvodu na mobilu (Lighthouse 62, LCP v simulaci až 7,5 s): ponechat CSP s nonce a dynamické renderování (DECISIONS 005), nebo přejít na statické renderování s CSP bez nonce (hashe / `strict-dynamic` jinak)? Bezpečnostní změna, rozhoduje uživatel.
- Rok začátku podnikání (1993?) a příběh pana Učíka pro stránku O mně.
- Fotky ve vysoké kvalitě a ruční nákresy.
- Finální SVG logo.
- Úplný seznam starých URL pro přesměrování (zbylé kategorie fotogalerie, stránka „Naše služby“).
- Kdo spravuje doménu a DNS, posílá se z domény nějaký e-mail?
- Kontakt do `security.txt`.
- Nabízet i zámečnictví a kovovýrobu, jak je uvedeno v registrech? Rozhoduje i o klíčových slovech („zámečnictví Litoměřice“ jen se skutečnou službou).
- Má klient Google Business Profile nebo záznam na Firmy.cz? Kdo k nim má přístup?
- Má stávající web na kovarstviucik.cz zpětné odkazy a návštěvnost (Search Console, Collabim)? Rozhoduje o ambicích klíčových slov a prioritě přesměrování.
- Hlavní konkurenti v regionu, pokud je uživatel zná (pro obtížnost ve fázi 0).
- Podklady k rozšíření textů kategorií (teď 80–120 slov, tenký obsah): materiál, povrchová úprava, typické rozměry, jak probíhá zaměření a montáž u daného typu výrobku. Jen od klienta.
- Přijímá pan Učík zákazníky v dílně (veřejná adresa v GBP), nebo jen jezdí za nimi (skrytá adresa + oblast působnosti)?

## Záměrně nehotové

Aby to budoucí session „neopravila“ jako chybu.

- **Fotky jsou placeholdery**, protože klient je ještě nedodal.
- **Logo je dočasný wordmark**, protože finální SVG ještě nebylo dodáno.
- **Texty O mně jsou `[DOPLNÍ KLIENT]`**, protože chybí životopisné údaje.
- **Rok 1993 se na webu nepoužívá**, dokud ho klient nepotvrdí.
- **HSTS bez `preload`.** Přidá se po měsíci bezproblémového provozu.
- **Slugy a názvy v `src/content/vyrobky.ts` jsou pracovní** (brief §3). Přepíšou se po fázi 0, struktura zůstane.
- **Mapa na Kontaktu je placeholder s odkazem na Mapy.com a `frame-src` je `'none'`.** Iframe se zapne vyplněním `mapa.embedSrc` v `src/content/kontakt.ts` (kód „Vložit mapu do stránek“ vygeneruje uživatel). Tím se CSP sama otevře pro `https://frame.mapy.cz https://mapy.com` (ověřeno 2026-10-05, frame.mapy.cz přesměrovává na mapy.com) a je to změna CSP → zápis do CSP-LOG.
- **`security.txt` nemá `Contact`**, tedy není platný. Kontakt dodá uživatel.
- **Favicona `src/app/icon.svg` a OG obrázek `public/og/og-vychozi.png` jsou dočasné** (voluta + wordmark, ne logo). Nahradí se po dodání loga a fotek.
- **Přesměrování 301 v `next.config.ts` jsou jen pro 5 známých starých URL a míří na pracovní slugy.** Po fázi 0 zkontrolovat cíle, zbylé staré URL dodá uživatel.
- **`/vzornik`** je vývojová stránka (v produkci 404, noindex). Před spuštěním ji lze smazat, nic na ní nezávisí.
- **Title, H1 a meta description jsou pracovní** (z brief §3). Přepíšou se po fázi 0 v `src/content/`.
- **`LocalBusiness` nemá `sameAs` ani `AggregateRating`.** V `src/lib/seo.ts` jsou na místě TODO. `sameAs` až po vzniku GBP a Firmy.cz, hodnocení jen s reálnými recenzemi.
- **Fáze 3 se ostře nespouští** (Search Console, Bing, GBP, Firmy.cz, HSTS preload), dokud web neběží na doméně s finálními slugy. Podklady jsou v `memory/faze-3.md`.
- **`memory/keywords.md` neexistuje.** Vznikne ve fázi 0 s prvním schváleným slovem (sloupce: Stránka | Hlavní slovo | Vedlejší slova | Hledanost | Obtížnost | Datum schválení).

## Changelog

Nejnovější nahoře.

### 2026-10-24 — „vykovám“ nahrazeno spisovným „vykuji“
- **Co:** Ve všech textech (`src/`) a v `web-project-brief.md` nahrazeno „vykovám/Vykovám“ za „vykuji/Vykuji“, včetně hero nadpisu („Vykuji Vám bránu, která vydrží generace.“) a nadpisů „Co vykuji“, „Co všechno vykuji“. Identifikátor `coVykovam` v kódu zůstal.
- **Proč:** na pokyn uživatele; „vykovu“ není správný tvar, uživatel zvolil „vykuji“.
- **Dopad:** hero a nadpisy mají formálnější tón než dřív; starší záznamy changelogu níže citují původní znění. SEO `title`/`description` se netýká.
- **Soubory:** `src/content/uvod.ts`, `src/content/vyrobky.ts`, `src/app/page.tsx`, `src/app/vyrobky/page.tsx`, `src/app/vzornik/page.tsx`, `src/app/uvod.module.css`, `web-project-brief.md`

### 2026-10-22 — Texty webu: plynulejší věty místo úsečných útržků
- **Co:** Viditelné texty přepsány do prostšího, souvislého stylu (celé věty se spojkami místo útržků typu „Na stůl i na zeď.“). Dotčeno: Úvod (dlaždice, Jak pracuji, Kovář, Kde pracuji), krátké i delší popisy všech skupin a kategorií, pět kroků postupu, O mně (Dílna), úvody Kontaktu a Výrobků, text u Vzorů, úvody částí Realizací („Najdete tu …“). Obsah a fakta beze změny, nic nepřibylo.
- **Proč:** na pokyn uživatele, vzor stylu dodal uživatel (cizí text z jiné dílny, převzat byl jen styl, ne fakta ani věty).
- **Dopad:** SEO `title` a `description` záměrně nedotčeny, jsou pracovní a přepíšou se po fázi 0. Hero nadpis „Vykovám Vám bránu, která vydrží generace.“ zůstal (tón schválený klientem v briefu). Typecheck a lint prošly. Texty zatím neprošly `humanize-text-cs`.
- **Soubory:** `src/content/{uvod,vyrobky,postup,omne,realizace}.ts`, `src/app/{page,kontakt/page,vyrobky/page}.tsx`, `src/components/vyrobky/Vzory.tsx`

### 2026-10-13 — Úvod, „Kde pracuji“: mapa ČR po krajích + rozbalovací seznam
- **Co:** Mapka regionu s řekami nahrazena SVG mapou ČR po krajích podle vzoru od uživatele. Zvýrazněné (uhel) jsou kraje, kam patří města z oblasti: Ústecký, Liberecký, Středočeský + Praha. Tečky měst, dílna s popiskem a vodicí čárou. Vlevo rozbalovací seznam (`<details>`, bez JS) se třemi skupinami a městy. Rozbalený, zaměřený nebo najetý kraj se na mapě rozsvítí mědí (CSS `:has`). Města v `oblast.ts` mají pole `kraj`, přibyly `skupinyKraju` a `mestaSkupiny`. Hranice krajů z Natural Earth 1:10m Admin 1 (public domain), předpočítané do `kraje-cr.ts` (~23 kB, server component, žádný požadavek za běhu, CSP beze změny).
- **Proč:** na pokyn uživatele (design podle dodaného obrázku).
- **Dopad:** Barvy podle „Světla výhně“ (uhel/měď, ne zelená ze vzoru), bez vlnovky a nadtitulku ze vzoru (jediný ornament je voluta). Na mobilu jsou názvy krajů na mapě skryté, seznam je hned pod ní. Zvýrazněný celý kraj ukazuje víc území než výčet měst (např. Liberecký kraj = jen Česká Lípa); konkrétní města jsou v seznamu. Brief §4 bod 6 upraven. `areaServed` beze změny. Typecheck a lint prošly, ověřeno v Chrome na 390, 500 a 1440 px, konzole bez chyb, bez vodorovného přetoku.
- **Soubory:** `src/components/uvod/MapaOblasti.tsx`, `src/components/uvod/MapaOblasti.module.css`, `src/components/uvod/kraje-cr.ts` (nový), `src/content/oblast.ts`, `src/app/page.tsx`, `src/app/uvod.module.css`, `web-project-brief.md`

### 2026-10-06 — Příprava fáze 3 bez spuštění (`seo-new-site-audit`)
- **Co:** SEO audit lokálního produkčního buildu (33 URL ze sitemapy). Bez duplicitních title a description, všude canonical, OG, jeden H1, `LocalBusiness` a `BreadcrumbList`, žádný odkaz mimo sitemapu. Doplněn zpětný odkaz z části Realizací na stejnojmennou skupinu Výrobků („Co všechno vykovám: …“, kromě „Z dílny“), dřív vedl odkaz jen jedním směrem. Do `localBusinessLd` přidány TODO pro `sameAs` a `AggregateRating`. Vznikl checklist `memory/faze-3.md` pro kroky 17–19.
- **Proč:** pokyn uživatele začít fází 3. Fáze 3 předpokládá spuštěný web a podle rozhodnutí z 2026-10-05 se po spuštění slugy nemění, proto uživatel zvolil přípravu bez spuštění. Fáze 0 a krok 16 zůstávají před ostrou fází 3.
- **Dopad:** Nálezy, které kód nevyřeší: tenký obsah kategorií (80–120 slov, chybí podklady od klienta) a dynamické renderování všech stránek (otevřené rozhodnutí o nonce). Blog podle skillu se nepřidává, brief ho nemá (změna struktury). `sitemap.ts` bez `lastModified` záměrně, plošné datum buildu by signál znehodnotilo. Typecheck, lint i build prošly.
- **Soubory:** `src/components/realizace/StrankaRealizaci.tsx`, `src/components/realizace/StrankaRealizaci.module.css`, `src/lib/seo.ts`, `memory/faze-3.md`, `memory/index.md`

### 2026-10-06 — Fáze 2, kroky 14–15: review, Vercel projekt, preview
- **Co:** Krok 14: `web-security-review` celého kódu bez nálezu, `npm audit` (produkce 0), gitleaks (doinstalován přes Homebrew) nad soubory pro git čistý. Krok 15: založen Vercel projekt `sobotkakrystof5-pngs-projects/kovarstvi-ucik` (osobní scope), přidán `.vercelignore` (na Vercel nejdou `memory/`, `.claude/`, `.github/`, `CLAUDE.md`, `AGENTS.md`, brief). Preview: `https://kovarstvi-ucik-keiqdhbup-sobotkakrystof5-pngs-projects.vercel.app` (za Vercel Authentication, `x-robots-tag: noindex`). Opraven `security-check.sh` (projektová kopie i skill): na macOS chybí `timeout`, takže TLS testy hlásily falešné výsledky; teď fallback na `gtimeout` nebo běh bez limitu.
- **Proč:** pokyn uživatele „pokračuj fází dvě“.
- **Dopad:** **Chyba a náprava:** první `vercel deploy --target=preview` nového projektu Vercel přesto nasadil do Production a `kovarstvi-ucik.vercel.app` byl asi 15 minut veřejně dostupný bez ochrany a bez noindex. Deploy byl smazán (`vercel remove`), adresa vrací 404. Příště: u nového projektu nejdřív `vercel link`, pak deploy, a vždy ověřit `vercel inspect` → target. Doména klienta se nepřepínala. Krok 16 (produkce) čeká na fázi 0, úplný seznam starých URL a správce DNS.
- **Výsledek auditu preview:** `security-check.sh` 29 OK / 4 varování (DNS `vercel.app`) / 0 chyb; 66 kontrol v prohlížeči bez chyb; Lighthouse mobil: přístupnost 96–100 → po opravě kontrastu odkazu na mapu (`Mapa.module.css`) 100, best practices 100, výkon 62 Úvod / 80 kategorie a Kontakt / 96 Realizace. LCP je otevřené rozhodnutí (Otevřené otázky). `label-content-name-mismatch` u galerie je jen artefakt placeholderů.
- **Soubory:** `.vercelignore`, `.vercel/` (ignorováno), `.claude/security/security-check.sh`, `.claude/skills/web-security-audit/scripts/security-check.sh`, `.claude/security/AUDIT-LOG.md`, `.claude/security/CSP-LOG.md`, `.claude/security/STATE.md`, `src/components/kontakt/Mapa.module.css`

### 2026-10-06 — Dohnání paměti: fáze 1, kroky 6–13 (session z 2026-10-05)
- **Co:** Zápis práce minulé session, která spadla (výpadek API) těsně před zápisem do paměti. Rekonstruováno z časů souborů a přepisu session. Krok 6: `src/content/typy.ts`, `vyrobky.ts` (6 skupin, 16 kategorií, pracovní slugy), `realizace.ts` (11 realizací se `src: null`, 7 částí galerie), `postup.ts`, `omne.ts`, `oblast.ts`, `uvod.ts`, `src/lib/seo.ts`. Krok 7: Úvod s jiskrami (`Jiskry`, reduced motion přes `useSyncExternalStore`) a SVG mapkou oblasti (`MapaOblasti`). Krok 8: `/vyrobky`, `/vyrobky/[skupina]`, `/vyrobky/[skupina]/[kategorie]` (`Rozcestnik`, `Vzory`, `ObsahStranky`). Krok 9: `/realizace` a `/realizace/[cast]` (filtr jako odkazy se sdílitelnou URL), `Galerie` s lightboxem (šipky, Esc, swipe, vrácení focusu, „Chci podobné“ přes `mailtoPodobne`). Krok 10: `/jak-pracuji`, `/o-mne` (texty `[DOPLNÍ KLIENT]`), `/kontakt` s `Mapa` (placeholder, viz Záměrně nehotové). Sdílené: `HlavickaStranky`, `Drobecky` (+ BreadcrumbList), `ZavolejteMi`, `JsonLd`. Krok 11: metadata přes `metadataStranky`, JSON-LD, `sitemap.ts`, `robots.ts` (zakazuje `/vzornik`), 5 přesměrování 301 v `next.config.ts`, favicona `icon.svg`, OG obrázek (vyrenderovaný z `/vzornik/og`). Krok 12: texty prošly kontrolou `humanize-text-cs`. Krok 13: kontrola všech rout.
- **Proč:** pokyn uživatele 2026-10-05 („keyword research až na konci, pokračuj“).
- **Dopad:** `lint`, `typecheck` a `build` (40 stránek) prošly; 66 kontrol v headless Chrome (33 stránek × mobil a desktop) bez chyb konzole, bez porušení CSP, bez chybných požadavků a bez přetoku. Efektivní CSP se nezměnila (v1), jen `security.ts` umí podmíněně otevřít `frame-src` pro Mapy.com. Přibyla hlavička `X-DNS-Prefetch-Control: off`. Activity.log zachytil jen část změn (hook loguje Edit/Write, ne Bash).
- **Soubory:** `src/content/*`, `src/lib/seo.ts`, `src/lib/security.ts`, `src/app/**`, `src/components/{galerie,kontakt,realizace,stranka,uvod,vyrobky}/*`, `next.config.ts`, `public/og/og-vychozi.png`

### 2026-10-05 — Keyword research přesunut na konec
- **Co:** Fáze 0 se dělá až po krocích 6–13, před spuštěním.
- **Proč:** na pokyn uživatele.
- **Dopad:** vědomě přepisuje rozhodnutí z 2026-10-05 o pořadí. SEO údaje stránek jsou pracovní a po fázi 0 se přepíšou.
- **Soubory:** `memory/memory.md`

### 2026-10-05 — Fáze 1, kroky 1–5: projekt, bezpečnost, tokeny, layout, komponenty
- **Co:** `git init` ve složce projektu, Next.js 16.3.8 + React 19.3 + TypeScript 5.9.3 + ESLint 9 (flat config) založeny ručně (create-next-app odmítá neprázdnou složku). Bezpečnost: `src/lib/security.ts`, `src/proxy.ts` (CSP s nonce, enforcing), hlavičky v `next.config.ts`, `.gitignore`, `public/.well-known/security.txt`, `.github/workflows/security.yml`, `.claude/security/` (STATE, DECISIONS 001–005, CSP-LOG v1, AUDIT-LOG, `security-check.sh`). Tokeny `src/styles/tokens.css`, globální styly, fonty přes `next/font` (Fraunces s osami opsz a SOFT, Source Sans 3, Cinzel, vše latin-ext). Layout: hlavička s rozbalovacími Výrobky, mobilní menu (`<dialog>`), spodní lišta Zavolat | Napsat, patička s chladnoucím přechodem. Komponenty: `PhotoSlot`, voluta (generovaná logaritmická spirála se žhavým bodem), `Akce` s rozžhavením, `ChladnouciPrechod` (CSS scroll-driven animace). Data: `src/content/kontakt.ts`, `vyrobky.ts` (pracovní slugy), `navigace.ts`, `brand.ts` (slot pro logo).
- **Proč:** na pokyn uživatele („začni s implementací“), v pořadí podle rozhodnutí z 2026-10-05.
- **Dopad:** ověřeno `tsc`, `eslint`, `next build` a headless Chrome na 1440 a 375 px: produkční CSP bez porušení, bez vodorovného přetoku, dropdown (klik, Esc vrací focus) a mobilní dialog fungují. `npm audit`: produkce 0, dev 5× high v `eslint-config-next`. Varování o cizím `package-lock.json` v domovské složce řeší `turbopack.root`. Otevřené k výkonu: 8 preloadů fontů (latin + latin-ext, kurzíva Fraunces), řešit při Lighthouse v kroku 15.
- **Soubory:** `package.json`, `tsconfig.json`, `eslint.config.mjs`, `next.config.ts`, `.gitignore`, `src/**`, `public/.well-known/security.txt`, `.github/workflows/security.yml`, `.claude/security/*`, `AGENTS.md`, `memory/index.md`

### 2026-10-05 — Rozhodnutí: CSS Modules a pořadí fází
- **Co:** Uživatel zvolil CSS Modules místo Tailwindu a pořadí „fáze 1 kroky 1–5, pak fáze 0“. Otázka Tailwind/CSS Modules smazána z Otevřených otázek.
- **Proč:** rozhodnutí uživatele.
- **Dopad:** vědomá odchylka od pořadí v brief §12, viz Klíčová rozhodnutí.
- **Soubory:** `memory/memory.md`

### 2026-10-05 — Brief přepsán do fází, AGENTS.md srovnán
- **Co:** Paralelní session `ucik-web-cd` upravila `web-project-brief.md`: úvod (skilly, brief má přednost), §3 pracovní slugy, §4 omezení `craftsman-site-layout`, §7 bezpečnostní skilly, §8 klíčová slova a kroky po spuštění, §11 čtyři nové otázky, §12 fáze 0–3, odkazy na `CLAUDE.md` §5 nahrazeny `memory/memory.md`. Podle toho upraven `AGENTS.md` §3 (git), §4 (slugy, `keywords.md`), §5 (přehled fází), §8 (DoD).
- **Proč:** sladění dokumentů se zadáním.
- **Dopad:** otázka „vlastní git repo“ vyřešena briefem (fáze 1, krok 1), rozpor brief vs. `CLAUDE.md` §5 odstraněn. Přibyl budoucí soubor `memory/keywords.md`.
- **Soubory:** `web-project-brief.md`, `AGENTS.md`, `memory/memory.md`, `memory/index.md`

### 2026-10-05 — Založení paměťového systému
- **Co:** Vytvořeny `memory/index.md`, `memory/pravidla.md`, `memory/memory.md`, `memory/activity.log` a PostToolUse hook v `.claude/settings.json`, který při každém Edit/Write zapisuje do `activity.log`. `AGENTS.md` naplněn technickými fakty z briefu, přehledem 14 skillů s omezeními pro tento projekt, bezpečnostními pravidly, popisem `.claude/security/` a Definition of Done.
- **Proč:** na pokyn uživatele („připrav kompletní memory system na základě claude.md, promptu, agents.md a skills“).
- **Dopad:** `CLAUDE.md` §0 už pořadí čtení paměti obsahuje, beze změny. `.claude/security/` vědomě nevytvořena (viz Záměrně nehotové).
- **Soubory:** `AGENTS.md`, `memory/*`, `.claude/settings.json`

### 2026-10-05 — Zadání, CLAUDE.md a skilly (paralelní session)
- **Co:** Do `.claude/skills/` zkopírováno 14 skillů z `~/Documents/claude skills`. `web-project-brief.md` obnoven ze zálohy VS Code (úplný brief). `CLAUDE.md` přepsán: §0 pořadí čtení, §5 odkazuje na `memory/memory.md`, §6 pravidlo „brief má přednost před skills“, §7 bezpečnostní skilly.
- **Proč:** příprava projektu, provedla souběžná session `ucik-web-cd`.
- **Dopad:** odkazy na zadání vedou na `web-project-brief.md` (dřív `PROJECT-BRIEF.md`).
- **Soubory:** `CLAUDE.md`, `web-project-brief.md`, `.claude/skills/*`
