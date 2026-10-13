---
name: seo-new-site-audit
description: Run a technical + content SEO audit and improvement pass on a new or low-authority website (fresh domain, zero/near-zero backlinks, thin templated landing pages). Use when the user asks for an SEO audit, wants to improve indexing or rankings for a new site, mentions a backlink checker showing 0, mentions a missing/incomplete Google Business Profile or local rating, or wants to expand thin/templated micro-pages. Covers thin-content expansion, structured data, internal linking, a technical checklist, sitemap hygiene, and a manual off-site checklist (Search Console, Google Business Profile, local directories, social).
---

# SEO audit pro nový/nízko-autoritní web

Tenhle skill zobecňuje postup, který funguje pro čerstvou doménu bez zpětných odkazů a bez
autority: web je technicky v pořádku (indexovatelný), ale obsahově tenký nebo neaktivní, a je
potřeba udělat maximum, co jde vyřešit v kódu, než přijde na řadu offsite práce (odkazy, profily,
katalogy).

Nepoužívej ho na weby, které už mají zavedenou autoritu a řeší jiný typ problému (penalizace,
migrace domény, kanibalizace klíčových slov) — tam je diagnóza jiná.

## 0. Než začneš — zjisti kontext

Nikdy nezačínej psát obsah nebo měnit kód, dokud nevíš:

1. **Framework a routing.** Next.js App Router (`app/`), Next Pages Router, jiný framework? Od
   toho se odvíjí, kde je `sitemap`, `robots`, `generateMetadata`/meta tagy, a jestli stránky umí
   generovat staticky (SSG) nebo běží jako SSR/dynamic.
2. **Existující design systém a konvence.** Barvy, fonty, sdílené UI tokeny (typicky
   `lib/ui.ts`/`theme.ts` nebo obdoba), stávající komponenty pro opakující se vzory (patička,
   CTA blok, FAQ sekce). Piš nový obsah tak, aby vypadal, že ho napsal někdo, kdo web zná — ne
   jako cizí vsuvka.
3. **Doménový věk a stav indexace**, pokud je dostupný (registrace domény, `robots.txt`,
   `sitemap.xml`, canonical tagy, JSON-LD, žádný nechtěný `noindex`, žádná deployment protection
   blokující crawler). Tohle je diagnostika, ne úkol k opravě — pokud je něco z toho rozbité, je to
   vyšší priorita než cokoli níž.
4. **Existující pravdivý obsah** (reference, portfolio, ceník, FAQ) — abys nepsal nic, co si
   odporuje s tím, co už na webu je.

Polož si (nebo uživateli) tři otázky, než napíšeš první řádek:
- Je tenký obsah **šablonovitý** (víc stránek jede přes jednu sdílenou komponentu s pár
  proměnnými), nebo je to prostě **chybějící** obsah (stránka existuje, ale je prázdná)?
- Existuje blog/content hub, nebo se zakládá od nuly?
- Má web reálné recenze/hodnocení, nebo je `AggregateRating` = 0, protože zatím žádné nejsou?

## Pevná pravidla — neporušuj

- **Nikdy nevymýšlej fakta.** Žádné fiktivní recenze, testimonials, počty zákazníků, roky
  praxe, statistiky ani `AggregateRating`/`Review` v structured datech, dokud nejsou reálná data.
  Pokud recenze zatím nejsou, připrav strukturu jako **TODO komentář** v kódu (viz sekce 3), ne
  jako vyplněné nuly nebo placeholder čísla.
- **Nesahej na kritické flow** (platby, rezervace, přihlašování, API routy, middleware/rate
  limiting), pokud tě o to výslovně nepožádali. Pokud na něj musíš sáhnout kvůli SEO (např.
  breadcrumb na checkout stránce), nejdřív to popiš a nech si to schválit.
- **Drž se existujících konvencí** — barvy, fonty, tón hlasu, existující komponenty. Nový obsah
  má zapadnout, ne vyčnívat kvalitou nebo stylem.
- **Merge/redirect stránek navrhni, needělej bez potvrzení.** Pokud zjistíš, že 2-3 stránky mají
  tak podobný obsah, že smysluplnější řešení je sloučit je do jedné silnější stránky s 301
  redirectem místo udržování tenkého obsahu na všech, řekni to uživateli a počkej na potvrzení —
  mění to URL strukturu a sitemapu, což má dopad na existující indexaci a případné odkazy zvenčí.
