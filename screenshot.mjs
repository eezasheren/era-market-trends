import puppeteer from 'puppeteer'
import { writeFileSync } from 'fs'

const OUT = '/Users/rakeezasheren/Downloads/ERA-Screenshots'
const BASE = 'http://localhost:5174'
const W = 430
const H = 932

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
})

async function shot(page, name, delay = 800) {
  await new Promise(r => setTimeout(r, delay))
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false })
  console.log(`✓ ${name}`)
}

const page = await browser.newPage()
await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 })

// --- AI Insights tabs ---
for (const [tab, file] of [
  ['Forecast', 'ai-insights-forecast'],
  ['Performance', 'ai-insights-performance'],
  ['Client Match', 'ai-insights-clientmatch'],
]) {
  await page.goto(`${BASE}/insights`, { waitUntil: 'networkidle0' })
  await page.waitForSelector('button', { timeout: 5000 })
  await page.evaluate((t) => {
    const btn = [...document.querySelectorAll('header button')].find(b => b.textContent.trim() === t)
    btn && btn.click()
  }, tab)
  await shot(page, file)
}

// --- Chart screen: select 3 districts then generate ---
await page.goto(`${BASE}/trends/results`, { waitUntil: 'networkidle0' })
await page.waitForSelector('main .space-y-3 > button', { timeout: 5000 })
const cards = await page.$$('main .space-y-3 > button')
await cards[0].click()
await cards[1].click()
await cards[2].click()
await new Promise(r => setTimeout(r, 300))
await page.evaluate(() => {
  const b = [...document.querySelectorAll('button')].find(x => x.textContent.includes('Generate Comparison'))
  b && b.click()
})
await shot(page, 'trends-chart', 1500)

// --- Chart export dropdown open ---
await page.evaluate(() => {
  const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Export')
  b && b.click()
})
await shot(page, 'trends-chart-export', 500)

await browser.close()
console.log('\nAll done! Files saved to', OUT)
