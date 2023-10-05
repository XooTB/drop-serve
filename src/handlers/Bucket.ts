import path from "path";
import * as fs from "node:fs";
import { S3 } from "@aws-sdk/client-s3";
import spacesClient from "../database/spacesClient.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  CreateBucketCommand,
  PutObjectCommand,
  GetObjectCommand,
  ListBucketsCommand,
} from "@aws-sdk/client-s3";

// Bucket Class

class Bucket {
  client: S3;

  constructor() {
    this.client = spacesClient;
  }

  async createBucket(bucketName: string) {
    try {
      const data = await this.client.send(
        new CreateBucketCommand({ Bucket: bucketName })
      );
      return data;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async uploadImage(image: string, imageName: string) {
    const blob = fs.createReadStream(image);

    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: "Images",
          Key: imageName,
          Body: blob,
          ACL: "public-read",
        })
      );

      //  Get the Presigned Public URL.
      const url = await getSignedUrl(
        spacesClient,
        new GetObjectCommand({ Bucket: "Images", Key: imageName })
      );

      return url;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async listBuckets() {
    try {
      const data = await spacesClient.send(new ListBucketsCommand({}));
      return data;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async deleteImage() {}
}

export default Bucket;