- **Po každé větší dávce změn spusť produkční build** (`npm run build` nebo ekvivalent) a ověř,
  že prochází bez chyb a že stránky, které mají být statické, statické zůstaly (viz sekce 5).

## 1. Rozšíření tenkého / šablonovitého obsahu (nejvyšší priorita)

Tohle má na indexaci a hodnocení obvykle největší dopad, protože Google (u čerstvé domény bez
autority obzvlášť) hodnotí skoro identické stránky jako tenký/near-duplicate obsah, což zpomaluje
nebo úplně blokuje jejich indexaci.

**Jak poznat šablonovitý obsah:** víc URL adres se stejnou strukturou (`/for-plumbers`,
`/for-electricians`, ...), typicky 100–150 slov, jedoucí přes jednu sdílenou komponentu, kde se
liší jen nadpis, 2-3 bullet body a jedno FAQ. `grep` po importu té komponenty napříč `app/`/`pages/`
ti dá přesný seznam.

**Postup rozšíření (aplikuj na každou takovou stránku):**

1. **Rozšiř sdílenou komponentu zpětně kompatibilně** — přidej volitelné propy, ne povinné.
   Typicky se hodí:
   - `caseExample` — krátký konkrétní scénář/příklad zakázky specifický pro danou variantu (ne
     obecná fráze aplikovatelná na cokoli).
   - `processSteps` — 3-4 kroky popisující, jak věc v praxi probíhá z pohledu zákazníka/uživatele
     té konkrétní varianty (ne generický proces "jak spolupracujeme s vámi" — to už typicky
     stránka má jinde; tohle má být proces specifický pro danou kategorii).
   - Rozšíř existující pole FAQ (obvykle už je to `array`, stačí přidat položky) z 1 na 3.
   Stránky, které nové propy nevyplní, musí renderovat přesně jako předtím — žádná stránka se
   nesmí rozbít jen proto, že soused dostal nový obsah.
2. **Cíl: 300–400 slov reálně unikátního textu na stránku**, ne přeskládaná synonyma. Ověř si to
   (viz sekce 5, word-count kontrola) — je to měřitelné, ne pocitové.
3. **Neduplikuj mezi variantami 1:1.** Každý bullet/FAQ/scénář musí dávat smysl konkrétně pro
   danou kategorii — pokud věta funguje beze změny i pro tři jiné varianty, není dost konkrétní.
4. **Pokud po poctivém pokusu o rozšíření pořád nemáš co unikátního napsat** (typicky u dvou
   extrémně blízkých kategorií), je to signál pro merge/redirect návrh výše — neprotahuj to
   vymýšlením obsahové vaty.

## 2. Blog / content hub

- Napiš 2–3 nové články relevantní pro cílovou skupinu webu, v existujícím tónu hlasu.
- Než začneš, najdi a dodrž existující konvence (typicky samostatná komponenta pro
  meta/byline/datum, sdílené typografické tokeny) — nevymýšlej nový vzor pro jeden článek.
- Aktualizuj datové zdroje/sitemap podle toho, jak je sitemap postavený — pokud sitemap generuje
  blogové URL automaticky ze zdroje dat (časté u Next.js `getSortedPosts()`-like patternu),
  needituj sitemap ručně duplicitně, jen ověř správné datum u zdroje.
- **Prolinkuj obousměrně**: nový článek ↔ relevantní produktové/servisní stránky. Interní
  prolinkování je SEO signál i lepší crawl discovery — jednosměrný odkaz z článku bez odkazu zpět
  je poloviční práce.

## 3. Structured data (JSON-LD)

- **Nepřidávej `AggregateRating`/`Review`, dokud nejsou reálná data.** Místo toho nech v kódu
  komentář `// TODO: až budou reálné recenze (Google Business Profile / obdoba), doplnit
  AggregateRating s reálnými hodnotami — nikdy nevyplňovat odhadem`, přesně na místě, kam to
  bude patřit.
- Zkontroluj `BreadcrumbList` na všech úrovních (kategorie, podkategorie, detail, blog posty) —
  chybí typicky na starších/zapomenutých podstránkách.
- Přidej `sameAs` placeholder komentář do `Organization`/business JSON-LD pro budoucí profil na
  Google Business Profile / lokální obdobu, ať se na propojení nezapomene, až profil vznikne.
