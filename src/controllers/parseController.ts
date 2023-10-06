import { Scrape } from "../scraper/Scraper.js";
import main from "../main.js";

type reqData = {
  url: string;
  keywords: string[];
};

const parseController = async (req: any, res: any) => {
  const { url, keywords }: reqData = req.body;

  try {
    const data = await main(url, keywords);
    res.status(200).json({ ...data });
  } catch (err) {
    res.status(402).json({
      //@ts-ignore
      message: err.message,
    });
  }
};

export default parseController;
