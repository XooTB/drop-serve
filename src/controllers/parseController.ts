const parseController = async (req: any, res: any, next: any) => {
  res.status(200).json({ message: "API Working!!" });
};

export default parseController;
