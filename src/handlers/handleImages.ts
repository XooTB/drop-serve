import { getImages, getVarientImage } from "../utils/getImages.js";
import { cleanImage } from "../utils/imageCleaner.js";
import Bucket from "./Bucket.js";
import path from "path";
import * as fs from "node:fs";
import Ai from "./Ai.js";
import { varient } from "../interfaces/scraper.js";
import Cloud from "./Cloudinary.js";

export class imageHandler {
  id: string;
  imageFolder: string;
  jobFolder: string;
  varientFolder: string;
  bucket: Bucket;
  AI: Ai;
  cloud: Cloud;

  constructor(id: string, imageFolder: string) {
    this.id = id;
    this.imageFolder = imageFolder;
    this.bucket = new Bucket();
    this.AI = new Ai();
    this.cloud = new Cloud();

    //Create the Job Directory.
    fs.mkdirSync(`${imageFolder}/${id}`, { recursive: true });
    this.jobFolder = `${imageFolder}/${id}`;

    //Create the Varients Directory.
    fs.mkdirSync(`${imageFolder}/${id}/varients`, { recursive: true });
    this.varientFolder = `${imageFolder}/${id}/varients`;
  }

  // Download the Product Images.
  async saveImages(urls: string[]) {
    await getImages(urls, this.jobFolder);
  }

  // Download the Varient Images.
  async saveVarientImage(varient: varient) {
    const imageName = path.resolve(
      this.varientFolder,
      `varient_${varient.model}_${varient.type}`
    );

    //@ts-ignore
    await getVarientImage(varient.image, this.varientFolder, imageName);

    return `${imageName}.jpeg`;
  }

  // Upload the Product Images to S3 Bucket.
  async uploadImages(keywords: string[]) {
    const urls: string[] = [];
    const images = fs.readdirSync(this.jobFolder);
    images.pop();
    const titles = await this.AI.generateImageTitle(keywords, images.length);

    for (let [i, image] of images.entries()) {
      const imagePath = path.resolve(this.jobFolder, image);

      // let url = await this.bucket.uploadImage(imagePath, titles[i] + ".jpeg");

      let url = await this.cloud.uploadImage(imagePath, titles[i] + ".jpeg");

      if (url) {
        urls.push(url);
      }
    }

    return urls;
  }

  async uploadVarientImage(image: string, title: string) {
    const imagePath = path.resolve(this.varientFolder, image);

    // const url = await this.bucket.uploadImage(imagePath, `${title}.jpeg`);

    let url = await this.cloud.uploadImage(imagePath, `${title}.jpeg`);

    return url;
  }
}
