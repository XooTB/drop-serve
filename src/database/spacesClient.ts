import { S3 } from "@aws-sdk/client-s3";
import "dotenv/config";

const spacesClient = new S3({
  forcePathStyle: false,
  endpoint: "https://drop-help-image-storage.sgp1.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: `${process.env.SPACES_KEY}`,
    secretAccessKey: `${process.env.SPACES_SECRET}`,
  },
});

export default spacesClient;
