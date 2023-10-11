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
  const user = req.user;
  const id = uid(5);

  try {
    await DB.addJob(id, "RUNNING", user.username);

    main(id, url, keywords).catch(async (err: any) => {
      await DB.setJobStatus(id, "ERROR");
      console.log(err.message);
    });

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
