import { CreateBucketCommand } from "@aws-sdk/client-s3";
import spacesClient from "../database/spacesClient.ts";

export const createBucket = async () => {
  try {
    const data = await spacesClient.send(
      new CreateBucketCommand({ Bucket: "Images" })
    );
    console.log("Success", data.Location);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
