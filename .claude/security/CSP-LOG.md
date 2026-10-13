# CSP changelog

> Každá změna Content-Security-Policy a funkce, která ji vyžádala.

Formát:

```
## vN — RRRR-MM-DD
Změna:
Vyžádal:
Ověřeno:
```

---

## v1 — 2026-10-05
Změna: výchozí politika z brief §7, enforcing. `frame-src 'none'` místo Mapy.cz, hostname se ověří v kroku 10. Navíc `manifest-src 'self'`, `worker-src 'self'`. `upgrade-insecure-requests` mimo `next dev`.
```
default-src 'self'; script-src 'self' 'nonce-{NONCE}' 'strict-dynamic';
style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self';
connect-src 'self'; frame-src 'none'; frame-ancestors 'none'; base-uri 'self';
form-action 'none'; object-src 'none'; manifest-src 'self'; worker-src 'self';
upgrade-insecure-requests
```
Vyžádal: baseline.
Ověřeno: lokálně (`next build` + `next start`), viz AUDIT-LOG. Preview zatím neexistuje.

Poznámka 2026-10-06 (verze se nemění): `src/lib/security.ts` umí `frame-src` otevřít pro `https://frame.mapy.cz https://mapy.com`, ale jen když je vyplněné `mapa.embedSrc` v `src/content/kontakt.ts`. Hostnamy ověřeny 2026-10-05 (frame.mapy.cz přesměrovává na mapy.com, CSP kontroluje i cíl). Zatím `null`, efektivní politika je v1. Vyplnění `embedSrc` = nová verze CSP, zapsat sem jako v2.
