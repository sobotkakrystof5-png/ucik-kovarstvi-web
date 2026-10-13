# Bezpečnostní stav

> Aktuální stav. Přepisuje se, historie je v ostatních souborech.
> Číst na začátku každé session (CLAUDE.md §0).

**Naposledy aktualizováno:** 2026-10-06, session Claude Code (fáze 2, kroky 14–15)

## Projekt

- Web: https://kovarstviucik.cz (zatím nenasazeno, doména nepřepnuta)
- Hosting: Vercel, projekt `sobotkakrystof5-pngs-projects/kovarstvi-ucik`, jen preview deploye (Vercel Authentication `all_except_custom_domains`, noindex). Produkční deploy žádný. Poslední preview: https://kovarstvi-ucik-owkydjizm-sobotkakrystof5-pngs-projects.vercel.app
- Audit preview: přes automation bypass token (`vercel curl` ho vygeneroval), token se nikam neukládá do repa
- Framework: Next.js 16.3 App Router, TypeScript, React 19.3
- Repo: lokální `git init` ve složce projektu, remote zatím není
- Hlavičky: CSP s nonce v `src/proxy.ts`, ostatní v `next.config.ts` → `headers()`. Zdroj obou: `src/lib/security.ts`.

## Threat model

- [ ] Kontaktní formulář: **není** (rozhodnutí klienta), kontakt jen `tel:`/`mailto:`
- [ ] Nahrávání souborů: není
- [ ] Přihlášení / účty: není
- [ ] Platby: nejsou
- [ ] Osobní údaje: nesbírají se (bez analytiky, bez cookies)
- [x] Jen statický obsah → defacement, zneužití domény k phishingu/spoofingu e-mailu

Realistický útočník: automatické skenery. Nejhorší případ pro klienta: podvržený obsah nebo e-maily rozesílané jménem domény kovarstviucik.cz.

## Hlavičky

Ověřené na Vercel preview 2026-10-06 (AUDIT-LOG), produkce zatím neexistuje.

| Hlavička | Stav | Poznámka |
|---|---|---|
| Strict-Transport-Security | ✅ v kódu: max-age=63072000; includeSubDomains | bez preload, viz otevřené body |
| Content-Security-Policy | ✅ v kódu, **enforcing** od začátku | nonce + strict-dynamic, v1 |
| X-Content-Type-Options | ✅ nosniff | |
| X-Frame-Options | ✅ DENY | |
| Referrer-Policy | ✅ strict-origin-when-cross-origin | |
| Permissions-Policy | ✅ vše zakázáno, `fullscreen=(self)` kvůli lightboxu | |
| Cross-Origin-Opener-Policy | ✅ same-origin | |
| Cross-Origin-Resource-Policy | ✅ same-origin | |
| X-XSS-Protection | ✅ 0 | |
| X-Powered-By | ✅ odstraněno (`poweredByHeader: false`) | |

## CSP

Verze: v1 (CSP-LOG.md). Režim: enforcing.
Třetí strany: žádné. `frame-src 'none'`, dokud se v kroku 10 neověří hostname Mapy.cz.
Výjimky: `style-src 'unsafe-inline'` (DECISIONS 001), `'unsafe-eval'` jen v `next dev` (DECISIONS 004).

## DNS a e-mail

Doménu a DNS spravuje: **neznámo** (otevřená otázka). Klient používá e-mail na seznam.cz.

| Položka | Stav |
|---|---|
| DNSSEC | ❓ neověřeno |
| CAA | ❓ neověřeno |
| SPF | ❓ neověřeno, `v=spf1 -all` jen pokud z domény nic neodchází |
| DMARC | ❓ neověřeno, cíl `p=reject` |

## Aplikace

- Žádné API routy, server actions ani env proměnné.
- Tajemství: žádná. `.gitignore` blokuje `.env*`, `*.pem`, `*.key`, `.vercel`.
- Gitleaks 8.30.1 lokálně (Homebrew), 2026-10-06 bez nálezu.
- CI: `.github/workflows/security.yml` (npm audit prod závislostí, gitleaks, kontrola hlaviček po nastavení `SITE_URL`). Zatím neběží, repo nemá GitHub remote.
- `npm audit`: produkční závislosti 0 zranitelností. 5× high jen v dev nástroji `eslint-config-next` (micromatch přes fast-glob), do buildu se nedostane.

## Otevřené body

| Bod | Proč | Kdo | Kdy |
|---|---|---|---|
| Kontakt do `security.txt` | bez `Contact` je soubor neplatný | uživatel | před spuštěním |
| Ověření hostname Mapy.cz + `frame-src` | mapa na Kontaktu | Claude | fáze 1, krok 10 |
| `web-security-audit` proti produkci | preview ověřen, produkce neexistuje | Claude | krok 16, po fázi 0 |
| Výkon Úvodu (LCP) vs. nonce/dynamické renderování | Lighthouse mobil 62 | uživatel rozhodne | před krokem 16 |
| HSTS preload | až po měsíci provozu | Claude + uživatel | měsíc po spuštění |
| DNSSEC, CAA, SPF, DMARC | doména spoofovatelná | správce DNS (neznámý) | před spuštěním |
| Vercel preview toolbar | CSP ho blokuje (nemá nonce); v produkci nepovolovat | — | jen pokud bude potřeba |

## Neměnit bez dotazu

- `form-action 'none'`: web nemá formulář, přidání formuláře schvaluje uživatel.
- Enforcing CSP: nepřepínat na report-only kvůli „tiché konzoli“, chybějící zdroj doplnit konkrétním hostname.
