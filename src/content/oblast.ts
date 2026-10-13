/**
 * Oblast působnosti (web-project-brief.md §1). Města nemají vlastní stránky,
 * jdou do textů, titulků a `areaServed` (brief §8).
 * Souřadnice jsou přibližné středy obcí, jen pro ilustrovanou mapku.
 * Kraj je skutečná příslušnost obce, podle něj se na mapě zvýrazní kraje.
 */
export type KrajId = 'ustecky' | 'liberecky' | 'stredocesky' | 'praha';
export type Mesto = { nazev: string; lat: number; lon: number; kraj: KrajId };

/**
 * Skupiny v seznamu vedle mapy. Praha je samostatný kraj, ale má v oblasti
 * jediné město, proto jde do jedné skupiny se Středočeským krajem.
 */
export type SkupinaKraju = { id: string; nazev: string; mapa: string; kraje: KrajId[] };

export const skupinyKraju: SkupinaKraju[] = [
  { id: 'ustecky', nazev: 'Ústecký kraj', mapa: 'Ústecký', kraje: ['ustecky'] },
  { id: 'liberecky', nazev: 'Liberecký kraj', mapa: 'Liberecký', kraje: ['liberecky'] },
  { id: 'stredocesky', nazev: 'Praha a Středočeský kraj', mapa: 'Středočeský', kraje: ['stredocesky', 'praha'] },
];

export const dilna: Mesto = { nazev: 'Žitenice', lat: 50.555, lon: 14.157, kraj: 'ustecky' };

export const oblast: Mesto[] = [
  { nazev: 'Litoměřice', lat: 50.534, lon: 14.132, kraj: 'ustecky' },
  { nazev: 'Roudnice nad Labem', lat: 50.425, lon: 14.261, kraj: 'ustecky' },
  { nazev: 'Praha', lat: 50.088, lon: 14.42, kraj: 'praha' },
  { nazev: 'Ústí nad Labem', lat: 50.661, lon: 14.032, kraj: 'ustecky' },
  { nazev: 'Štětí', lat: 50.453, lon: 14.374, kraj: 'ustecky' },
  { nazev: 'Louny', lat: 50.357, lon: 13.797, kraj: 'ustecky' },
  { nazev: 'Mělník', lat: 50.35, lon: 14.474, kraj: 'stredocesky' },
  { nazev: 'Lovosice', lat: 50.515, lon: 14.051, kraj: 'ustecky' },
  { nazev: 'Úštěk', lat: 50.585, lon: 14.344, kraj: 'ustecky' },
  { nazev: 'Budyně nad Ohří', lat: 50.404, lon: 14.126, kraj: 'ustecky' },
  { nazev: 'Libochovice', lat: 50.406, lon: 14.044, kraj: 'ustecky' },
  { nazev: 'Most', lat: 50.503, lon: 13.636, kraj: 'ustecky' },
  { nazev: 'Bílina', lat: 50.548, lon: 13.776, kraj: 'ustecky' },
  { nazev: 'Česká Lípa', lat: 50.686, lon: 14.538, kraj: 'liberecky' },
  { nazev: 'Terezín', lat: 50.511, lon: 14.15, kraj: 'ustecky' },
  { nazev: 'Teplice', lat: 50.64, lon: 13.825, kraj: 'ustecky' },
];

export const mestaSkupiny = (s: SkupinaKraju) => oblast.filter((m) => s.kraje.includes(m.kraj));
