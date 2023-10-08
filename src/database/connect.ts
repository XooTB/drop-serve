import "dotenv/config";
import mongoose from "mongoose";

const connect = async () => {
  try {
    //@ts-ignore
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully Connected to MONGODB.");

    return true;
  } catch (error) {
    //@ts-ignore
    console.log(error.message);
    return false;
  }
};

export default connect;
