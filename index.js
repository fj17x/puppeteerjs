const puppeteer = require("puppeteer")

async function main() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto("http://www.reddit.com")

  await page.screenshot({ path: "sc.png" })

  await browser.close()
}

main()
