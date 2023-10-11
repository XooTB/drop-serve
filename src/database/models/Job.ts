import mongoose, { InferSchemaType } from "mongoose";
import { varient } from "../../interfaces/scraper.js";

const JobSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobData",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

export type Job = InferSchemaType<typeof JobSchema>;

const JobModel = mongoose.model("Job", JobSchema);

export default JobModel;
