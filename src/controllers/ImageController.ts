import JobDataModel from "../database/models/JobData.js";
import { imgbox } from "imgbox-js";
import "dotenv/config";
import JobModel from "../database/models/Job.js";

const config = {
  auth_cookie: process.env.IMGBOX_COOKIE,
};

export const imageController = async (req: any, res: any) => {
  const { images }: { images: string[] } = req.body;
  const id = req.params.id;

  try {
    const job = await JobModel.findOne({ ID: id });

    if (!job) {
      throw Error(`No Job with ID: ${id} found. Please check the JobID.`);
    }

    const jobData = await JobDataModel.findOne({ ID: job._id });

    if (!jobData) {
      throw Error(`No Job with ID: ${id} found. Please check the JobID.`);
    }

    const response = await imgbox(images, config);
    const data = response.data.success;

    const urls = data.map((url: any) => url.original_url);

    jobData.descImages = urls;
    await jobData.save();

    res.status(200).json({
      urls,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
