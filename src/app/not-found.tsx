import { Akce } from '@/components/akce/Akce';
import { VolutaOddelovac } from '@/components/voluta/Voluta';
import { kontakt } from '@/content/kontakt';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Stránka nenalezena',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className={`wrap ${styles.wrap}`}>
      <span className="eyebrow">Chyba 404</span>
      <h1 className={styles.title}>Tahle stránka tu není.</h1>
      <p className="lead">
        Možná se přesunula, když jsem web předělával. Zkuste výrobky, nebo mi rovnou zavolejte.
      </p>
      <VolutaOddelovac className={styles.divider} />
      <div className={styles.actions}>
        <Akce href="/vyrobky">Prohlédnout výrobky</Akce>
        <Akce href={kontakt.telefon.href} varianta="linka">
          Zavolat {kontakt.telefon.zobrazeni}
        </Akce>
      </div>
    </section>
  );
}
