# CLAUDE CODE PROMPT: web Kovářství Jiří Učík

Celý tento dokument vlož jako první úkol do Claude Code v novém, prázdném repozitáři. Spolu s ním patří do kořene projektu `CLAUDE.md` a `AGENTS.md`.

Projekt pracuje s lokálními skills v `.claude/skills/`. Který skill patří ke kterému kroku, říká sekce 12, kdy je použít a s jakými omezeními, říká `AGENTS.md`. **Když je skill v rozporu s tímto zadáním, platí zadání.**

---

## 0. KRITICKÉ: WEB NESMÍ VYPADAT JAKO „AI ŠABLONA“

Tohle je nejdůležitější pokyn celého zadání a řídí se jím každé rozhodnutí níže. Většina webů vytvořených AI vypadá stejně: poznatelně, uniformně, bez duše. Tento web musí být opak. Má působit, jako by ho pro pana Učíka navrhl a ručně doladil zkušený designér, který zná jeho řemeslo.

**Vyhni se těmto typickým vzorům „AI webu“:**
- Obecný hero „velký nadpis uprostřed + podnadpis + dvě tlačítka vedle sebe + ilustrace nebo gradient vpravo“. Hero tady stojí na tmavé fotce výhně, nadpis je vlevo dole, kompozice je asymetrická.
- Přehnaná symetrie a vystředění všeho. Pracuj s asymetrickou mřížkou, nech prvky přesahovat, vytvářej napětí.
- Mřížky „feature karet“ se stejnou ikonou nahoře, nadpisem a textem opakované 3–4krát. Každá sekce má vlastní kompozici.
- Fialovomodré a duhové gradienty, glassmorphism bez účelu, generické 3D ilustrace, neupravené sady ikon.
- Plošné „fade-in + slide-up“ na všem při scrollu. Animace mají vlastní rytmus a účel.
- Lorem ipsum a fráze typu „Jsme tým profesionálů“, „Kvalita je naší prioritou“. Každý text musí být konkrétní a v hlasu pana Učíka.
- Všude stejné odsazení a stejná šířka kontejneru. Sekce mají dýchat různě, s různou hustotou a rytmem.
- Dvojice písem, která vypadá jako výchozí Tailwind/shadcn. Tracking, výška řádku a kontrast velikostí musí být záměrné.

**Místo toho:**
- Vlastní vizuální motivy z kovářského řemesla, používané jako podpis, ne jako dekorace na každém rohu:
  1. **Kovaná voluta** (spirála z loga): oddělovač sekcí, ikonka při najetí na fotku, vodoznak, zakončení linky v sekci „Jak pracuji“. Na konci voluty drobný žhavý bod, jako by kov právě vyšel z výhně.
  2. **Barvy žáru oceli**: kovář pozná teplotu železa podle barvy, od tmavě třešňové přes oranžovou po žlutobílou. Tuto skutečnou stupnici používej jako škálu akcentů (viz sekce 2).
  3. **Ruční nákresy pana Učíka**: tenké perokresby v pozadí sekcí a u kroků „Jak pracuji“. Nákres vedle hotového výrobku je osobní příběh, který nemá žádná šablona.
- Každá stránka a sekce má vlastní kompoziční logiku: jiný poměr textu a obrazu, jiné zarovnání, jiný rytmus. Procházení webu má připomínat listování pečlivě sestaveným portfoliem.
- Mikrointerakce šité na obsah: „rozžhavení“ prvků při najetí myší (z uhlové do žhavé oranžové s jemnou září), ne obecné `scale-105`.
- CSS a komponenty piš, jako by je člověk ladil pixel po pixelu: konzistentně, ale ne strojově uniformně.

Když si nejsi jistý, jestli prvek nepůsobí šablonovitě, zeptej se nebo navrhni originálnější variantu, než sáhneš po nejběžnějším řešení.

---

## 1. KONTEXT PROJEKTU A OBSAH OD KLIENTA

**Klient:** Jiří Učík, Kovářství Jiří Učík (na webu též „UMĚLECKÉ KOVÁŘSTVÍ Jiří Učík“)
**Obor:** zakázkové a umělecké kovářství, užitkové i dekorativní výrobky do interiéru i exteriéru
**Na trhu od:** 1993 podle katalogu dodavatelů. **NEOVĚŘENO**, do potvrzení klientem tento rok na webu nepoužívej (viz sekce 11).
**Adresa dílny:** Litoměřická 3, 411 41 Žitenice (u Litoměřic, Ústecký kraj)
**IČO:** 11454571 (fyzická osoba podnikající dle živnostenského zákona)
**Datová schránka:** a64xvi9
**Telefon:** 603 582 254
**E-mail:** kovarstvi.ucik@seznam.cz
**Provozní doba:** dle telefonické domluvy
**Doména:** kovarstviucik.cz (stávající web běží na WordPressu, bude nahrazen)

