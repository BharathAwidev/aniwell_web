import { useEffect, useState } from "react"
import { FlowCalciAPI } from "../api/flowcalci"
import { motion, AnimatePresence } from "framer-motion"
import { Home, ChefHat, Shirt } from "lucide-react"

interface Variant {
  variant_id: string
  label: string
}

interface Option {
  option_id: string
  label: string
  variants: Variant[]
}

interface Field {
  field_id: string
  label: string
  options: Option[]
}

interface Step {
  step_id: string
  title: string
  fields: Field[]
}

const services = [
  { name: "Home Interior", flow_id: 3, icon: <Home size={16} /> },
  { name: "Kitchen", flow_id: 4, icon: <ChefHat size={16} /> },
  { name: "Wardrobe", flow_id: 5, icon: <Shirt size={16} /> }
]

export default function PriceCalculationPage() {

  const [activeService, setActiveService] = useState(services[0])
  const [steps, setSteps] = useState<Step[]>([])
  const [current, setCurrent] = useState(0)

  const [selected, setSelected] = useState<any>({})
  const [variant, setVariant] = useState<any>({})

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: ""
  })

  const loadFlow = async (flow_id: number) => {

    const res = await FlowCalciAPI.getAll(flow_id)

    setSteps(res.result.steps)

    setCurrent(0)
    setSelected({})
    setVariant({})
  }

  useEffect(() => {
    loadFlow(activeService.flow_id)
  }, [activeService])

  const totalSteps = steps.length + 1
  const step = steps[current]

  const selectOption = (fieldId: string, option: Option) => {
    setSelected((prev: any) => ({
      ...prev,
      [fieldId]: option
    }))
  }

  const nextDisabled = () => {

    if (current >= steps.length) return false

    const field = step?.fields?.[0]

    return !selected[field?.field_id]
  }

  const nextStep = () => {
    if (current < totalSteps - 1)
      setCurrent(p => p + 1)
  }

  const prevStep = () => {
    if (current > 0)
      setCurrent(p => p - 1)
  }

  const submit = () => {
    console.log({
      service: activeService.name,
      selections: selected,
      variants: variant,
      contact
    })
    alert("Request Submitted")
  }

  return (

    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-5xl mx-auto">

        {/* SERVICE SELECTOR */}

        <div className="bg-white rounded-xl shadow p-4 mb-6">

          <p className="text-sm font-semibold mb-3 text-gray-700">
            Interior Services
          </p>

          <div className="flex flex-wrap gap-3">

            {services.map(service => {

              const active = service.flow_id === activeService.flow_id

              return (

                <button
                  key={service.name}
                  onClick={() => setActiveService(service)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg border transition
  ${active
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-200 hover:border-orange-400"}
  `}
                >

                  {service.icon}

                  {service.name}

                </button>

              )

            })}

          </div>

        </div>


        {/* CALCULATOR CARD */}

        <div className="bg-white rounded-3xl shadow flex flex-col min-h-[420px] max-h-[65vh]">

          {/* STEPPER */}

          <div className="px-6 pt-4 pb-2">

            <div className="relative">

              <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200" />

              <div
                className="absolute top-4 left-0 h-[2px] bg-orange-500 transition-all duration-500"
                style={{ width: `${(current / (totalSteps - 1)) * 100}%` }}
              />

              <div className="flex justify-between relative z-10">

                {[...steps, { title: "Contact" }].map((s: any, index) => {

                  const active = index <= current

                  return (

                    <div key={index} className="flex flex-col items-center w-full">

                      <div
                        className={`w-8 h-8 text-xs rounded-full flex items-center justify-center font-semibold
  ${active
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200 text-gray-500"}
  `}
                      >
                        {index + 1}
                      </div>

                      <span className="text-[11px] mt-1 text-gray-600">
                        {s.title}
                      </span>

                    </div>

                  )

                })}

              </div>

            </div>

          </div>


          {/* STEP CONTENT */}

          <div className="flex-1 overflow-y-auto px-6">

            <AnimatePresence mode="wait">

              <motion.div
                key={current}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: .25 }}
              >

                {current < steps.length && step && (

                  <>
                    {step.fields.map(field => (

                      <div key={field.field_id}>

                        {field.label && (
                          <p className="text-gray-600 text-sm mb-4 font-medium">
                            {field.label}
                          </p>
                        )}

                        <div className="grid md:grid-cols-2 gap-3">

                          {field.options.map(option => {

                            const active =
                              selected[field.field_id]?.option_id === option.option_id

                            return (

                              <div
                                key={option.option_id}
                                onClick={() => selectOption(field.field_id, option)}
                                className={`cursor-pointer border rounded-xl p-3 transition
  ${active
                                    ? "border-orange-500 bg-orange-50 shadow-sm"
                                    : "border-gray-200 hover:border-orange-400 hover:shadow"}
  `}
                              >

                                <div className="flex items-center gap-2">

                                  <div className="bg-gray-100 p-2 rounded-md text-xs">
                                    🏠
                                  </div>

                                  <span className="text-sm font-semibold">
                                    {option.label}
                                  </span>

                                </div>

                              </div>

                            )

                          })}

                        </div>

                      </div>

                    ))}

                  </>
                )}

                {/* CONTACT STEP */}

                {current === steps.length && (

                  <div className="flex justify-center items-center h-full">

                    <div className="w-full max-w-sm">

                      <p className="text-gray-600 text-sm mb-4 font-medium text-center">
                        Enter your contact details
                      </p>

                      <div className="space-y-3">

                        <input
                          placeholder="Full Name"
                          className="w-full border rounded-lg p-3 text-sm"
                          onChange={e => setContact({ ...contact, name: e.target.value })}
                        />

                        <input
                          placeholder="Phone Number"
                          className="w-full border rounded-lg p-3 text-sm"
                          onChange={e => setContact({ ...contact, phone: e.target.value })}
                        />

                        <input
                          placeholder="Email"
                          className="w-full border rounded-lg p-3 text-sm"
                          onChange={e => setContact({ ...contact, email: e.target.value })}
                        />

                      </div>

                    </div>

                  </div>
                )}

              </motion.div>

            </AnimatePresence>

          </div>


          {/* FOOTER */}

          <div className="border-t px-6 py-3 flex justify-between items-center">

            <button
              onClick={prevStep}
              disabled={current === 0}
              className="px-5 py-2 border rounded-lg text-sm text-gray-500 disabled:opacity-40 hover:bg-gray-50"
            >
              Back
            </button>

            {current === totalSteps - 1 ? (

              <button
                onClick={submit}
                className="px-7 py-2 bg-orange-500 text-white text-sm rounded-xl hover:bg-orange-600"
              >
                Submit
              </button>

            ) : (

              <button
                onClick={nextStep}
                disabled={nextDisabled()}
                className={`px-7 py-2 text-sm rounded-xl text-white
  ${nextDisabled()
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"}
  `}
              >
                Next
              </button>

            )}

          </div>

        </div>

      </div>

    </div>

  )
}






// import { useEffect, useState } from "react"
// import { FlowCalciAPI } from "../api/flowcalci"
// import { motion, AnimatePresence } from "framer-motion"
// import { Home, ChefHat, Shirt } from "lucide-react"

// interface Variant {
//   variant_id: string
//   label: string
// }

// interface Option {
//   option_id: string
//   label: string
//   variants: Variant[]
// }

// interface Field {
//   field_id: string
//   label: string
//   options: Option[]
// }

// interface Step {
//   step_id: string
//   title: string
//   fields: Field[]
// }

// const services = [
//   { name: "Home Interior", flow_id: 3, icon: <Home size={18} /> },
//   { name: "Kitchen", flow_id: 4, icon: <ChefHat size={18} /> },
//   { name: "Wardrobe", flow_id: 5, icon: <Shirt size={18} /> }
// ]

// export default function PriceCalculationPage() {

//   const [activeService, setActiveService] = useState(services[0])
//   const [steps, setSteps] = useState<Step[]>([])
//   const [current, setCurrent] = useState(0)

//   const [selected, setSelected] = useState<any>({})
//   const [variant, setVariant] = useState<any>({})

//   const [contact, setContact] = useState({
//     name: "",
//     phone: "",
//     email: ""
//   })

//   const loadFlow = async (flow_id: number) => {

//     const res = await FlowCalciAPI.getAll(flow_id)

//     setSteps(res.result.steps)

//     setCurrent(0)
//     setSelected({})
//     setVariant({})
//   }

//   useEffect(() => {
//     loadFlow(activeService.flow_id)
//   }, [activeService])

//   const totalSteps = steps.length + 1
//   const step = steps[current]

//   const nextStep = () => {
//     if (current < totalSteps - 1)
//       setCurrent(p => p + 1)
//   }

//   const prevStep = () => {
//     if (current > 0)
//       setCurrent(p => p - 1)
//   }

//   const selectOption = (fieldId: string, option: Option) => {
//     setSelected((prev: any) => ({
//       ...prev,
//       [fieldId]: option
//     }))
//   }

//   const submit = () => {

//     console.log({
//       service: activeService.name,
//       selections: selected,
//       variants: variant,
//       contact
//     })

//     alert("Request submitted")
//   }

//   return (

//     <div className="min-h-screen bg-gray-100 p-8">

//       <div className="max-w-7xl mx-auto grid lg:grid-cols-[260px_1fr] gap-6">

//         {/* SERVICES CARD */}

//         <div className="bg-white rounded-2xl shadow p-5 h-fit">

//           <h3 className="font-semibold mb-4 text-gray-800">
//             Interior Services
//           </h3>

//           <div className="space-y-3">

//             {services.map(service => {

//               const active = service.flow_id === activeService.flow_id

//               return (

//                 <button
//                   key={service.name}
//                   onClick={() => setActiveService(service)}
//                   className={`w-full flex items-center gap-3 p-3 rounded-xl border transition
//   ${active
//                       ? "border-orange-500 bg-orange-50"
//                       : "border-gray-200 hover:border-orange-400"}
//   `}
//                 >

//                   <div className={`p-2 rounded-lg
//   ${active ? "bg-orange-500 text-white" : "bg-gray-100"}`}>
//                     {service.icon}
//                   </div>

//                   <span className="text-sm font-medium">
//                     {service.name}
//                   </span>

//                 </button>

//               )

//             })}

//           </div>

//         </div>


//         {/* CALCULATOR CARD */}

//         <div className="bg-white rounded-3xl shadow flex flex-col min-h-[480px] max-h-[650px]">

//           {/* STEPPER */}

//           <div className="px-6 pt-4 pb-2">

//             <div className="relative">

//               {/* background line */}

//               <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200 z-0" />

//               {/* active progress */}

//               <div
//                 className="absolute top-4 left-0 h-[2px] bg-orange-500 transition-all duration-500 z-0"
//                 style={{ width: `${(current / (totalSteps - 1)) * 100}%` }}
//               />

//               <div className="flex justify-between relative z-10">

//                 {[...steps, { title: "Contact" }].map((s: any, index) => {

//                   const active = index <= current

//                   return (

//                     <div key={index} className="flex flex-col items-center w-full">

//                       <div
//                         className={`w-8 h-8 text-sm rounded-full flex items-center justify-center font-semibold
// ${active
//                             ? "bg-orange-500 text-white"
//                             : "bg-gray-200 text-gray-500"}
// `}
//                       >
//                         {index + 1}
//                       </div>

//                       <span className="text-xs mt-1 text-gray-600">
//                         {s.title}
//                       </span>

//                     </div>

//                   )

//                 })}

//               </div>

//             </div>

//           </div>


//           {/* STEP CONTENT */}

//           <div className="flex-1 overflow-y-auto px-6 pt-2 pb-2">
//             <AnimatePresence mode="wait">

//               <motion.div
//                 key={current}
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -30 }}
//                 transition={{ duration: .25 }}
//               >

//                 {current < steps.length && step && (

//                   <>
//                     {step.fields.map(field => (

//                       <div key={field.field_id}>

//                         {field.label && (
//                           <p className="text-gray-600 text-sm mb-4 font-medium">
//                             {field.label}
//                           </p>
//                         )}

//                         <div className="grid md:grid-cols-2 gap-3">

//                           {field.options.map(option => {

//                             const active =
//                               selected[field.field_id]?.option_id === option.option_id

//                             return (

//                               <div
//                                 key={option.option_id}
//                                 onClick={() => selectOption(field.field_id, option)}
//                                 className={`cursor-pointer border rounded-xl p-3 transition
//   ${active
//                                     ? "border-orange-500 bg-orange-50 shadow-sm"
//                                     : "border-gray-200 hover:border-orange-400 hover:shadow-md"}
//   `}
//                               >

//                                 <div className="flex items-center gap-3">

//                                   <div className="bg-gray-100 p-2 rounded-md text-sm">
//                                     🏠
//                                   </div>

//                                   <span className="text-sm font-semibold">
//                                     {option.label}
//                                   </span>

//                                 </div>

//                               </div>

//                             )

//                           })}

//                         </div>

//                       </div>

//                     ))}

//                   </>
//                 )}

//                 {current === steps.length && (

//                   <div className="max-w-md">

//                     <p className="text-gray-600 text-sm mb-5 font-medium">
//                       Enter your contact details
//                     </p>

//                     <div className="space-y-3">

//                       <input
//                         placeholder="Full Name"
//                         className="w-full border rounded-lg p-3 text-sm"
//                         onChange={e => setContact({ ...contact, name: e.target.value })}
//                       />

//                       <input
//                         placeholder="Phone Number"
//                         className="w-full border rounded-lg p-3 text-sm"
//                         onChange={e => setContact({ ...contact, phone: e.target.value })}
//                       />

//                       <input
//                         placeholder="Email Address"
//                         className="w-full border rounded-lg p-3 text-sm"
//                         onChange={e => setContact({ ...contact, email: e.target.value })}
//                       />

//                     </div>

//                   </div>

//                 )}

//               </motion.div>

//             </AnimatePresence>

//           </div>


//           {/* FOOTER */}

//           <div className="border-t px-6 py-4 flex justify-between items-center">

//             <button
//               onClick={prevStep}
//               disabled={current === 0}
//               className="px-5 py-2 rounded-lg border text-sm text-gray-500 disabled:opacity-40 hover:bg-gray-50"
//             >
//               Back
//             </button>

//             {current === totalSteps - 1 ? (

//               <button
//                 onClick={submit}
//                 className="px-8 py-2 bg-orange-500 text-white text-sm rounded-xl hover:bg-orange-600 transition"
//               >
//                 Submit
//               </button>

//             ) : (

//               <button
//                 onClick={nextStep}
//                 className="px-8 py-2 bg-orange-500 text-white text-sm rounded-xl hover:bg-orange-600 transition"
//               >
//                 Next
//               </button>

//             )}

//           </div>

//         </div>

//       </div>

//     </div>

//   )
// }