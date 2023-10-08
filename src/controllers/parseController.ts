import main from "../main.js";
import DBHandler from "../handlers/DB.js";
import { uid } from "uid";

type reqData = {
  url: string;
  keywords: string[];
};

const DB = new DBHandler();

const parseController = async (req: any, res: any) => {
  const { url, keywords }: reqData = req.body;
  const id = uid(5);

  try {
    await DB.addJob(id, "RUNNING");

    main(id, url, keywords);

    res.status(200).json({
      message: "Job was added to the Queue successfully. ",
      jobID: id,
    });
  } catch (err) {
    res.status(500).json({
      //@ts-ignore
      message: err.message,
    });
  }
};

export default parseController;
