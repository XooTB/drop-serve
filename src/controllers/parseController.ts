import { Scrape } from "../scraper/Scraper.ts";
import main from "../main.ts";

const parseController = async (req: any, res: any) => {
  const { url } = req.body;

  const data = await main(url);

  res.status(200).json({ ...data });
};

export default parseController;
