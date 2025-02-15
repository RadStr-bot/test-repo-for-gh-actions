/**
 * @name Amazon search
 *
 * @desc Looks for a "nyan cat pullover" on amazon.com, goes two page two clicks the third one.
 */
const puppeteer = require('puppeteer')
try {
  console.info("Starting puppeteer");
  (async () => {
    // https://stackoverflow.com/questions/62228154/puppeteer-fails-to-initiate-in-github-actions
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('http://localhost:5173/diagram')

    await page.click('[title="Generate DSV (application profile)"]')
    console.log('See screenshot: ' + screenshot)
  })()
} catch (err) {
  console.error(err)
}
