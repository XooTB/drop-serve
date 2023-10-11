import jwt from "jsonwebtoken";
import "dotenv/config";

const signJWT = (username: string, email: string) => {
  const privateKey = process.env.JWT_SECRET;
  const token = jwt.sign(
    {
      username,
      email,
    },
    //@ts-ignore
    privateKey,
    {}
  );

  return token;
};

export default signJWT;
