'use client';

/**
 * Stoupající jiskry v úvodní scéně (web-project-brief.md §2, prvek ohně 1).
 * Jediné místo webu s výrazným pohybem.
 *
 * - Desítky částic, ne stovky. Každá jiskra cestou vzhůru chladne:
 *   ze žlutobílé (--heat-6) přes oranžovou do třešňové a zhasne.
 * - Mimo viewport a ve skryté záložce se animace zastaví.
 * - `prefers-reduced-motion: reduce` = žádný canvas.
 */
import { useEffect, useRef, useSyncExternalStore } from 'react';
import styles from './Jiskry.module.css';

type Jiskra = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  vek: number;
  zivot: number;
  r: number;
  faze: number;
};

/** Barvy žáru čtené z CSS tokenů, od nejteplejší po nejchladnější. */
function nactiBarvy(el: HTMLElement): [number, number, number][] {
  const cs = getComputedStyle(el);
  return ['--heat-6', '--heat-5', '--heat-4', '--heat-3', '--heat-2', '--heat-1'].map((t) => {
    const hex = cs.getPropertyValue(t).trim().replace('#', '');
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];
  });
}

function barvaPodleVeku(barvy: [number, number, number][], t: number) {
  const pos = Math.min(t, 0.999) * (barvy.length - 1);
  const i = Math.floor(pos);
  const f = pos - i;
  const a = barvy[i]!;
  const b = barvy[i + 1]!;
  return [0, 1, 2].map((k) => Math.round(a[k]! + (b[k]! - a[k]!) * f));
}

const MQ = '(prefers-reduced-motion: reduce)';
const odebiratPohyb = (cb: () => void) => {
  const mq = window.matchMedia(MQ);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const pohybPovolen = () => !window.matchMedia(MQ).matches;

export function Jiskry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Respektovat reduced motion, i když se změní za běhu. Na serveru jiskry nejsou.
  const povoleno = useSyncExternalStore(odebiratPohyb, pohybPovolen, () => false);

  useEffect(() => {
    if (!povoleno) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const barvy = nactiBarvy(canvas);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let jiskry: Jiskra[] = [];
    let raf = 0;
    let viditelne = true;
    let posledni = performance.now();

    const pocet = () => (w < 640 ? 18 : 38);

    const nova = (naStartu = false): Jiskra => {
      // Jiskry vycházejí hlavně z dolní třetiny, mírně vpravo od středu (výheň)
      const x = w * (0.35 + Math.random() * 0.5);
      const zivot = 3.5 + Math.random() * 4.5;
      return {
        x,
        y: naStartu ? h * (0.4 + Math.random() * 0.6) : h * (0.85 + Math.random() * 0.2),
        vx: (Math.random() - 0.5) * 12,
        vy: -(18 + Math.random() * 46),
        vek: naStartu ? Math.random() * zivot : 0,
        zivot,
        r: 0.6 + Math.random() * 1.5,
        faze: Math.random() * Math.PI * 2,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      jiskry = Array.from({ length: pocet() }, () => nova(true));
    };

    const krok = (ted: number) => {
      const dt = Math.min((ted - posledni) / 1000, 0.05);
      posledni = ted;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < jiskry.length; i++) {
        const j = jiskry[i]!;
        j.vek += dt;
        if (j.vek >= j.zivot || j.y < -10) {
          jiskry[i] = nova();
          continue;
        }
        // Pomalé stoupání s lehkým kolébáním, jako v teplém proudu vzduchu
        j.faze += dt * 1.6;
        j.x += (j.vx + Math.sin(j.faze) * 9) * dt;
        j.y += j.vy * dt;

        const t = j.vek / j.zivot;
        const [r, g, b] = barvaPodleVeku(barvy, t);
        const alfa = (t < 0.1 ? t / 0.1 : 1) * (1 - t) * 0.95;

        ctx.fillStyle = `rgba(${r},${g},${b},${alfa * 0.22})`;
        ctx.beginPath();
        ctx.arc(j.x, j.y, j.r * 3.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${r},${g},${b},${alfa})`;
        ctx.beginPath();
        ctx.arc(j.x, j.y, j.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(krok);
    };

    const start = () => {
      if (raf || !viditelne || document.hidden) return;
      posledni = performance.now();
      raf = requestAnimationFrame(krok);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      viditelne = !!e?.isIntersecting;
      if (viditelne) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [povoleno]);

  if (!povoleno) return null;
  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
