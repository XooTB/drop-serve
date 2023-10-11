import UserModel from "../database/models/user.js";
import jwt from "jsonwebtoken";

const Authenticate = async (req: any, res: any, next: any) => {
  //verify Auth
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      error: "Authorizaion Key Required",
    });
  } else {
    // Get the Auth Token from the Authorization Header
    const token = authorization.split(" ")[1];

    try {
      //@ts-ignore
      const { username, email } = jwt.verify(token, process.env.JWT_SECRET);

      const sessionUser = await UserModel.findOne({ username });

      if (!sessionUser) {
        throw Error("Invalid Auth Key. Please Try Loggin in again.");
      }

      req.user = sessionUser;

      next();
    } catch (err: any) {
      res.status(401).json({
        error: err.message,
      });
    }
  }
};

export default Authenticate;
