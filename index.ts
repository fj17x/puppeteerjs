const puppeteer = require('puppeteer-core')
const path = require('path')

async function main(){

	const chromiumPath =path.join("chrome-win","chrome.exe");

	const browser= await puppeteer.launch({
		executablePath: chromiumPath
	})
	const page=await browser.newPage()
	await page.goto('http://www.reddit.com')

	await page.screenshot({path:'sc.png'})

	await browser.close()

}

main()