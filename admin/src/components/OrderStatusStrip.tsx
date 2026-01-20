const STATUSES = [
  { label: "Pending", value: 12, color: "--color-warning" },
  { label: "Shipped", value: 34, color: "--color-info" },
  { label: "Delivered", value: 120, color: "--color-success" },
]

export default function OrderStatusStrip() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {STATUSES.map(s => (
        <div
          key={s.label}
          className="rounded-xl bg-[hsl(var(--color-surface))] p-4 shadow-sm"
        >
          <p className="text-sm text-[hsl(var(--text-muted))]">
            {s.label}
          </p>

          <p
            className="mt-2 text-2xl font-semibold"
            style={{ color: `hsl(var(${s.color}))` }}
          >
            {s.value}
          </p>
        </div>
      ))}
    </div>
  )
}