**Zdrojový obsah o kovářství** (přeformuluj stylisticky, ale zachovej všechna fakta; nic nevymýšlej, nedoplňuj čísla, která klient neuvedl):

- Kovářská dílna vyrábí na zakázku kovové a kované prvky do interiéru i exteriéru: brány, branky, vrata, ploty, zábradlí, mříže, dveře, kliky, postele, židle, stoly, vývěsní štíty, krbové soupravy, svícny, stojany na víno, poštovní schránky a další dekorace.
- Kovářské práce se realizují podle návrhů zákazníka i podle návrhů kovářství.
- Komplexní služba: zhotovení výrobku, jeho doprava a montáž.
- Mříže jsou vhodné pro novostavby i historické domy.
- Kované brány, branky a ploty: dlouhá životnost a vysoká odolnost, příjemný vzhled, malé nároky na údržbu.
- Zakázky na přání: vývěsní štíty, výroba nebo renovace kostelních křížů a dalších kovaných kostelních prvků, historické předměty (číše, poháry, mísy, makety), kované meče, zahradní stolky a židle.
- Kovářství navazuje na tradice klasické kovařiny, ale využívá nové technologie a postupy.
- Pojmenované vzory výrobků ze stávající galerie: Civitas, Ancient, Decent, Fort, Luční zvonce, Ornament, Stébla, Villa, Renesance, Bodce, Český lev. Další ukázky: domovní kovaný zvoneček „Drak“, plastika „strom“, kostelní kříž, klepadlo s nákresem.
- Oblast působnosti: Litoměřice, Roudnice nad Labem, Praha, Ústí nad Labem, Štětí, Louny, Mělník, Lovosice, Úštěk, Budyně nad Ohří, Libochovice, Most, Bílina, Česká Lípa, Terezín, Teplice.

**Cíl webu:** ukázat práci, vzbudit důvěru v člověka a přivést poptávky telefonem a e-mailem. Web **nemá poptávkový formulář** (rozhodnutí klienta). Každá stránka musí vést k jedné akci: zavolat nebo napsat.

**Tón:** lidský, osobní, přirozený. Mluví sám kovář v první osobě („vykovám“, „přijedu namontovat“), zákazníka oslovuje „Vy“. Krátké věty, žádná firemní fráze. Například „Vykovám Vám bránu, která vydrží generace“, ne „Nabízíme komplexní služby v oblasti kovovýroby“.

**Pravidla pro české texty** (podle skillu humanize-text-cs; pokud ho máš lokálně, použij ho na každý text před dokončením stránky):
- Žádné dlouhé ani krátké pomlčky jako spojka uprostřed věty. Použij čárku, tečku nebo spojku.
- Žádné fráze „nicméně“, „v neposlední řadě“, „je důležité poznamenat“, „nejde jen o X, ale i o Y“, nadužívané „klíčový“ a „zásadní“.
- Žádné trojice vyjmenovávané pořád dokola, žádné tučné slovo uprostřed věty, žádné shrnutí na konci.
- Střídej délku vět. Text má znít jako člověk, který rozumí řemeslu, ne jako reklama.

---

## 2. LOGO A DESIGNOVÝ SYSTÉM: STYL „SVĚTLO VÝHNĚ“

Web je jednoduchý, lidský a klidný jako dobře udělaná dílna. Oheň se objevuje jen na několika místech, ale tam naplno. **Oheň je koření, ne hlavní jídlo.**

### Logo
- Koncept: znak ve tvaru písmene U z jedné kované linky, nahoře stočené do dvou symetrických volut, uvnitř kovadlina a nad ní plamen. Nápis „UČÍK“ velkým kapitálkovým patkovým písmem (Cinzel), nad ním menší „JIŘÍ“, pod tenkou čarou „UMĚLECKÉ KOVÁŘSTVÍ“.
- Varianty: vodorovné logo, samotný znak (favicon, vodoznak), světlé na tmavém, jednobarevné.
- **Finální SVG logo dodáme zvlášť.** Do té doby použij v hlavičce dočasný textový wordmark v Cinzel a jasně označený slot `public/brand/logo.svg`. Logo sám nekresli ani negeneruj.

### Barvy (design tokeny)
| Token | Hex | Použití |
|---|---|---|
| `--paper` | #F4EFE6 | Hlavní pozadí (krémový papír) |
| `--coal` | #221F1C | Text, tmavé sekce (nikdy čistá černá) |
| `--iron` | #5B5853 | Doplňkový text, popisky |
| `--copper` | #B5532B | Akce, odkazy, akcenty |
| `--ember` | #E08A52 | Najetí myší, akcenty na tmavých plochách |

