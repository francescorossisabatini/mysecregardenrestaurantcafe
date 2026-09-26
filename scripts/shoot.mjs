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


// Fixture del menu del giorno.
// La edge function Supabase non è raggiungibile da questo ambiente, quindi
// senza questa il menu ha SEMPRE lo stato "non ancora aggiornato" e le card
// piatto — cioè, secondo il direction lock, la cosa che porta la pagina —
// non sono mai state viste da nessuno.
// L'orologio viene fissato a un mercoledì alle 12:30: di domenica il
// componente mostra comunque il messaggio di chiusura.
const MENU_FIXTURE_DAY = { de: 'Mittwoch', en: 'Wednesday' };
const MENU_FIXTURE_TIME = new Date('2026-09-16T12:30:00+02:00');
const MENU_FIXTURE = {
  success: true,
  loadedAt: '2026-09-16T08:40:00+02:00',
  data: {
    period: '14.–19. September 2026',
    days: [
      {
        day: MENU_FIXTURE_DAY,
        soup: {
          de: 'Kürbiscremesuppe. Mit gerösteten Kernen und einem Löffel Sauerrahm.',
          en: 'Pumpkin cream soup. With roasted seeds and a spoon of sour cream.',
        },
        soupMeta: { allergens: ['G', 'A'] },
        green: {
          de: 'Alpenpolenta mit Bergkäse und Schwammerln. Langsam gerührt, Bergkäse aus Vorarlberg, Schwammerl aus dem Waldviertel, dazu ein kleiner Salat vom Markt.',
          en: 'Alpine polenta with mountain cheese and mushrooms. Slowly stirred, cheese from Vorarlberg, mushrooms from the Waldviertel, with a small market salad.',
        },
        greenMeta: { allergens: ['G'] },
        blue: {
          de: 'Korean Bowl, vegan. Reis, eingelegtes Gemüse, Sesam, Gochujang.',
          en: 'Korean bowl, vegan. Rice, pickled vegetables, sesame, gochujang.',
        },
        blueMeta: { allergens: ['F', 'N'] },
      },
      {
        day: { de: 'Donnerstag', en: 'Thursday' },
        soup: { de: 'Linsensuppe. Mit Zitrone und Kreuzkümmel.', en: 'Lentil soup. With lemon and cumin.' },
        green: { de: 'Gemüsestrudel. Mit Salat.', en: 'Vegetable strudel. With salad.' },
        blue: { de: 'Dal mit Reis, vegan. Mit Koriander.', en: 'Dal with rice, vegan. With coriander.' },
      },
    ],
  },
};

const routeMenuFixture = async (page) => {
  const fulfil = (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' },
      body: JSON.stringify(MENU_FIXTURE),
    });
  await page.route('**/functions/v1/**', fulfil);
  await page.route('**/rest/v1/**', fulfil);
};

// Stati che non si vedono navigando: vanno forzati.
const STATES = [
  {
    slug: 'home--menu-pieno',
    path: '/',
    setup: async (page) => {
      await page.clock.setFixedTime(MENU_FIXTURE_TIME);
      await routeMenuFixture(page);
    },
  },
  {
    slug: 'menu--pieno',
    path: '/menu',
    setup: async (page) => {
      await page.clock.setFixedTime(MENU_FIXTURE_TIME);
      await routeMenuFixture(page);
    },
  },
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
    // Dal 26/09/2026 la lingua la decide solo l'URL (src/lib/i18nRoutes.ts):
    // la vecchia chiave 'preferred_language' non fa più niente, e lo scatto
    // usciva identico a quello tedesco.
    path: '/en',
    setup: async () => {},
  },
  {
    // Livello 3 del rilevamento lingua: dispositivo non tedesco, nessuna
    // scelta salvata → pulsante "EN" nella top bar mobile. Con de-AT non
    // compare, quindi senza questo stato non verrebbe mai fotografato.
    slug: 'home--dispositivo-it',
    path: '/',
    locale: 'it-IT',
    setup: async () => {},
  },
  {
    slug: 'menu--dispositivo-it',
    path: '/menu',
    locale: 'it-IT',
    setup: async (page) => {
      await page.clock.setFixedTime(MENU_FIXTURE_TIME);
      await routeMenuFixture(page);
    },
  },
  {
    slug: 'menu--vuoto',
    path: '/menu',
    setup: async (page) => {
      // Stessa cosa di 'home--menu-vuoto', ma sulla pagina /menu: qui la
      // sezione ha anche i tab (Heute/Diese Woche/Immer da), che spariscono
      // insieme al menu settimanale — è lo stato che ha lasciato il vuoto
      // verticale corretto nel giro 2 della critica.
      await page.route('**/docs.google.com/**', (r) => r.abort());
      await page.route('**/functions/v1/**', (r) => r.abort());
      await page.route('**/rest/v1/**', (r) => r.abort());
    },
  },
];

const hashOf = (buf) => createHash('sha1').update(buf).digest('hex').slice(0, 12);

async function shoot(browser, { path, slug, setup, locale = 'de-AT' }, size) {
  const context = await browser.newContext({
    viewport: { width: size.w, height: size.h },
    deviceScaleFactor: 2,
    isMobile: size.mobile,
    hasTouch: size.mobile,
    reducedMotion: 'reduce', // le animazioni di ingresso falsano lo scatto
    locale,
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
