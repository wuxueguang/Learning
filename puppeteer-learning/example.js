const puppeteer = require('puppeteer');
 
(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto('https://cn.bing.com/');
  
  await page.screenshot({path: 'baidu.png'});
 
  await browser.close();
})();
