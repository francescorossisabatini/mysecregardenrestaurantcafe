import { chromium } from "playwright";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }).catch(() => chromium.launch());
const shots = [
  ["it-IT", "/", "home-it-hero"], ["it-IT", "/menu", "menu-it"], ["de-AT", "/menu", "menu-de"], ["it-IT", "/en/menu", "menu-en-after"],
];
for (const [locale, path, name] of shots) {
  const c = await b.newContext({ locale, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const p = await c.newPage();
  await p.goto("http://127.0.0.1:8099" + path);
  await p.waitForLoadState("networkidle").catch(() => {});
  await p.waitForTimeout(800);
  await p.screenshot({ path: `output/i18n-shots/${name}.png`, clip: { x: 0, y: 0, width: 390, height: 240 } });
  await c.close();
}
await b.close();
console.log("shots ok");
