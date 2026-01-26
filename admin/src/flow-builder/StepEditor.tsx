import type { Field, Step } from "../types/flow"
import { FieldEditor } from "./FieldEditor"


export function StepEditor({
  step,
  stepIndex,
  allSteps,
  onChange,
  onDelete,
}: {
  step: Step
  stepIndex: number
  allSteps: Step[]
  onChange: (s: Step) => void
  onDelete: () => void
}) {
  const updateField = (index: number, field: Field) => {
    const fields = [...step.fields]
    fields[index] = field
    onChange({ ...step, fields })
  }

//   const addField = () => {
//     onChange({
//       ...step,
//       fields: [
//         ...step.fields,
//         {
//           label: "New Field",
//           type: "single_select",
//           options: [],
//         },
//       ],
//     })
//   }

const addField = () => {
  onChange({
    ...step,
    fields: [
      ...step.fields,
      {
        label: "New Field",
        type: "single_select",
        options: [],
        enable_variants: false,   // ✅ default OFF
      },
    ],
  })
}

  

  return (
    <div className="border rounded bg-white p-4 space-y-3">

      <div className="flex gap-2">
        <input
          className="border p-2 rounded flex-1"
          value={step.title}
          onChange={(e) =>
            onChange({ ...step, title: e.target.value })
          }
        />
        <button
          onClick={onDelete}
          className="text-red-600 font-bold"
        >
          ✕
        </button>
      </div>

      {step.fields.map((field, index) => (
        <FieldEditor
          key={index}
          field={field}
          stepIndex={stepIndex}
          allSteps={allSteps}
          onChange={(f) => updateField(index, f)}
        />
      ))}

      <button
        onClick={addField}
        className="text-blue-600 text-sm"
      >
        + Add Field
      </button>

    </div>
  )
}
