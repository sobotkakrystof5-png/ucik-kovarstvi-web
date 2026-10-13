/**
 * Závěrečný pás s výzvou k zavolání (konec každé stránky).
 * Velké telefonní číslo, e-mail, jedna věta. Žádný formulář (rozhodnutí klienta).
 */
import { VolutaOddelovac } from '@/components/voluta/Voluta';
import { kontakt, mailtoHref } from '@/content/kontakt';
import styles from './ZavolejteMi.module.css';

type Props = {
  nadpis?: string;
  veta?: string;
  /** Úroveň nadpisu, aby seděla hierarchie stránky. */
  uroven?: 'h2' | 'h3';
};

export function ZavolejteMi({
  nadpis = 'Máte představu? Zavolejte mi.',
  veta = 'Pošlete mi fotku místa nebo nákres a domluvíme se.',
  uroven = 'h2',
}: Props) {
  const H = uroven;
  return (
    <section className={`wrap ${styles.band}`} aria-labelledby="zavolejte-nadpis">
      <VolutaOddelovac className={styles.divider} />
      <div className={styles.grid}>
        <div>
          <H id="zavolejte-nadpis" className={styles.title}>
            {nadpis}
          </H>
          <p className={styles.veta}>{veta}</p>
        </div>
        <div className={styles.contact}>
          <a href={kontakt.telefon.href} className={styles.phone}>
            {kontakt.telefon.zobrazeni}
          </a>
          <a href={mailtoHref} className={styles.mail}>
            {kontakt.email}
          </a>
        </div>
      </div>
    </section>
  );
}
