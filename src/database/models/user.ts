import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  jobs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Job",
  },
});

export type User = InferSchemaType<typeof userSchema>;

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
