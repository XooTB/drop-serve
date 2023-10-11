import { dataType } from "../interfaces/data.js";
import connect from "../database/connect.js";
import JobModel, { Job } from "../database/models/Job.js";
import JobDataModel, { JobData } from "../database/models/JobData.js";
import UserModel from "../database/models/user.js";

class DBHandler {
  constructor() {
    connect();
  }

  async addJob(
    id: string,
    status: "RUNNING" | "FINISHED" | "ERROR",
    username: string
  ) {
    try {
      const user = await UserModel.findOne({ username });
      const newJob = await JobModel.create({ ID: id, status, user: user?._id });

      user?.jobs.push(newJob._id);

      await user?.save();

      return newJob;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async addJobData(id: string, data: dataType) {
    try {
      const job = await JobModel.findOne({ ID: id });

      const newData = {
        ID: job?._id,
        title: data.title,
        images: data.images,
        varients: data.varients,
      };
      const newJob = await JobDataModel.create(newData);

      if (newJob && job) {
        job.data = newJob._id;
      }

      await job?.save();

      return newJob;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async setJobStatus(id: string, status: "RUNNING" | "FINISHED" | "ERROR") {
    try {
      const Job = await JobModel.findOne({ ID: id });

      if (Job) {
        Job.status = status;
      }

      await Job?.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async checkJobStatus(id: string) {
    try {
      const job = await JobModel.findOne({ ID: id });

      return job?.status;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default DBHandler;
