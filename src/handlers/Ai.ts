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
          role: "system",
          content:
            "You will be provided with a Product title and some keywords. Your task is to integrate those keywords into the title and Optimize it for EBay, Try to make it sound fluent. While keeping  it under 80 characters ",
        },
        {
          role: "user",
          content: `Product Title: ${title} \n Keywords: ${keywords}`,
        },
      ],
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.3,
      n: 3,
    });

    const titles = titleCompletion.choices.map(
      (choice) => choice.message.content
    );

    return titles;
  }

  async generateImageTitle(keywords: string[], n: number) {
    const titles = await this.AI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You will be provided with some keywords. Your task is to generate a Image name using these keywords. Use underscores instead of spaces and keep it under 20 characters. ",
        },
        {
          role: "user",
          content: `Keywords: ${keywords}.`,
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
