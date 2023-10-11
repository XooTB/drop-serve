import bcrypt from "bcrypt";

const generateHash = (password: string) => {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export default generateHash;
