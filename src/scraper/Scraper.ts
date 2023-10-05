import { PlaywrightCrawler, Dataset } from "crawlee";
import { varient, specification, scrapedData } from "../interfaces/scraper";

export const Scrape = async (urls: string[]) => {
  let data: scrapedData;

  const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page, parseWithCheerio }) => {
      const dataset = await Dataset.open("ProductData");
      // const title = await page.title();
      await page.waitForSelector('div[class="images-view-wrap"]');

      // Currently Not working, Will work on it later.

      // const button = await page.$(
      //   'button[class="comet-v2-btn comet-v2-btn-slim comet-v2-btn-large specification--btn--CXRSSZD comet-v2-btn-important"]'
      // );

      // // if (button) {
      // //   await button.click();
      // // }

      const $ = await parseWithCheerio();

      const productTitle = $(".pdp-info-right>.title--wrap--Ms9Zv4A>h1").text();
      const images: string[] = [];
      const varients: varient[] = [];
      const sellPoints: string[] = [];
      const specifications: specification[] = [];

      // Image Collections.

      //@ts-ignore
      $(".images-view-list>li>.images-view-item").each((i, el) => {
        const link = $(el).find("img").attr("src");
        if (link) {
          images.push(link);
        }
      });

      // Varients Collection.

      // Checks how many types of Varients the Product has.

      const skuProperty = $(".sku-item--wrap--PyDVB9w").children().length;

      // If the Product has only a single type of Varients, Then It will just collect the varients.
      if (skuProperty === 1) {
        $(".sku-item--skus--MmsF8fD")
          .children()
          //@ts-ignore
          .each((i, el) => {
            const image = $(el).hasClass("sku-item--image--mXsHo3h");
            const text = $(el).hasClass("sku-item--text--s0fbnzX");

            if (image) {
              const varient = {
                model: $(el).find("img").attr("alt"),
                image: $(el).find("img").attr("src"),
              };

              if (varient.model) {
                varients.push(varient);
              }
            } else if (text) {
              const varient = {
                model: $(el).attr("title"),
              };

              if (varient.model) {
                varients.push(varient);
              }
            }
          });
      }
      // If There are more than 1 Type of Varients, Then it will Collect the varients and then combine the different types of varients
      else if (skuProperty === 2) {
        // Global Variables for each of the properties.
        const colors: varient[] = [];
        const FinalVarients: varient[] = [];

        // Collect the First sets of Varients and store them as Colors.
        $(".sku-item--wrap--PyDVB9w")
          .children()
          .first()
          .find(".sku-item--skus--MmsF8fD")
          .children()
          //@ts-ignore
          .each((i, el) => {
            const image = $(el).hasClass("sku-item--image--mXsHo3h");
            const text = $(el).hasClass("sku-item--text--s0fbnzX");

            if (image) {
              colors.push({
                model: $(el).find("img").attr("alt"),
                image: $(el).find("img").attr("src"),
              });
            } else if (text) {
              colors.push({
                model: $(el).attr("title"),
              });
            }
          });

        // Collect the second sets of varients and then combine them with the first set of varients.
        $(".sku-item--wrap--PyDVB9w")
          .children()
          .last()
          .find(".sku-item--skus--MmsF8fD")
          .children()
          //@ts-ignore
          .each((i, el) => {
            const type = $(el).attr("title");

            colors.forEach((color) => {
              FinalVarients.push({
                ...color,
                type,
              });
            });
          });

        // Push the finalized Varients to the Varients Array.
        varients.push(...FinalVarients);
      }
      //End of Varients Collections
      //@ts-ignore
      $(".seo-sellpoints--sellerPoint--bfm7Az1>li").each((i, el) => {
        const point = $(el).find("pre").text();

        if (point) {
          sellPoints.push(point);
        }
      });

      // Collect Product Specifications.

      $(
        ".specification--list--fiWsSyv>.specification--line--iUJOqof>.specification--prop--RejitI8"
        //@ts-ignore
      ).each((i, el) => {
        const specification = {
          category: $(el).find(".specification--title--UbVeyic span").text(),
          value: $(el).find(".specification--desc--Mz148Bl span").text(),
        };

        // Push the Object into the Specification Array.
        if (specification.category && specification.value) {
          specifications.push(specification);
        }
      });

      // Save the Data into the DataSet as JSON.

      // await dataset.pushData({
      //   productTitle,
      //   images,
      //   varients,
      //   specifications,
      //   sellPoints,
      // });

      // await dataset.exportToJSON("productData");
      data = {
        productTitle,
        images,
        varients,
        specifications,
        sellPoints,
      };
    },
  });

  await crawler.run(urls);
  //@ts-ignore
  return data;
};