Škála žáru oceli pro akcenty, záři a přechody:
| Token | Hex | Žár |
|---|---|---|
| `--heat-1` | #7A1E12 | tmavě třešňová |
| `--heat-2` | #A8321C | třešňová |
| `--heat-3` | #D9622B | oranžová |
| `--heat-4` | #EE8E3C | světle oranžová |
| `--heat-5` | #F6C35A | žlutá |
| `--heat-6` | #FBEBC0 | žlutobílá |

- Poměr zhruba 85 % neutrální (papír, uhel), zbytek akcenty. Žár nikdy jako velká plochá výplň.
- **Ověř kontrast WCAG AA** u každé kombinace. Měď na papíře použij na tlačítka a velký text; pokud malý text na papíře nesplní AA, ztmav odstín a zapiš rozhodnutí do `memory/memory.md`.

### Typografie
- Logo: **Cinzel** (jen logo a případně dočasný wordmark).
- Nadpisy: **Fraunces** (výrazné patkové písmo s charakterem), záměrně laděný tracking a velikostní kontrast.
- Text: **Source Sans 3**, základ 18 px, výška řádku kolem 1,6.
- Fonty načítej přes `next/font` (self-hosting při buildu). **Žádné načítání z Google CDN** za běhu (GDPR, CSP).

### Vizuální jazyk
- Fotky jsou hlavní hrdina, v jednotném teplém ladění: výrobky za denního světla, dílna ve světle výhně.
- Sotva viditelný šum papíru na krémových plochách, stopy po kladivu na tmavých. Obojí jako lehké SVG nebo CSS, žádné těžké bitmapy.
- Jediný ornament je voluta. Žádné další dekorace.

### Prvky ohně (přesně tyto, nic navíc)
1. **Úvodní scéna:** tmavá fotka výhně s pomalu stoupajícími jiskrami (lehký `<canvas>` nebo CSS, max. desítky částic, pauza mimo viewport). Jediné místo s výrazným pohybem.
2. **Rozžhavení při najetí myší:** tlačítka a odkazy přejdou z uhlové do žhavé oranžové s jemnou září (`box-shadow`/`text-shadow` z tokenů žáru).
3. **Chladnoucí přechody:** mezi tmavou a světlou sekcí barva plynule „vychladne“ z oranžové do uhlové (gradient na hraně sekce, ne přes celou plochu).
4. **Žhavý bod** na konci voluty.

Při `prefers-reduced-motion: reduce` se jiskry nezobrazují a přechody jsou okamžité.

---

## 3. TECHNICKÝ STACK

**Zvolený stack:** Next.js (App Router) + TypeScript, hosting Vercel.
- Styly: Tailwind CSS s vlastními tokeny ze sekce 2 (žádný výchozí vzhled shadcn), nebo CSS Modules. Hlavní je výsledek podle sekce 0.
- Animace: CSS a malý vlastní canvas pro jiskry. Framer Motion jen tam, kde opravdu pomůže.
- Obrázky: `next/image`, formát WebP/AVIF, `sizes` pro responzivitu, `loading="lazy"` mimo první obrazovku.
- Žádný backend, žádná databáze, žádné API klíče. **Web nemá formulář**, kontakt jde přes `tel:` a `mailto:` odkazy.
- Obsah (kategorie, vzory, realizace, texty) drž v typovaných souborech v `src/content/`, aby šlo fotky a texty doplnit bez zásahu do komponent.
- Mapa na stránce Kontakt: jednoduchý iframe Mapy.cz (žádné JS SDK). Přesné hostname ověř a zapiš do CSP (sekce 7).
- Bez analytiky a bez cookies, dokud o nich klient nerozhodne. Proto žádná cookie lišta.

**Struktura webu:** vícestránkový web. Je to závazné rozhodnutí.
- Skutečné routování, každá položka menu má vlastní URL. Úvodní stránka je rozcestník, ne souhrn všeho obsahu.
- Sdílený layout s hlavičkou a patičkou, aktuální stránka zvýrazněná v menu.
- Každá stránka má vlastní SEO metadata.

