import DBHandler from "../handlers/DB.js";
import JobModel from "../database/models/Job.js";
import UserModel from "../database/models/user.js";
import JobDataModel from "../database/models/JobData.js";

export const checkJobStatus = async (req: any, res: any) => {
  const id = req.params.id;
  const user = req.user;

  try {
    const job = await JobModel.findOne({ ID: id });
    if (!job) {
      res.status(404).json({
        message: "Invalid Job ID. Job doesn't exist.",
      });
      return;
    } else if (job.user !== user._id) {
      res.status(201).json({
        message: "You're not Authrized to access this job.",
      });
      return;
    }

    res.status(200).json({
      ID: id,
      status: job.status,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobData = async (req: any, res: any) => {
  const id = req.params.id;
  const user = req.user;

  try {
    const job = await JobModel.findOne({ ID: id }).populate("data");
    if (job?.user?.toString() !== user._id.toString()) {
      res.status(201).json({
        message: "You are not authroized to access this job.",
      });
      return;
    }

    res.status(200).json(job?.data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const jobController = async (req: any, res: any) => {
  const user = req.user;

  try {
    const jobUser = await UserModel.findOne({
      username: user.username,
    }).populate("jobs");

    res.status(200).json({
      user: jobUser?.username,
      jobs: jobUser?.jobs,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteJob = async (req: any, res: any) => {
  const id = req.params.id;
  const user = req.user;

  try {
    const job = await JobModel.findOne({ ID: id });
    if (!job) {
      res.status(404).json({
        message: "No Job found. Invalid ID.",
      });
      return;
    }
    if (job.user?.toString() !== user._id.toString()) {
      res.status(401).json({
        message: "You aren't authorized to access this job.",
      });
      return;
    }

    const jobUser = await UserModel.findOne({ _id: job.user });

    if (!jobUser) {
      throw Error("User for this Job doesn't exists.");
    }
    // Delete the Job Data first.
    if (job.data) {
      await JobDataModel.findOneAndDelete({ _id: job.data });
    }

    // Remove the Job from the jobs array.
    const filteredJobs = jobUser?.jobs.filter(
      (el) => el.toString() !== job._id.toString()
    );
    jobUser.jobs = filteredJobs;

    // Update the user's jobs.
    await jobUser.save();

    // Remove the Job itself.
    await job.deleteOne();

    res.status(200).json({
      message: `The Job was deleted successfully. ID: ${id}`,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
