import DBHandler from "../handlers/DB.js";
import JobModel from "../database/models/Job.js";

export const checkJobStatus = async (req: any, res: any) => {
  const id = req.params.id;
  try {
    const db = new DBHandler();
    const status = await db.checkJobStatus(id);
    res.status(200).json({
      ID: id,
      status: status,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobData = async (req: any, res: any) => {
  const id = req.params.id;

  try {
    const job = await JobModel.findOne({ ID: id }).populate("data");

    res.status(200).json(job);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