**Mapa rout:**
```
/                                   Úvod
/vyrobky                            Přehled všech skupin
/vyrobky/brany-a-ploty              Skupina = zároveň kategorie
/vyrobky/mrize-dvere-kovani
    /mrize
    /dvere-dvirka-okna
    /kliky-madla-klepadla-panty
/vyrobky/zabradli-a-balkony         Skupina = zároveň kategorie
/vyrobky/krby
    /dymniky-a-rosty
    /krbove-naradi
/vyrobky/nabytek-a-interier
    /zidle-stoly-postele
    /regaly-police-drzaky
    /svicny
    /zrcadla-a-ramy
    /lampicky-plastiky-stojany-na-vino
/vyrobky/zakazky-na-prani
    /vyvesni-stity-krize-mece
    /zahrada
    /ostatni
    /nakresy-a-vzorky
/realizace                          Galerie, všechny části
/realizace/[cast]                   brany-a-ploty, mrize-dvere-kovani, zabradli-a-balkony,
                                    krby, nabytek-a-interier, zakazky-na-prani, z-dilny
/jak-pracuji
/o-mne
/kontakt
```
Celkem 16 kategorií jako na původním webu, seskupených do 6 skupin.

**Slugy jsou pracovní.** Struktura (6 skupin, 16 kategorií, ostatní stránky) je závazná, ale názvy slugů a nadpisů se před založením rout ověří keyword researchem ve fázi 0 (sekce 12). Po spuštění se slugy nemění, každá změna by znamenala další přesměrování.

**Hlavní menu:** Výrobky (rozbalovací se 6 skupinami) · Realizace · Jak pracuji · O mně · Kontakt · a vpravo zvýrazněné tlačítko **Zavolat** (`tel:+420603582254`).

---

## 4. OBSAH STRÁNEK (V POŘADÍ)

Skill `craftsman-site-layout` slouží jen jako kontrolní seznam struktury podstránek: hlavička stránky (krátký štítek nad H1), patička, závěrečný pás s výzvou k zavolání. Kompozice jednotlivých sekcí se řídí touto sekcí a sekcí 0. Ze skillu se **nepřebírá**: kontaktní formulář, formulář pro reference, ceník, pás se statistikami a počítadly (čísla nemáme a nevymýšlíme), menu bez rozbalování, opakované stejné mřížky karet.

### Úvod `/`
1. **Úvodní scéna:** tmavá fotka výhně nebo rozžhaveného železa přes celou šířku, stoupající jiskry, nadpis H1 vlevo dole (konkrétní, v hlasu kováře, bez roku do ověření). Pod ním „Jiří Učík, umělecký kovář, Žitenice“ a dvě akce: velké **Zavolat 603 582 254** a menší **Prohlédnout realizace** (`/realizace`).
2. **Co vykovám:** tři velké fotodlaždice různých velikostí (Brány a ploty, Mříže a zábradlí, Nábytek a interiér) s odkazy na skupiny. Pod nimi krátký textový výpis ostatních skupin. Žádná řada stejných karet s ikonkami.
3. **Vybrané realizace:** vodorovný pás 6 fotek s popisem vzoru a místa (např. „brána Fort, Litoměřicko“), odkaz na `/realizace`.
4. **Jak pracuji:** pět kroků (nápad, návrh a nákres, kování, povrchová úprava, doprava a montáž) propojených jednou kovanou linkou, která se na konci stočí do voluty se žhavým bodem.
5. **O kováři:** portrét u výhně, krátký osobní text v první osobě a podpis (dočasně textový, později sken podpisu). Odkaz na `/o-mne`.
6. **Kde pracuji:** SVG mapa ČR po krajích (ne fotka). Zvýrazněné kraje, kam patří města ze sekce 1, tečky měst, dílna v Žitenicích. Vedle mapy rozbalovací seznam krajů s městy; rozbalený kraj se na mapě rozsvítí mědí. (Změna 2026-10-13 na pokyn uživatele, dřív mapka regionu s řekami.)
7. **Ozvěte se:** velké telefonní číslo a e-mail, věta „Pošlete mi fotku místa nebo nákres a domluvíme se“. Žádný formulář.

### Přehled výrobků `/vyrobky`
Šest skupin, každá s fotkou, krátkým textem a výpisem kategorií. Každá skupina má jinou velikost dlaždice podle významu (brány a ploty největší).

### Stránka skupiny `/vyrobky/[skupina]`
Úvodní fotka (21:9), krátký text, rozcestník na kategorie (pokud jich má víc), výběr 6 realizací, výzva k zavolání.

### Stránka kategorie `/vyrobky/[skupina]/[kategorie]`
Úvodní fotka, text o kategorii (jen fakta ze sekce 1), pojmenované vzory (např. u bran Civitas, Fort, Decent, Villa, Ornament, Stébla, Renesance, Luční zvonce, Ancient; u branek Bodce, Český lev), galerie kategorie, výzva k zavolání. U skupin s jedinou kategorií je tohle obsah stránky skupiny.

### Realizace `/realizace` a `/realizace/[cast]`
Galerie rozdělená podle činností. Detail v sekci 5.

