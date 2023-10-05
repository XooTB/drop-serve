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

const main = async (url: string) => {
  const data = await Scrape([url]);
  const id = uid(5);
  const IH = new imageHandler(id, imageFolder);
  const AI = new Ai();
  const titleKeywords = data?.productTitle.split(" ");
  const keywords = [
    "Long Sleeve",
    "Mini skirt",
    "Women's",
    "Dress",
    "TurtleNeck",
    ...titleKeywords,
  ];
  const VH = new VarientsHandler(IH, keywords);

  const title = await AI.generateTitle(data?.productTitle);

  await IH.saveImages(data?.images);
  const images = await IH.uploadImages(keywords);

  const varients = await VH.handleVarients(data?.varients);

  return {
    title,
    images,
    varients,
  };
};

// await main("https://www.aliexpress.com/i/4000020773151.html");

export default main;
// const info = await uploadImage(imageFolder, "image3.jpeg");
// console.log(info);

// await Scrape([
//   "https://www.aliexpress.com/i/4000020773151.html",
//   "https://www.aliexpress.com/item/1005004733438530.html",
//   "https://www.aliexpress.com/item/4001001120985.html",
//   "https://www.aliexpress.com/item/1005006058157291.html",
//   "https://www.aliexpress.com/item/1005004619487534.html",
//   "https://www.aliexpress.com/item/1005006063678919.html",
// ]);

// getImages(data.images, imageFolder);

// cleanImage(imageFolder + "/productImages/image0.jpeg",);

// process.exit();
