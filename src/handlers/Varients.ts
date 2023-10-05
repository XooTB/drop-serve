import { varient } from "../interfaces/scraper.ts";
import Ai from "./Ai.ts";
import { imageHandler } from "./handleImages.ts";

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
    const titles = await this.AI.generateImageTitle(
      this.keywords,
      varients.length
    );

    for (const [i, varient] of varients.entries()) {
      if (!varient.image) {
        array.push(varient);
        continue;
      }

      const image = await this.IH.saveVarientImage(varient);

      const url = await this.IH.uploadVarientImage(
        image,
        `${titles[i]}_${varient.model}_${varient.type}`
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
