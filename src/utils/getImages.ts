import axios from "axios";
import * as fs from "node:fs";
import path from "node:path";
import ExifTransformer from "exif-be-gone";
import { pipeline } from "node:stream/promises";
import { varient } from "../interfaces/scraper";

// Extract the Image Url from the provided Links.
export const extractImageUrl = (url: string) => {
  const link: string = url.replace(/\.jpg.*/, ".jpg");
  return link;
};

//The Main Function to handle everything.
export const getImages = async (
  links: string[],
  folder: string,
  extra?: string
) => {
  for (const [i, link] of links.entries()) {
    const fileLocation = path.resolve(
      folder,
      extra ? extra : "",
      `image${i}.jpeg`
    );

    const response = await axios({
      method: "get",
      url: extractImageUrl(link),
      responseType: "stream",
    });

    await pipeline(
      response.data,
      new ExifTransformer(),
      fs.createWriteStream(fileLocation)
    );
  }
};

export const getVarientImage = async (
  url: string,
  folder: string,
  name: string
) => {
  const fileLocation = path.resolve(folder, `${name}.jpeg`);

  const response = await axios({
    method: "get",
    url: extractImageUrl(url),
    responseType: "stream",
  });

  await pipeline(
    response.data,
    new ExifTransformer(),
    fs.createWriteStream(fileLocation)
  );
};
