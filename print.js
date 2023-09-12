import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://bes-software.beyonderissolutions.com/auth/login");
  await page.waitForSelector("input[name=email]");

  await page.type("input[name=email]", "qa.beyonderissolutions@gmail.com");
  await page.type("input[name=password]", "Asdf1122");
  await page.click("button[type=submit]");

  await page.waitForNavigation();

  setTimeout(async () => {
    await page.close();
  }, 5000)
})();
