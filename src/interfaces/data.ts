import { varient, specification } from "./scraper";

export type dataType = {
  titles: (string | null)[];
  url: string;
  images: string[];
  varients: varient[];
  specifications: specification[];
  description?: string;
};