### Jak pracuji `/jak-pracuji`
Pět kroků, u každého ruční nákres a fotka z dílny vedle sebe. Text o tom, že vyrábí podle návrhu zákazníka i vlastního, a o dopravě a montáži.

### O mně `/o-mne`
Příběh pana Učíka, dílna v Žitenicích. **Životopisné údaje zatím nemáme**, použij jasně označený textový placeholder `[DOPLNÍ KLIENT: ...]`, nic nevymýšlej.

### Kontakt `/kontakt`
Telefon a e-mail jako velké klikací odkazy, adresa dílny, provozní doba „dle telefonické domluvy“, IČO, datová schránka, mapa Mapy.cz, fotka dílny zvenku. Bez formuláře.

### Patička (všude)
Logo, krátký popis, rychlé odkazy, telefon, e-mail, adresa, IČO, „© Kovářství Jiří Učík“ s aktuálním rokem.

### Mobil
Dole stále viditelná lišta **Zavolat | Napsat** (tel a mailto). Menu jako celostránkový panel s velkými položkami pro palec.

---

## 5. GALERIE PODLE ČINNOSTÍ

| Část | Obsah | Route |
|---|---|---|
| Vše | Výběr nejlepších realizací | /realizace |
| Brány a ploty | Vrata, brány, branky, ploty, pojmenované vzory | /realizace/brany-a-ploty |
| Mříže, dveře a kování | Okenní a vstupní mříže, dveře, kliky, klepadla, panty | /realizace/mrize-dvere-kovani |
| Zábradlí a balkony | Schodišťová zábradlí, balkony, balkónky | /realizace/zabradli-a-balkony |
| Krby | Dýmníky, rošty, krbové nářadí | /realizace/krby |
| Nábytek a interiér | Postele, stoly, židle, police, svícny, zrcadla, plastiky, stojany na víno | /realizace/nabytek-a-interier |
| Zakázky na přání | Vývěsní štíty, kostelní kříže a renovace, meče, zahradní prvky, zvonky | /realizace/zakazky-na-prani |
| Z dílny | Výheň, práce u kovadliny, rozpracované kusy, nákresy | /realizace/z-dilny |

Chování:
- Nahoře filtr ve tvaru štítků. Přepnutí funguje jako odkaz na route části (sdílitelná URL), s plynulým přechodem bez skoku layoutu.
- Mřížka fotek různých poměrů (3:2, 4:5, 1:1), ne pravidelné čtverce.
- Klik otevře fotku přes celou obrazovku (lightbox): šipky, klávesnice, Esc, swipe na mobilu, správný focus management.
- Popisek u každé fotky: co to je, vzor, místo realizace, rok (jen pokud ho klient dodá).
- Tlačítko **Chci podobné**: otevře `mailto:kovarstvi.ucik@seznam.cz` s předvyplněným předmětem „Poptávka: podobné jako [název realizace]“ a v těle odkazem na fotku. Vedle něj odkaz `tel:`.
- Stejná data se zobrazují i na stránkách skupin a kategorií (jeden zdroj v `src/content/realizace.ts`).

Datový model jedné realizace (návrh):
```ts
type Realizace = {
  id: string;            // např. "brana-fort-001"
  nazev: string;         // "Kovaná brána Fort"
  cast: CastGalerie;     // část galerie
  kategorie?: string;    // slug kategorie
  vzor?: string;         // "Fort"
  misto?: string;        // "Litoměřicko"
  rok?: number;          // jen pokud dodá klient
  alt: string;           // popisný alt text (SEO)
  src: string | null;    // null = zobraz placeholder
  pomer: "3:2" | "4:5" | "1:1" | "16:9" | "21:9";
};
```

---

## 6. PRAVIDLA PRO PLACEHOLDERY FOTEK

Fotky klient ještě nedodal. **Každé místo pro fotku je prázdný placeholder. Žádné fotobanky, žádné obrázky generované AI, žádné výplně z externích zdrojů.**

- Jedna komponenta `PhotoSlot`: rámeček v barvě papíru s jemným tenkým obrysem, malá voluta uprostřed, krátký popisek, co tam patří (např. „FOTO: brána Fort za denního světla“).
- Pevně nastavený `aspect-ratio` podle finálního layoutu, aby se po doplnění fotek nic neposunulo.
- Každý slot má ID podle vzoru `stranka-sekce-01` (např. `uvod-hero-01`) a popisný `alt` připravený pro finální fotku.
- Výměna fotky = doplnění `src` v `src/content/`, žádný zásah do komponent.

