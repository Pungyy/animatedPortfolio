export default function SectionTitle({
  title,
  description,
}) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white">
        {title}
      </h1>

      {description && (
        <p className="mt-2 text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}