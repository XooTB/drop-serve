import spacesClient from "../database/spacesClient.ts";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as fs from "node:fs";
import path from "node:path";

const bucketParams = {
  Bucket: "Images",
  Key: "image0.jpeg",
  body: "content",
};

export const uploadImage = async (imageFolder: string, imageName: string) => {
  const imagePath = path.resolve(imageFolder, "productImages", imageName);
  const blob = fs.readFileSync(imagePath);

  try {
    await spacesClient.send(
      new PutObjectCommand({
        Bucket: "Images",
        Key: imageName,
        Body: blob,
        ACL: "public-read",
      })
    );

    const url = await getSignedUrl(
      spacesClient,
      new GetObjectCommand({ Bucket: "Images", Key: imageName })
    );

    return url;
  } catch (error) {
    console.log(error);
    return false;
  }
};
