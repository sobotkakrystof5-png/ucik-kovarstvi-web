/**
 * Kontaktní a firemní údaje. Jediný zdroj pro hlavičku, patičku, lištu,
 * Kontakt a JSON-LD. Fakta jen z web-project-brief.md §1, nic nedoplňovat.
 */
export const kontakt = {
  jmeno: 'Jiří Učík',
  firma: 'Kovářství Jiří Učík',
  telefon: {
    zobrazeni: '603 582 254',
    href: 'tel:+420603582254',
  },
  email: 'kovarstvi.ucik@seznam.cz',
  adresa: {
    ulice: 'Litoměřická 3',
    psc: '411 41',
    obec: 'Žitenice',
    region: 'Ústecký kraj',
  },
  ico: '11454571',
  datovaSchranka: 'a64xvi9',
  provozniDoba: 'dle telefonické domluvy',
  web: 'https://kovarstviucik.cz',
} as const;

export const mailtoHref = `mailto:${kontakt.email}`;

/**
 * „Chci podobné“ (brief §5): předvyplněný e-mail s předmětem
 * „Poptávka: podobné jako [název realizace]“ a odkazem na fotku v těle.
 */
export function mailtoPodobne(nazev: string, odkaz: string) {
  const subject = `Poptávka: podobné jako ${nazev}`;
  const body = `Dobrý den,\n\nchtěl/a bych něco podobného jako tuto realizaci:\n${odkaz}\n\n`;
  return `${mailtoHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Mapa na Kontaktu: iframe Mapy.com (brief §3).
 * `embedSrc` se doplní kódem z Mapy.com („Sdílet → Vložit mapu do stránek“),
 * který vygeneruje uživatel. Ověřeno 2026-10-05: frame.mapy.cz přesměrovává
 * na mapy.com, do CSP `frame-src` proto patří oba hostnamy (src/lib/security.ts).
 * Do té doby se ukáže placeholder s odkazem na mapu.
 */
export const mapa = {
  embedSrc: null as string | null,
  odkaz: `https://mapy.com/cs/zakladni?q=${encodeURIComponent('Litoměřická 3, 411 41 Žitenice')}`,
};
