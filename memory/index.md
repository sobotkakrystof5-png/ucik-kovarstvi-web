# memory/index.md — mapa paměťového systému

Čti jako první, na začátku každé session, před jakoukoli prací. Tento soubor nenese obsah, jen říká, kde co je a v jaké fázi projekt je.

## 1. Stav projektu (jeden řádek)

**Fáze:** fáze 1 hotová (2026-10-05), fáze 2 kroky 14–15 hotové (2026-10-06), fáze 3 připravená předem (`memory/faze-3.md`). Zbývá fáze 0 (keyword research), pak krok 16 (produkce), pak ostrá fáze 3.
Detail je vždy v `memory/memory.md` → „Aktuální stav“.

## 2. Systémové soubory

| Soubor | Obsahuje | Kdy se na něj sahá |
|---|---|---|
| `memory/index.md` (tento) | Mapa, jednořádkový stav | Vznikne nový systémový soubor/složka, nebo se změní fáze |
| `memory/pravidla.md` | Pravidla, jak se vede paměť | Jen na výslovný pokyn uživatele |
| `memory/memory.md` | Stav, rozhodnutí, otevřené otázky, záměrně nehotové, changelog | Po každé změně projektu, ve stejném kroku |
| `memory/activity.log` | Surový trail změn souborů (zapisuje hook) | Nikdy ručně. Destiluje se do changelogu |
| `memory/keywords.md` | Schválená klíčová slova: Stránka \| Hlavní slovo \| Vedlejší slova \| Hledanost \| Obtížnost \| Datum schválení (**vznikne ve fázi 0**) | Po každém schváleném slově ve fázi 0; po spuštění jen na pokyn uživatele (slugy se nemění) |
| `memory/faze-3.md` | Checklist fáze 3 (kroky 17–19) a stav SEO auditu před spuštěním | Při plnění kroků 17–19, odškrtávat s datem |
| `CLAUDE.md` | Chování, tón, povinný postup, řešení konfliktů | Zřídka, na výslovné rozhodnutí uživatele |
| `AGENTS.md` | Technická fakta: stack, struktura, konvence, skilly, bezpečnostní pravidla, DoD | Při změně stacku, struktury, příkazů, konvencí nebo skillů |
| `web-project-brief.md` | Úplné zadání: design, mapa rout, obsah stránek, SEO, bezpečnost, fakta o klientovi | Když klient/uživatel dodá nové vstupy nebo změní zadání |
| `.claude/security/*` | Bezpečnostní paměť: STATE, DECISIONS, CSP-LOG, AUDIT-LOG, `security-check.sh` | Při každé bezpečnostní změně, podle skillu `web-security-memory` |
| `.claude/settings.json` | Hook, který plní `activity.log` | Jen na výslovný pokyn uživatele |
| `.claude/skills/` | 14 lokálních skillů, přehled v `AGENTS.md` §6 | Při přidání/odebrání skillu (zapsat i do `AGENTS.md`) |

## 3. Přednost při konfliktu dokumentů

Živý prompt uživatele → `CLAUDE.md` → `memory/pravidla.md` → `memory/memory.md` → `AGENTS.md`.
`web-project-brief.md` je zdroj pravdy pro obsah, design a fakta o klientovi a má přednost před obecnými skilly (`CLAUDE.md` §6).
Konflikt se vždy nahlásí uživateli, nikdy se neřeší potichu.

## 4. Jak dokumenty souvisí

```
CLAUDE.md ──────────(jak se chovat)──┐
AGENTS.md ──────────(co projekt je)──┤
web-project-brief.md ─(co stavíme)───┼──► práce ──► memory/memory.md (co se stalo, proč)
.claude/security/STATE.md ───────────┘      │   └─► .claude/security/* (bezpečnostní změny)
                                            ▼
                .claude/settings.json hook ──► memory/activity.log ──(destilace)──► memory.md
memory/pravidla.md ──(jak psát do paměti)──► memory/memory.md
```

## 5. Mapa projektu

```
UCIK - web /                 (pozor: mezera na konci názvu složky)
├── CLAUDE.md                chování a postup
├── AGENTS.md                technická fakta, skilly, bezpečnost, DoD
├── web-project-brief.md     úplné zadání
├── memory/
│   ├── index.md             tato mapa
│   ├── pravidla.md          pravidla paměti
│   ├── memory.md            živý stav + changelog
│   ├── keywords.md          klíčová slova (vznikne ve fázi 0)
│   ├── faze-3.md            checklist po spuštění
│   └── activity.log         surový log (hook)
├── src/, public/, next.config.ts, package.json   Next.js projekt (detail: AGENTS.md §3)
├── .github/workflows/       security.yml
└── .claude/
    ├── settings.json        PostToolUse hook → memory/activity.log
    ├── security/            bezpečnostní paměť
    └── skills/              14 lokálních skillů
```

## 6. Rychlý start session

1. Pořadí čtení podle `CLAUDE.md` §0: `memory/index.md` → `memory/pravidla.md` → `memory/memory.md` → `AGENTS.md` → `.claude/security/STATE.md` (jakmile existuje). `web-project-brief.md` vždy, když úkol sahá na design, obsah, strukturu nebo SEO.
2. V `memory.md` zjisti, kde se skončilo a co je otevřené.
3. Projdi řádky v `activity.log` novější než poslední záznam changelogu (změny mimo minulou session) a chybějící doplň.
4. Pracuj podle povinného postupu v `CLAUDE.md` §2.
5. Každou změnu zapiš do `memory.md` ve stejném kroku, kdy proběhla.
