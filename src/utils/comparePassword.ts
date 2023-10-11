import bcrypt from "bcrypt";

const comparePass = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export default comparePass;
