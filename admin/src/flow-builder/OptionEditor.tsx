import type { Option, Step, Variant } from "../types/flow"
import { VariantEditor } from "./VariantEditor"

export function OptionEditor({
    option,
    stepIndex,
    allSteps,
    enableVariants,
    onChange,
}: {
    option: Option
    stepIndex: number
    allSteps: Step[]
    enableVariants : boolean
    onChange: (o: Option) => void
}) {
    const previousOptions =
        stepIndex > 0
            ? allSteps[stepIndex - 1].fields.flatMap(f => f.options)
            : []

    const toggleDependency = (label: string) => {
        const current = option.meta?.depends_on_labels ?? []

        const updated = current.includes(label)
            ? current.filter(l => l !== label)
            : [...current, label]

        onChange({
            ...option,
            meta: {
                ...option.meta,
                depends_on_labels: updated,
            },
        })
    }


    const addVariant = () => {
        onChange({
            ...option,
            variants: [
                ...option.variants,
                {
                    id: crypto.randomUUID(),
                    label: "Small",
                    image_url: "",
                },
            ],
        })
    }

    const updateVariant = (index: number, variant: Variant) => {
        const variants = [...option.variants]
        variants[index] = variant
        onChange({ ...option, variants })
    }

    const removeVariant = (index: number) => {
        onChange({
            ...option,
            variants: option.variants.filter((_, i) => i !== index),
        })
    }


    return (
        <div className="border rounded p-3 bg-white space-y-2">

            {/* OPTION LABEL */}
            <input
                className="border p-2 w-full rounded"
                placeholder="Option Label"
                value={option.label}
                onChange={(e) =>
                    onChange({ ...option, label: e.target.value })
                }
            />

            {/* IMAGE URL (optional) */}
            <input
                className="border p-2 w-full rounded"
                placeholder="Image URL (optional)"
                value={option.image_url || ""}
                onChange={(e) =>
                    onChange({ ...option, image_url: e.target.value })
                }
            />

            {/* VARIANTS */}
            {enableVariants && (
            <div className="border-t pt-3 space-y-2">
                <div className="text-xs font-semibold">
                    Variants (Small / Large etc)
                </div>

                {option.variants.map((v, i) => (
                    <VariantEditor
                        key={v.id}
                        variant={v}
                        onChange={(nv) => updateVariant(i, nv)}
                        onDelete={() => removeVariant(i)}
                    />
                ))}

                <button
                    onClick={addVariant}
                    className="text-xs text-blue-600"
                >
                    + Add Variant
                </button>
            </div>
)}
            {/* DEPENDENCY CHIPS */}
            {previousOptions.length > 0 && (
                <div>
                    <div className="text-xs font-medium mb-1">
                        Show this option when previous step selected:
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {previousOptions.map(prev => {
                            const selected =
                                option.meta?.depends_on_labels?.includes(prev.label)

                            return (
                                <button
                                    key={prev.label}
                                    type="button"
                                    onClick={() => toggleDependency(prev.label)}
                                    className={`px-3 py-1 rounded-full text-xs border transition
                    ${selected
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-white text-gray-700"
                                        }
                  `}
                                >
                                    {prev.label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
