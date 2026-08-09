export interface InvestmentReport {
  company: string;
  score: number;
  recommendation: "INVEST" | "PASS";
  confidence: number;
  summary: string;

  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];

  news: string[];
  risks: string[];
}