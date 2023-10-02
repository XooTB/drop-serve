import axios from "axios";
import * as fs from "node:fs";
import path from "node:path";

const downloadImage = async (
  url: string,
  i: number,
  location: string,
  extra?: string
) => {
  const fileLocation = path.resolve(
    location,
    extra ? extra : "",
    `image${i}.jpeg`
  );
  await axios({
    method: "get",
    url: url,
    responseType: "stream",
  }).then(function (response) {
    response.data.pipe(fs.createWriteStream(fileLocation));
  });
};

export const extractImageUrl = (url: string) => {
  const link: string = url.replace(/\.jpg.*/, ".jpg");
  return link;
};

export const getImages = async (links: string[], path: string) => {
  links.forEach((link, i) => downloadImage(extractImageUrl(link), i, path));
};
