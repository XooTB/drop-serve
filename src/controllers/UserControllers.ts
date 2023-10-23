import UserModel from "../database/models/user.js";
import signJWT from "../utils/JWT.js";
import generateHash from "../utils/hashPassword.js";
import comparePass from "../utils/comparePassword.js";

export const userSignup = async (req: any, res: any) => {
  const { username, email, password } = req.body;

  try {
    const exists = await UserModel.findOne({ email });

    if (exists) {
      throw Error("User already exists!");
    }

    const hash = generateHash(password);

    const newUser = await UserModel.create({ username, email, password: hash });

    if (newUser) {
      const token = signJWT(username, email);
      res.status(200).json({
        email,
        username,
        token,
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const userLogin = async (req: any, res: any) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw Error("No user found.");
    }

    if (comparePass(password, user.password)) {
      const token = signJWT(user.username, user.email);
      res.status(200).json({
        email: user.email,
        username: user.username,
        token,
      });
    } else {
      res.status(201).json({
        message: "Password doesn't match.",
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
