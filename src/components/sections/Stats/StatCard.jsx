import Card from "../../ui/Card";

export default function StatCard({
  value,
  label,
}) {
  return (
    <Card className="text-center py-12">
      <p className="text-5xl font-bold tracking-tight text-neutral-950">
        {value}
      </p>

      <p className="mt-4 text-neutral-600">
        {label}
      </p>
    </Card>
  );
}