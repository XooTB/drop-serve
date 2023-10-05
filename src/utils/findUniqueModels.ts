import { varient } from "../interfaces/scraper";

const findUniqueModels = (varients: varient[]) => {
  const uniqueModels = new Set();
  const result = [];

  for (const obj of varients) {
    if (!uniqueModels.has(obj.model)) {
      uniqueModels.add(obj.model);
      result.push(obj.model);
    }
  }

  return result;
};

export default findUniqueModels;
