import ExifTransformer from "exif-be-gone";
import * as fs from "node:fs";
import path from "node:path";

export const cleanImage = (
  imagePath: string,
  outputFolder: string,
  ouputName: string
) => {
  const reader = fs.createReadStream(imagePath);
  const writer = fs.createWriteStream(
    `${path.resolve(outputFolder, ouputName)}`
  );
  reader.pipe(new ExifTransformer()).pipe(writer);
};
