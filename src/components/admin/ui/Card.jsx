export default function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
      {title && (
        <h2 className="mb-6 text-xl font-semibold text-white">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}