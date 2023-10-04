import { getImages } from "../utils/getImages.ts";
import { cleanImage } from "../utils/imageCleaner.ts";
import Bucket from "./Bucket.ts";
import path from "path";
import * as fs from "node:fs";
import Ai from "./Ai.ts";

// const handleImages = async (imageUrls: string[], folder: string) => {
//   const outputFolder = path.resolve(folder, "cleanedImages");
//   const productImages = path.resolve(folder, "productImages");
//   const images = await getImages(imageUrls, folder);
// };

export class imageHandler {
  id: string;
  imageFolder: string;
  jobFolder: string;
  bucket: Bucket;
  AI: Ai;

  constructor(id: string, imageFolder: string) {
    this.id = id;
    this.imageFolder = imageFolder;
    this.bucket = new Bucket();
    this.AI = new Ai();

    //Create the Job Directory.
    fs.mkdirSync(`${imageFolder}/${id}`, { recursive: true });
    this.jobFolder = `${imageFolder}/${id}`;
  }

  async saveImages(urls: string[]) {
    await getImages(urls, this.jobFolder);
  }

  async uploadImages(keywords: string[]) {
    const urls: string[] = [];
    const images = fs.readdirSync(this.jobFolder);
    const titles = await this.AI.generateImageTitle(keywords, images.length);

    for (let [i, image] of images.entries()) {
      const imagePath = path.resolve(this.jobFolder, image);

      let url = await this.bucket.uploadImage(imagePath, titles[i] + ".jpeg");

      if (url) {
        urls.push(url);
      }
    }

    return urls;
  }
}
