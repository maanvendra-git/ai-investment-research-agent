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

  return(

    <main className="investment-page min-h-screen px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <Hero
          company={company}
          setCompany={setCompany}
          onAnalyze={analyzeCompany}
        />
        </div>

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

               <div
  className={`rounded-2xl border px-7 py-5 text-center shadow-lg transition-all duration-300 ${
    report.recommendation === "INVEST"
      ? "border-emerald-400/30 bg-emerald-500/10 shadow-emerald-500/10"
      : "border-red-400/30 bg-red-500/10 shadow-red-500/10"
  }`}
>
                  <p className="text-sm text-slate-400">
                    Recommendation
                  </p>

                  <p
  className={`mt-1 text-3xl font-extrabold tracking-wide ${
    report.recommendation === "INVEST"
      ? "text-emerald-400"
      : "text-red-400"
  }`}
>
                    {report.recommendation || "N/A"}
                  </p>
                </div>

              </div>

              {/* SCORE + CONFIDENCE */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="group rounded-2xl border border-slate-700/70 bg-slate-800/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-slate-800">
                
                  <p className="text-sm text-slate-400">
                    Investment Score
                  </p>

                  <p className="mt-2 text-5xl font-extrabold text-blue-400">
                    {report.score ?? "N/A"}

                    {report.score !== undefined && (
                      <span className="text-lg text-slate-500">
                        /100
                      </span>
                    )}
                  </p>

                {report.score !== undefined && (
  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700">
    <div
      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000"
      style={{ width: `${report.score}%` }}
    />
  </div>
)}

                </div>

                <div className="group rounded-2xl border border-slate-700/70 bg-slate-800/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:bg-slate-800">
                  <p className="text-sm text-slate-400">
                    Confidence
                  </p>

                  <p className="mt-2 text-5xl font-extrabold text-purple-400">
                    {report.confidence ?? "N/A"}

                    {report.confidence !== undefined && "%"}
                  </p>
                </div>

              </div>
            </div>

            {/* SUMMARY */}
            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-7 text-white shadow-lg shadow-black/10 transition-all duration-300 hover:border-blue-400/30">

              <h3 className="text-xl font-bold tracking-tight text-white">
                Summary
              </h3>

              <p className="mt-4 leading-7 text-slate-300/95">
                {report.summary || "No summary available."}
              </p>

            </div>

            {/* FINANCIAL ANALYSIS */}
            {report.financialAnalysis && (
              <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-7 text-white shadow-lg shadow-black/10 transition-all duration-300 hover:border-blue-400/30">

                <h3 className="text-xl font-bold tracking-tight text-blue-400">
                  Financial Analysis
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">

                  <div className="rounded-xl border border-slate-700/60 bg-slate-800/80 p-4 transition-all duration-300 hover:border-blue-400/30 hover:bg-slate-800">
                    <p className="text-sm text-slate-400">
                      Revenue
                    </p>
                    <p className="mt-2 text-slate-200">
                      {report.financialAnalysis.revenue ||
                        "Data not available"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-700/60 bg-slate-800/80 p-4 transition-all duration-300 hover:border-blue-400/30 hover:bg-slate-800">
                    <p className="text-sm text-slate-400">
                      Profit
                    </p>
                    <p className="mt-2 text-slate-200">
                      {report.financialAnalysis.profit ||
                        "Data not available"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-700/60 bg-slate-800/80 p-4 transition-all duration-300 hover:border-blue-400/30 hover:bg-slate-800">
                    <p className="text-sm text-slate-400">
                      Market Cap
                    </p>
                    <p className="mt-2 text-slate-200">
                      {report.financialAnalysis.marketCap ||
                        "Data not available"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-700/60 bg-slate-800/80 p-4 transition-all duration-300 hover:border-blue-400/30 hover:bg-slate-800">
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
              <div className="rounded-2xl border border-green-500/30 bg-slate-900/80 p-6 text-white shadow-lg shadow-green-500/5 transition-all duration-300 hover:border-green-400/50 hover:-translate-y-0.5">

                <h3 className="flex items-center gap-2 text-xl font-bold text-green-400">
                 💪 Strengths
                </h3>

                <ul className="mt-5 space-y-3">
                  {(report.strengths ?? []).length > 0 ? (
                    report.strengths!.map(
                      (item: string, index: number) => (
                        <li
                          key={index}
                          className="rounded-lg border border-green-500/10 bg-slate-800/50 px-3 py-2.5 text-sm leading-6 text-slate-300 transition-all duration-200 hover:border-green-400/30 hover:bg-slate-800"
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
<div className="group rounded-2xl border border-yellow-500/30 bg-slate-900 p-6 text-white shadow-lg transition-all duration-300 hover:border-yellow-400/60 hover:shadow-yellow-500/10">

  <div className="mb-5 flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-xl">
      ⚠️
    </div>

    <div>
      <h3 className="text-xl font-bold text-yellow-400">
        Weaknesses
      </h3>

      <p className="text-sm text-slate-400">
        Key factors that may negatively impact the investment
      </p>
    </div>
  </div>

  <div className="space-y-3">
    {report.weaknesses && report.weaknesses.length > 0 ? (
      report.weaknesses.map(
        (item: string, index: number) => (
          <div
            key={index}
            className="rounded-xl border border-slate-700/70 bg-slate-800/60 p-4 transition-all duration-200 hover:border-yellow-500/30 hover:bg-slate-800"
          >
            <div className="flex items-start gap-3">

              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 text-xs font-bold text-yellow-400">
                {index + 1}
              </span>

              <p className="leading-relaxed text-slate-200">
                {item}
              </p>

            </div>
          </div>
        )
      )
    ) : (
      <div className="rounded-xl border border-slate-700/70 bg-slate-800/60 p-4">
        <p className="text-slate-500">
          No weakness data available.
        </p>
      </div>
    )}
  </div>

</div>

             {/* OPPORTUNITIES */}
<div className="group rounded-2xl border border-blue-500/30 bg-slate-900 p-6 text-white shadow-lg transition-all duration-300 hover:border-blue-400/60 hover:shadow-blue-500/10">

  <div className="mb-5 flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
      🚀
    </div>

    <div>
      <h3 className="text-xl font-bold text-blue-400">
        Opportunities
      </h3>

      <p className="text-sm text-slate-400">
        Growth opportunities that could improve the investment outlook
      </p>
    </div>
  </div>

  <div className="space-y-3">
    {report.opportunities && report.opportunities.length > 0 ? (
      report.opportunities.map(
        (item: string, index: number) => (
          <div
            key={index}
            className="rounded-xl border border-slate-700/70 bg-slate-800/60 p-4 transition-all duration-200 hover:border-blue-500/30 hover:bg-slate-800"
          >
            <div className="flex items-start gap-3">

              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-400">
                {index + 1}
              </span>

              <p className="leading-relaxed text-slate-200">
                {item}
              </p>

            </div>
          </div>
        )
      )
    ) : (
      <div className="rounded-xl border border-slate-700/70 bg-slate-800/60 p-4">
        <p className="text-slate-500">
          No opportunity data available.
        </p>
      </div>
    )}
  </div>

</div>

             {/* THREATS */}
<div className="group rounded-2xl border border-red-500/30 bg-slate-900 p-6 text-white shadow-lg transition-all duration-300 hover:border-red-400/60 hover:shadow-red-500/10">

  <div className="mb-5 flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-xl">
      🛡️
    </div>

    <div>
      <h3 className="text-xl font-bold text-red-400">
        Threats
      </h3>

      <p className="text-sm text-slate-400">
        External factors that could negatively affect the company
      </p>
    </div>
  </div>

  <div className="space-y-3">
    {report.threats && report.threats.length > 0 ? (
      report.threats.map(
        (item: string, index: number) => (
          <div
            key={index}
            className="rounded-xl border border-slate-700/70 bg-slate-800/60 p-4 transition-all duration-200 hover:border-red-500/30 hover:bg-slate-800"
          >
            <div className="flex items-start gap-3">

              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-bold text-red-400">
                {index + 1}
              </span>

              <p className="leading-relaxed text-slate-200">
                {item}
              </p>

            </div>
          </div>
        )
      )
    ) : (
      <div className="rounded-xl border border-slate-700/70 bg-slate-800/60 p-4">
        <p className="text-slate-500">
          No threat data available.
        </p>
      </div>
    )}
  </div>

</div>

           {/* INVESTMENT RISKS */}
<div className="rounded-2xl border border-red-500/30 bg-slate-900/80 p-6 text-white shadow-lg shadow-red-500/5">
  <div className="flex items-center gap-3 mb-5">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-xl">
      ⚠️
    </div>

    <div>
      <h3 className="text-xl font-bold text-red-400">
        Investment Risks
      </h3>
      <p className="text-sm text-slate-400">
        Key factors that could negatively impact the investment
      </p>
    </div>
  </div>

  <div className="space-y-3">
    {report.risks && report.risks.length > 0 ? (
      report.risks.map((item: string, index: number) => (
        <div
          key={index}
          className="flex items-start gap-3 rounded-xl border border-red-500/10 bg-slate-800/60 p-4 transition hover:border-red-500/30"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-sm text-red-400">
            {index + 1}
          </span>

          <p className="text-sm leading-6 text-slate-300">
            {item}
          </p>
        </div>
      ))
    ) : (
      <div className="rounded-xl bg-slate-800/60 p-4">
        <p className="text-sm text-slate-500">
          No risk data available.
        </p>
      </div>
    )}
  </div>
</div>

           {/* LATEST NEWS */}
<div className="rounded-2xl border border-blue-500/30 bg-slate-900/80 p-6 text-white shadow-lg shadow-blue-500/5">
  <div className="flex items-center gap-3 mb-5">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
      📰
    </div>

    <div>
      <h3 className="text-xl font-bold text-blue-400">
        Latest News
      </h3>
      <p className="text-sm text-slate-400">
        Recent developments that may influence the investment outlook
      </p>
    </div>
  </div>

  <div className="space-y-3">
    {report.newsAnalysis && report.newsAnalysis.length > 0 ? (
      report.newsAnalysis.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border border-blue-500/10 bg-slate-800/60 p-4 transition hover:border-blue-500/30 hover:bg-slate-800"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-sm">
              📰
            </div>

            <div className="min-w-0">
              <p className="font-semibold leading-6 text-slate-100">
                {item.headline || "Latest News"}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {item.takeaway || "No takeaway available."}
              </p>
            </div>
          </div>
        </div>
      ))
    ) : report.news && report.news.length > 0 ? (
      report.news.map((item: string, index: number) => (
        <div
          key={index}
          className="rounded-xl border border-blue-500/10 bg-slate-800/60 p-4 transition hover:border-blue-500/30 hover:bg-slate-800"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-sm">
              📰
            </div>

            <p className="text-sm leading-6 text-slate-300">
              {item}
            </p>
          </div>
        </div>
      ))
    ) : null}
  </div>
</div>
        </div>

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

      </div>)}
    </main>
  );
}