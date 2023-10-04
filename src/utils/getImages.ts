import axios from "axios";
import * as fs from "node:fs";
import path from "node:path";
import ExifTransformer from "exif-be-gone";
import { pipeline } from "node:stream/promises";

// Extract the Image Url from the provided Links.
export const extractImageUrl = (url: string) => {
  const link: string = url.replace(/\.jpg.*/, ".jpg");
  return link;
};

// Download Images and Save them to folder
// const downloadImage = async (
//   url: string,
//   i: number,
//   location: string,
//   extra?: string
// ) => {
//   const fileLocation = path.resolve(
//     location,
//     extra ? extra : "",
//     `image${i}.jpeg`
//   );
//   await axios({
//     method: "get",
//     url: url,
//     responseType: "stream",
//   }).then(function (response) {
//     response.data
//       .pipe(new ExifTransformer())
//       .pipe(fs.createWriteStream(fileLocation));
//   });
// };

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
