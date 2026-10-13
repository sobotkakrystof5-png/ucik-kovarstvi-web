import { PhotoSlot } from '@/components/photo-slot/PhotoSlot';
import { HlavickaStranky } from '@/components/stranka/HlavickaStranky';
import { ZavolejteMi } from '@/components/stranka/ZavolejteMi';
import { omne } from '@/content/omne';
import { metadataStranky } from '@/lib/seo';
import styles from './o-mne.module.css';

export const metadata = metadataStranky({ ...omne.seo, cesta: '/o-mne' });

export default function OMnePage() {
  const { fotky, pribeh, dilna } = omne;
  return (
    <>
      <HlavickaStranky
        stitek="O mně"
        nadpis={omne.nadpis}
        uvod={<p>{omne.uvod}</p>}
        drobky={[{ nazev: 'O mně', href: '/o-mne' }]}
      />

      <section className={`wrap ${styles.story}`} aria-label="Příběh">
        <div className={styles.portrait}>
          <PhotoSlot
            id={fotky.portret.id}
            popis={fotky.portret.popis}
            alt={fotky.portret.alt}
            src={fotky.portret.src}
            pomer="4:5"
            sizes="(min-width: 64rem) 40vw, 100vw"
            priority
          />
        </div>
        <div className={styles.text}>
          {pribeh.doplni.map((d) => (
            <p key={d}>
              <em className="todo-klient">[DOPLNÍ KLIENT: {d}]</em>
            </p>
          ))}
          {pribeh.text.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className={`wrap ${styles.dilna}`} aria-labelledby="dilna-nadpis">
        <div className={styles.dilnaPhoto}>
          <PhotoSlot
            id={fotky.dilna.id}
            popis={fotky.dilna.popis}
            alt={fotky.dilna.alt}
            src={fotky.dilna.src}
            pomer="3:2"
            sizes="(min-width: 64rem) 60vw, 100vw"
          />
        </div>
        <div className={styles.dilnaText}>
          <h2 id="dilna-nadpis">{dilna.nadpis}</h2>
          <p>{dilna.text}</p>
          <p>
            <em className="todo-klient">[DOPLNÍ KLIENT: {dilna.doplni}]</em>
          </p>
        </div>
      </section>

      <ul className={`wrap ${styles.details}`} aria-label="Detaily z práce">
        {fotky.detaily.map((d, i) => (
          <li key={d.id}>
            <PhotoSlot
              id={d.id}
              popis={d.popis}
              alt={d.alt}
              src={d.src}
              pomer={i === 1 ? '4:5' : '3:2'}
              sizes="(min-width: 64rem) 30vw, 100vw"
            />
          </li>
        ))}
      </ul>

      <ZavolejteMi nadpis="Chcete se domluvit?" veta="Zavolejte mi, nebo napište. Na dílnu se můžete přijet podívat po domluvě." />
    </>
  );
}
