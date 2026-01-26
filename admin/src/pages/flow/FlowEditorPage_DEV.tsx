import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getFlow, saveFlow } from "../../api/flowManager.api"

/* ============================ */
/* TYPES */
/* ============================ */

export type Variant = {
  variant_id?: number
  label: string
  price?: number
  image_url?: string
}
export type OptionMeta = {
  price?: number

  // ❌ remove this
  // depends_on_option_ids?: number[]

  // ✅ replace with string keys
  depends_on_option_keys?: string[]

  rooms?: Record<string, number>
  measurements?: string[]
}

export type Option = {
  option_id?: number
  temp_id?: string        // ✅ NEW
  label: string
  image_url?: string
  meta: OptionMeta
  variants: Variant[]
}
export type Field = {
  field_id?: number
  label: string
  type: "single_select" | "multi_select"
  options: Option[]
}

export type Step = {
  step_id?: number
  title: string
  fields: Field[]
}

/* ============================ */
/* COMPONENT */
/* ============================ */

export default function FlowEditorPage({
  mode,
}: {
  mode: "create" | "edit"
}) {
  const { id } = useParams()
  const nav = useNavigate()

  const [flow, setFlow] = useState({
    name: "",
    type: "configurator",
  })

  const [steps, setSteps] = useState<Step[]>([])

  /* ============================ */
  /* LOAD FLOW (EDIT MODE) */
  /* ============================ */

  useEffect(() => {
    if (mode === "edit" && id) {
      getFlow(Number(id)).then((res) => {
        const result = res.data.result

        setFlow({
          name: result.flow.name,
          type: result.flow.flow_type,
        })

        const mappedSteps: Step[] = result.steps.map((s: any) => ({
          step_id: s.step_id,
          title: s.title,
          fields: s.fields.map((f: any) => ({
            field_id: f.field_id,
            label: f.label,
            type: f.field_type,
            options: f.options.map((o: any) => ({
              option_id: o.option_id,
              label: o.label,
              image_url: o.image_url,
              meta: o.meta || {},
              variants: [],
            })),
          })),
        }))

        setSteps(mappedSteps)
      })
    }
  }, [id, mode])

  /* ============================ */
  /* HELPERS */
  /* ============================ */

  const addStep = () => {
    setSteps([
      ...steps,
      {
        title: `Step ${steps.length + 1}`,
        fields: [],
      },
    ])
  }

  const updateStep = (index: number, updated: Step) => {
    const clone = [...steps]
    clone[index] = updated
    setSteps(clone)
  }

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index))
  }

  /* ============================ */
  /* SAVE */
  /* ============================ */

  const save = async () => {
    await saveFlow({
      flow: {
        flow_id: mode === "edit" ? Number(id) : "",
        name: flow.name,
        type: flow.type,
      },
      steps,
    })

    alert("Flow Saved Successfully ✅")
    nav("/flows")
  }

  /* ============================ */
  /* UI */
  /* ============================ */

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">
        {mode === "create" ? "Create Flow" : "Edit Flow"}
      </h1>

      {/* FLOW INFO */}
      <div className="border rounded p-4 bg-white grid grid-cols-2 gap-4">

        <div>
          <label className="text-sm font-medium">Flow Name</label>
          <input
            className="border p-2 w-full rounded mt-1"
            value={flow.name}
            onChange={(e) =>
              setFlow({ ...flow, name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium">Flow Type</label>
          <select
            className="border p-2 w-full rounded mt-1"
            value={flow.type}
            onChange={(e) =>
              setFlow({ ...flow, type: e.target.value })
            }
          >
            <option value="configurator">Configurator</option>
            <option value="quiz">Quiz</option>
            <option value="survey">Survey</option>
          </select>
        </div>

      </div>

      {/* STEPS */}
      <div className="space-y-4">

        {steps.map((step, stepIndex) => (
          <StepCard
            key={stepIndex}
            step={step}
            stepIndex={stepIndex}
            allSteps={steps}
            onChange={(s) => updateStep(stepIndex, s)}
            onDelete={() => removeStep(stepIndex)}
          />
        ))}

        <button
          onClick={addStep}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          + Add Step
        </button>
      </div>

      {/* SAVE */}
      <button 
        onClick={save}
        className="px-6 py-3 rounded bg-black text-white"
      >
        Save Flow
      </button>

    </div>
  )
}

/* ====================================================== */
/* STEP CARD */
/* ====================================================== */

function StepCard({
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

  const addField = () => {
    onChange({
      ...step,
      fields: [
        ...step.fields,
        {
          label: "New Field",
          type: "single_select",
          options: [],
        },
      ],
    })
  }

  return (
    <div className="border rounded bg-white p-4 space-y-3">

      <div className="flex justify-between items-center">
        <input
          className="border p-2 rounded w-full mr-2"
          value={step.title}
          onChange={(e) =>
            onChange({ ...step, title: e.target.value })
          }
        />
        <button onClick={onDelete} className="text-red-600">
          ✕
        </button>
      </div>

      {step.fields.map((field, i) => (
        <FieldCard
          key={i}
          field={field}
          stepIndex={stepIndex}
          allSteps={allSteps}
          onChange={(f) => updateField(i, f)}
        />
      ))}

      <button
        onClick={addField}
        className="text-sm text-blue-600"
      >
        + Add Field
      </button>

    </div>
  )
}

/* ====================================================== */
/* FIELD CARD */
/* ====================================================== */

function FieldCard({
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
          temp_id: crypto.randomUUID(),   // ✅ UNIQUE
          label: "Option",
          image_url: "",
          meta: { price: 0, depends_on_option_keys: [] },
          variants: [],
        },
      ],
    })
  }

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
          })
        }
      >
        <option value="single_select">Single Select</option>
        <option value="multi_select">Multi Select</option>
      </select>

      {field.options.map((opt, i) => (
        <OptionCard
          key={i}
          option={opt}
          stepIndex={stepIndex}
          allSteps={allSteps}
          onChange={(o) => updateOption(i, o)}
        />
      ))}

      <button
        onClick={addOption}
        className="text-xs text-blue-600"
      >
        + Add Option
      </button>

    </div>
  )
}

