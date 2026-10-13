# memory/faze-3.md — podklady pro fázi 3 (po spuštění)

Připraveno 2026-10-06, před spuštěním. Ostře se spouští až po fázi 0 a kroku 16 (brief §12).
Odškrtávat a datovat. Hotové kroky zapsat i do changelogu v `memory/memory.md`.

## Stav auditu před spuštěním (2026-10-06, lokální produkční build)

- 33 stránek v sitemapě, všechny 200, `robots.txt` blokuje jen `/vzornik`.
- Každá stránka: vlastní title (35–65 znaků) a description (126–158 znaků), žádné duplicity, canonical, OG s obrázkem, jeden H1.
- JSON-LD: `LocalBusiness` všude, `BreadcrumbList` na všech podstránkách, struktura drobečků odpovídá URL.
- Prolinkování: každá stránka má 7 a více příchozích odkazů, žádný odkaz mimo sitemapu. Doplněn zpětný odkaz Realizace → Výrobky.
- **Slabé místo: tenký obsah.** Kategorie mají 80–120 slov textu, skupiny 120–240. Bez podkladů od klienta se nerozšiřuje (nic se nevymýšlí). Viz Otevřené otázky v `memory.md`.
- **Všechny stránky jsou dynamické** (ƒ), důsledek CSP s nonce (DECISIONS 005). Pro crawl to nevadí, pro výkon ano. Rozhodnutí je otevřené.

## Krok 17: vyhledávače a profily

**Předpoklad:** web běží na kovarstviucik.cz, přesměrování 301 jsou nasazená, slugy jsou finální.

1. [ ] **Google Search Console**: vlastnost typu Doména (ověření TXT záznamem v DNS, potřebuje správce DNS). Odeslat `https://kovarstviucik.cz/sitemap.xml`.
2. [ ] URL Inspection → požádat o indexaci: Úvod, `/vyrobky`, 6 skupin, `/realizace`, `/kontakt`.
3. [ ] Po 1–2 týdnech: Stránky → „Stránka s přesměrováním“ obsahuje staré WordPress URL, žádné 404 ze starého webu. Chybějící staré URL doplnit do `redirects()`.
4. [ ] **Bing Webmaster Tools**: import ze Search Console (stačí jeden klik), sitemap se převezme.
5. [ ] **Google Business Profile**: zjistit, jestli už existuje a kdo k němu má přístup (otevřená otázka). Údaje 1:1 jako na webu:
   - Název: Kovářství Jiří Učík
   - Adresa: Litoměřická 3, 411 41 Žitenice
   - Telefon: +420 603 582 254
   - Web: https://kovarstviucik.cz
   - Kategorie: vybrat v nabídce GBP tu, která odpovídá kovářství (ověřit, ne odhadovat)
   - Oblast působnosti: města z `src/content/oblast.ts`
   - Provozní doba: dle telefonické domluvy (GBP umožňuje „bez otevírací doby“)
   - Rozhodnout s klientem: přijímá zákazníky v dílně (adresa veřejná), nebo jen jezdí za nimi (skrytá adresa + oblast)?
6. [ ] **Firmy.cz**: stejné údaje jako GBP (NAP musí sedět znak po znaku).
7. [ ] Oborové katalogy, jen se stejnými údaji. Žádné placené balíčky odkazů.
8. [ ] Po vzniku profilů doplnit jejich URL do `sameAs` v `src/lib/seo.ts` (TODO v kódu).
9. [ ] Recenze: klient může požádat skutečné zákazníky. `AggregateRating` do schema až s reálnými hodnotami (TODO v kódu).

## Krok 18: bezpečnost po spuštění

1. [ ] `web-security-audit` proti produkci hned po spuštění (patří ke kroku 16).
2. [ ] Po měsíci bez problémů: HSTS `preload` v `src/lib/security.ts` + odeslání na hstspreload.org. Datum: spuštění + 30 dní.
3. [ ] Jednou měsíčně `web-security-audit`, výsledek do `.claude/security/AUDIT-LOG.md`.

## Krok 19: obsah od klienta

Fotky, logo a texty se doplňují jen do `src/content/` a `public/`, bez zásahu do komponent:

- Fotky realizací: `src` v `src/content/realizace.ts`, zrušit `ukazka: true`, doplnit název, vzor a případně místo a rok (jen od klienta).
- Úvodní fotky skupin a kategorií: `hero.src` v `src/content/vyrobky.ts`.
- Logo: `public/brand/logo.svg` + `src/content/brand.ts`, pak nahradit faviconu a OG obrázek.
- Texty O mně: `src/content/omne.ts`, smazat `[DOPLNÍ KLIENT]`.
- Rozšíření textů kategorií: jen z toho, co klient řekne (materiál, povrchová úprava, typické rozměry, montáž). Prošlo `humanize-text-cs`.
- Po každé dávce: `npm run build`, kontrola v prohlížeči, změna do changelogu.
