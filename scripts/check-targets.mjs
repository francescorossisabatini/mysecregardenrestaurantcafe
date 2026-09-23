// check-targets.mjs — misura ogni elemento interattivo su ogni route, e conta
// le dimensioni tipografiche effettivamente renderizzate in una schermata.
//
// Il target di 44×44px sta scritto in DESIGN_SYSTEM.md §8, ma finora nessuno
// l'aveva misurato: si controllava leggendo le classi, che è il modo in cui
// un min-h-[44px] su un wrapper nasconde un controllo da 26px dentro.
// Qui si misura il rettangolo vero renderizzato dal browser.
//
//   node scripts/check-targets.mjs [--base http://127.0.0.1:8080] [--min 44]
//
// Exit 1 se un controllo è sotto soglia.

import { chromium } from 'playwright';
import { existsSync, readFileSync } from 'node:fs';
import { extname } from 'node:path';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : d; };
const BASE = arg('base', 'http://127.0.0.1:8080');
const MIN = Number(arg('min', 44));
const ROUTES = ['/', '/menu', '/visit', '/about', '/gallery', '/link'];

const main = async () => {
  const exe = process.env.CHROMIUM_PATH || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  let failures = 0;

  for (const [label, w, h, mobile] of [['mobile', 390, 844, true], ['desktop', 1280, 900, false]]) {
    const MINFOR = mobile ? MIN : 24;
    const ctx = await browser.newContext({
      viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile,
      reducedMotion: 'reduce', locale: 'de-AT',
    });
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

    console.log(`\n── ${label} ${w}×${h} — soglia ${MINFOR}px ──`);
    const typeCounts = [];
    for (const route of ROUTES) {
      const page = await ctx.newPage();
      await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 30_000 }).catch(() => {});
      await page.waitForTimeout(500);

      // Il lock ammette 5 dimensioni tipografiche PER SCHERMATA. Finora si
      // contavano le classi su tutto il repo, che è un altro numero: qui si
      // contano i px renderizzati dal testo visibile nel primo viewport.
      const sizes = await page.evaluate(() => {
        const seen = new Map();
        const vh = window.innerHeight;
        document.querySelectorAll('body *').forEach((el) => {
          if (el.children.length > 0) return;                 // solo foglie di testo
          if (!(el.textContent || '').trim()) return;
          const r = el.getBoundingClientRect();
          if (r.height === 0 || r.top > vh || r.bottom < 0) return;
          const px = Math.round(parseFloat(getComputedStyle(el).fontSize));
          seen.set(px, (seen.get(px) || 0) + 1);
        });
        return [...seen.entries()].sort((a, b) => b[0] - a[0]);
      });
      typeCounts.push({ route, sizes });
      const threshold = mobile ? MIN : 24; // DESIGN_SYSTEM §8 è per il touch; su desktop vale WCAG 2.2 AA
      const small = await page.evaluate((min) => {
        const out = [];
        const sel = 'a[href], button, [role="button"], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';
        document.querySelectorAll(sel).forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;            // nascosto
          const cs = getComputedStyle(el);
          if (cs.visibility === 'hidden' || cs.display === 'none') return;
          if (el.closest('[aria-hidden="true"]')) return;
          // sr-only: invisibile finché non riceve focus, quando diventa di
          // dimensione piena. Misurarlo a riposo dà sempre 1×1.
          if (el.className && String(el.className).includes('sr-only')) return;
          // Un controllo dentro un altro controllo già abbastanza grande non conta:
          // l'area toccabile è quella del genitore.
          const parent = el.parentElement?.closest(sel);
          if (parent) {
            const pr = parent.getBoundingClientRect();
            if (pr.height >= min && pr.width >= min) return;
          }
          if (r.height < min || r.width < min) {
            out.push({
              w: Math.round(r.width), h: Math.round(r.height),
              text: (el.textContent || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 34).replace(/\s+/g, ' '),
            });
          }
        });
        return out;
      }, threshold);
      await page.close();

      if (small.length === 0) { console.log(`  ✓ ${route}`); continue; }
      failures += small.length;
      console.log(`  ✗ ${route} — ${small.length} sotto ${threshold}px`);
      // dedup: lo stesso controllo ripetuto N volte è un problema solo
      const seen = new Map();
      for (const s of small) {
        const k = `${s.w}×${s.h} ${s.text}`;
        seen.set(k, (seen.get(k) || 0) + 1);
      }
      for (const [k, n] of [...seen.entries()].slice(0, 8)) {
        console.log(`      ${k}${n > 1 ? `  ×${n}` : ''}`);
      }
    }
    console.log(`\n  scala tipografica nel primo viewport (il lock ne ammette 5):`);
    for (const t of typeCounts) {
      const n = t.sizes.length;
      const mark = n > 5 ? '✗' : '✓';
      if (n > 5) failures++;
      console.log(`    ${mark} ${t.route} — ${n} dimensioni: ${t.sizes.map(([px, c]) => `${px}px×${c}`).join('  ')}`);
    }
    await ctx.close();
  }

  await browser.close();
  if (failures) { console.log(`\n${failures} controlli sotto ${MIN}px.`); process.exit(1); }
  console.log(`\nTutti i controlli sopra ${MIN}px.`);
};

main();
