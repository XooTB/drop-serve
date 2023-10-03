import { getImages } from "../utils/getImages.ts";
import { cleanImage } from "../utils/imageCleaner.ts";
import path from "path";
import * as fs from "node:fs";

const handleImages = async (imageUrls: string[], folder: string) => {
  const outputFolder = path.resolve(folder, "cleanedImages");
  const productImages = path.resolve(folder, "productImages");
  const images = await getImages(imageUrls, folder);
};

class imageHandler {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