Počty a umístění:
| Stránka / sekce | Počet | Co má fotka ukazovat | Poměr |
|---|---|---|---|
| Úvod: úvodní scéna | 1 | Výheň nebo rozžhavené železo na kovadlině, tmavé teplé světlo | 16:9 (mobil 4:5) |
| Úvod: Co vykovám | 3 | Brána a plot; mříž nebo zábradlí; interiérový výrobek | 4:5, 1:1, 3:2 |
| Úvod: Vybrané realizace | 6 | Hotové realizace z různých skupin | 3:2 |
| Úvod: Jak pracuji | 5 | Nápad, nákres, kování, povrchová úprava, montáž | 1:1 |
| Úvod: O kováři | 2 | Portrét u výhně; detail rukou s kladivem | 4:5, 3:2 |
| Úvod: Ozvěte se | 1 | Detail kovaného prvku (volitelné) | 4:5 |
| Stránka skupiny (6×) | 1 + 6 | Úvodní fotka; výběr realizací | 21:9; 3:2 |
| Stránka kategorie (16×) | 1 + 4 + 6 | Úvodní fotka; pojmenované vzory; galerie | 21:9; 4:5; 3:2 |
| Realizace, každá část | min. 9 | Realizace dané činnosti | mix 3:2, 4:5, 1:1 |
| Jak pracuji | 10 | Ke každému z 5 kroků nákres a fotka z dílny | 1:1 |
| O mně | 5 | Portrét, dílna zvenku, tři detaily z práce | 4:5, 3:2 |
| Kontakt | 1 | Dílna v Žitenicích zvenku | 3:2 |

Mapa v sekci „Kde pracuji“ je ilustrace, ne fotka.

---

## 7. BEZPEČNOST (skills web-security-*)

Projekt je nový, takže vynucující CSP platí od prvního dne a web se staví tak, aby jí vyhověl.

- `web-security-setup`: celý základ níže, jednou po založení projektu (šablony `next.config.js`, `middleware.ts`, `security.txt`, CI workflow jsou v jeho `assets/`).
- `web-security-memory`: založení a údržba `.claude/security/`.
- `web-security-review`: před každým commitem a nasazením, hlavně u mapy (iframe) a čehokoli externího.
- `web-security-audit`: po každém nasazení na preview i produkci a jednou měsíčně (`scripts/security-check.sh`).

**Hlavičky** (v `next.config` přes `headers()` a nonce v `middleware`), vždy všechny společně:
| Hlavička | Hodnota |
|---|---|
| Strict-Transport-Security | `max-age=63072000; includeSubDomains` (bez `preload`, ten až po měsíci provozu) |
| Content-Security-Policy | viz níže |
| X-Content-Type-Options | `nosniff` |
| X-Frame-Options | `DENY` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | zakázat vše, co web nepoužívá (kamera, mikrofon, geolokace, platby, USB…) |
| Cross-Origin-Opener-Policy | `same-origin` |
| Cross-Origin-Resource-Policy | `same-origin` |
| X-XSS-Protection | `0` |

`poweredByHeader: false`, žádná hlavička s verzí.

**CSP (výchozí návrh):**
```
default-src 'self';
script-src 'self' 'nonce-{NONCE}' 'strict-dynamic';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
font-src 'self';
connect-src 'self';
frame-src [ověřené hostname Mapy.cz];
frame-ancestors 'none';
base-uri 'self';
form-action 'none';
object-src 'none';
upgrade-insecure-requests;
```
- `script-src` nikdy `unsafe-inline` ani `unsafe-eval`. Inline skripty jen přes nonce ze `middleware` se `strict-dynamic`.
- `style-src 'unsafe-inline'` je vědomý kompromis kvůli stylům, které Next.js vkládá za běhu. Zapiš ho do `.claude/security/DECISIONS.md`.
- Žádné wildcardy. Každý nový hostname jde do `.claude/security/CSP-LOG.md` s důvodem.
- `form-action 'none'`, protože web nemá formulář. Pokud se formulář někdy přidá, je to změna, kterou schvaluje uživatel.
- Vercel preview toolbar potřebuje vlastní hostname jen v preview prostředí; v produkci ho nepovoluj.

**Repozitář a DNS:**
- `.gitignore`: `.env`, `.env.*`, `*.pem`, `*.key`, `.vercel`, `.DS_Store`.
- `public/.well-known/security.txt` s povinným `Expires` (kontakt doplní uživatel).
- GitHub Actions: `npm audit`, skenování tajemství (např. gitleaks) a kontrola hlaviček nasazené URL po každém pushi.
- DNS (předat tomu, kdo spravuje doménu kovarstviucik.cz): DNSSEC, CAA záznam. Klient používá e-mail na seznam.cz; **pokud z domény nic neodchází**, nastavit `v=spf1 -all` a DMARC `p=reject`. Před nastavením ověřit s uživatelem.

