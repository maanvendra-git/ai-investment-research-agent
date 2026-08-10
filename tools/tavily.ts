import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const webResearchTool = tool(
  async ({ query }) => {
    const apiKey = process.env.TAVILY_API_KEY;

    if (!apiKey) {
      throw new Error("TAVILY_API_KEY is missing");
    }

    console.log(
      `Web Research Tool: searching "${query}"`
    );

    const response = await fetch(
      "https://api.tavily.com/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          query,
          search_depth: "advanced",
          topic: "general",
          max_results: 5,
          include_answer: true,
          include_raw_content: false,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Tavily API error: ${errorText}`
      );
    }

    const data = await response.json();
    return JSON.stringify({
      answer: data.answer ?? "",
      results: (data.results ?? []).map(
        (result: {
          title?: string;
          url?: string;
          content?: string;
          published_date?: string;
        }) => ({
          title: result.title ?? "",
          url: result.url ?? "",
          content: result.content ?? "",
          publishedDate: result.published_date ?? "",
        })
      ),
    });
  },
  {
    name: "web_research",

    description:
      "Searches the web for current information about a company, industry, competitors, market trends, business developments, and other investment-relevant topics. Use this tool when broader web research is required.",

    schema: z.object({
      query: z
        .string()
        .min(1)
        .describe(
          "The web research question or search query"
        ),
    }),
  }
);
