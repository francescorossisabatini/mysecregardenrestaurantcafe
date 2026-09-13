// shoot.mjs — screenshot di ogni route e stato, alle larghezze reali.
// Il file più utile di tutto il setup: senza questo, Claude "vede" il sito
// leggendo il codice, che è come giudicare un layout leggendo il CSS.
//
//   npm i -D playwright        (una volta sola — non è ancora in package.json)
//   npm run dev                (in un altro terminale)
//   node scripts/shoot.mjs
//   node scripts/shoot.mjs --base http://localhost:8080 --only /menu
//
// Output in output/shots/<slug>--<width>.png (cartella gitignorata).

import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};

const BASE = arg('base', 'http://localhost:8080');
const ONLY = arg('only', null);
const OUT = 'output/shots';

// Larghezze: 390 = iPhone corrente, 74% del traffico è mobile.
// 1280 = il desktop più comune in GA4. Due larghezze, non cinque.
const WIDTHS = [
  { w: 390, h: 844, label: 'mobile', mobile: true },
  { w: 1280, h: 900, label: 'desktop', mobile: false },
];

const ROUTES = [
  { path: '/', slug: 'home' },
  { path: '/menu', slug: 'menu' },
  { path: '/visit', slug: 'visit' },
  { path: '/about', slug: 'about' },
  { path: '/gallery', slug: 'gallery' },
  { path: '/link', slug: 'link' },
];

// Stati che non si vedono navigando: vanno forzati.
const STATES = [
  {
    slug: 'home--menu-vuoto',
    path: '/',
    setup: async (page) => {
      // Il caso reale del lunedì mattina prima che lo staff aggiorni il foglio.
      // Solo le chiamate API, non i moduli JS: un pattern troppo largo
      // ('**/*supabase*/**') blocca anche il bundle e la pagina resta bianca.
      await page.route('**/docs.google.com/**', (r) => r.abort());
      await page.route('**/functions/v1/**', (r) => r.abort());
      await page.route('**/rest/v1/**', (r) => r.abort());
    },
  },
  {
    slug: 'home--lingua-en',
    path: '/',
    setup: async (page) => {
      await page.addInitScript(() => localStorage.setItem('preferred_language', 'en'));
    },
  },
];

const hashOf = (buf) => createHash('sha1').update(buf).digest('hex').slice(0, 12);

async function shoot(browser, { path, slug, setup }, size) {
  const context = await browser.newContext({
    viewport: { width: size.w, height: size.h },
    deviceScaleFactor: 2,
    isMobile: size.mobile,
    hasTouch: size.mobile,
    reducedMotion: 'reduce', // le animazioni di ingresso falsano lo scatto
    locale: 'de-AT',
  });
  // Il banner cookie coprirebbe metà pagina in ogni scatto: si dà per deciso.
  // Per fotografare il banner stesso, togli questa riga o aggiungi uno stato.
  await context.addInitScript(() => {
    try {
      localStorage.setItem('cookie_consent_v3', JSON.stringify({
        necessary: true, analytics: false, maps: false,
        decidedAt: new Date().toISOString(), version: 3,
      }));
    } catch { /* private mode */ }
  });

  // I font di Google non sono raggiungibili dal browser in questo ambiente, e
  // senza di loro ogni scatto mostra i fallback di sistema: giudicare la
  // tipografia su Brush Script MT al posto di Caveat non è giudicare.
  // Li serviamo dalla copia locale scaricata da scripts/fetch-fonts.mjs.
  if (existsSync('output/fonts/fonts.css')) {
    await context.route('**/fonts.googleapis.com/**', (r) =>
      r.fulfill({ contentType: 'text/css', body: readFileSync('output/fonts/fonts.css', 'utf8') })
    );
    await context.route('**/__fonts/*', (r) => {
      const name = r.request().url().split('/__fonts/')[1];
      const path = `output/fonts/${name}`;
      if (!existsSync(path)) return r.abort();
      const type = extname(path) === '.woff2' ? 'font/woff2' : 'font/woff';
      return r.fulfill({ contentType: type, body: readFileSync(path) });
    });
  } else {
    console.log('  ⚠ output/fonts/ assente — gli scatti useranno i font di fallback.');
    console.log('    Esegui prima: node scripts/fetch-fonts.mjs');
  }

  const page = await context.newPage();
  if (setup) await setup(page);

  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30_000 });
  await page.waitForTimeout(600); // lazy sections
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  const fontsOk = await page.evaluate(async () => {
    await document.fonts.ready;
    // Non cercare una famiglia precisa: ogni route usa font diversi.
    // Se nessun webfont è stato caricato, lo scatto non vale per la tipografia.
    return [...document.fonts].some((f) => f.status === 'loaded');
  }).catch(() => false);

  const file = `${OUT}/${slug}--${size.label}.png`;
  const buf = await page.screenshot({ fullPage: true });
  await writeFile(file, buf);
  await context.close();
  return { file, hash: hashOf(buf), errors, fontsOk };
}

const main = async () => {
  await mkdir(OUT, { recursive: true });
  // Alcuni ambienti hanno un Chromium già installato a una versione diversa da
  // quella che si aspetta il pacchetto playwright. CHROMIUM_PATH, o --chromium,
  // evitano di riscaricare un browser.
  const exe = process.env.CHROMIUM_PATH || arg('chromium', null)
    || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : null);
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const targets = [...ROUTES, ...STATES].filter((t) => !ONLY || t.path === ONLY || t.slug === ONLY);
  const results = [];

  for (const t of targets) {
    for (const size of WIDTHS) {
      try {
        const r = await shoot(browser, t, size);
        results.push({ slug: `${t.slug}--${size.label}`, ...r });
        console.log(`  ${r.file}  ${r.hash}${r.fontsOk ? '' : '  ⚠ FONT NON CARICATI'}${r.errors.length ? `  ⚠ ${r.errors.length} errori console` : ''}`);
      } catch (e) {
        console.log(`  ✗ ${t.slug} ${size.label}: ${e.message}`);
      }
    }
  }
  await browser.close();

  // Il controllo byte-per-byte: due stati che devono differire e non differiscono
  // significa che uno dei due non ha renderizzato. Errore silenzioso, altrimenti
  // invisibile.
  const byHash = new Map();
  for (const r of results) {
    const seen = byHash.get(r.hash);
    if (seen) console.log(`\n✗ IDENTICI: ${seen} e ${r.slug} — uno dei due non ha renderizzato`);
    else byHash.set(r.hash, r.slug);
  }

  await writeFile(`${OUT}/manifest.json`, JSON.stringify(results, null, 2));
  console.log(`\n${results.length} scatti in ${OUT}/`);
};

main();
