# AI Investment Research Agent

An AI-powered investment research agent that takes a public company name, researches financial information, market context, company information, and recent news, and produces a structured **INVEST or PASS** recommendation with supporting reasoning.

The application is built as a full-stack Next.js application using React, TypeScript, LangChain.js, and LangGraph.js.

> **Disclaimer:** This project is intended for educational, demonstration, and research purposes only. It is not professional financial advice.

---

## Overview

The AI Investment Research Agent helps users quickly research a public company and understand its potential investment outlook.

The user enters a company name such as:

- Apple
- NVIDIA
- Microsoft
- Tesla
- Amazon
- Google

The research workflow gathers relevant information and generates a structured investment research report.

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

The project demonstrates how an AI-powered research agent can combine multiple research steps, external information, and LLM reasoning into a single investment research workflow.

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- Node.js

### AI / Agent

- LangChain.js
- LangGraph.js
- OpenAI
- Google Gemini

### Research / Data

- Financial data services
- News API
- Tavily research
- Company and market research sources

---

# How to Run It

## 1. Clone the repository

```bash
git clone https://github.com/maanvendra-git/ai-investment-research-agent.git
cd ai-investment-research-agent
2. Install dependencies
npm install
3. Configure environment variables

Create a .env.local file in the project root.

Add the API keys required by the project:

OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
NEWS_API_KEY=your_news_api_key
TAVILY_API_KEY=your_tavily_api_key

Do not commit .env.local or API keys to GitHub.

4. Start the development server
npm run dev

The application will be available at:

http://localhost:3000

Open the URL in a browser.

5. Run the agent

Enter a public company name into the search field.

Example:

Apple

Click Analyze.

The application runs the research workflow and displays the investment research report.

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
                LangGraph Research Workflow
                           |
              +------------+------------+
              |                         |
              v                         v
      Financial Research          News Research
              |                         |
              +------------+------------+
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

The frontend validates that the input is not empty before sending the request.

If no company name is entered, the application asks the user to enter a company name.

2. API Request

The frontend sends a POST request to:

/api/research

The request contains the company name.

Example:

{
  "company": "Apple"
}
3. Backend Validation

The Next.js API route receives and validates the request.

Invalid or incomplete requests are handled through controlled error responses instead of allowing the application to crash.

4. Investment Research Workflow

After validation, the company name is passed to the investment research workflow implemented using LangGraph.

The workflow coordinates multiple research and analysis steps.

The research process can use:

Financial information
Company information
Market information
Recent news
Web research
5. AI Analysis

The collected research information is processed through the AI workflow.

The generated analysis includes:

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

The structured result is displayed through separate sections in the dashboard so that users can quickly understand the company's investment outlook.

Report Structure
Investment Recommendation

The application displays either:

INVEST

or:

PASS
Investment Score

A score from:

0 - 100

represents the overall investment assessment.

Confidence

A confidence percentage indicates how strongly the available research supports the generated conclusion.

Summary

A natural-language summary explains the overall investment outlook.

Financial Analysis

The report can display:

Revenue
Profit
Market Capitalization
P/E Ratio
SWOT Analysis
Strengths

Important positive characteristics of the company.

Weaknesses

Factors that may negatively affect the investment.

Opportunities

Potential growth opportunities.

Threats

External factors that could negatively affect the company.

Investment Risks

Important factors that could negatively affect the investment.

Latest News

Recent developments that may influence the investment outlook.

Key Decisions & Trade-offs
1. Using LangGraph for the Agent Workflow

LangGraph was chosen to structure the investment research process as a workflow rather than relying on a single large LLM prompt.

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

Structured output requires more careful handling of missing or inconsistent fields, but provides a much better user experience.

3. INVEST / PASS Decision

The application uses a simple:

INVEST

or:

PASS

decision.

The reasoning is shown alongside the recommendation instead of presenting only a final label.

Trade-off

A binary recommendation is easy to understand and matches the assignment objective, but real-world investment decisions are considerably more nuanced.

4. Investment Score and Confidence

The application displays both a score and confidence.

The score represents the overall investment assessment, while confidence represents how strongly the system supports the conclusion.

Trade-off

These values make the AI output easier to interpret, but they should be treated as AI-generated indicators rather than guaranteed financial predictions.

5. Handling Missing Data

Financial or research data may not be available for every company.

The application therefore uses fallback messages such as:

Data not available

instead of allowing missing fields to break the interface.

Trade-off

This allows the system to continue working with incomplete information, although analysis based on limited data may be less reliable.

6. Graceful Error Handling

The backend handles unexpected research errors and returns controlled responses.

The frontend also handles failed requests and displays an error state instead of crashing.

Trade-off

Explicit error handling adds additional implementation complexity but makes the application more reliable and easier to debug.

Example Runs
Example 1 — Apple
Input
Apple
Result
Recommendation: INVEST
Investment Score: 85/100
Confidence: 90%

The generated report includes financial analysis, company strengths, weaknesses, opportunities, threats, investment risks, and latest news.

The analysis considers factors including Apple's financial strength, ecosystem, brand position, services business, growth opportunities, valuation, competition, regulatory pressure, and hardware-market risks.

Example 2 — NVIDIA
Input
Nvidia
Result
Recommendation: INVEST
Investment Score: 88/100
Confidence: 90%

The generated report provides financial analysis, SWOT-style insights, investment risks, opportunities, and recent news.

The analysis considers NVIDIA's position in AI and semiconductors, financial performance, data-center demand, competitive environment, supply-chain dependencies, and geopolitical considerations.

Example 3 — Invalid Company
Input
not a company
Result
Recommendation: PASS
Investment Score: 0/100
Confidence: 100%

The application handles the invalid company input without crashing.

Financial fields are shown as:

Data not available

The report also communicates that sufficient company information is unavailable for a meaningful investment analysis.

This demonstrates graceful handling of unsupported or invalid company inputs.

Error Handling

The application includes validation and error handling at multiple levels.

Empty Input

If the user clicks Analyze without entering a company name, the frontend requests that a company name be entered.

Invalid API Request

The backend validates the request body and returns a controlled error response when the request is invalid.

Research Failure

Unexpected errors during the research workflow are handled by the backend rather than allowing the application to crash.

Frontend Request Failure

If the frontend receives an unsuccessful response, it displays an appropriate research error state.

Missing Data

If individual financial or research fields are unavailable, the interface displays:

Data not available

instead of breaking the report.

Project Structure

The project is organized around the Next.js application, reusable UI components, research services, tools, and shared types.

investment-agent/
│
├── app/
│   ├── api/
│   │   └── research/
│   └── ...
│
├── components/
│   ├── NewsCard.tsx
│   ├── RecentSearches.tsx
│   ├── ResultDashboard.tsx
│   ├── ScoreCard.tsx
│   ├── SearchBar.tsx
│   └── SWOTCard.tsx
│
├── lib/
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
│
├── public/
│
├── docs/
│   └── example-runs/
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

.env.local is used locally for secrets and must not be committed or included in the final public repository.

Live Deployment

The application has been successfully deployed to Vercel.

Live Demo

https://ai-investment-research-agent-ebon.vercel.app

The deployed application has been manually tested with:

Apple
NVIDIA
Invalid company input

The production deployment successfully renders the research dashboard and handles both valid and invalid inputs.

LLM Usage & Build Process

AI/LLM tools were used throughout the development process.

AI assistance was used for:

Understanding the assignment
Architecture exploration
Code generation
Code refinement
UI development
Debugging
Error handling
Testing ideas
Documentation
Iterative problem solving

The project was developed iteratively rather than being generated as one large implementation.

The workflow involved:

Understanding the assignment requirements.
Designing the application architecture.
Building the frontend.
Implementing the research API.
Implementing the AI research workflow.
Integrating financial and news research.
Building the structured investment dashboard.
Testing real company inputs.
Testing invalid company inputs.
Resolving dependency and build issues.
Deploying the application to Vercel.
Testing the production deployment.
Finalizing the project documentation.

The development process also involved debugging dependency conflicts, validating production builds, and testing the deployed application with multiple inputs.

What I Would Improve With More Time
1. More Reliable Financial Data Sources

Integrate additional financial data providers and cross-check important metrics across multiple sources.

This would reduce dependency on individual data sources and improve reliability.

2. Source Citations

Display the exact source behind important financial and news claims.

For example:

Revenue
$...
Source: Financial Data Provider

This would make the research more transparent and auditable.

3. Historical Financial Charts

Add visualizations for:

Revenue growth
Profit growth
Earnings
Stock price performance
Valuation trends

over multiple years.

4. Transparent Investment Scoring

Develop a transparent weighted scoring model using factors such as:

Financial health
Growth
Valuation
Market position
Risk
News sentiment

This would make the scoring methodology easier to understand.

5. Improved Confidence Calculation

Confidence could consider:

Amount of available data
Data source quality
Recency of information
Agreement between multiple sources
Completeness of financial metrics
6. Company Comparison

Add the ability to compare multiple companies.

Example:

Apple vs Microsoft vs NVIDIA

Possible comparison metrics:

Revenue
Profit
Market capitalization
P/E ratio
Investment score
Risk
Confidence
7. Portfolio-Level Research

Allow users to enter multiple holdings and generate portfolio-level research and risk insights.

8. Automated Testing

Add automated tests for:

API validation
Research workflow
Tool failures
Missing data
Invalid company names
Structured AI output
Frontend error states
9. Production Monitoring

Add production monitoring, logging, and automated evaluation of AI outputs.

Limitations

The application is an AI-powered investment research prototype.

The quality of generated analysis depends on:

Availability of company information
Accuracy of external data sources
Recency of news
Availability of APIs
LLM reasoning
Completeness of available financial data

For companies with limited publicly available information, the application may produce limited or lower-quality analysis.

The generated recommendation should not be treated as a guaranteed prediction of future stock performance.

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