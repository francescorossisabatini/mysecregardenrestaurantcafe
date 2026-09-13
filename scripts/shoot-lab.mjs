// shoot-lab.mjs — fotografa ogni esperimento del banco, prima e dopo.
// Stessa logica font di shoot.mjs: senza i font veri gli scatti non valgono.
//
//   npx vite --host 127.0.0.1 --port 8080     (in un altro terminale)
//   node scripts/shoot-lab.mjs

import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname } from 'node:path';

const BASE = process.env.LAB_BASE || 'http://127.0.0.1:8080';
const OUT = 'output/lab';

// L'elenco sta nel registro; qui basta id e larghezze da fotografare.
const SHOTS = [
  { exp: 'subgrid', widths: [390, 1100] },
  { exp: 'has', widths: [1100] },
  { exp: 'container-queries', widths: [1100] },
  { exp: 'text-pretty', widths: [390, 700] },
  { exp: 'starting-style', widths: [560] },
];

const main = async () => {
  await mkdir(OUT, { recursive: true });
  const exe = process.env.CHROMIUM_PATH
    || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});

  for (const { exp, widths } of SHOTS) {
    for (const w of widths) {
      for (const variant of ['before', 'after']) {
        const ctx = await browser.newContext({
          viewport: { width: w, height: 900 },
          deviceScaleFactor: 2,
          reducedMotion: 'reduce',
          locale: 'de-AT',
        });
        if (existsSync('output/fonts/fonts.css')) {
          await ctx.route('**/fonts.googleapis.com/**', (r) =>
            r.fulfill({ contentType: 'text/css', body: readFileSync('output/fonts/fonts.css', 'utf8') }));
          await ctx.route('**/__fonts/*', (r) => {
            const n = r.request().url().split('/__fonts/')[1];
            const p = `output/fonts/${n}`;
            if (!existsSync(p)) return r.abort();
            return r.fulfill({ contentType: extname(p) === '.woff2' ? 'font/woff2' : 'font/woff', body: readFileSync(p) });
          });
        }
        const page = await ctx.newPage();
        await page.goto(`${BASE}/lab.html?exp=${exp}&variant=${variant}`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
        const file = `${OUT}/${exp}--${w}--${variant}.png`;
        await writeFile(file, await page.screenshot({ fullPage: true }));
        console.log(`  ${file}`);
        await ctx.close();
      }
    }
  }
  await browser.close();
  console.log(`\nFatto. Confronta le coppie in ${OUT}/`);
};

main();
