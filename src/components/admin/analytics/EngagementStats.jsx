import Card from "../ui/Card";

export default function EngagementStats({ engagement = [] }) {
  const total = engagement.reduce((sum, item) => sum + item.total, 0);

  return (
    <Card title="Engagement" description="Actions clés sur la période.">
      {engagement.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">
          Aucune action enregistrée.
        </p>
      ) : (
        <div className="space-y-3">
          {engagement.map((item) => {
            const pct = total ? Math.round((item.total / total) * 100) : 0;

            return (
              <div key={item.key}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm text-[var(--text-secondary)]">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">
                    {item.total}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
