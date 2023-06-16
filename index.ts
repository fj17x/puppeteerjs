import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

interface Post {
  title: string;
  link: string | null;
}

async function main() {
  const chromiumPath = path.join('chrome-win', 'chrome.exe');
  const browser = await puppeteer.launch({
    executablePath: chromiumPath,
  });
  const page: any = await browser.newPage();
  await page.goto('http://www.reddit.com');

  // Extract data from Reddit's top posts
  const postElements: any[] = await page.$$('div[data-testid="post-container"]');
  const posts: Post[] = [];

  for (const postElement of postElements) {
    const titleElement: any = await postElement.$('h3');
    const title: string = await page.evaluate((element: any) => element.textContent.trim(), titleElement);

    const linkElement: any = await postElement.$('a[data-click-id="body"]');
    const link: string | null = linkElement
      ? await page.evaluate((element: any) => {
          const href = element.getAttribute('href');
          const dataUrl = element.getAttribute('data-url');
          return dataUrl || href || null;
        }, linkElement)
      : null;

    posts.push({ title, link });
  }

  // Save data to post.json
  const jsonData: string = JSON.stringify(posts, null, 2);
  fs.writeFileSync('post.json', jsonData);

  await browser.close();
}

main();