export default function RecentSearches() {
  const companies = [
    "Tesla",
    "Apple",
    "Microsoft",
    "Nvidia",
    "Amazon",
    "Google",
  ];

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-3">
      {companies.map((company) => (
        <button
          key={company}
          className="rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-gray-300 hover:border-blue-500 hover:text-white transition"
        >
          {company}
        </button>
      ))}
    </div>
  );
}