import OpenAI from "openai";
import "dotenv/config";

class Ai {
  AI: OpenAI;

  constructor() {
    this.AI = new OpenAI({
      apiKey: process.env.OPENAI_SECRET,
    });
  }

  async generateTitle(title: string, keywords: string[]) {
    const titleCompletion = await this.AI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Improve this title and Optimize it with these Keywords for Ebay. 
           Title: ${title}. Keywords: ${keywords}`,
        },
      ],
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.3,
    });

    return titleCompletion.choices[0].message.content;
  }

  async generateImageTitle(keywords: string[], n: number) {
    const titles = await this.AI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Write me a title for product images based on these keywords. And substitute spaces for underscore. Keywords: ${keywords}.`,
        },
      ],
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.3,
      n,
    });

    const list: string[] = [];

    for (let choice of titles.choices) {
      if (choice.message.content) {
        list.push(choice.message.content);
      }
    }

    return list;
  }
}

export default Ai;
