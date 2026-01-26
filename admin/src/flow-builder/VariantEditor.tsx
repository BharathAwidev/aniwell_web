import type { Variant } from "../types/flow"

export function VariantEditor({
  variant,
  onChange,
  onDelete,
}: {
  variant: Variant
  onChange: (v: Variant) => void
  onDelete: () => void
}) {
  return (
    <div className="border rounded p-2 bg-gray-50 space-y-2">

      <input
        className="border p-2 rounded w-full"
        placeholder="Variant label (Small / Large)"
        value={variant.label}
        onChange={(e) =>
          onChange({ ...variant, label: e.target.value })
        }
      />

      <input
        className="border p-2 rounded w-full"
        placeholder="Image URL (optional)"
        value={variant.image_url || ""}
        onChange={(e) =>
          onChange({ ...variant, image_url: e.target.value })
        }
      />

      <button
        onClick={onDelete}
        className="text-xs text-red-600"
      >
        Remove Variant
      </button>
    </div>
  )
}
