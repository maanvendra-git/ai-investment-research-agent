"use client";

interface SearchBarProps {
  company: string;
  setCompany: (value: string) => void;
  onAnalyze: () => void;
}

export default function SearchBar({
  company,
  setCompany,
  onAnalyze,
}: SearchBarProps) {
  return (
    <div className="mt-10 flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Enter company name (Tesla, Apple, Nvidia...)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none focus:border-blue-500"
      />

      <button
        onClick={onAnalyze}
        className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700 transition"
      >
        Analyze
      </button>
    </div>
  );
}