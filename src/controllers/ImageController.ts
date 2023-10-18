import { imgbox } from "imgbox-js";
import "dotenv/config";

const config = {
  auth_cookie: process.env.IMGBOX_COOKIE,
};

export const imageController = async (req: any, res: any) => {
  const { images }: { images: string[] } = req.body;
  const urls: string[] = [];

  const response = await imgbox(images, config);

  const data = response.data.success;

  data.forEach((el: any) => {
    urls.push(el.original_url);
  });

  res.status(200).json({
    urls,
  });
};
