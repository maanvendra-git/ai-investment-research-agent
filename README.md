# AI Investment Research Agent

An AI-powered investment research agent that takes a company name, researches the company using financial, market, research, and news information, and produces an AI-generated **INVEST or PASS** recommendation with supporting reasoning.

The application is built as a full-stack Next.js application using **React, TypeScript, LangChain.js, and LangGraph.js**.

---

## Overview

The AI Investment Research Agent is designed to help users quickly research a public company and understand its potential investment outlook.

The user enters a company name, for example:

- Apple
- Tesla
- Microsoft
- Nvidia
- Amazon
- Google

The agent then performs research and generates a structured investment research report.

The final report includes:

- Investment recommendation
- Investment score
- Confidence level
- Company summary
- Financial analysis
- Strengths
- Weaknesses
- Opportunities
- Threats
- Investment risks
- Latest news

The purpose of the project is to demonstrate how an AI-powered research agent can combine multiple research steps, external information, and LLM reasoning into a single investment research workflow.

This project is intended for educational and research purposes and is not professional financial advice.

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- Next.js API Routes
- Node.js

## AI / Agent

- LangChain.js
- LangGraph.js
- LLM-based analysis

## Research / Data

The application uses financial, company research, market, and news-related tools/services to gather information required for the investment analysis.

---

# How to Run It

## 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd investment-agent
2. Install dependencies
npm install
3. Configure environment variables

Create a .env.local file in the project root.

Add the API keys required by the project.

Example:

OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
NEWS_API_KEY=your_news_api_key
TAVILY_API_KEY=your_tavily_api_key

If additional API services are configured in the project, add their corresponding keys to .env.local.

Do not commit .env.local or API keys to GitHub.

4. Start the development server
npm run dev

The application will be available at:

http://localhost:3000

Open the URL in a browser.

5. Run the agent

Enter a company name into the search field.

Example:

Apple

Click:

Analyze

The application will run the research workflow and display the investment research report.

How It Works
High-Level Architecture
                    USER
                      |
                      v
             Company Name Input
                      |
                      v
             Next.js Frontend
                      |
                      v
              POST /api/research
                      |
                      v
             Research API Route
                      |
                      v
          LangGraph Investment Workflow
                      |
          +-----------+-----------+
          |                       |
          v                       v
   Financial Research       News Research
          |                       |
          +-----------+-----------+
                      |
                      v
                AI Analysis
                      |
                      v
             Investment Decision
                      |
                      v
             Structured Report
                      |
                      v
               Next.js UI
1. User Input

The user enters a company name into the frontend.

The frontend checks that the input is not empty before sending the request.

If no company name is entered, the application asks the user to enter one.

2. API Request

The frontend sends a POST request to:

/api/research

The request contains the company name.

Example:

{
  "company": "Apple"
}
3. Backend Validation

The Next.js API route receives the request and validates the company name.

If the company name is missing or invalid, the API returns a controlled 400 response.

This prevents the research workflow from being executed with invalid input.

4. Investment Research Workflow

After validation, the backend passes the company name to the investment research workflow implemented using LangGraph.

The workflow coordinates the research and analysis steps required to produce the final investment report.

The research process can use different tools/services for:

Financial information
Company research
Market information
Latest news
5. AI Analysis

The collected research information is processed through the AI workflow.

The AI generates structured investment insights including:

Company summary
Financial analysis
Strengths
Weaknesses
Opportunities
Threats
Investment risks
Latest news
Investment score
Confidence
Recommendation
6. Investment Decision

The final result provides one of two primary recommendations:

INVEST

or

PASS

The recommendation is accompanied by an investment score and confidence level.

7. Frontend Report

The structured result is displayed in the frontend using separate sections.

This makes the research easier to read and allows the user to quickly understand the company's investment outlook.

Report Structure

The generated report contains the following sections.

Investment Recommendation

The application displays:

INVEST

or:

PASS
Investment Score

A score from:

0 - 100

is displayed to represent the overall investment assessment.

Confidence

The application displays a confidence percentage indicating how strongly the system supports the generated conclusion.

