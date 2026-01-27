import { useEffect, useState } from "react"
import type { Field, Flow, NumberMeta, Option } from "../types/flow"
import flowJson from "../mock/flow.json"

export default function RuntimeStepperPage() {
  const [flow, setFlow] = useState<Flow | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})

  useEffect(() => {
    // Replace with API later
    setFlow(flowJson as Flow)
  }, [])

  if (!flow) return <div className="p-10">Loading...</div>

  const step = flow.steps[currentStep]

  /* ============================
      HELPERS
  ============================ */

  const getOptionKey = (o: Option) =>
    o.option_id ? `db-${o.option_id}` : `tmp-${o.temp_id}`

  const setValue = (key: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const toggleMulti = (key: string, value: string) => {
    const arr = answers[key] || []
    setValue(
      key,
      arr.includes(value)
        ? arr.filter((v: string) => v !== value)
        : [...arr, value]
    )
  }

  const selectVariant = (optionKey: string, variantId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [`variant-${optionKey}`]: variantId,
    }))
  }

  /* ============================
      DEPENDENCY FILTER
  ============================ */

  const isFieldVisible = (field: Field) => {
    const deps = field.meta?.depends_on_option_keys

    if (!deps || deps.length === 0) return true

    const selectedKeys = Object.values(answers)

    return deps.some((dep) =>
      selectedKeys.includes(dep)
    )
  }

  /* ============================
      UI
  ============================ */

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-6">

      {/* FLOW TITLE */}
      <h1 className="text-3xl font-bold text-center">
        {flow.name}
      </h1>

      {/* STEPPER HEADER */}
      <div className="flex items-center justify-between">
        {flow.steps.map((s, i) => (
          <div key={i} className="flex-1 flex items-center">

            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold
                ${i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-500"}
              `}
            >
              {i + 1}
            </div>

            <div className="ml-2 text-sm font-medium">
              {s.title}
            </div>

            {i < flow.steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-3 bg-gray-300" />
            )}
          </div>
        ))}
      </div>

      {/* STEP CONTENT */}
      <div className="bg-white border rounded-xl p-6 space-y-6">

        <h2 className="text-xl font-semibold">
          {step.title}
        </h2>

        {step.fields
          .filter(isFieldVisible)
          .map((field, fi) => {

            const fieldKey = `${currentStep}-${fi}`

            return (
              <div key={fi} className="space-y-3">

                <div className="font-medium">
                  {field.label}
                </div>

                {/* ================= SINGLE / MULTI ================= */}
                {(field.type === "single_select" ||
                  field.type === "multi_select") && (
                  <div className="grid grid-cols-2 gap-4">

                    {field.options?.map((opt) => {
                      const optionKey = getOptionKey(opt)

                      const selected =
                        field.type === "single_select"
                          ? answers[fieldKey] === optionKey
                          : (answers[fieldKey] || []).includes(optionKey)

                      const selectedVariant =
                        answers[`variant-${optionKey}`]

                      return (
                        <div key={optionKey} className="border rounded-lg overflow-hidden">

                          {/* OPTION BUTTON */}
                          <button
                            onClick={() =>
                              field.type === "single_select"
                                ? setValue(fieldKey, optionKey)
                                : toggleMulti(fieldKey, optionKey)
                            }
                            className={`w-full p-4 text-left transition flex justify-between
                              ${selected
                                ? "bg-gray-100 border-black"
                                : "hover:bg-gray-50"}
                            `}
                          >
                            <div className="font-medium">{opt.label}</div>
                            {opt.variants?.length ? (
                              <span className="text-gray-400">▾</span>
                            ) : null}
                          </button>

                          {/* VARIANTS */}
                          {selected && opt.variants?.length ? (
                            <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 border-t">

                              {opt.variants.map((v) => {
                                const active =
                                  selectedVariant === v.id

                                return (
                                  <button
                                    key={v.id}
                                    onClick={() =>
                                      selectVariant(optionKey, v.id!)
                                    }
                                    className={`border rounded p-3 text-sm text-left transition
                                      ${active
                                        ? "border-black bg-white"
                                        : "hover:bg-white"}
                                    `}
                                  >
                                    <div className="font-medium">
                                      {v.label}
                                    </div>
                                  </button>
                                )
                              })}

                            </div>
                          ) : null}

                        </div>
                      )
                    })}

                  </div>
                )}

                {/* ================= NUMBER ================= */}
                {field.type === "number" && field.number_meta && (
                  <NumberStepper
                    value={answers[fieldKey] ?? field.number_meta.min ?? 0}
                    meta={field.number_meta}
                    onChange={(v) => setValue(fieldKey, v)}
                  />
                )}

              </div>
            )
          })}
      </div>

      {/* NAVIGATION */}
      <div className="flex justify-between">

        <button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((s) => s - 1)}
          className="px-6 py-2 rounded border disabled:opacity-40"
        >
          Back
        </button>

        {currentStep < flow.steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep((s) => s + 1)}
            className="px-6 py-2 rounded bg-black text-white"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => console.log("FINAL ANSWERS", answers)}
            className="px-6 py-2 rounded bg-green-600 text-white"
          >
            Finish
          </button>
        )}

      </div>
    </div>
  )
}

/* ======================================================
   NUMBER STEPPER
====================================================== */

function NumberStepper({
  value,
  meta,
  onChange,
}: {
  value: number
  meta: NumberMeta
  onChange: (v: number) => void
}) {
  const step = meta.step || 1
  const min = meta.min ?? 0
  const max = meta.max ?? Infinity

  const inc = () => {
    const next = value + step
    if (next <= max) onChange(next)
  }

  const dec = () => {
    const next = value - step
    if (next >= min) onChange(next)
  }

  return (
    <div className="flex items-center gap-4">

      <button
        onClick={dec}
        className="w-10 h-10 rounded border text-xl"
      >
        −
      </button>

      <div className="text-lg font-semibold min-w-[80px] text-center">
        {value} {meta.unit}
      </div>

      <button
        onClick={inc}
        className="w-10 h-10 rounded border text-xl"
      >
        +
      </button>

    </div>
  )
}


// import { useEffect, useState } from "react"
// import type { Flow, NumberMeta } from "../types/flow"
// import flowJson from "../mock/flow.json"

// export default function RuntimeStepperPage() {
//     const [flow, setFlow] = useState<Flow | null>(null)
//     const [currentStep, setCurrentStep] = useState(0)
//     const [answers, setAnswers] = useState<Record<string, any>>({})

//     useEffect(() => {
//         // replace with API later
//         setFlow(flowJson as Flow)
//     }, [])

//     if (!flow) return <div className="p-10">Loading...</div>

//     const step = flow.steps[currentStep]

//     /* ============================
//         HELPERS
//     ============================ */

//     const setValue = (key: string, value: any) => {
//         setAnswers((prev) => ({ ...prev, [key]: value }))
//     }

//     const toggleMulti = (key: string, value: string) => {
//         const arr = answers[key] || []
//         setValue(
//             key,
//             arr.includes(value)
//                 ? arr.filter((v: string) => v !== value)
//                 : [...arr, value]
//         )
//     }
//     const selectVariant = (optionId: string, variantId: string) => {
//         setAnswers((prev) => ({
//             ...prev,
//             [`variant-${optionId}`]: variantId,
//         }))
//     }

//     /* ============================
//         UI
//     ============================ */

//     return (
//         <div className="p-10 max-w-6xl mx-auto space-y-6">

//             {/* TITLE */}
//             <h1 className="text-3xl font-bold text-center">
//                 {flow.name}
//             </h1>

//             {/* STEPPER HEADER */}
//             <div className="flex items-center justify-between">
//                 {flow.steps.map((s, i) => (
//                     <div key={i} className="flex-1 flex items-center">

//                         <div
//                             className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold
//                 ${i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-500"}
//               `}
//                         >
//                             {i + 1}
//                         </div>

//                         <div className="ml-2 text-sm font-medium">
//                             {s.title}
//                         </div>

//                         {i < flow.steps.length - 1 && (
//                             <div className="flex-1 h-[2px] mx-3 bg-gray-300" />
//                         )}
//                     </div>
//                 ))}
//             </div>

//             {/* STEP CONTENT */}
//             <div className="bg-white border rounded-xl p-6 space-y-6">

//                 <h2 className="text-xl font-semibold">
//                     {step.title}
//                 </h2>

//                 {step.fields.map((field, fi) => {

//                     const fieldKey = `${currentStep}-${fi}`

//                     return (
//                         <div key={fi} className="space-y-3">

//                             <div className="font-medium">
//                                 {field.label}
//                             </div>

//                             {/* ================= SINGLE / MULTI ================= */}
//                             {(field.type === "single_select" ||
//                                 field.type === "multi_select") && (
//                                     <div className="grid grid-cols-2 gap-4">

//                                         {/* {field.options?.map((opt) => {
//                     const selected =
//                       field.type === "single_select"
//                         ? answers[fieldKey] === opt.temp_id
//                         : (answers[fieldKey] || []).includes(opt.temp_id)

//                     return (
//                       <button
//                         key={opt.temp_id}
//                         onClick={() =>
//                           field.type === "single_select"
//                             ? setValue(fieldKey, opt.temp_id)
//                             : toggleMulti(fieldKey, opt.temp_id!)
//                         }
//                         className={`border rounded-lg p-4 text-left transition
//                           ${selected
//                             ? "border-black bg-gray-100"
//                             : "hover:bg-gray-50"}
//                         `}
//                       >
//                         <div className="font-medium">
//                           {opt.label}
//                         </div>
//                       </button>
//                     )
//                   })} */}

//                                         {field.options?.map((opt) => {
//                                             const selected =
//                                                 field.type === "single_select"
//                                                     ? answers[fieldKey] === opt.temp_id
//                                                     : (answers[fieldKey] || []).includes(opt.temp_id)

//                                             const selectedVariant =
//                                                 answers[`variant-${opt.temp_id}`]

//                                             return (
//                                                 <div key={opt.temp_id} className="border rounded-lg overflow-hidden">

//                                                     {/* OPTION BUTTON */}
//                                                     <button
//                                                         onClick={() =>
//                                                             field.type === "single_select"
//                                                                 ? setValue(fieldKey, opt.temp_id)
//                                                                 : toggleMulti(fieldKey, opt.temp_id!)
//                                                         }
//                                                         className={`w-full p-4 text-left transition flex justify-between
//           ${selected
//                                                                 ? "bg-gray-100 border-black"
//                                                                 : "hover:bg-gray-50"}
//         `}
//                                                     >
//                                                         <div className="font-medium">{opt.label}</div>
//                                                         {opt.variants?.length ? (
//                                                             <span className="text-gray-400">▾</span>
//                                                         ) : null}
//                                                     </button>

//                                                     {/* VARIANTS */}
//                                                     {selected && opt.variants?.length ? (
//                                                         <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 border-t">

//                                                             {opt.variants.map((v) => {
//                                                                 const active = selectedVariant === v.id

//                                                                 return (
//                                                                     <button
//                                                                         key={v.id}
//                                                                         onClick={() =>
//                                                                             selectVariant(opt.temp_id!, v.id!)
//                                                                         }
//                                                                         className={`border rounded p-3 text-sm text-left transition
//                   ${active
//                                                                                 ? "border-black bg-white"
//                                                                                 : "hover:bg-white"}
//                 `}
//                                                                     >
//                                                                         <div className="font-medium">{v.label}</div>
//                                                                     </button>
//                                                                 )
//                                                             })}

//                                                         </div>
//                                                     ) : null}
//                                                 </div>
//                                             )
//                                         })}

//                                     </div>
//                                 )}

//                             {/* ================= NUMBER ================= */}
//                             {field.type === "number" && field.number_meta && (
//                                 <NumberStepper
//                                     value={answers[fieldKey] ?? field.number_meta.min ?? 0}
//                                     meta={field.number_meta}
//                                     onChange={(v) => setValue(fieldKey, v)}
//                                 />
//                             )}

//                         </div>
//                     )
//                 })}
//             </div>

//             {/* NAVIGATION */}
//             <div className="flex justify-between">

//                 <button
//                     disabled={currentStep === 0}
//                     onClick={() => setCurrentStep((s) => s - 1)}
//                     className="px-6 py-2 rounded border disabled:opacity-40"
//                 >
//                     Back
//                 </button>

//                 {currentStep < flow.steps.length - 1 ? (
//                     <button
//                         onClick={() => setCurrentStep((s) => s + 1)}
//                         className="px-6 py-2 rounded bg-black text-white"
//                     >
//                         Next
//                     </button>
//                 ) : (
//                     <button
//                         onClick={() => console.log("FINAL ANSWERS", answers)}
//                         className="px-6 py-2 rounded bg-green-600 text-white"
//                     >
//                         Finish
//                     </button>
//                 )}

//             </div>
//         </div>
//     )
// }

// /* ======================================================
//    NUMBER STEPPER
// ====================================================== */

// function NumberStepper({
//     value,
//     meta,
//     onChange,
// }: {
//     value: number
//     meta: NumberMeta
//     onChange: (v: number) => void
// }) {
//     const step = meta.step || 1
//     const min = meta.min ?? 0
//     const max = meta.max ?? Infinity

//     const inc = () => {
//         const next = value + step
//         if (next <= max) onChange(next)
//     }

//     const dec = () => {
//         const next = value - step
//         if (next >= min) onChange(next)
//     }

//     return (
//         <div className="flex items-center gap-4">

//             <button
//                 onClick={dec}
//                 className="w-10 h-10 rounded border text-xl"
//             >
//                 −
//             </button>

//             <div className="text-lg font-semibold min-w-[80px] text-center">
//                 {value} {meta.unit}
//             </div>

//             <button
//                 onClick={inc}
//                 className="w-10 h-10 rounded border text-xl"
//             >
//                 +
//             </button>

//         </div>
//     )
// }