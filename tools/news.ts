import { tool } from "@langchain/core/tools";
import { z } from "zod";

import { getCompanyNews } from "../services/news";

export const newsResearchTool = tool(
  async ({ company }) => {
    console.log(
      `News Research Tool: researching ${company}`
    );

    const news = await getCompanyNews(company);

    return JSON.stringify(news);
  },
  {
    name: "news_research",
    description:
      "Gets the latest news articles related to a public company. Use this tool when recent company news or market developments are required for investment research.",
    schema: z.object({
      company: z
        .string()
        .min(1)
        .describe("The public company name to research"),
    }),
  }
);