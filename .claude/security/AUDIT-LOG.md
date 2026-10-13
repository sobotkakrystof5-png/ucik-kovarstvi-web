# Audity a incidenty

> Jen historie: audity, review, incidenty, rotace klíčů.

Formát:

```
## RRRR-MM-DD — audit | review | incident
Spouštěč:
Rozsah:
Výsledek:
Nálezy:
Opraveno:
Zůstává otevřené:
```

---

## 2026-10-05 — review (lokální, po založení baseline)
Spouštěč: fáze 1, krok 2.
Rozsah: `curl -I` proti `next start`, headless Chrome (CDP) na `/` a 404, desktop i mobil, konzole a síť.
Výsledek: všech 10 hlaviček z brief §7 přítomno, `X-Powered-By` chybí, CSP enforcing s nonce bez `unsafe-eval`. Žádné porušení CSP, žádná výjimka JS.
Nálezy: 404 jen na prefetch neexistujících stránek a `favicon.ico` (očekávané). `npm audit`: produkce 0, dev 5× high (`eslint-config-next` → micromatch).
Opraveno: nic, nebylo co.
Zůstává otevřené: `security-check.sh` a `web-security-audit` proti preview URL (fáze 2), kontakt v `security.txt`.

## 2026-10-06 — review (fáze 2, krok 14, celý kód)
Spouštěč: fáze 2, krok 14 (`web-security-review`).
Rozsah: celý `src/`, `next.config.ts`; útočná plocha: vstupy (`params`, `searchParams`, headers), HTML sinky, `process.env`, externí zdroje, `target="_blank"`, API routy a server actions. `npm audit`, gitleaks 8.30.1.
Výsledek: bez nálezu k opravě. Formuláře, API routy, server actions, cookies a tajemství nejsou. Dynamické routy (`/vyrobky/[skupina]`, `/vyrobky/[skupina]/[kategorie]`, `/realizace/[cast]`) mají `dynamicParams = false` a `notFound()`. Jediný `dangerouslySetInnerHTML` je JSON-LD ze statických dat s escapovaným `<`. `process.env` jen `NODE_ENV`. Jediný externí odkaz (Mapy.com) má `rel="noopener noreferrer"`. `mailtoPodobne` kóduje předmět i tělo přes `encodeURIComponent`.
Nálezy: `npm audit` produkce 0, dev 5× high (beze změny, `eslint-config-next` → micromatch). Gitleaks nad 144 soubory určenými do gitu: 0. Gitleaks nad celou složkou: 12 falešných nálezů v `.next/` (build výstup, ignorovaný gitem a Vercel CLI). Git historie zatím neexistuje (žádný commit).
Opraveno: nic, nebylo co. Do CSP-LOG doplněna poznámka k podmíněnému `frame-src` (efektivní CSP beze změny).
Zůstává otevřené: ověření hlaviček na preview URL (krok 15), kontakt v `security.txt`.

## 2026-10-06 — audit (fáze 2, krok 15, Vercel preview)
- Target: https://kovarstvi-ucik-keiqdhbup-sobotkakrystof5-pngs-projects.vercel.app (preview za Vercel Authentication, testováno s automation bypass tokenem), oprava kontrastu ověřena na `…-owkydjizm-…`.
- Result: `security-check.sh` 29 OK / 4 varování / 0 chyb. Varování jsou DNS (CAA, DNSSEC, SPF, DMARC) domény `vercel.app`, pro preview irelevantní, řeší se na kovarstviucik.cz před spuštěním. TLS 1.2 + 1.3, 1.0/1.1 odmítnuty, certifikát Google Trust Services do 2026-11-27. Všech 10 hlaviček z brief §7 přítomno, CSP enforcing s nonce, bez `unsafe-eval`, `x-robots-tag: noindex`, bez cookies.
- Prohlížeč: headless Chrome, 33 rout × 375 a 1440 px = 66 kontrol bez chyb konzole, bez porušení CSP, bez požadavků ≥ 400, bez vodorovného přetoku.
- Lighthouse (mobil, 5 typů stránek): přístupnost 96–100, best practices 100, výkon 62 (Úvod), 80 (kategorie, Kontakt), 96 (Realizace). SEO 58 jen kvůli `noindex` preview a robots.txt staženému bez bypassu (ručně ověřeno, robots.txt je správný).
- Findings: (1) odkaz na mapu na Kontaktu 3,91:1; (2) `label-content-name-mismatch` u tlačítek galerie, jen kvůli textu placeholderů; (3) LCP na mobilu 3,9–7,5 s v simulaci, TTFB měřený curlem 0,45–0,8 s (dynamické renderování kvůli nonce, DECISIONS 005); (4) skript `security-check.sh` na macOS hlásil falešné TLS výsledky (chybí `timeout`).
- Fixed: (1) `Mapa.module.css`, text odkazu v uhlu, měď jen v podtržení; (4) fallback na `gtimeout` / bez limitu.
- Left open: (2) zmizí s fotkami; (3) výkon Úvodu, rozhodnutí na uživateli (nonce vs. statické renderování), preloady fontů; Safari a ruční průchod klávesnicí na preview; `security.txt` Contact.

## Incidenty

### 2026-10-06 — omylem veřejný produkční deploy
První `vercel deploy --target=preview` nového projektu Vercel nasadil jako Production, `kovarstvi-ucik.vercel.app` byl asi 15 minut veřejný bez ochrany a bez noindex (nehotový obsah, žádná tajemství). Deploy smazán `vercel remove`, adresa vrací 404. Prevence: u nového projektu nejdřív `vercel link`, po každém deployi `vercel inspect` → target.
