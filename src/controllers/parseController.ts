import { Scrape } from "../scraper/Scraper.ts";

const parseController = async (req: any, res: any) => {
  const { url } = req.body;

  const data = await Scrape([url]);

  res.status(200).json({ ...data });
};

export default parseController;
