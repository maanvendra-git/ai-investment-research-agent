import { tool } from "@langchain/core/tools";
import { z } from "zod";

import { getFinancialData } from "../services/finance";

export const financialResearchTool = tool(
  async ({ company }) => {
    console.log(
      `Financial Research Tool: researching ${company}`
    );

    const financialData = await getFinancialData(company);

    return JSON.stringify(financialData);
  },
  {
    name: "financial_research",
    description:
      "Gets real financial information for a public company, including revenue, profit, market capitalization, and P/E ratio. Use this tool when financial information is required for investment research.",
    schema: z.object({
      company: z
        .string()
        .min(1)
        .describe("The public company name to research"),
    }),
  }
);