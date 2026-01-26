import type { NumberMeta } from "../types/flow"

type Props = {
  value: NumberMeta
  onChange: (meta: NumberMeta) => void
}

const UNITS = ["ft", "cm", "mm", "sqft", "qty"]

export default function NumberConfigEditor({
  value,
  onChange,
}: Props) {

  const update = (patch: Partial<NumberMeta>) => {
    onChange({ ...value, ...patch })
  }

  return (
    <div className="border rounded p-3 bg-blue-50 space-y-3">

      <div className="font-medium text-sm text-blue-700">
        Number Field Configuration
      </div>

      {/* Input Mode */}
      <div>
        <label className="text-xs">Input Mode</label>
        <select
          className="border p-2 rounded w-full"
          value={value.input_mode}
          onChange={(e) =>
            update({ input_mode: e.target.value as NumberMeta["input_mode"] })
          }
        >
          <option value="stepper">Stepper (+ / -)</option>
          <option value="dropdown">Dropdown</option>
          <option value="fixed">Fixed Display</option>
        </select>
      </div>

      {/* Unit */}
      <div>
        <label className="text-xs">Unit</label>
        <select
          className="border p-2 rounded w-full"
          value={value.unit}
          onChange={(e) =>
            update({ unit: e.target.value as NumberMeta["unit"] })
          }
        >
          {UNITS.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      {/* Stepper Config */}
      {value.input_mode === "stepper" && (
        <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            placeholder="Min"
            className="border p-2 rounded"
            value={value.min ?? ""}
            onChange={(e) =>
              update({ min: Number(e.target.value) })
            }
          />

          <input
            type="number"
            placeholder="Max"
            className="border p-2 rounded"
            value={value.max ?? ""}
            onChange={(e) =>
              update({ max: Number(e.target.value) })
            }
          />

          <input
            type="number"
            placeholder="Step"
            className="border p-2 rounded"
            value={value.step ?? ""}
            onChange={(e) =>
              update({ step: Number(e.target.value) })
            }
          />
        </div>
      )}

      {/* Dropdown Values */}
      {value.input_mode === "dropdown" && (
        <div>
          <label className="text-xs">
            Values (comma separated)
          </label>

          <input
            className="border p-2 rounded w-full"
            placeholder="100,200,300"
            value={(value.values || []).join(",")}
            onChange={(e) =>
              update({
                values: e.target.value
                  .split(",")
                  .map((v) => Number(v.trim()))
                  .filter((n) => !isNaN(n)),
              })
            }
          />
        </div>
      )}

      {/* Fixed */}
      {value.input_mode === "fixed" && (
        <div className="text-xs text-gray-600">
          Value will be calculated automatically in runtime.
        </div>
      )}

    </div>
  )
}
