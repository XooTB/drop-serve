import { varient, specification } from "./scraper";

export type dataType = {
  title: string | null;
  url: string;
  images: string[];
  varients: varient[];
  specifications: specification[];
  description?: string;
};
