/** Hlavní menu (brief §3). Výrobky se rozbalují do skupin z vyrobky.ts. */
export type NavPolozka = { href: string; nazev: string };

export const hlavniMenu: NavPolozka[] = [
  { href: '/realizace', nazev: 'Realizace' },
  { href: '/jak-pracuji', nazev: 'Jak pracuji' },
  { href: '/o-mne', nazev: 'O mně' },
  { href: '/kontakt', nazev: 'Kontakt' },
];

export const vyrobkyHref = '/vyrobky';
