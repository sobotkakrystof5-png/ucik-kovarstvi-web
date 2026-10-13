/**
 * Sdílené typy obsahu. Fotky jsou zatím placeholdery: `src: null`.
 * Výměna fotky = doplnění `src` (cesta v public/, např. '/foto/brana-fort.jpg').
 */
import type { Pomer } from '@/components/photo-slot/PhotoSlot';

export type Foto = {
  /** ID slotu podle vzoru `stranka-sekce-01` (web-project-brief.md §6). */
  id: string;
  /** Co má fotka ukazovat, zobrazí se v placeholderu. */
  popis: string;
  /** Popisný alt pro finální fotku. */
  alt: string;
  src: string | null;
};

/**
 * SEO údaje stránky. PRACOVNÍ: přepíšou se po keyword researchu (fáze 0)
 * podle memory/keywords.md. Title se doplní šablonou „| Kovářství Jiří Učík“.
 */
export type Seo = {
  title: string;
  description: string;
};

export type { Pomer };