**Paměť bezpečnosti:** při inicializaci vytvoř `.claude/security/` se soubory `STATE.md`, `DECISIONS.md`, `CSP-LOG.md`, `AUDIT-LOG.md` (obsah viz `AGENTS.md`).

---

## 8. SEO

**Skills:** `seo-collabim-keyword-loop` a `seo-keyword-cluster-architect` ve fázi 0, `seo-complete-optimization` a `seo-quality-principles` při psaní textů, meta a schema, `seo-ai-risk-guard` jako Definition of Done každé stránky, `seo-new-site-audit` po spuštění.

**Klíčová slova:** schválená tabulka je v `memory/keywords.md` (stránka, hlavní slovo, vedlejší slova, hledanost, obtížnost, datum schválení). Z ní se berou slugy, title, H1 a meta description. Hledanost se neodhaduje, ověřuje ji uživatel v Collabimu. Jedno hlavní slovo patří jen jedné stránce (žádná kanibalizace mezi skupinou a její kategorií). Města z oblasti působnosti nedostanou vlastní stránky bez skutečného obsahu, lokální slova jdou do textů, titulků a `areaServed`.

- Každá stránka: vlastní `title`, `description`, canonical, OpenGraph (s placeholder OG obrázkem), `lang="cs"`.
- Jeden H1 na stránku, správná hierarchie nadpisů, sémantické HTML.
- JSON-LD `LocalBusiness` (název, adresa, telefon, e-mail, `areaServed` = města ze sekce 1, `openingHours` neuvádět, protože je „dle domluvy“), `BreadcrumbList` na podstránkách.
- `app/sitemap.ts` a `app/robots.ts`.
- Lokální klíčová slova přirozeně v textech a titulcích: kovářství Litoměřice, umělecký kovář Ústecký kraj, kované brány, kované ploty, kované zábradlí, kované mříže, krbové nářadí, kovaný nábytek. Bez keyword stuffingu.
- Popisné alt texty u všech fotek a placeholderů.
- **Přesměrování 301 ze starého webu** v `next.config` (`redirects()`):
  | Stará adresa | Nová adresa |
  |---|---|
  | /fotogalerie/ | /realizace |
  | /fotogalerie/vrata-brany-a-branky-ploty/ | /realizace/brany-a-ploty |
  | /fotogalerie/kovane-mrize/ | /realizace/mrize-dvere-kovani |
  | /fotogalerie/kovane-vyvesni-stity-krize-mece/ | /realizace/zakazky-na-prani |
  | /kontakt/ | /kontakt |
  | /komentare-a-diskuze-kovarstvi/ | / |

  **Úplný seznam starých adres zatím nemáme** (zbylé kategorie fotogalerie, stránka „Naše služby“). Připrav místo v konfiguraci a zeptej se uživatele.

**Po spuštění (mimo kód, podle `seo-new-site-audit`):** Google Search Console a Bing Webmaster Tools s odeslanou sitemapou, kontrola indexace přesměrovaných adres, Google Business Profile a Firmy.cz se stejnými údaji jako na webu (NAP), zápis do oborových katalogů. Recenze se nevymýšlejí ani nekupují, o hodnocení může klient požádat své zákazníky.

---

## 9. PŘÍSTUPNOST A VÝKON

- Kontrast textu minimálně WCAG AA.
- Ovládání klávesnicí (menu, rozbalovací Výrobky, lightbox), viditelný focus ve stylu „rozžhavení“.
- `prefers-reduced-motion` vypíná jiskry a animace.
- Core Web Vitals: žádné zbytečné blokující skripty, pevné `aspect-ratio` proti posunu layoutu, jiskry jako lehký canvas s pauzou mimo viewport.
- Hero fotka s `priority`, ostatní lazy.

---

## 10. PRÁVNÍ POŽADAVKY

- Web nesbírá osobní údaje (bez formuláře, bez analytiky, bez cookies), proto **cookie lišta není potřeba**.
- Pokud se přidá analytika nebo formulář, je potřeba doplnit zásady ochrany osobních údajů. Právní texty sám negeneruj, připrav jen prázdnou stránku k doplnění.

---

## 11. OTEVŘENÉ OTÁZKY (NEDOPLŇUJ ODHADEM)

- Rok začátku podnikání (1993?) a příběh pana Učíka pro stránku O mně.
- Fotky ve vysoké kvalitě a ruční nákresy.
- Finální SVG logo.
- Úplný seznam starých URL pro přesměrování.
- Kdo spravuje doménu a DNS, posílá se z domény nějaký e-mail.
- Kontakt do `security.txt`.
- Zda nabízet i zámečnictví a kovovýrobu, jak je uvedeno v registrech. Rozhoduje i o klíčových slovech: „zámečnictví Litoměřice“ může mít vlastní stránku jen tehdy, když za ním je skutečná služba.
- Má klient Google Business Profile nebo záznam na Firmy.cz? Kdo k nim má přístup?
- Má stávající web na kovarstviucik.cz zpětné odkazy a návštěvnost (Search Console, Collabim)? Rozhoduje o tom, jak ambiciózní klíčová slova volit a které staré adresy přesměrovat přednostně.
- Hlavní konkurenti v regionu, pokud je uživatel zná (pro odhad obtížnosti ve fázi 0).

