interface Props {
  title: string;
  description: string;
}

export default function FeatureCard({
  title,
  description,
}: Props) {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <h3 className="text-white text-xl font-bold">
        {title}
      </h3>

      <p className="text-gray-400 mt-3">
        {description}
      </p>
    </div>
  );
}