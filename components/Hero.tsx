"use client";

import SearchBar from "./SearchBar";

interface HeroProps {
  company: string;
  setCompany: (value: string) => void;
  onAnalyze: () => void;
}

export default function Hero({
  company,
  setCompany,
  onAnalyze,
}: HeroProps) {
  return (
    <section className="text-center">
      <h1 className="text-6xl font-extrabold text-white">
        AI Investment Research Agent
      </h1>

      <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
        Research any public company using AI, latest news,
        financial data and market insights.
      </p>

      <SearchBar
        company={company}
        setCompany={setCompany}
        onAnalyze={onAnalyze}
      />
    </section>
  );
}