/* ====================================================== */
/* OPTION CARD */
/* ====================================================== */

function OptionCard({
  option,
  stepIndex,
  allSteps,
  onChange,
}: {
  option: Option
  stepIndex: number
  allSteps: Step[]
  onChange: (o: Option) => void
}) {

  // const previousOptions =
  //   stepIndex > 0
  //     ? allSteps[stepIndex - 1].fields.flatMap(f => f.options)
  //     : []

  const previousOptions =
    stepIndex > 0
      ? allSteps[stepIndex - 1].fields.flatMap(f => f.options)
      : []

  const getOptionKey = (o: Option) =>
    o.option_id
      ? `db-${o.option_id}`
      : `tmp-${o.temp_id}`

  const toggleDependency = (key: string) => {
    const current = option.meta.depends_on_option_keys || []

    const updated = current.includes(key)
      ? current.filter(k => k !== key)
      : [...current, key]

    onChange({
      ...option,
      meta: {
        ...option.meta,
        depends_on_option_keys: updated,   // ✅ fixed
      },
    })

  }

  return (
    <div className="border rounded p-3 bg-white space-y-2">

      <input
        className="border p-2 w-full rounded"
        placeholder="Option Label"
        value={option.label}
        onChange={(e) =>
          onChange({ ...option, label: e.target.value })
        }
      />

      <input
        className="border p-2 w-full rounded"
        placeholder="Image URL"
        value={option.image_url || ""}
        onChange={(e) =>
          onChange({ ...option, image_url: e.target.value })
        }
      />

      <input
        type="number"
        className="border p-2 w-full rounded"
        placeholder="Price"
        value={option.meta.price || 0}
        onChange={(e) =>
          onChange({
            ...option,
            meta: {
              ...option.meta,
              price: Number(e.target.value),
            },
          })
        }
      />

      {/* DEPENDENCY CHIPS */}
      {previousOptions.map(prev => {
        const key = getOptionKey(prev)

        const selected =
          option.meta.depends_on_option_keys?.includes(key as any)

        return (
          <button
            key={key}
            type="button"
            onClick={() => toggleDependency(key)}
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
  )
}





// import { useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { getFlow, saveFlow } from "../../api/flowManager.api"

// /* ============================
//    TYPES
// ============================ */

// export type Variant = {
//   variant_id?: number
//   label: string
//   price?: number
//   image_url?: string
// }

// export type OptionMeta = {
//   price?: number
//   show_steps?: number[]
//   rooms?: Record<string, number>
//   measurements?: string[]
// }

// export type Option = {
//   option_id?: number
//   temp_id?: string   // ✅ add this
//   label: string
//   image_url?: string
//   meta: OptionMeta
//   variants: Variant[]
// }

// export type Field = {
//   field_id?: number
//   label: string
//   type: "single_select" | "multi_select"
//   options: Option[]
// }

// export type Step = {
//   step_id?: number
//   title: string
//   fields: Field[]
//   depends_on_options?: (string | number)[]
// }
// /* ============================
//    COMPONENT
// ============================ */

// export default function FlowEditorPage({
//   mode,
// }: {
//   mode: "create" | "edit"
// }) {
//   const { id } = useParams()
//   const nav = useNavigate()

//   const [flow, setFlow] = useState({
//     name: "",
//     type: "configurator",
//   })

//   const [steps, setSteps] = useState<Step[]>([])
//   const [showAddModal, setShowAddModal] = useState(false)

//   /* ============================
//       LOAD FLOW (EDIT MODE)
//   ============================ */

//   useEffect(() => {
//     if (mode === "edit" && id) {
//       getFlow(Number(id)).then((res) => {
//         const result = res.data.result

//         setFlow({
//           name: result.flow.name,
//           type: result.flow.flow_type,
//         })

//         const mappedSteps: Step[] = result.steps.map((s: any) => ({
//           step_id: s.step_id,
//           title: s.title,
//           depends_on_options: s.depends_on_options || [],
//           fields: s.fields.map((f: any) => ({
//             field_id: f.field_id,
//             label: f.label,
//             type: f.field_type,
//             options: f.options.map((o: any) => ({
//               option_id: o.option_id,
//               label: o.label,
//               image_url: o.image_url,
//               meta: o.meta || {},
//               variants: (o.variants || []).map((v: any) => ({
//                 variant_id: v.variant_id,
//                 label: v.label,
//                 price: Number(v.price || 0),
//                 image_url: v.image_url,
//               })),
//             })),
//           })),
//         }))

//         setSteps(mappedSteps)
//       })
//     }
//   }, [id, mode])

//   /* ============================
//       HELPERS
//   ============================ */

//   const updateStep = (index: number, updated: Step) => {
//     const clone = [...steps]
//     clone[index] = updated
//     setSteps(clone)
//   }

//   const removeStep = (index: number) => {
//     setSteps(steps.filter((_, i) => i !== index))
//   }

//   /* ============================
//       SAVE FLOW
//   ============================ */

//   const save = async () => {
//     await saveFlow({
//       flow: {
//         flow_id: mode === "edit" ? Number(id) : "",
//         name: flow.name,
//         type: flow.type,
//       },
//       steps,
//     })

//     alert("Flow Saved Successfully ✅")
//     nav("/flows")
//   }

//   /* ============================
//       UI
//   ============================ */

//   return (
//     <div className="p-8 max-w-7xl mx-auto space-y-6">

//       {/* HEADER */}
//       <h1 className="text-2xl font-bold">
//         {mode === "create" ? "Create Flow" : "Edit Flow"}
//       </h1>

//       {/* FLOW INFO */}
//       <div className="border rounded p-4 bg-white grid grid-cols-2 gap-4">
//         <div>
//           <label className="text-sm font-medium">Flow Name</label>
//           <input
//             className="border p-2 w-full rounded mt-1"
//             value={flow.name}
//             onChange={(e) =>
//               setFlow({ ...flow, name: e.target.value })
//             }
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Flow Type</label>
//           <select
//             className="border p-2 w-full rounded mt-1"
//             value={flow.type}
//             onChange={(e) =>
//               setFlow({ ...flow, type: e.target.value })
//             }
//           >
//             <option value="configurator">Configurator</option>
//             <option value="quiz">Quiz</option>
//             <option value="survey">Survey</option>
//           </select>
//         </div>
//       </div>

//       {/* STEPS */}
//       <div className="space-y-4">
//         {steps.map((step, stepIndex) => {
//           const previousOptions =
//             stepIndex > 0
//               ? steps[stepIndex - 1].fields.flatMap(f => f.options)
//               : []

//           return (
//             <StepCard
//               key={stepIndex}
//               step={step}
//               stepIndex={stepIndex}
//               previousOptions={previousOptions}
//               onChange={(s) => updateStep(stepIndex, s)}
//               onDelete={() => removeStep(stepIndex)}
//             />
//           )
//         })}
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="px-4 py-2 rounded bg-blue-600 text-white"
//         >
//           + Add Step
//         </button>
//       </div>

//       {/* SAVE */}
//       <div>
//         <button
//           onClick={save}
//           className="px-6 py-3 rounded bg-black text-white"
//         >
//           Save Flow
//         </button>
//       </div>

//       {/* ADD STEP MODAL */}
//       {showAddModal && (
//         <AddStepModal
//           steps={steps}
//           onClose={() => setShowAddModal(false)}
//           onCreate={(newStep) => {
//             setSteps([...steps, newStep])
//             setShowAddModal(false)
//           }}
//         />
//       )}
//     </div>
//   )
// }

// /* ======================================================
//    STEP CARD
// ====================================================== */

// function StepCard({
//   step,
//   stepIndex,
//   previousOptions,
//   onChange,
//   onDelete,
// }: {
//   step: Step
//   stepIndex: number
//   previousOptions: Option[]
//   onChange: (s: Step) => void
//   onDelete: () => void
// }) {
//   const isDependent = (step.depends_on_options?.length || 0) > 0

//   return (
//     <div className="border rounded bg-white p-4 space-y-3">

//       {/* TITLE */}
//       <div className="flex justify-between items-center gap-2">
//         <input
//           className="border p-2 rounded w-full"
//           placeholder="Step Title"
//           value={step.title}
//           onChange={(e) =>
//             onChange({ ...step, title: e.target.value })
//           }
//         />
//         <button onClick={onDelete} className="text-red-600">
//           ✕
//         </button>
//       </div>

//       {/* DEPENDENCY TOGGLE */}
//       {stepIndex > 0 && (
//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             checked={isDependent}
//             onChange={(e) =>
//               onChange({
//                 ...step,
//                 depends_on_options: e.target.checked ? [] : undefined,
//               })
//             }
//           />
//           Use Previous Step Options (Dependent)
//         </label>
//       )}

//       {/* DEPENDENCY DROPDOWN */}
//       {stepIndex > 0 && isDependent && (
//         <select
//           multiple
//           className="border p-2 rounded w-full h-32"
//           value={(step.depends_on_options || []).map(String)}
//           onChange={(e) => {
//             const values = Array.from(e.target.selectedOptions).map(
//               (o) => o.value
//             )

//             onChange({
//               ...step,
//               depends_on_options: values,
//             })
//           }}
//         >
//           {previousOptions.map((opt) => {
//             const value = opt.option_id || opt.temp_id

//             return (
//               <option key={value} value={value}>
//                 {opt.label}
//               </option>
//             )
//           })}
//         </select>
//       )}

//       {/* FIELDS */}
//       {step.fields.map((field, i) => (
//         <FieldCard
//           key={i}
//           field={field}
//           onChange={(f) => {
//             const clone = [...step.fields]
//             clone[i] = f
//             onChange({ ...step, fields: clone })
//           }}
//         />
//       ))}

//       <button
//         onClick={() =>
//           onChange({
//             ...step,
//             fields: [
//               ...step.fields,
//               {
//                 label: "New Field",
//                 type: "single_select",
//                 options: [],
//               },
//             ],
//           })
//         }
//         className="text-sm text-blue-600"
//       >
//         + Add Field
//       </button>
//     </div>
//   )
// }


// /* ======================================================
//    FIELD CARD
// ====================================================== */

// function FieldCard({
//   field,
//   onChange,
// }: {
//   field: Field
//   onChange: (f: Field) => void
// }) {
//   const addOption = () => {
//     onChange({
//       ...field,
//       options: [
//         ...field.options,
//         {
//           label: "Option",
//           image_url: "",
//           meta: {},
//           variants: [],
//         },
//       ],
//     })
//   }

//   const updateOption = (index: number, option: Option) => {
//     const options = [...field.options]
//     options[index] = option
//     onChange({ ...field, options })
//   }

//   return (
//     <div className="border rounded p-3 bg-gray-50 space-y-3">
//       <input
//         className="border p-2 w-full rounded"
//         value={field.label}
//         onChange={(e) =>
//           onChange({ ...field, label: e.target.value })
//         }
//       />

//       <select
//         className="border p-2 rounded"
//         value={field.type}
//         onChange={(e) =>
//           onChange({
//             ...field,
//             type: e.target.value as any,
//           })
//         }
//       >
//         <option value="single_select">Single Select</option>
//         <option value="multi_select">Multi Select</option>
//       </select>

//       {field.options.map((opt, i) => (
//         <OptionCard
//           key={i}
//           option={opt}
//           onChange={(o) => updateOption(i, o)}
//         />
//       ))}

//       <button
//         onClick={addOption}
//         className="text-xs text-blue-600"
//       >
//         + Add Option
//       </button>
//     </div>
//   )
// }

// /* ======================================================
//    OPTION CARD
// ====================================================== */

// function OptionCard({
//   option,
//   onChange,
// }: {
//   option: Option
//   onChange: (o: Option) => void
// }) {
//   return (
//     <div className="border rounded p-3 bg-white space-y-2">

//       <input
//         className="border p-2 w-full rounded"
//         placeholder="Option Label"
//         value={option.label}
//         onChange={(e) =>
//           onChange({ ...option, label: e.target.value })
//         }
//       />

//       <input
//         className="border p-2 w-full rounded"
//         placeholder="Image URL"
//         value={option.image_url || ""}
//         onChange={(e) =>
//           onChange({ ...option, image_url: e.target.value })
//         }
//       />

//       <input
//         type="number"
//         className="border p-2 w-full rounded"
//         placeholder="Price"
//         value={option.meta?.price || 0}
//         onChange={(e) =>
//           onChange({
//             ...option,
//             meta: {
//               ...option.meta,
//               price: Number(e.target.value),
//             },
//           })
//         }
//       />
//     </div>
//   )
// }

// /* ======================================================
//    ADD STEP MODAL
// ====================================================== */

// function AddStepModal({
//   steps,
//   onClose,
//   onCreate,
// }: {
//   steps: Step[]
//   onClose: () => void
//   onCreate: (s: Step) => void
// }) {
//   const prevStep = steps[steps.length - 1]
//   const previousOptions =
//     prevStep?.fields.flatMap((f) => f.options) || []

//   const [title, setTitle] = useState("")
//   const [useDependency, setUseDependency] = useState(false)
//   const [selectedOptions, setSelectedOptions] = useState<number[]>([])

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white rounded p-5 w-[420px] space-y-4">

//         <h3 className="font-semibold text-lg">Create New Step</h3>

//         <input
//           className="border p-2 w-full rounded"
//           placeholder="Step Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         {previousOptions.length > 0 && (
//           <label className="flex items-center gap-2 text-sm">
//             <input
//               type="checkbox"
//               checked={useDependency}
//               onChange={(e) => setUseDependency(e.target.checked)}
//             />
//             Use Previous Step Options (Dependent)
//           </label>
//         )}

//         {useDependency && (
//           <select
//             multiple
//             className="border rounded w-full p-2 h-28"
//             value={selectedOptions.map(String)}
//             onChange={(e) => {
//               const values = Array.from(
//                 e.target.selectedOptions
//               ).map((o) => Number(o.value))
//               setSelectedOptions(values)
//             }}
//           >
//             {previousOptions.map((opt) => (
//               <option key={opt.option_id} value={opt.option_id}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         )}

//         <div className="flex justify-end gap-2 pt-2">
//           <button
//             onClick={onClose}
//             className="px-3 py-1 border rounded"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={() =>
//               onCreate({
//                 title: title || `Step ${steps.length + 1}`,
//                 fields: [],
//                 depends_on_options: useDependency
//                   ? selectedOptions
//                   : [],
//               })
//             }
//             className="px-4 py-1 bg-blue-600 text-white rounded"
//           >
//             Create Step
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }


// import { useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import StepEditor from "./StepEditor"
// import { getFlow, saveFlow } from "../../api/flowManager.api"

// /* ============================
//    TYPES
// ============================ */

// type Variant = {
//   variant_id?: number
//   label: string
//   price?: number
//   image_url?: string
//   meta?: any
// }

// type Option = {
//   option_id?: number
//   label: string
//   image_url?: string
//   meta?: {
//     price?: number
//   }
//   variants: Variant[]
// }

// type Field = {
//   field_id?: number
//   label: string
//   type: string
//   options: Option[]
// }

// type Step = {
//   step_id?: number
//   title: string
//   fields: Field[]
// }

// /* ============================
//    COMPONENT
// ============================ */

// export default function FlowEditorPage({ mode }:{mode:"create"|"edit"}) {

//   const { id } = useParams()
//   const nav = useNavigate()

//   const [flow,setFlow] = useState({
//     name:"",
//     type:"configurator"
//   })

//   const [steps,setSteps] = useState<Step[]>([])

//   /* ================================
//       LOAD FLOW FOR EDIT MODE
//   ================================= */

//   useEffect(() => {
//     if (mode === "edit" && id) {
//       getFlow(Number(id)).then((res) => {
//         const result = res.data.result

//         // ✅ Flow Info
//         setFlow({
//           name: result.flow.name,
//           type: result.flow.flow_type,
//         })

//         // ✅ Map Steps → Fields → Options → Variants
//         const mappedSteps: Step[] = result.steps.map((s: any) => ({
//           step_id: s.step_id,
//           title: s.title,
//           fields: s.fields.map((f: any) => ({
//             field_id: f.field_id,
//             label: f.label,
//             type: f.field_type,
//             options: f.options.map((o: any) => ({
//               option_id: o.option_id,
//               label: o.label,
//               image_url: o.image_url,
//               meta: o.meta || {},
//               variants: (o.variants || []).map((v:any)=>({
//                 variant_id: v.variant_id,
//                 label: v.label,
//                 price: v.price,
//                 image_url: v.image_url,
//                 meta: v.meta || {}
//               }))
//             })),
//           })),
//         }))

//         setSteps(mappedSteps)
//       })
//     }
//   }, [id, mode])

//   /* ================================
//       SAVE FLOW
//   ================================= */

//   const save = async () => {
//     await saveFlow({
//       flow: {
//         flow_id: mode === "edit" ? Number(id) : "",
//         name: flow.name,
//         type: flow.type
//       },
//       steps
//     })

//     nav("/flows")
//   }

//   /* ================================
//       UI
//   ================================= */

//   return (
//     <div className="p-8 max-w-6xl mx-auto">

//       <h1 className="text-2xl font-bold mb-4">
//         {mode === "create" ? "Create Flow" : "Edit Flow"}
//       </h1>

//       {/* FLOW INFO */}
//       <div className="border p-4 rounded mb-4 bg-white">

//         <label className="block text-sm font-medium mb-1">
//           Flow Name
//         </label>

//         <input
//           className="border p-2 w-full mb-3 rounded"
//           placeholder="Flow Name"
//           value={flow.name}
//           onChange={e=>setFlow({...flow,name:e.target.value})}
//         />

//         <label className="block text-sm font-medium mb-1">
//           Flow Type
//         </label>

//         <select
//           className="border p-2 w-full rounded"
//           value={flow.type}
//           onChange={e=>setFlow({...flow,type:e.target.value})}
//         >
//           <option value="configurator">Configurator</option>
//           <option value="quiz">Quiz</option>
//           <option value="survey">Survey</option>
//         </select>
//       </div>

//       {/* STEPS */}
//       <StepEditor steps={steps} setSteps={setSteps} />

//       {/* ACTION */}
//       <div className="mt-6">
//         <button
//           onClick={save}
//           className="bg-black text-white px-6 py-2 rounded"
//         >
//           Save Flow
//         </button>
//       </div>

//     </div>
//   )
// }




// // import { useEffect, useState } from "react"
// // import { useParams, useNavigate } from "react-router-dom"
// // import StepEditor from "./StepEditor"
// // import { getFlow, saveFlow } from "../../api/flowManager.api"

// // type Option = {
// //   option_id?: number
// //   label: string
// // }

// // type Field = {
// //   field_id?: number
// //   label: string
// //   type: string
// //   options: Option[]
// // }

// // type Step = {
// //   step_id?: number
// //   title: string
// //   fields: Field[]
// // }

// // export default function FlowEditorPage({ mode }:{mode:"create"|"edit"}) {

// //   const { id } = useParams()
// //   const nav = useNavigate()

// //   const [flow,setFlow] = useState({
// //     name:"",
// //     type:"configurator"
// //   })

// //   const [steps,setSteps] = useState<Step[]>([])

// //   /* ================================
// //       LOAD FLOW FOR EDIT MODE
// //   ================================= */

// //   useEffect(() => {
// //     if (mode === "edit" && id) {
// //       getFlow(Number(id)).then((res) => {
// //         const result = res.data.result

// //         // ✅ Flow Info
// //         setFlow({
// //           name: result.flow.name,
// //           type: result.flow.flow_type,
// //         })

// //         // ✅ Steps Mapping
// //         const mappedSteps: Step[] = result.steps.map((s: any) => ({
// //           step_id: s.step_id,
// //           title: s.title,
// //           fields: s.fields.map((f: any) => ({
// //             field_id: f.field_id,
// //             label: f.label,
// //             type: f.field_type,
// //             options: f.options.map((o: any) => ({
// //               option_id: o.option_id,
// //               label: o.label,
// //             })),
// //           })),
// //         }))

// //         setSteps(mappedSteps)
// //       })
// //     }
// //   }, [id, mode])

// //   /* ================================
// //       SAVE FLOW
// //   ================================= */

// //   const save = async () => {
// //     // await saveFlow({
// //     //   flow,
// //     //   steps
// //     // })

// //     await saveFlow({
// //     flow: {
// //       flow_id: mode === "edit" ? Number(id) :"",   // ✅ IMPORTANT
// //       name: flow.name,
// //       type: flow.type
// //     },
// //     steps
// //   })
// //     nav("/flows")
// //   }

// //   /* ================================
// //       UI
// //   ================================= */

// //   return (
// //     <div className="p-8 max-w-6xl mx-auto">

// //       <h1 className="text-2xl font-bold mb-4">
// //         {mode === "create" ? "Create Flow" : "Edit Flow"}
// //       </h1>

// //       {/* FLOW INFO */}
// //       <div className="border p-4 rounded mb-4 bg-white">

// //         <label className="block text-sm font-medium mb-1">
// //           Flow Name
// //         </label>

// //         <input
// //           className="border p-2 w-full mb-3 rounded"
// //           placeholder="Flow Name"
// //           value={flow.name}
// //           onChange={e=>setFlow({...flow,name:e.target.value})}
// //         />

// //         <label className="block text-sm font-medium mb-1">
// //           Flow Type
// //         </label>

// //         <select
// //           className="border p-2 w-full rounded"
// //           value={flow.type}
// //           onChange={e=>setFlow({...flow,type:e.target.value})}
// //         >
// //           <option value="configurator">Configurator</option>
// //           <option value="quiz">Quiz</option>
// //           <option value="survey">Survey</option>
// //         </select>
// //       </div>

// //       {/* STEPS */}
// //       <StepEditor steps={steps} setSteps={setSteps} />

// //       {/* ACTION */}
// //       <div className="mt-6">
// //         <button
// //           onClick={save}
// //           className="bg-black text-white px-6 py-2 rounded"
// //         >
// //           Save Flow
// //         </button>
// //       </div>

// //     </div>
// //   )
// // }
