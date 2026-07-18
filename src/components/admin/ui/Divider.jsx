export default function Divider({
  title,
}) {
  return (
    <div className="border-t border-zinc-800 pt-8">
      <h3 className="mb-6 text-lg font-semibold text-white">
        {title}
      </h3>
    </div>
  );
}