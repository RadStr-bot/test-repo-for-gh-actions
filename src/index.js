
const puppeteer = require('puppeteer')
const path = require('path');
const fs = require('fs');
try {
  console.info("Starting puppeteer");
  (async () => {
    // https://stackoverflow.com/questions/62228154/puppeteer-fails-to-initiate-in-github-actions
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        `--no-sandbox`,
        `--disable-setuid-sandbox`
      ],
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('http://localhost:5173/diagram')

    // Define the download path
    const downloadPath = path.resolve("./..", "downloads");
    fs.mkdirSync(downloadPath, { recursive: true });
    console.info("Download path", downloadPath);

    // Set Chromium's download behavior
    await page._client().send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath,
    });

    await page.click('[title="Generate DSV (application profile)"]')
    console.info("DSV downloaded");
    await page.close();
    await browser.close();
  })()
} catch (err) {
  console.error(err)
}
