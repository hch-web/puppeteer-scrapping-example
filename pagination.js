import puppeteer from "puppeteer";
import fs from "fs";

const getBooks = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("http://books.toscrape.com/");

  const data = [];

  while (true) {
    const books = await page.evaluate(() => {
      const booksList = document.querySelectorAll(".product_pod");

      return Array.from(booksList).map((book) => {
        const image = book.querySelector(".image_container img").src;
        const title = book.querySelector("h3 a").title;
        const price = book.querySelector(
          ".product_price .price_color"
        ).innerText;

        return { image, title, price };
      });
    });

    data.push(...books);

    fs.writeFile("books.json", JSON.stringify(data), (err) => {
      console.log(err);
    });

    const nextPageButton = await page.$(".pager .next a");

    console.log(nextPageButton);

    if (nextPageButton) {
      await nextPageButton.click();
      await page.waitForNavigation();
    } else {
      break;
    }
  }

  console.log(data.length);

  await browser.close();
};

getBooks();
