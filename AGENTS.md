# AGENTS.md — Kovářství Jiří Učík, web

Technická fakta pro jakéhokoli AI asistenta (Claude Code, Cursor, Codex, Copilot). Žádná pravidla tónu ani chování: ta jsou v `CLAUDE.md`. Živý stav, rozhodnutí a changelog jsou v `memory/memory.md`. Úplné zadání (design, obsah stránek, SEO, bezpečnost) je v `web-project-brief.md`. Tento soubor ho neopakuje, jen odkazuje na sekce.

## 1. Přehled

- **Klient:** Jiří Učík, Kovářství Jiří Učík, Litoměřická 3, 411 41 Žitenice. Úplné údaje: `web-project-brief.md` §1.
- **Doména:** kovarstviucik.cz. Stávající web na WordPressu bude nahrazen, staré URL se přesměrují 301 (§8 briefu).
- **Typ:** vícestránkový prezentační web, 16 kategorií v 6 skupinách, skutečné routování. Mapa rout: brief §3.
- **Cíl:** každá stránka vede k jedné akci, zavolat nebo napsat. Bez formuláře.
- **Stav:** viz `memory/memory.md` → Aktuální stav.

## 2. Stack

| Oblast | Volba | Zdroj |
|---|---|---|
| Framework | Next.js 16.3, App Router, Turbopack; React 19.3 | brief §3 |
| Jazyk | TypeScript 5.9 (strict, `noUncheckedIndexedAccess`), alias `@/*` → `src/*` | brief §3 |
| Hosting | Vercel | brief §3 |
| Styly | CSS Modules + globální tokeny v `src/styles/tokens.css` (rozhodnuto 2026-10-05) | brief §3, `memory/memory.md` |
| Animace | CSS + malý vlastní `<canvas>` pro jiskry; Framer Motion jen kde opravdu pomůže | brief §3 |
| Obrázky | `next/image`, WebP/AVIF, `sizes`, lazy mimo první obrazovku, hero s `priority` | brief §3, §9 |
| Fonty | `next/font`: Fraunces, Source Sans 3, Cinzel (jen logo). Žádné Google CDN za běhu | brief §2 |
| Obsah | typované soubory v `src/content/` (skupiny, kategorie, vzory, realizace) | brief §3, §5 |
| Mapa | iframe Mapy.cz, žádné JS SDK; hostname ověřit a zapsat do CSP | brief §3 |
| Backend / DB / API klíče / formuláře / analytika / cookies | žádné | brief §3, §10 |

**Příkazy** (ověřeno 2026-10-05):

```bash
npm install
npm run dev        # vývoj, vzorník komponent na /vzornik
npm run build      # musí projít bez chyb před každým deployem (od Next 16 nespouští lint)
npm run lint       # eslint . (flat config, core-web-vitals + typescript)
npm run typecheck  # tsc --noEmit
```

Next.js 16: `middleware.ts` se jmenuje `proxy.ts` s funkcí `proxy`. Dokumentace přesné verze je v `node_modules/next/dist/docs/`.

## 3. Struktura repa

Aktuálně (2026-10-05):

```
UCIK - web /                 (pozor: mezera na konci názvu složky, cesty vždy v uvozovkách)
├── CLAUDE.md, AGENTS.md, web-project-brief.md
├── memory/                  paměťový systém (mapa: memory/index.md)
├── next.config.ts           headers() bez CSP, poweredByHeader: false, později redirects()
├── src/
│   ├── proxy.ts             CSP s nonce pro každý request
│   ├── lib/security.ts      jediný zdroj CSP a hlaviček
│   ├── styles/tokens.css    design tokeny (brief §2 + odvozené kvůli kontrastu)
│   ├── app/                 layout.tsx, fonts.ts, globals.css, page.tsx (dočasná), not-found.tsx, vzornik/
│   ├── components/          akce/, photo-slot/, prechod/, voluta/, layout/ (Header, HlavniNavigace, MobilniMenu, MobilniLista, Footer, Wordmark)
│   └── content/             kontakt.ts, vyrobky.ts (pracovní slugy), navigace.ts, brand.ts
├── public/.well-known/security.txt
├── public/brand/            slot pro finální logo.svg (zatím prázdné)
├── .github/workflows/security.yml
└── .claude/
    ├── settings.json        hook → memory/activity.log
    ├── security/            STATE, DECISIONS, CSP-LOG, AUDIT-LOG, security-check.sh
    └── skills/              14 lokálních skillů (§6)
```

