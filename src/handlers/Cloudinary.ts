import { v2 as cloudinary, v2 } from "cloudinary";
import * as fs from "node:fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

class Cloud {
  cloud: any;

  constructor() {
    this.cloud = cloudinary;
  }

  async uploadImage(image: string, imageName: string) {
    // const blob = fs.createReadStream(image);

    try {
      const res = await cloudinary.uploader.upload(image, {
        use_filename: true,
        filename_override: imageName,
      });

      return res.secure_url;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default Cloud;
