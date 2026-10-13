import { StrankaRealizaci } from '@/components/realizace/StrankaRealizaci';
import { casti, realizaceCasti } from '@/content/realizace';
import { metadataStranky } from '@/lib/seo';

// PRACOVNÍ SEO (fáze 0 před spuštěním)
export const metadata = metadataStranky({
  title: 'Realizace: kované brány, zábradlí a nábytek',
  description:
    'Fotky hotových kovaných bran, plotů, zábradlí, mříží, krbového nářadí a nábytku z dílny Jiřího Učíka u Litoměřic. Chcete podobné? Zavolejte 603 582 254.',
  cesta: '/realizace',
});

/** „Vše“ = výběr: první tři kusy z každé části (brief §5). */
export default function RealizacePage() {
  const vyber = casti.flatMap((c) => realizaceCasti(c.slug).slice(0, 3));
  return <StrankaRealizaci cast={null} fotky={vyber} />;
}