Přibude: routy podle brief §3, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/content/realizace.ts`, komponenta jisker (krok 7).

**Git:** vlastní repo ve složce projektu (`git init` 2026-10-05, větev `main`), zatím bez remote a bez commitu. Commitovat jen na pokyn uživatele.

## 4. Konvence

- Obsah webu a commit zprávy česky. Commity krátké a věcné („přidání sekce Galerie + lightbox“), jako v ostatních projektech uživatele.
- Design tokeny přesně podle brief §2 (`--paper`, `--coal`, `--iron`, `--copper`, `--ember`, `--heat-1` až `--heat-6`) v `src/styles/tokens.css`. Žádné jiné barvy. Odvozené tokeny jen kvůli kontrastu: `--copper-ink` (malý text a odkazy na papíře), `--paper-dim` (doplňkový text na uhlu), `--paper-shade`, `--rule`, `--rule-dark`.
- Tmavá plocha = třída `.surface-coal`. Štítek nad H1 = `.eyebrow`. Chybějící text = `<em className="todo-klient">[DOPLNÍ KLIENT: …]</em>`.
- Chybějící text od klienta: `[DOPLNÍ KLIENT: co přesně]`.
- Fotky: jen komponenta `PhotoSlot` s ID `stranka-sekce-01`, pevným `aspect-ratio` a popisným `alt` (brief §6). Výměna fotky = doplnění `src` v `src/content/`, žádný zásah do komponent.
- Logo: dočasný textový wordmark v Cinzel, slot `public/brand/logo.svg`.
- Oheň jen ve čtyřech prvcích z brief §2. Při `prefers-reduced-motion: reduce` jiskry pryč a přechody okamžité.
- „Chci podobné“: `mailto:kovarstvi.ucik@seznam.cz`, předmět „Poptávka: podobné jako [název realizace]“, v těle odkaz na fotku (brief §5).
- Datový model realizace: `Realizace` v brief §5. Jeden zdroj dat pro galerii i stránky skupin a kategorií.
- Slugy v brief §3 jsou pracovní, finální vzniknou ve fázi 0 a zapíšou se do `memory/keywords.md`. Struktura (6 skupin, 16 kategorií, ostatní stránky) se nemění. Po spuštění se slugy nemění vůbec.
- SEO údaje stránek (slug, title, H1, meta description) se berou z `memory/keywords.md` a ukládají do `src/content/`. Jedno hlavní slovo patří jen jedné stránce. Města z oblasti působnosti nemají vlastní stránky, jdou do textů, titulků a `areaServed`.

## 5. Pořadí práce

Závazný postup krok po kroku je v brief §12, tady jen přehled fází. Po každém kroku zápis do `memory/memory.md`.

| Fáze | Obsah | Skilly | Výstup |
|---|---|---|---|
| 0, klíčová slova | Stránku po stránce kandidáti, čísla ověřuje uživatel v Collabimu, pak mapování na routy a schválení slugů | `seo-collabim-keyword-loop` → `seo-keyword-cluster-architect` | `memory/keywords.md`, finální slugy v brief §3 |
| 1, stavba (kroky 1–13) | `git init` + Next.js, bezpečnost, tokeny, layout, komponenty, data, stránky, SEO, texty | `web-security-setup`, `web-security-memory`, `craftsman-site-layout`, `web-security-review`, `seo-complete-optimization`, `seo-quality-principles`, `humanize-text-cs`, `seo-ai-risk-guard` | hotový web lokálně, `.claude/security/` |
| 2, ověření a spuštění (14–16) | Review kódu, preview, audit, přesměrování, přepnutí domény | `web-security-review`, `web-security-audit` | produkce, záznam v `AUDIT-LOG.md` |
| 3, po spuštění (17–19) | Search Console, Bing, GBP, Firmy.cz, HSTS preload, měsíční audit, doplňování fotek a textů | `seo-new-site-audit`, `web-security-audit` | — |

## 6. Lokální skilly (14) a kdy je použít

Když je v rozporu skill a zadání, platí zadání (`CLAUDE.md` §6).

| Skill | Kdy | Omezení pro tento projekt |
|---|---|---|
| `web-project-brief` | Úprava `web-project-brief.md`. Změnu struktury propsat do všech dotčených míst (brief, `AGENTS.md`, `CLAUDE.md` §4). | Needitovat přes šablony, jen cílené úpravy. |
| `project-memory-system` | Údržba nebo rozšíření `memory/`. | — |
| `craftsman-site-layout` | Rozvržení stránek a opakujících se komponent. Bere se jen struktura a rytmus. | **Nepřebírat:** formuláře (web nemá formulář), ceník, pás statistik/počítadel (zakázaná vymyšlená čísla), menu bez dropdownu (brief má rozbalovací Výrobky). Ani barvy, texty a fotky šablony. |
| `humanize-text-cs` | Každý český text před dokončením stránky. | — |
| `seo-ai-risk-guard` | Po inicializaci a na konci každé nové stránky/routy. | — |
| `seo-complete-optimization` | Jakýkoli SEO úkol: texty, meta, schema, lokální SEO. | — |
| `seo-quality-principles` | Kontrola integrity SEO práce. | Žádná vymyšlená fakta, recenze ani hodnocení. |
| `seo-collabim-keyword-loop` | Fáze 0: klíčová slova stránku po stránce, čísla ověřuje uživatel v Collabimu. | Hledanost a obtížnost se neodhadují. |
| `seo-keyword-cluster-architect` | Po fázi 0: mapa slov na URL, title/H1/meta. | Mění jen slugy, ne strukturu rout. |
| `seo-new-site-audit` | Po spuštění: indexace, schema, prolinkování, Search Console, Google Business Profile. | — |
| `web-security-setup` | Bezpečnostní baseline, fáze 1 krok 2 (brief §12). | Nový projekt: enforcing CSP od začátku. |
| `web-security-memory` | Na začátku session (čtení `STATE.md`) a při každé bezpečnostní změně. | — |
| `web-security-review` | Před commitem a deployem kódu se vstupy, env proměnnými nebo externími skripty. | — |
| `web-security-audit` | Po každém deployi a jednou měsíčně. | — |

## 7. Bezpečnost

Úplná specifikace hlaviček, návrh CSP a DNS: brief §7. Tady jsou jen trvalá pravidla a obsah bezpečnostní paměti.

**Pravidla:**
- Hlavičky v `next.config.ts` přes `headers()`, nonce v `src/proxy.ts` (Next 16 název pro middleware), obojí ze `src/lib/security.ts`. Nasazují se a mění vždy všechny společně, jen po ověření na Vercel preview URL.
- `script-src` nikdy `unsafe-inline` ani `unsafe-eval`. Inline skripty jen přes nonce se `strict-dynamic`.
- Žádné wildcardy v CSP. Každý nový hostname (Mapy.cz) jde do `CSP-LOG.md` s funkcí, která ho potřebuje.
- `form-action 'none'`. Přidání formuláře, analytiky, externího skriptu nebo vložené služby je bezpečnostní změna, kterou schvaluje uživatel.
- Vercel preview toolbar jen v preview prostředí, v produkci ne.
- HSTS bez `preload`, ten až po měsíci provozu.
- `poweredByHeader: false`, žádná hlavička s verzí.
- Žádná tajemství v repu. Případný klíč jen do env proměnných Vercelu, nikdy do klientského kódu ani `NEXT_PUBLIC_*`.
- `.gitignore`: `.env`, `.env.*`, `*.pem`, `*.key`, `.vercel`, `.DS_Store`, `node_modules`, `.next`.
- DNS (SPF `-all`, DMARC `p=reject`) se nastavuje až po ověření s uživatelem, klient používá e-mail na seznam.cz.

**Bezpečnostní paměť `.claude/security/`** (vznikne při inicializaci, šablony ve skillu `web-security-memory/assets/`):

| Soubor | Obsah | Úvodní záznamy |
|---|---|---|
| `STATE.md` | Aktuální stav: platforma, hlavičky, verze a režim CSP, DNS, threat model, otevřené body. Přepisuje se. | Vercel, Next.js App Router, statický obsah bez formuláře a bez osobních údajů. Otevřené: HSTS preload, DNSSEC/CAA, SPF/DMARC, kontakt do `security.txt`. |
| `DECISIONS.md` | Vědomé kompromisy s důvodem a datem revize. Jen přidávat. | 001 `style-src 'unsafe-inline'` kvůli stylům, které vkládá Next.js. 002 `form-action 'none'`, web nemá formulář. 003 fonty self-hosted, žádné Google domény v CSP. |
| `CSP-LOG.md` | Každá změna CSP a co ji vyžádalo. | v1: výchozí politika z brief §7 + ověřený hostname Mapy.cz. |
| `AUDIT-LOG.md` | Audity, review, incidenty. Jen historie. | První `web-security-audit` po nasazení na preview. |

## 8. Definition of Done (před každým „hotovo“ a deployem)

- `npm run build` projde bez chyb.
- Konzole bez chyb na všech stránkách.
- Responzivita: mobil (375 px), tablet, desktop, bez horizontálního scrollu. Mobilní lišta Zavolat | Napsat funguje.
- `tel:` a `mailto:` odkazy fungují, včetně předvyplněného „Chci podobné“.
- Přístupnost: kontrast WCAG AA u každé kombinace tokenů, klávesnice (menu, dropdown Výrobky, lightbox), viditelný focus, `prefers-reduced-motion`.
- SEO podle brief §8: title, description, canonical, OG, jeden H1, JSON-LD `LocalBusiness` + `BreadcrumbList`, `sitemap.ts`, `robots.ts`, přesměrování 301. Slug, title, H1 a meta odpovídají `memory/keywords.md`.
- Stránka prošla `seo-ai-risk-guard`.
- Texty prošly `humanize-text-cs`. Žádný vymyšlený fakt, chybějící obsah je `[DOPLNÍ KLIENT: ...]` nebo `PhotoSlot`.
- Kontrola „vypadá to jako šablona?“ podle brief §0.
- Hlavičky ověřené na preview URL, výsledek `web-security-audit` v `AUDIT-LOG.md`.
- Změna zapsaná v `memory/memory.md`.

## 9. Vazba na paměť

Každá změna obsahu tohoto souboru jde ve stejném kroku i do changelogu v `memory/memory.md`. Jedno bez druhého je nekompletní.