Summary

A natural-language summary explains the overall investment outlook.

Financial Analysis

The report can display:

Revenue
Profit
Market Capitalization
P/E Ratio
Financial analysis
SWOT Analysis

The application displays:

Strengths

Important positive characteristics of the company.

Weaknesses

Factors that may negatively affect the investment.

Opportunities

Potential growth opportunities.

Threats

External factors that could negatively affect the company.

Investment Risks

Important factors that could negatively impact the investment.

Latest News

Recent developments that may influence the investment outlook.

Key Decisions & Trade-offs
1. Using LangGraph for the Agent Workflow

LangGraph was chosen to structure the investment research process as a workflow instead of relying on one large LLM prompt.

This provides a clearer structure for coordinating multiple research and reasoning steps.

Trade-off

A graph-based architecture is more complex than a single LLM call, but it makes the system easier to extend with additional research nodes, tools, and analysis steps.

2. Structured Research Output

Instead of displaying a raw LLM response, the application produces a structured investment report.

The output is divided into:

Financial Analysis
Strengths
Weaknesses
Opportunities
Threats
Investment Risks
Latest News
Recommendation
Score
Confidence
Trade-off

Structured output requires more careful handling of missing or inconsistent fields, but provides a much better user experience and makes the results easier to understand.

3. INVEST / PASS Decision

The application uses a simple:

INVEST

or:

PASS

decision.

The reasoning is shown alongside the recommendation instead of presenting only a final label.

Trade-off

A binary recommendation is easy to understand and matches the assignment goal, but real investment decisions are much more nuanced.

4. Investment Score and Confidence

The application displays both a score and confidence.

The score represents the overall investment assessment, while confidence represents how strongly the system supports the conclusion.

Trade-off

These values make the AI output easier to interpret, but they should be treated as AI-generated indicators rather than guaranteed financial predictions.

5. Handling Missing Data

Financial data may not be available for every company.

The application therefore uses fallback messages such as:

Data not available

instead of allowing missing fields to break the interface.

Trade-off

This allows the system to continue working with incomplete information, but analysis based on limited data may have lower reliability.

6. Graceful Error Handling

The backend catches unexpected research errors and returns a controlled error response.

The frontend also handles failed requests and displays an error message instead of crashing the application.

Trade-off

Explicit error handling adds additional code, but makes the application more reliable and easier to debug.

Example Runs
Example 1 — Apple
Input
Apple
Example Output
Recommendation: INVEST
Investment Score: 85/100
Confidence: 90%

The generated report includes financial analysis, company strengths, weaknesses, opportunities, threats, investment risks, and latest news.

The analysis highlights areas such as Apple's financial strength, ecosystem, brand loyalty, services business, and growth opportunities while also considering valuation, competition, regulatory pressure, and hardware-market risks.

Example 2 — Unknown / Invalid Company
Input
xyzabc123notacompany

The application does not crash when sufficient financial information is unavailable.

Instead, it produces a low-confidence result and clearly indicates that financial information is unavailable.

Example:

Recommendation: PASS
Investment Score: 50/100
Confidence: 10%

The report also communicates the limitations of the available information.

This demonstrates that the system can handle companies for which sufficient research data cannot be found.

Error Handling

The application includes validation and error handling at multiple levels.

Empty Input

If the user clicks Analyze without entering a company name, the frontend displays:

Please enter a company name.
Invalid API Request

The backend validates the request body.

If the company name is missing or invalid, the API returns:

HTTP 400

with an appropriate error message.

Research Failure

Unexpected errors during the research workflow are caught by the backend.

The API returns a controlled:

HTTP 500

response instead of allowing the server request to fail silently.

Frontend Request Failure

If the frontend receives an unsuccessful response, it displays a research error message to the user.

Missing Data

If individual financial or research fields are unavailable, the interface displays:

Data not available

instead of breaking the report.

