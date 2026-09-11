export function SimpleBarChart({
  data,
  valueFormatter = (v: number) => String(v),
}: {
  data: { label: string; value: number }[];
  valueFormatter?: (v: number) => string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.label}>
          <div className="mb-1 flex items-center justify-between text-xs font-medium text-ck-text-muted">
            <span>{d.label}</span>
            <span>{valueFormatter(d.value)}</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-ck-border/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-electric-500 to-violet-500 transition-[width] duration-700"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
