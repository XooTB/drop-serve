export type varient = {
  model: string | undefined;
  image?: string | undefined;
  type?: string | undefined;
};

export type specification = {
  category: string;
  value: string;
};

export type scrapedData = {
  productTitle: string;
  images: string[];
  varients: varient[];
  sellPoints?: string[];
  specifications: specification[];
};
