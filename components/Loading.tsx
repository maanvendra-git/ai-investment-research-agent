export default function Loading() {
  return (
    <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-white text-2xl font-bold">
        Researching Company...
      </h2>

      <div className="mt-8 space-y-4">

        <p className="text-gray-400">
          🔎 Searching latest news...
        </p>

        <p className="text-gray-400">
          📊 Reading financial statements...
        </p>

        <p className="text-gray-400">
          🏢 Analysing competitors...
        </p>

        <p className="text-gray-400">
          ⚠️ Finding risks...
        </p>

        <p className="text-gray-400">
          🤖 AI generating report...
        </p>

      </div>
    </div>
  );
}