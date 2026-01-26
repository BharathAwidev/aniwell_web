import { useEffect, useState } from "react"
import type { Flow, Step } from "../types/flow"
import { StepEditor } from "./StepEditor"
import { getFlow, saveFlow } from "../api/flowManager.api"
import { useNavigate, useParams } from "react-router"

export default function FlowBuilderPage({
    mode,
}: {
    mode: "create" | "edit"
}) {

    const { id } = useParams()
    const nav = useNavigate()
    const [flow, setFlow] = useState<Flow>({
        name: "New Flow",
        type: "configurator",
        steps: [],
    })



    useEffect(() => {
        if (mode === "edit" && id) {
            getFlow(Number(id)).then((res) => {
                const result = res.data.result

                setFlow({
                    name: result.flow.name,
                    type: result.flow.flow_type,
                    steps: result.steps
                })

                // const mappedSteps: Step[] = result.steps.map((s: any) => ({
                //   step_id: s.step_id,
                //   title: s.title,
                //   fields: s.fields.map((f: any) => ({
                //     field_id: f.field_id,
                //     label: f.label,
                //     type: f.field_type,
                //     options: f.options.map((o: any) => ({
                //       option_id: o.option_id,
                //       label: o.label,
                //       image_url: o.image_url,
                //       meta: o.meta || {},
                //       variants: [],
                //     })),
                //   })),
                // }))

                // setSteps(mappedSteps)
            })
        }
    }, [id, mode])

    const addStep = () => {
        setFlow({
            ...flow,
            steps: [
                ...flow.steps,
                {
                    title: `Step ${flow.steps.length + 1}`,
                    fields: [],
                },
            ],
        })
    }



    const updateStep = (index: number, step: Step) => {
        const steps = [...flow.steps]
        steps[index] = step
        setFlow({ ...flow, steps })
    }

    const removeStep = (index: number) => {
        setFlow({
            ...flow,
            steps: flow.steps.filter((_, i) => i !== index),
        })
    }


    const save = async () => {
        await saveFlow({
            flow: {
                flow_id: "",
                name: flow.name,
                type: flow.type,
            },
            steps: flow.steps,
        })

        alert("Flow Saved Successfully ✅")
        nav("/flows")
    }

    return (
        <div className="p-8 space-y-6 max-w-6xl mx-auto">

            <h1 className="text-2xl font-bold">Flow Builder</h1>

            {/* Flow Info */}
            <div className="grid grid-cols-2 gap-4 border p-4 rounded bg-white">
                <input
                    className="border p-2 rounded"
                    placeholder="Flow Name"
                    value={flow.name}
                    onChange={(e) =>
                        setFlow({ ...flow, name: e.target.value })
                    }
                />

                <select
                    className="border p-2 rounded"
                    value={flow.type}
                    onChange={(e) =>
                        setFlow({ ...flow, type: e.target.value as any })
                    }
                >
                    <option value="configurator">Configurator</option>
                    <option value="quiz">Quiz</option>
                    <option value="survey">Survey</option>
                </select>
            </div>



            {/* Steps */}
            <div className="space-y-4">
                {flow.steps.map((step, index) => (
                    <StepEditor
                        key={index}
                        step={step}
                        stepIndex={index}
                        allSteps={flow.steps}
                        onChange={(s) => updateStep(index, s)}
                        onDelete={() => removeStep(index)}
                    />
                ))}

                <button
                    onClick={addStep}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
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

            {/* Debug */}
            {/* <pre className="bg-gray-100 p-4 text-xs rounded overflow-auto">
        {JSON.stringify(flow, null, 2)}
      </pre> */}

        </div>
    )
}
