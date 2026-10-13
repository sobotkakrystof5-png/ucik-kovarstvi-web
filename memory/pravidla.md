# memory/pravidla.md — jak se vede paměť projektu

Pravidla pro samotný paměťový systém. Claude tento soubor neupravuje sám od sebe, jen na výslovný pokyn uživatele.

## 1. Základní princip

Každá změna projektu se zapíše do `memory/memory.md` hned, ve stejném kroku. Ne na konci session, ne po připomenutí.

## 2. Co se zapisuje

- Vytvoření, přejmenování nebo smazání souboru či složky.
- Změna obsahu, designu, textů, rout.
- Technické rozhodnutí: stack, knihovna, hosting, integrace, doména, přesměrování.
- Co se zkusilo a **nefungovalo** (a proč), aby to další session nezkoušela znovu.
- Co se vědomě odložilo a proč.
- Otevřené otázky na uživatele nebo klienta.
- Nová fakta o klientovi, vždy se zdrojem (chat, podklad od klienta, ARES). Samotný fakt patří do `web-project-brief.md`, do changelogu jen záznam, že přibyl.

## 3. Co se nezapisuje

- Vyprávění o postupu („nejdřív jsem hledal, pak jsem…“).
- Cokoli, co je přímo vidět v kódu.
- Sebechvála a shrnutí typu „vše hotovo a funguje“.
- Duplikace toho, co už stojí v `CLAUDE.md`, `AGENTS.md` nebo `web-project-brief.md`.
- Bezpečnostní detaily, které patří do `.claude/security/` (do changelogu jen jeden řádek s odkazem).
- Session, které jen četly a nic v projektu nezměnily.

## 4. Formát záznamu v changelogu

Nejnovější nahoře:

```markdown
### RRRR-MM-DD — Krátký název
- **Co:** jedna až dvě věcné věty v minulém čase.
- **Proč:** důvod, nebo „na pokyn uživatele“, pokud jiný není.
- **Dopad:** co dalšího to ovlivňuje (jiné stránky, SEO, responzivita, bezpečnost, stack). „Izolované“, pokud nic.
- **Soubory:** `cesta/k/souboru`
```

Vždy absolutní datum. Žádná vymyšlená fakta o klientovi: chybějící informace jde do „Otevřené otázky“ a na web jako `[DOPLNÍ KLIENT: ...]`, nikdy jako domněnka.

## 5. Údržba ostatních sekcí `memory.md`

| Sekce | Aktualizuje se | Způsob |
|---|---|---|
| Aktuální stav | Při posunu fáze nebo dokončení většího celku | Přepisuje se, nepřidává |
| Klíčová rozhodnutí | Padne rozhodnutí, které se nebude znovu otevírat | Jen přidávat, nemazat |
| Otevřené otázky | Vznikne otázka na uživatele/klienta | Zodpovězená se smaže, odpověď jde do Rozhodnutí nebo changelogu |
| Záměrně nehotové | Něco se záměrně vynechá | Chrání to před „opravou“ budoucí session. Po dokončení se položka smaže a zapíše do changelogu |

Když uživatel výslovně změní dřívější rozhodnutí: původní záznam v Rozhodnutích zůstane, nový záznam řekne, co přepisuje a proč, a do changelogu jde poznámka „vědomě přepisuje rozhodnutí z RRRR-MM-DD“.

## 6. `activity.log`

- Plní ho automaticky PostToolUse hook v `.claude/settings.json` při každém Edit/Write. Ručně se do něj nepíše.
- Na začátku session projdi řádky novější než poslední záznam v changelogu. Změnu, která v changelogu chybí (udělaná mimo Claude nebo v přerušené session), doplň.
- Log se nemaže ani neupravuje. Když přeroste ~500 řádků, na pokyn uživatele se starší část přesune do `memory/archiv/`.

## 7. Kdy sahat na ostatní dokumenty

- `CLAUDE.md`: jen na výslovnou změnu chování, tónu nebo procesu od uživatele. Průběžný stav se v něm nevede.
- `AGENTS.md`: když se změní stack, struktura, příkazy, konvence nebo sada skillů. Změna v `AGENTS.md` jde vždy i do changelogu.
- `web-project-brief.md`: když přijdou nová fakta nebo změna zadání. Změna struktury se musí propsat do všech dotčených míst (`web-project-brief.md`, `AGENTS.md`, `CLAUDE.md` §4), ne jen do jednoho.
- `.claude/security/*`: podle tabulky ve skillu `web-security-memory` (hlavička → STATE, CSP → CSP-LOG + STATE, kompromis → DECISIONS, audit → AUDIT-LOG).
- `memory/index.md`: když vznikne systémový soubor/složka nebo se změní fáze.
- `memory/pravidla.md`: jen na výslovný pokyn uživatele.

## 8. Začátek a konec session

**Začátek:** pořadí čtení podle `CLAUDE.md` §0 (`index.md` → `pravidla.md` → `memory.md` → `AGENTS.md` → `.claude/security/STATE.md`, jakmile existuje). Každý nový požadavek porovnej s „Klíčová rozhodnutí“ a „Záměrně nehotové“ dřív, než začneš implementovat. Kolizi nahlas hned, ne až po implementaci.

**Konec:** ověř, že každá změna je v changelogu, „Aktuální stav“ odpovídá realitě, `index.md` má správnou fázi, `.claude/security/STATE.md` (pokud existuje) je aktuální a v „Otevřené otázky“ nezůstala žádná už zodpovězená.

## 9. Ověřuj, nepředpokládej

Když `memory.md` tvrdí něco o souboru, routě, nastavení nebo deployi, na co se chystáš spolehnout, ověř to nejdřív v projektu. Paměť popisuje stav v době zápisu, ne nutně teď.
