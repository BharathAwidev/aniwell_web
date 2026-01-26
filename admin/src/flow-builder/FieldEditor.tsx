import type { Field, Option, Step } from "../types/flow"
import NumberConfigEditor from "./NumberFieldEditor"
import { OptionEditor } from "./OptionEditor"


export function FieldEditor({
    field,
    stepIndex,
    allSteps,
    onChange,
}: {
    field: Field
    stepIndex: number
    allSteps: Step[]
    onChange: (f: Field) => void
}) {
    const addOption = () => {
        onChange({
            ...field,
            options: [
                ...field.options,
                {
                    temp_id: crypto.randomUUID(),
                    label: "Option",
                    image_url: "",
                    meta: {},
                    variants: [],
                },
            ],
        })
    }
const getOptionKey = (o: Option) =>
  o.option_id ? `db-${o.option_id}` : `tmp-${o.temp_id}`
    const updateOption = (index: number, option: Option) => {
        const options = [...field.options]
        options[index] = option
        onChange({ ...field, options })
    }

    return (
        <div className="border rounded p-3 bg-gray-50 space-y-3">

            <input
                className="border p-2 w-full rounded"
                value={field.label}
                onChange={(e) =>
                    onChange({ ...field, label: e.target.value })
                }
            />

            <select
                className="border p-2 rounded"
                value={field.type}
                onChange={(e) =>
                    onChange({
                        ...field,
                        type: e.target.value as any,
                        number_meta:
                            e.target.value === "number"
                                ? {
                                    input_mode: "stepper",
                                    unit: "ft",
                                    min: 0,
                                    step: 1,
                                }
                                : undefined,
                        options:
                            e.target.value === "number" ? [] : field.options,
                    })
                }
            >
                <option value="single_select">Single Select</option>
                <option value="multi_select">Multi Select</option>
                <option value="number">Number</option>
            </select>

            {/* DEPENDENCY CONFIG */}
{stepIndex > 0 && (
  <div className="border rounded p-3 bg-yellow-50 space-y-2">

    <div className="text-xs font-semibold text-yellow-700">
      Show this field only when previous step options selected
    </div>

    <div className="flex flex-wrap gap-2">
      {allSteps[stepIndex - 1].fields
        .flatMap(f => f.options)
        .map(prevOpt => {

          const key = getOptionKey(prevOpt)
          const selected =
            field.meta?.depends_on_option_keys?.includes(key)

          const toggle = () => {
            const current = field.meta?.depends_on_option_keys || []

            const updated = selected
              ? current.filter(k => k !== key)
              : [...current, key]

            onChange({
              ...field,
              meta: {
                ...field.meta,
                depends_on_option_keys: updated,
              },
            })
          }

          return (
            <button
              key={key}
              type="button"
              onClick={toggle}
              className={`px-3 py-1 rounded-full text-xs border transition
                ${
                  selected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {prevOpt.label}
            </button>
          )
        })}
    </div>

    {field.meta?.depends_on_option_keys?.length ? (
      <div className="text-[11px] text-gray-500">
        Visible when any selected option matches.
      </div>
    ) : (
      <div className="text-[11px] text-gray-400">
        No dependency → field always visible.
      </div>
    )}

  </div>
)}


            {/* Number Config */}
            {field.type === "number" && field.number_meta && (
                <NumberConfigEditor
                    value={field.number_meta}
                    onChange={(meta) =>
                        onChange({ ...field, number_meta: meta })
                    }
                />
            )}

            {field.type !== "number" && (
                <>

                    {field.options.map((opt, i) => (
                        <OptionEditor
                            key={i}
                            option={opt}
                            stepIndex={stepIndex}
                            allSteps={allSteps}
                            enableVariants={field.enable_variants === true}  
                            onChange={(o) => updateOption(i, o)}
                        />
                    ))}

                    <button
                        onClick={addOption}
                        className="text-xs text-blue-600"
                    >
                        + Add Option
                    </button>

                </>
            )}

            {field.type !== "number" && (
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={field.enable_variants ?? false}
                        onChange={(e) =>
                            onChange({
                                ...field,
                                enable_variants: e.target.checked,
                            })
                        }
                    />
                    Enable variants for options (eg: Small / Large)
                </label>
            )}

        </div>
    )
}
