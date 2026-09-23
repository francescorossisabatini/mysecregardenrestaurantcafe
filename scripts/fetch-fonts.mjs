// fetch-fonts.mjs — scarica una volta i font di Google Fonts in locale.
//
// Serve a shoot.mjs: nel container il browser degli screenshot non arriva a
// fonts.googleapis.com, quindi ogni scatto usciva con i fallback di sistema.
// Giudicare la tipografia su Brush Script MT al posto di Caveat non è giudicare.
//
//   node scripts/fetch-fonts.mjs
//
// Output in output/fonts/ (gitignorato). I .woff2 qui dentro sono anche
// esattamente quello che servirebbe per self-hostare i font in produzione:
// vedi la proposta GDPR in docs/ux/divergence-ledger.md.

import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const OUT = 'output/fonts';

// La stessa URL che sta in index.html. Se lì cambia, cambia anche qui.
const CSS_URL =
  'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Cormorant+Garamond:wght@400;500;600;700&family=Lora:wght@400;600;700&family=Work+Sans:wght@300;400;500;600&display=swap';

// Con uno UA da Chrome moderno Google restituisce woff2 con unicode-range.
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const curl = async (url) => {
  const { stdout } = await run('curl', ['-sSL', '-A', UA, url], {
    maxBuffer: 32 * 1024 * 1024,
    encoding: 'buffer',
  });
  return stdout;
};

const main = async () => {
  await mkdir(OUT, { recursive: true });

  console.log('CSS...');
  let css = (await curl(CSS_URL)).toString('utf8');

  const urls = [...new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((m) => m[1]))];
  console.log(`${urls.length} file font`);

  let done = 0;
  for (const url of urls) {
    const name = url.split('/').slice(-3).join('-');
    const path = `${OUT}/${name}`;
    try {
      await access(path);
    } catch {
      await writeFile(path, await curl(url));
    }
    css = css.split(url).join(`/__fonts/${name}`);
    done++;
    if (done % 20 === 0) console.log(`  ${done}/${urls.length}`);
  }

  await writeFile(`${OUT}/fonts.css`, css);
  console.log(`\nPronti in ${OUT}/ — ${urls.length} file + fonts.css`);
};

main().catch((e) => {
  console.error('Fallito:', e.message);
  console.error('I font restano quelli di fallback: gli scatti non valgono per la tipografia.');
  process.exit(1);
});
