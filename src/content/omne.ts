/**
 * O mně (brief §4). Životopisné údaje klient zatím nedodal:
 * všechno, co chybí, je [DOPLNÍ KLIENT: …]. Nic nevymýšlet, rok 1993 nepoužívat.
 */
import type { Foto } from './typy';

const f = (id: string, popis: string, alt: string): Foto => ({ id, popis, alt, src: null });

export const omne = {
  seo: {
    title: 'O mně: kovář Jiří Učík ze Žitenic',
    description:
      'Jiří Učík, umělecký kovář s dílnou v Žitenicích u Litoměřic. Navazuje na tradice klasické kovařiny a kove na zakázku do domu i na zahradu.',
  },
  nadpis: 'Jiří Učík, kovář ze Žitenic',
  uvod: 'Kovám na zakázku v dílně v Žitenicích u Litoměřic.',
  pribeh: {
    // Fakta z briefu; zbytek doplní klient
    text: [
      'Navazuji na tradice klasické kovařiny. Kde to práci pomůže, používám i nové technologie a postupy.',
    ],
    doplni: [
      'jak se dostal ke kovářství a od kdy kove',
      'čím se v práci řídí, co ho na řemesle baví',
      'zajímavá nebo oblíbená zakázka',
    ],
  },
  dilna: {
    nadpis: 'Dílna',
    text: 'Dílnu mám v Žitenicích, Litoměřická 3, kousek od Litoměřic. Návštěvu si domluvte předem po telefonu.',
    doplni: 'krátký popis dílny (výheň, vybavení, jak dlouho tam kove)',
  },
  fotky: {
    portret: f('omne-portret-01', 'portrét Jiřího Učíka v dílně', 'Kovář Jiří Učík v dílně'),
    dilna: f('omne-dilna-01', 'dílna v Žitenicích zvenku', 'Kovářská dílna v Žitenicích zvenku'),
    detaily: [
      f('omne-detail-01', 'detail práce: kladivo a kovadlina', 'Kladivo na kovadlině'),
      f('omne-detail-02', 'detail práce: rozžhavený kus v kleštích', 'Rozžhavené železo v kovářských kleštích'),
      f('omne-detail-03', 'detail práce: hotový ornament zblízka', 'Detail kovaného ornamentu'),
    ],
  },
};