---

## 12. POSTUP IMPLEMENTACE

Po každém kroku: zápis do `memory/memory.md` (formát v `memory/pravidla.md`).

**Fáze 0: klíčová slova a slugy (před kódem)**
1. `seo-collabim-keyword-loop`: stránku po stránce Claude navrhne 3 až 6 kandidátů, uživatel ověří hledanost a obtížnost v Collabimu, Claude vybere hlavní a vedlejší slova. Pořadí: Úvod, 6 skupin, 16 kategorií, Realizace, Jak pracuji, O mně, Kontakt.
2. `seo-keyword-cluster-architect`: ze schválené tabulky přiřazení slov k routám, title, H1 a meta pro každou stránku, kontrola kanibalizace. Mapa rout ze sekce 3 zůstává, mění se nanejvýš slugy a nadpisy.
3. Schválení finálních slugů uživatelem, zápis do `memory/keywords.md` a do sekce 3.

**Fáze 1: stavba**
1. `git init` přímo ve složce projektu (vlastní repozitář kvůli Vercelu), inicializace Next.js (App Router, TypeScript).
2. `web-security-setup` + `web-security-memory`: hlavičky, CSP s nonce, `.gitignore`, `security.txt`, CI workflow, `.claude/security/` (sekce 7).
3. Design tokeny (barvy, škála žáru, písma přes `next/font`, rozestupy).
4. Layout: hlavička s menu a rozbalovacími Výrobky, mobilní panel, spodní lišta Zavolat | Napsat, patička. Kontrolní seznam struktury: `craftsman-site-layout` v mezích sekce 4.
5. Komponenty: `PhotoSlot`, voluta (SVG), tlačítko s „rozžhavením“, chladnoucí přechod sekcí.
6. Obsahová data v `src/content/` (skupiny, kategorie, vzory, realizace s `src: null`, SEO údaje ze schválené tabulky klíčových slov).
7. Úvodní stránka včetně jisker.
8. Výrobky: přehled, skupiny, kategorie.
9. Realizace: filtr, mřížka, lightbox, „Chci podobné“.
10. Jak pracuji, O mně, Kontakt (s mapou, `web-security-review` kvůli iframe a CSP).
11. SEO: metadata, JSON-LD, sitemap, robots, přesměrování (`seo-complete-optimization`, `seo-quality-principles`).
12. Texty: `humanize-text-cs` na každou stránku, alt texty a meta description.
13. Kontrola každé stránky přes `seo-ai-risk-guard` (Definition of Done).

**Fáze 2: ověření a spuštění**
14. `web-security-review` celého kódu, `npm audit`, gitleaks.
15. Nasazení na Vercel preview, `web-security-audit` proti preview URL, ověření responzivity, klávesnice, kontrastu, konzole a Lighthouse.
16. Přesměrování starých adres, přepnutí domény, `web-security-audit` proti produkci, zápis do `.claude/security/AUDIT-LOG.md`.

**Fáze 3: po spuštění**
17. `seo-new-site-audit`: Search Console, sitemap, indexace, interní prolinkování, Google Business Profile a Firmy.cz (sekce 8).
18. Po měsíci bez problémů HSTS `preload`, dále jednou měsíčně `web-security-audit`.
19. Doplňování fotek a textů od klienta do `src/content/`, bez zásahu do komponent.

---

## 13. VÝSLEDNÝ DOJEM

Web má na první pohled působit jako dílna dobrého řemeslníka: klidný, poctivý, teplý, s ohněm, který zaujme, ale neřve. Nesmí být poznat, že vznikl v AI nástroji. Musí být rychlý, bezchybný na mobilu a vést návštěvníka k jediné akci: zavolat nebo napsat panu Učíkovi. Návštěvník má mít pocit, že web navrhl někdo, kdo pana Učíka i jeho řemeslo dobře zná.

---

**Poznámka pro Claude Code:** Piš čistý, okomentovaný kód s konzistentní strukturou a pojmenováním. Projekt postav tak, aby šlo doplnit fotky a texty bez zásahu do struktury kódu. Před dokončením každé stránky si polož otázku: „Vypadá to jako záměrná práce pro tohoto klienta, nebo jako generická šablona?“ Pokud to druhé, přepracuj to podle sekce 0.