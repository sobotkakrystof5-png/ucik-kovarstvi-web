# Bezpečnostní rozhodnutí

> Jen přidávat. Každý vědomý kompromis s důvodem a datem revize.

Formát:

```
## NNN — název
Datum: RRRR-MM-DD
Rozhodnutí:
Důvod:
Zvažované alternativy:
Přijaté riziko:
Revize:
```

---

## 001 — style-src 'unsafe-inline'
Datum: 2026-10-05
Rozhodnutí: Povolit inline styly.
Důvod: Next.js vkládá styly inline a komponenty používají `style` atribut (pevný `aspect-ratio` u `PhotoSlot`, proměnné pro canvas). Nonce na `style` atributy nefunguje. Předepsáno v brief §7.
Zvažované alternativy: nonce pro `<style>` prvky (nepokryje atributy), hashe (nepraktické u dynamických hodnot).
Přijaté riziko: CSS injekce (exfiltrace přes selektory, UI redressing). Skripty zůstávají zamčené.
Revize: při větším refaktoru stylů nebo až Next.js podpoří nonce pro všechny své styly.

## 002 — form-action 'none'
Datum: 2026-10-05
Rozhodnutí: Zakázat odesílání formulářů úplně.
Důvod: Web nemá formulář, rozhodnutí klienta (brief §1, §7).
Přijaté riziko: žádné. Přidání formuláře je bezpečnostní změna, kterou schvaluje uživatel.
Revize: až klient bude chtít formulář.

## 003 — Fonty self-hosted, žádné Google domény
Datum: 2026-10-05
Rozhodnutí: Fraunces, Source Sans 3 a Cinzel přes `next/font/google`, které je stáhne při buildu a servíruje z vlastní domény. `font-src 'self'`.
Důvod: GDPR (žádný přenos IP na Google) a užší CSP (brief §2).
Revize: není potřeba.

## 004 — 'unsafe-eval' v script-src jen při `next dev`
Datum: 2026-10-05
Rozhodnutí: V režimu `next dev` (`NODE_ENV=development`) obsahuje `script-src` `'unsafe-eval'`. Produkční build ho nemá.
Důvod: React ho ve vývoji potřebuje pro rekonstrukci server-side chybových výpisů (dokumentace Next.js 16, guide Content Security Policy). Bez něj nejde vývoj s enforcing CSP.
Zvažované alternativy: CSP vypnout v dev (horší: chyby CSP by se odhalily až na preview).
Přijaté riziko: žádné v produkci. Podmínka je v `src/lib/security.ts` → `buildCsp`, nikdy ji nerozšiřovat na jiné prostředí. Ověřuje se `web-security-audit` na preview i produkci.
Revize: při každém auditu ověřit, že produkční CSP `unsafe-eval` nemá.

## 005 — Nonce znamená dynamické renderování všech stránek
Datum: 2026-10-05
Rozhodnutí: Všechny stránky se renderují na request (root layout volá `connection()`), aby Next.js mohl doplnit nonce.
Důvod: Brief §7 předepisuje CSP s nonce a strict-dynamic. Staticky předgenerované stránky nonce mít nemohou a skripty by se zablokovaly.
Zvažované alternativy: experimentální SRI v Next.js (hashe, stránky zůstanou statické, ale funkce je experimentální a inline skripty Next.js neřeší spolehlivě); `script-src 'unsafe-inline'` (zakázané).
Přijaté riziko: o něco pomalejší TTFB a žádné CDN cache HTML, vyšší spotřeba funkcí na Vercelu. U malého webu bez dat zanedbatelné, ověří se v Lighthouse (fáze 2, krok 15).
Revize: fáze 2, krok 15. Pokud mobilní výkon nevyjde, otevřít s uživatelem SRI.
