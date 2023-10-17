import path from "node:path";
import { Scrape } from "./scraper/Scraper.js";
import { data } from "./temp/data.js";
import { getDirname } from "./utils/dirname.js";
import { imageHandler } from "./handlers/handleImages.js";
import VarientsHandler from "./handlers/Varients.js";
import Ai from "./handlers/Ai.js";
import { dataType } from "./interfaces/data.js";
import getDateTime from "./utils/getTime.js";
import DBHandler from "./handlers/DB.js";

// Globals
const __dirname = getDirname(import.meta.url);
const imageFolder = path.resolve(__dirname, "images");

const main = async (id: string, url: string, keywords?: string[]) => {
  // Initialize the Job ID.
  console.log(`Started the Job. ID: ${id}, Time: ${getDateTime()}`);

  // Get the data from AliExpress
  const data = await Scrape(url, id);

  //If there's no data, Then throw the below error.
  if (!data) {
    throw Error("Something went wrong with the scraper. Please try again.");
  }
  console.log(
    `Successfully Scraped the product. ID: ${id}, Time: ${getDateTime()}`
  );

  // Initialize all functions and Handlers.
  const IH = new imageHandler(id, imageFolder);
  const DB = new DBHandler();
  const AI = new Ai();
  const titleKeywords = data?.productTitle.split(" ");
  const Ckeywords = [...titleKeywords];

  // The Result Object.
  const result: dataType = {
    title: "",
    url,
    images: [],
    varients: [],
    specifications: data.specifications,
  };

  // If there are any Keywords provided by the User, Then add them to the Array.
  if (keywords) {
    Ckeywords.push(...keywords);
  }

  // Intantiate the Varients Handler.
  const VH = new VarientsHandler(IH, Ckeywords);

  // Generate the new Title for the Product.
  result.title = await AI.generateTitle(data?.productTitle, Ckeywords);

  // Download the Product Images. And Upload them to the Bucket.
  await IH.saveImages(data?.images);
  result.images = await IH.uploadImages(Ckeywords);

  // If there are any Varients, Then process their images and add them to the result Object.
  if (data.varients.length > 0) {
    result.varients = await VH.handleVarients(data?.varients);
  }

  // Return the Collected Data.
  console.log(
    `Successfully finished everything. Adding the data to the DataBase. ID: ${id}, Time: ${getDateTime()}`
  );

  const jobData = await DB.addJobData(id, result);

  if (jobData) {
    await DB.setJobStatus(id, "FINISHED");
  }

  console.log(`Finished the Job. ID: ${id}, Time: ${getDateTime()}`);
};

// await main("test", "https://www.aliexpress.com/i/4000020773151.html");

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
