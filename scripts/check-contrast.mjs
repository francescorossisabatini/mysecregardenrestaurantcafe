// check-contrast.mjs — misura il contrasto del testo sopra la fotografia dell'hero.
//
// Il testo su immagine è l'unico punto del sito dove il contrasto non si può
// calcolare dai token: dipende dallo scrim e dal ritaglio della foto, che
// cambia con la larghezza. Il metodo:
//   1. si misura il colore e il riquadro di ogni elemento di testo;
//   2. si nasconde il testo e si fotografa lo sfondo che c'era sotto;
//   3. si calcola il contrasto contro OGNI pixel di quel riquadro e si tiene
//      il peggiore, non la media.
//
//   node scripts/check-contrast.mjs [--base http://127.0.0.1:8080]
//
// Exit 1 se un testo scende sotto la soglia WCAG AA che gli compete.

import { chromium } from 'playwright';
import { existsSync, readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { PNG } from 'pngjs';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : d; };
const BASE = arg('base', 'http://127.0.0.1:8080');

const srgb = (c) => { const v = c / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = (r, g, b) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const ratio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

const parseColor = (css) => {
  const m = css.match(/rgba?\(([^)]+)\)/);
  if (!m) return [255, 255, 255];
  return m[1].split(',').slice(0, 3).map((x) => parseFloat(x));
};

const main = async () => {
  const exe = process.env.CHROMIUM_PATH || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  let failures = 0;

  for (const [label, w, h] of [['mobile', 390, 844], ['desktop', 1280, 900]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce', locale: 'de-AT' });
    if (existsSync('output/fonts/fonts.css')) {
      await ctx.route('**/fonts.googleapis.com/**', (r) => r.fulfill({ contentType: 'text/css', body: readFileSync('output/fonts/fonts.css', 'utf8') }));
      await ctx.route('**/__fonts/*', (r) => {
        const n = r.request().url().split('/__fonts/')[1];
        const f = `output/fonts/${n}`;
        if (!existsSync(f)) return r.abort();
        return r.fulfill({ contentType: extname(f) === '.woff2' ? 'font/woff2' : 'font/woff', body: readFileSync(f) });
      });
    }
    await ctx.addInitScript(() => {
      try { localStorage.setItem('cookie_consent_v3', JSON.stringify({ necessary: true, analytics: false, maps: false, decidedAt: new Date().toISOString(), version: 3 })); } catch { /* private mode */ }
    });
    const page = await ctx.newPage();
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // 1 · riquadro, colore e dimensione di ogni testo dentro l'hero
    const texts = await page.evaluate(() => {
      // L'hero è la sezione che contiene l'h1. Cercarla per aria-label pescava
      // la region dei toast, che di aria-label ne ha uno e di testo nessuno.
      const section = document.querySelector('h1')?.closest('section');
      if (!section) return [];
      const out = [];
      section.querySelectorAll('h1 span, p, span').forEach((el) => {
        const t = (el.textContent || '').trim();
        if (!t || el.querySelector('span, p')) return;
        const r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) return;
        const cs = getComputedStyle(el);
        const px = parseFloat(cs.fontSize);
        const bold = parseInt(cs.fontWeight, 10) >= 700;
        out.push({
          text: t.slice(0, 40), color: cs.color,
          x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
          // WCAG: "testo grande" = 18.66px bold oppure 24px
          large: px >= 24 || (bold && px >= 18.66),
        });
      });
      return out;
    });

    // 2 · si nasconde il testo e si fotografa lo sfondo che c'era sotto
    await page.evaluate(() => {
      const section = document.querySelector('h1')?.closest('section');
      section?.querySelectorAll('h1, p, span').forEach((el) => { el.style.visibility = 'hidden'; });
    });
    await page.waitForTimeout(200);
    const png = PNG.sync.read(await page.screenshot({ clip: { x: 0, y: 0, width: w, height: Math.min(h, 600) } }));

    console.log(`\n${label} ${w}×${h} — ${texts.length} testi nell'hero`);
    if (texts.length === 0) {
      console.log('  ⚠ nessun testo trovato: il selettore dell\'hero non corrisponde, la misura non vale');
      failures++;
    }
    for (const t of texts) {
      const need = t.large ? 3 : 4.5;
      const tl = lum(...parseColor(t.color));
      let worst = Infinity;
      for (let y = t.y; y < Math.min(t.y + t.h, png.height); y++) {
        for (let x = t.x; x < Math.min(t.x + t.w, png.width); x++) {
          const i = (png.width * y + x) << 2;
          const r = ratio(tl, lum(png.data[i], png.data[i + 1], png.data[i + 2]));
          if (r < worst) worst = r;
        }
      }
      const ok = worst >= need;
      if (!ok) failures++;
      console.log(`  ${ok ? '✓' : '✗'} ${worst.toFixed(2)}:1  (serve ${need})  ${t.large ? 'grande' : 'normale'}  "${t.text}"`);
    }
    await ctx.close();
  }

  await browser.close();
  if (failures) { console.log(`\n${failures} testi sotto soglia.`); process.exit(1); }
  console.log('\nTutto sopra soglia.');
};

main();
