"use client";

import { useState } from "react";
import Loading from "@/components/Loading";
import Hero from "@/components/Hero";
import RecentSearches from "@/components/RecentSearches";
import FeatureCard from "@/components/FeatureCard";

type Report = {
  company?: string;
  recommendation?: string;
  score?: number;
  confidence?: number;
  summary?: string;

  financialAnalysis?: {
    revenue?: string;
    profit?: string;
    marketCap?: string;
    peRatio?: string;
    analysis?: string;
  };

  newsAnalysis?: {
    headline?: string;
    takeaway?: string;
  }[];

  strengths?: string[];
  weaknesses?: string[];
  opportunities?: string[];
  threats?: string[];
  risks?: string[];
  news?: string[];
};

type ApiResult = {
  success?: boolean;
  report?: Report;
  error?: string;
};

export default function Home() {
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);

  const analyzeCompany = async () => {
    if (!company.trim()) {
      alert("Please enter a company name.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: company.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Research request failed");
      }

      setResult(data);
    } catch (error) {
      console.error("Research error:", error);

      setResult({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while researching the company.",
      });
    } finally {
      setLoading(false);
    }
  };

  const report = result?.report;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Hero
          company={company}
          setCompany={setCompany}
          onAnalyze={analyzeCompany}
        />

        {loading && <Loading />}

        {result?.error && !loading && (
          <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-950/30 p-6 text-red-300">
            <h2 className="text-xl font-bold">Research Error</h2>
            <p className="mt-2">{result.error}</p>
          </div>
        )}

        {report && !loading && (
          <div className="mt-8 space-y-6">

            {/* TOP INVESTMENT SUMMARY */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white">

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                  <p className="text-sm text-slate-400">
                    AI Investment Research Report
                  </p>

                  <h2 className="mt-1 text-3xl font-bold">
                    {report.company || company}
                  </h2>
                </div>

                <div className="rounded-xl bg-green-500/10 px-6 py-4 text-center">
                  <p className="text-sm text-slate-400">
                    Recommendation
                  </p>

                  <p
                    className={`text-2xl font-bold ${
                      report.recommendation === "INVEST"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {report.recommendation || "N/A"}
                  </p>
                </div>

              </div>

              {/* SCORE + CONFIDENCE */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">

                <div className="rounded-xl bg-slate-800 p-5">
                  <p className="text-sm text-slate-400">
                    Investment Score
                  </p>

                  <p className="mt-2 text-4xl font-bold text-blue-400">
                    {report.score ?? "N/A"}

                    {report.score !== undefined && (
                      <span className="text-lg text-slate-500">
                        /100
                      </span>
                    )}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-800 p-5">
                  <p className="text-sm text-slate-400">
                    Confidence
                  </p>

                  <p className="mt-2 text-4xl font-bold text-purple-400">
                    {report.confidence ?? "N/A"}

                    {report.confidence !== undefined && "%"}
                  </p>
                </div>

              </div>
            </div>

            {/* SUMMARY */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white">

              <h3 className="text-xl font-bold">
                Summary
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                {report.summary || "No summary available."}
              </p>

            </div>

            {/* FINANCIAL ANALYSIS */}
            {report.financialAnalysis && (
              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white">

                <h3 className="text-xl font-bold text-blue-400">
                  Financial Analysis
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">

                  <div className="rounded-xl bg-slate-800 p-4">
                    <p className="text-sm text-slate-400">
                      Revenue
                    </p>
                    <p className="mt-2 text-slate-200">
                      {report.financialAnalysis.revenue ||
                        "Data not available"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-800 p-4">
                    <p className="text-sm text-slate-400">
                      Profit
                    </p>
                    <p className="mt-2 text-slate-200">
                      {report.financialAnalysis.profit ||
                        "Data not available"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-800 p-4">
                    <p className="text-sm text-slate-400">
                      Market Cap
                    </p>
                    <p className="mt-2 text-slate-200">
                      {report.financialAnalysis.marketCap ||
                        "Data not available"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-800 p-4">
                    <p className="text-sm text-slate-400">
                      P/E Ratio
                    </p>
                    <p className="mt-2 text-slate-200">
                      {report.financialAnalysis.peRatio ||
                        "Data not available"}
                    </p>
                  </div>

                </div>

                {report.financialAnalysis.analysis && (
                  <div className="mt-4 rounded-xl bg-slate-800 p-4">
                    <p className="text-sm text-slate-400">
                      Analysis
                    </p>

                    <p className="mt-2 leading-7 text-slate-300">
                      {report.financialAnalysis.analysis}
                    </p>
                  </div>
                )}

              </div>
            )}

            {/* SWOT */}
            <div className="grid gap-6 md:grid-cols-2">

              {/* STRENGTHS */}
              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white">

                <h3 className="text-xl font-bold text-green-400">
                  Strengths
                </h3>

                <ul className="mt-4 space-y-3">
                  {(report.strengths ?? []).length > 0 ? (
                    report.strengths!.map(
                      (item: string, index: number) => (
                        <li
                          key={index}
                          className="text-slate-300"
                        >
                          ✓ {item}
                        </li>
                      )
                    )
                  ) : (
                    <li className="text-slate-500">
                      No strength data available.
                    </li>
                  )}
                </ul>

              </div>

              {/* WEAKNESSES */}
              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white">

                <h3 className="text-xl font-bold text-yellow-400">
                  Weaknesses
                </h3>

                <ul className="mt-4 space-y-3">
                  {(report.weaknesses ?? []).length > 0 ? (
                    report.weaknesses!.map(
                      (item: string, index: number) => (
                        <li
                          key={index}
                          className="text-slate-300"
                        >
                          • {item}
                        </li>
                      )
                    )
                  ) : (
                    <li className="text-slate-500">
                      No weakness data available.
                    </li>
                  )}
                </ul>

              </div>

              {/* OPPORTUNITIES */}
              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white">

                <h3 className="text-xl font-bold text-blue-400">
                  Opportunities
                </h3>

                <ul className="mt-4 space-y-3">
                  {(report.opportunities ?? []).length > 0 ? (
                    report.opportunities!.map(
                      (item: string, index: number) => (
                        <li
                          key={index}
                          className="text-slate-300"
                        >
                          ↑ {item}
                        </li>
                      )
                    )
                  ) : (
                    <li className="text-slate-500">
                      No opportunity data available.
                    </li>
                  )}
                </ul>

              </div>

              {/* THREATS */}
              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white">

                <h3 className="text-xl font-bold text-red-400">
                  Threats
                </h3>

                <ul className="mt-4 space-y-3">
                  {(report.threats ?? []).length > 0 ? (
                    report.threats!.map(
                      (item: string, index: number) => (
                        <li
                          key={index}
                          className="text-slate-300"
                        >
                          ⚠ {item}
                        </li>
                      )
                    )
                  ) : (
                    <li className="text-slate-500">
                      No threat data available.
                    </li>
                  )}
                </ul>

              </div>

            </div>

            {/* INVESTMENT RISKS */}
            <div className="rounded-2xl border border-red-500/20 bg-slate-900 p-6 text-white">

              <h3 className="text-xl font-bold text-red-400">
                Investment Risks
              </h3>

              <ul className="mt-4 space-y-3">
                {(report.risks ?? []).length > 0 ? (
                  report.risks!.map(
                    (item: string, index: number) => (
                      <li
                        key={index}
                        className="text-slate-300"
                      >
                        ⚠ {item}
                      </li>
                    )
                  )
                ) : (
                  <li className="text-slate-500">
                    No risk data available.
                  </li>
                )}
              </ul>

            </div>

            {/* LATEST NEWS */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white">

              <h3 className="text-xl font-bold text-blue-400">
                Latest News
              </h3>

              <div className="mt-4 space-y-4">

                {report.newsAnalysis &&
                report.newsAnalysis.length > 0 ? (
                  report.newsAnalysis.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="rounded-xl bg-slate-800 p-4"
                      >

                        <p className="font-semibold text-slate-200">
                          📰 {item.headline || "News"}
                        </p>

                        <p className="mt-2 text-slate-400">
                          {item.takeaway ||
                            "No takeaway available."}
                        </p>

                      </div>
                    )
                  )
                ) : report.news && report.news.length > 0 ? (
                  report.news.map(
                    (item: string, index: number) => (
                      <div
                        key={index}
                        className="rounded-xl bg-slate-800 p-4 text-slate-300"
                      >
                        📰 {item}
                      </div>
                    )
                  )
                ) : (
                  <p className="text-slate-500">
                    No latest news available.
                  </p>
                )}

              </div>

            </div>

          </div>
        )}

        {/* RECENT SEARCHES */}
        <RecentSearches />

        {/* FEATURE CARDS */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">

          <FeatureCard
            title="AI Research"
            description="Uses AI to analyze company fundamentals and market trends."
          />

          <FeatureCard
            title="Latest News"
            description="Collects recent news to understand current market sentiment."
          />

          <FeatureCard
            title="Investment Decision"
            description="Provides an Invest or Pass recommendation with confidence."
          />

        </div>

      </div>
    </main>
  );
}