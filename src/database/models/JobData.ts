import mongoose, { InferSchemaType } from "mongoose";

const JobDataSchema = new mongoose.Schema({
  ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job",
  },
  title: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  varients: [
    {
      model: String,
      image: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        required: false,
      },
    },
  ],
});

export type JobData = InferSchemaType<typeof JobDataSchema>;

const JobDataModel = mongoose.model("JobData", JobDataSchema);

export default JobDataModel;