- Ověř, že `FAQPage` schema odpovídá 1:1 viditelnému FAQ obsahu na stránce (stejný zdroj dat pro
  render i schema, ne dvě ručně udržované kopie, které se rozejdou).

## 4. Interní prolinkování

- Najdi mechanismus cross-linkování mezi příbuznými stránkami (typicky komponenta typu
  "podobné kategorie" / "related items" s ručně vypsanými slugy) a projdi ho celý.
- Hledej dva typy chyb:
  - **Nahodilé/nesmyslné vazby** — stránka A odkazuje na stránku B, která s ní nemá věcnou
    souvislost (často vzniká kopírováním pole ze sousední stránky beze změny).
  - **Nekonzistentní hub odkazy** — stránka odkazuje zpátky na "rodičovský" hub, do kterého
    vlastně nepatří (typický příznak: stránka má jinde nastavený `hubHref`/breadcrumb mimo tuhle
    rodinu, ale v cross-link poli na ni přesto odkazuje).
- Přidej cross-linky mezi tematicky blízkými servisními/content stránkami, kde to dává smysl a
  dnes chybí (oboustranně).

## 5. Technický audit (rychlá kontrola, oprav co najdeš)

- Každá veřejná stránka má **vlastní, unikátní** title + description (ne zkopírované, ne jen
  zděděné z rootu). Rychlá kontrola: vytáhni všechny tituly/description napříč routami a hledej
  duplicity.
- Alt texty u obrázků popisují obsah obrázku, nejsou prázdné ani generické ("obrázek1.jpg").
- Každá routa má smysluplný OG obrázek (pokud framework/projekt tenhle vzor používá).
- **Spusť produkční build** a projdi výstup: žádná stránka, která má být statická (SSG), nesmí
  skončit jako dynamic/error — ovlivňuje to rychlost crawlování. (Next.js: hledej v build outputu
  `○`/`●` u všech dotčených routes, ne `ƒ`.)
- Rychlá kontrola slovní zásoby u rozšířených stránek (sekce 1): vytáhni textové literály ze
  zdrojového souboru a spočítej slova v "prózních" řetězcích (obsahujících mezeru, ne
  CSS class tokeny) — ověří to cíl 300–400 slov bez nutnosti to číst ručně na každé stránce.

## 6. Sitemap hygiena

- Aktualizuj `lastModified` **jen** u stránek, které jsi v této session skutečně změnil — ne
  plošně u všech. Plošná aktualizace znehodnocuje signál "tahle stránka je čerstvá" pro celý web.
- Pokud sitemap generuje část URL automaticky ze zdroje dat (blog posty a podobně), needituj tu
  část ručně — over jen, že zdrojová data mají správné datum.

## Na konci session vždy odevzdej

**A) Shrnutí změn** — soubor + krátký popis, co a proč se změnilo. Žádné review dokumenty navíc,
stačí odpověď v chatu.

**B) Manuální checklist mimo kód** — věci, které nejdou (a neměly by jít) udělat v kódu:

1. **Search Console (nebo obdoba)** — ověřit vlastnictví, odeslat sitemap, přes URL
   Inspection ručně požádat o indexaci homepage, hlavních kategorií a nově přidaného obsahu.
2. **Lokální business profil** (Google Business Profile a jeho místní obdoba — např. v ČR
   Firmy.cz na Seznamu, jinde Bing Places / Apple Business Connect) — založit nebo doplnit
   kategorii, adresu/oblast působení, telefon, web, fotky, propojit se sociálními sítěmi. Po
   prvních reálných zakázkách/objednávkách požádat o recenzi — **až pak** se recenze doplňují do
   structured dat (viz sekce 3 TODO).
3. **Registrace do relevantních katalogů/adresářů** v daném oboru a regionu, se stejnými
   kontaktními údaji (NAP — Name/Address/Phone) napříč všemi profily kvůli konzistenci.
4. **Sdílet nový obsah** (blog články, rozšířené stránky) na vlastních sociálních profilech —
   první externí signály a možný zdroj prvních zpětných odkazů.
5. Pokud sis v sekci 1 poznamenal kandidáty na merge/redirect, teď je čas to s uživatelem probrat
   a případně provést — ne dřív.
