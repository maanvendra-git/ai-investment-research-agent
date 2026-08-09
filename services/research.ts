import { getFinancialData } from "./finance";
import { getCompanyNews } from "./news";

export async function researchCompany(company: string): Promise<any> {
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!geminiKey) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  // Get financial data
  const financialData = await getFinancialData(company);

  // Get latest news
  const news = await getCompanyNews(company);

  const prompt = `
You are an AI investment research analyst.

Research the following public company:

Company: ${company}

FINANCIAL DATA:
${JSON.stringify(financialData, null, 2)}

LATEST NEWS:
${JSON.stringify(news, null, 2)}

Based ONLY on the information provided above, create an investment research report.

IMPORTANT RULES:

- Do not invent financial numbers.
- If financial data is unavailable, clearly say so.
- Do not treat missing data as positive or negative.
- Give a balanced analysis.
- The recommendation must be either "INVEST" or "PASS".
- Score must be between 0 and 100.
- Confidence must be between 0 and 100.
- Use only the financial data and news provided above.
- Do not make up facts.
- Do not make up news.
- Return ONLY valid JSON.
- Do not include markdown.
- Do not include \`\`\`json.
- Do not include any explanation outside the JSON.

Return the JSON using EXACTLY this structure:

{
  "company": "${company}",
  "recommendation": "INVEST",
  "score": 0,
  "confidence": 0,
  "summary": "string",

  "strengths": [
    "string"
  ],

  "weaknesses": [
    "string"
  ],

  "opportunities": [
    "string"
  ],

  "threats": [
    "string"
  ],

  "risks": [
    "string"
  ],

  "news": [
    "string"
  ],

  "financialAnalysis": {
    "revenue": "string",
    "profit": "string",
    "marketCap": "string",
    "peRatio": "string"
  },

  "newsAnalysis": [
    {
      "headline": "string",
      "takeaway": "string"
    }
  ]
}

ADDITIONAL RULES:

- "strengths" MUST always be an array.
- "weaknesses" MUST always be an array.
- "opportunities" MUST always be an array.
- "threats" MUST always be an array.
- "risks" MUST always be an array.
- "news" MUST always be an array.
- "newsAnalysis" MUST always be an array.
- If there is no information for any array, return [].
- Never return null for these arrays.
- Never omit any field from the required JSON structure.
- Financial values must come only from the provided financial data.
- If a financial value is unavailable, use "Data not available".
- News must come only from the provided latest news.
- Do not invent dates, prices, revenue, profit, market cap or P/E ratio.
`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": geminiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${error}`);
  }

  const data = await response.json();

  console.log(
    "GEMINI RESPONSE:",
    JSON.stringify(data, null, 2)
  );

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  let report;

  try {
    report = JSON.parse(text);
  } catch (error) {
    console.error("GEMINI RAW TEXT:", text);
    throw new Error("Gemini returned invalid JSON");
  }

  // Make sure arrays always exist so frontend never crashes
  report.strengths = Array.isArray(report.strengths)
    ? report.strengths
    : [];

  report.weaknesses = Array.isArray(report.weaknesses)
    ? report.weaknesses
    : [];

  report.opportunities = Array.isArray(report.opportunities)
    ? report.opportunities
    : [];

  report.threats = Array.isArray(report.threats)
    ? report.threats
    : [];

  report.risks = Array.isArray(report.risks)
    ? report.risks
    : [];

  report.news = Array.isArray(report.news)
    ? report.news
    : [];

  report.newsAnalysis = Array.isArray(report.newsAnalysis)
    ? report.newsAnalysis
    : [];

  return {
    success: true,
    report,
  };
}