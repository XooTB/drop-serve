import { uid } from "uid";
import path from "node:path";
import { Scrape } from "./scraper/Scraper.js";
import { data } from "./temp/data.js";
import { getDirname } from "./utils/dirname.js";
import { imageHandler } from "./handlers/handleImages.js";
import VarientsHandler from "./handlers/Varients.js";
import Ai from "./handlers/Ai.js";

// Globals
const __dirname = getDirname(import.meta.url);
const imageFolder = path.resolve(__dirname, "images");

const main = async (url: string, keywords?: string[]) => {
  // Get the data from AliExpress
  const data = await Scrape([url]);
  if (!data) {
    throw Error("Something went wrong with the scraper. Please try again.");
  }
  // Initialize all functions and Handlers.
  const id = uid(5);
  const IH = new imageHandler(id, imageFolder);
  const AI = new Ai();
  const titleKeywords = data?.productTitle.split(" ");
  const Ckeywords = [...titleKeywords];
  if (keywords) {
    Ckeywords.push(...keywords);
  }
  const VH = new VarientsHandler(IH, Ckeywords);

  // Generate the new Title for the Product.
  const title = await AI.generateTitle(data?.productTitle, Ckeywords);

  // Download the Product Images. And Upload them to the Bucket.
  await IH.saveImages(data?.images);
  const images = await IH.uploadImages(Ckeywords);

  // Rename the varient Images and Upload them to the Bucket.
  const varients = await VH.handleVarients(data?.varients);

  // Return the Collected Data.
  return {
    title,
    images,
    varients,
  };
};

// await main("https://www.aliexpress.com/i/4000020773151.html");

export default main;

// await Scrape([
//   "https://www.aliexpress.com/i/4000020773151.html",
//   "https://www.aliexpress.com/item/1005004733438530.html",
//   "https://www.aliexpress.com/item/4001001120985.html",
//   "https://www.aliexpress.com/item/1005006058157291.html",
//   "https://www.aliexpress.com/item/1005004619487534.html",
//   "https://www.aliexpress.com/item/1005006063678919.html",
// ]);

// process.exit();
