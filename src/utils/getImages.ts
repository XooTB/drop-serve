import axios from "axios";
import * as fs from "node:fs";
import path from "node:path";
import { getDirname } from "./dirname.ts";

const __dirname = getDirname(import.meta.url);

const downloadImage = async (url: string, i: number) => {
  const location = path.resolve(__dirname, "images", `image${i}.jpeg`);
  await axios({
    method: "get",
    url: url,
    responseType: "stream",
  }).then(function (response) {
    response.data.pipe(fs.createWriteStream(location));
  });
};

export const getImages = async (links: string[]) => {
  links.forEach((link, i) => downloadImage(link, i));
};
