interface ResultDashboardProps {
  data: any;
}

export default function ResultDashboard({
  data,
}: ResultDashboardProps) {
  return (
    <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white capitalize">
            {data.company}
          </h2>

          <p className="mt-2 text-gray-400">
            AI Investment Research Report
          </p>

        </div>

        <div className="rounded-xl bg-green-600 px-5 py-3 text-xl font-bold text-white">
          Backend Connected
        </div>

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">

        <div className="rounded-xl bg-slate-800 p-6">

          <p className="text-gray-400">
            Status
          </p>

          <h3 className="mt-3 text-3xl font-bold text-green-400">
            Success
          </h3>

        </div>

        <div className="rounded-xl bg-slate-800 p-6">

          <p className="text-gray-400">
            Company
          </p>

          <h3 className="mt-3 text-3xl font-bold text-white capitalize">
            {data.company}
          </h3>

        </div>

        <div className="rounded-xl bg-slate-800 p-6">

          <p className="text-gray-400">
            Message
          </p>

          <h3 className="mt-3 text-lg font-semibold text-blue-400">
            {data.message}
          </h3>

        </div>

      </div>

    </div>
  );
}