import { Scrape } from "./scraper/Scraper.ts";
import { getImages } from "./utils/getImages.ts";
import { data } from "./temp/data.ts";
import { getDirname } from "./utils/dirname.ts";

// await Scrape([
//   "https://www.aliexpress.com/i/4000020773151.html",
//   "https://www.aliexpress.com/item/1005004733438530.html",
//   "https://www.aliexpress.com/item/4001001120985.html",
//   "https://www.aliexpress.com/item/1005006058157291.html",
//   "https://www.aliexpress.com/item/1005004619487534.html",
//   "https://www.aliexpress.com/item/1005006063678919.html",
// ]);

getImages(data.images);

// process.exit();