Project Structure
investment-agent/
│
├── agents/
│   ├── graph.ts
│   ├── investmentAgent.ts
│   └── prompts.ts
│
├── app/
│   ├── api/
│   │   └── research/
│   │       ├── route.ts
│   │       └── test-ai/
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Hero.tsx
│   ├── Loading.tsx
│   ├── RecentSearches.tsx
│   └── FeatureCard.tsx
│
├── lib/
│   └── openai.ts
│
├── services/
│   ├── finance.ts
│   ├── news.ts
│   └── research.ts
│
├── tools/
│   ├── finance.ts
│   ├── news.ts
│   └── tavily.ts
│
├── types/
│   └── investment.ts
│
├── public/
│
├── .env.local
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── tsconfig.json
What I Would Improve With More Time
1. Add More Reliable Financial Data Sources

I would integrate additional financial data providers and cross-check important metrics across multiple sources.

This would reduce dependency on a single source and improve data reliability.

2. Add Source Citations

The application could display the exact source behind each important financial or news claim.

For example:

Revenue
$...
Source: Financial Data Provider

This would make the research more transparent and auditable.

3. Add Historical Financial Charts

I would add visualizations for:

Revenue growth
Profit growth
Earnings
Stock price performance
Valuation trends

over multiple years.

4. Improve Investment Scoring

The investment score could be based on a transparent weighted model using factors such as:

Financial health
Growth
Valuation
Market position
Risk
News sentiment

This would make the scoring methodology easier to understand.

5. Improve Confidence Calculation

Confidence could be calculated using factors such as:

Amount of available data
Data source quality
Recency of information
Agreement between multiple sources
Completeness of financial metrics
6. Company Comparison

I would add a feature allowing users to compare multiple companies.

Example:

Apple vs Microsoft vs Nvidia

The comparison could include:

Revenue
Profit
Market cap
P/E ratio
Investment score
Risk
Confidence
7. Portfolio-Level Research

A future version could allow users to enter multiple holdings and generate portfolio-level research and risk insights.

8. Production Deployment

I would deploy the application to a production environment such as Vercel and provide a public demo URL.

9. Automated Testing

I would add automated tests for:

API validation
Research workflow
Tool failures
Missing data
Invalid company names
Structured AI output
Frontend error states
Limitations

The application is an AI-powered investment research prototype.

The quality of the generated analysis depends on:

Availability of company information
Accuracy of external data sources
Recency of news
Availability of APIs
LLM reasoning
Completeness of available financial data

For companies with limited publicly available information, the application may produce lower-confidence results.

The generated recommendation should not be treated as guaranteed financial advice or a prediction of future stock performance.

AI Usage

AI/LLM tools were used throughout the development process as required by the assignment.

AI assistance was used for:

Understanding the assignment
Architecture exploration
Code generation
Code refinement
Debugging
UI development
Error handling
Testing ideas
Documentation
Iterative problem solving

The application was developed iteratively by building features, running the application, testing real company searches, identifying issues, and refining the implementation.

The final implementation was manually tested through the running application, including successful company research and unavailable/unknown company scenarios.

Development Approach

The project was developed incrementally rather than building the entire application in one step.

The main development stages were:

Create the Next.js application.
Build the company search interface.
Implement the backend research API.
Implement the LangGraph investment research workflow.
Integrate financial and research tools.
Integrate news research.
Generate structured investment analysis.
Build the investment report UI.
Add INVEST / PASS recommendation.
Add score and confidence.
Add SWOT and investment risk sections.
Add latest news.
Add input validation and error handling.
Test the application with real and unknown company inputs.
Push the project to GitHub.
Prepare the project documentation for submission.
Future Direction

The project could be extended into a more complete AI investment research platform with:

Multi-source financial verification
Real-time market data
Source-level citations
Historical financial charts
Company comparison
Portfolio analysis
Sentiment analysis
Personalized research
Automated investment reports
Production monitoring
Automated evaluation of AI outputs
Disclaimer

This project is built for educational, demonstration, and research purposes.

The generated investment recommendation, investment score, confidence level, financial analysis, and other AI-generated insights should not be considered professional financial advice.

Users should independently verify financial information and consult qualified financial professionals before making investment decisions.