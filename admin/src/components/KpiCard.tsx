import type { ReactNode } from "react"


type Props = {
  label: string
  value: string
  icon?: ReactNode
}

export default function KpiCard({ label, value, icon }: Props) {
  return (
    <div className="rounded-xl bg-[hsl(var(--color-surface))] p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[hsl(var(--text-muted))]">
          {label}
        </p>
        {icon}
      </div>

      <p className="mt-2 text-2xl font-semibold text-[hsl(var(--text-primary))]">
        {value}
      </p>
    </div>
  )
}
