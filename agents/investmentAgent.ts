import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";

import {
  INVESTMENT_RESEARCH_SYSTEM_PROMPT,
  INVESTMENT_RESEARCH_USER_PROMPT,
} from "./prompts";

import { financialResearchTool } from "../tools/finance";
import { newsResearchTool } from "../tools/news";
import { webResearchTool } from "../tools/tavily";

const InvestmentReportSchema = z.object({
  company: z.string(),

  recommendation: z.enum(["INVEST", "PASS"]),

  score: z.number().min(0).max(100),

  confidence: z.number().min(0).max(100),

  summary: z.string(),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  opportunities: z.array(z.string()),

  threats: z.array(z.string()),

  risks: z.array(z.string()),

  news: z.array(z.string()),

  financialAnalysis: z.object({
    revenue: z.string(),
    profit: z.string(),
    marketCap: z.string(),
    peRatio: z.string(),
  }),

  newsAnalysis: z.array(
    z.object({
      headline: z.string(),
      takeaway: z.string(),
    })
  ),
});

export type InvestmentReport = z.infer<
  typeof InvestmentReportSchema
>;

export async function runInvestmentAgent(
  company: string
): Promise<InvestmentReport> {
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!geminiKey) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  if (!company || !company.trim()) {
    throw new Error("Company name is required");
  }

  const companyName = company.trim();

  console.log(
    `Starting investment research for: ${companyName}`
  );

  // =========================================================
  // STEP 1: Financial Research Tool
  // =========================================================

  console.log("Running financial research tool...");

  const financialData = await financialResearchTool.invoke({
    company: companyName,
  });

  console.log("Financial research completed.");

  // =========================================================
  // STEP 2: News Research Tool
  // =========================================================

  console.log("Running news research tool...");

  const news = await newsResearchTool.invoke({
    company: companyName,
  });

  console.log("News research completed.");

  // =========================================================
  // STEP 3: Web Research Tool
  // =========================================================

  console.log("Running web research tool...");

  const webResearch = await webResearchTool.invoke({
    query: `${companyName} latest company developments business outlook investment`,
  });

  console.log("Web research completed.");

  // =========================================================
  // STEP 4: Create Gemini Model
  // =========================================================

  const model = new ChatGoogleGenerativeAI({
    apiKey: geminiKey,
    model: "gemini-3.5-flash",
    temperature: 0,
  });

  // =========================================================
  // STEP 5: Force Structured Output
  // =========================================================

  const structuredModel =
    model.withStructuredOutput(
      InvestmentReportSchema
    );

  // =========================================================
  // STEP 6: Build Research Prompt
  // =========================================================

  const userPrompt = INVESTMENT_RESEARCH_USER_PROMPT(
    companyName,
    financialData,
    news
  );

  const finalPrompt = `
${userPrompt}

ADDITIONAL WEB RESEARCH:

${webResearch}

IMPORTANT:

The web research above is supplementary research.

Use the financial research tool output as the source of truth
for financial values.

Use the news research tool output as the source of truth
for company news.

Do not invent financial numbers.

Do not invent news.

Do not treat missing information as positive or negative.

If financial information is unavailable, use exactly:

"Data not available"

The recommendation must be either:

"INVEST"

or:

"PASS"

Score must be between 0 and 100.

Confidence must be between 0 and 100.

Return every field required by the schema.

All array fields must always be arrays.

Never return null for an array.

Give a balanced investment analysis.
`;

  // =========================================================
  // STEP 7: Ask Gemini to Analyze Everything
  // =========================================================

  console.log(
    "Sending research data to Gemini..."
  );

  const report = await structuredModel.invoke([
    {
      role: "system",
      content: INVESTMENT_RESEARCH_SYSTEM_PROMPT,
    },
    {
      role: "user",
      content: finalPrompt,
    },
  ]);

  console.log(
    `Investment research completed for: ${companyName}`
  );

  // =========================================================
  // STEP 8: Final Safety Normalization
  // =========================================================

  const normalizedReport = {
    ...report,

    strengths: Array.isArray(report.strengths)
      ? report.strengths
      : [],

    weaknesses: Array.isArray(report.weaknesses)
      ? report.weaknesses
      : [],

    opportunities: Array.isArray(report.opportunities)
      ? report.opportunities
      : [],

    threats: Array.isArray(report.threats)
      ? report.threats
      : [],

    risks: Array.isArray(report.risks)
      ? report.risks
      : [],

    news: Array.isArray(report.news)
      ? report.news
      : [],

    newsAnalysis: Array.isArray(report.newsAnalysis)
      ? report.newsAnalysis
      : [],
  };

  return InvestmentReportSchema.parse(
    normalizedReport
  );
}