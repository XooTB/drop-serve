import { varient } from "../interfaces/scraper.js";
import Ai from "./Ai.js";
import { imageHandler } from "./handleImages.js";
import findUniqueModels from "../utils/findUniqueModels.js";

class VarientsHandler {
  IH: imageHandler;
  keywords: string[];
  AI: Ai;

  constructor(IH: imageHandler, keywords: string[]) {
    this.IH = IH;
    this.keywords = keywords;
    this.AI = new Ai();
  }

  async handleVarients(varients: varient[]) {
    const array: varient[] = [];
    const models = findUniqueModels(varients);
    const titles = await this.AI.generateImageTitle(
      this.keywords,
      models.length
    );

    for (const [i, varient] of varients.entries()) {
      const modelIndex = models.findIndex((el) => el === varient.model);
      //@ts-ignore
      const title = titles[modelIndex];

      if (!varient.image) {
        array.push(varient);
        continue;
      }

      const image = await this.IH.saveVarientImage(varient);

      const url = await this.IH.uploadVarientImage(
        image,
        `${title}_${varient.model}_${varient.type}`
      );

      array.push({
        model: varient.model,
        type: varient.type,
        image: url ? url : "",
      });
    }

    return array;
  }
}

export default VarientsHandler;
