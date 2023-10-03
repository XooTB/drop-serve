import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import spacesClient from "../database/spacesClient.ts";

export const listBuckets = async () => {
  try {
    const data = await spacesClient.send(new ListBucketsCommand({}));
    console.log("Sucess", data.Buckets);
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
