import { useState } from "react"
import type { QuestionForm as QuestionFormType } from "../../types/question"

interface Props {
  initialValues: QuestionFormType
  onSubmit: (data: QuestionFormType) => void
  isEdit?: boolean
}

export default function QuestionForm({
  initialValues,
  onSubmit,
  isEdit = false,
}: Props) {
  const [form, setForm] = useState<QuestionFormType>(initialValues)

  const update = <K extends keyof QuestionFormType>(
    key: K,
    value: QuestionFormType[K]
  ) => {
    setForm({ ...form, [key]: value })
  }

  const updateOption = (
    i: number,
    key: "optionText" | "isCorrect",
    value: any
  ) => {
    const options = [...form.options]
    options[i] = { ...options[i], [key]: value }
    update("options", options)
  }

  // ✅ THIS RETURN WAS MISSING — VERY IMPORTANT
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(form)
      }}
      className="space-y-4"
    >
      {/* Question Text */}
      <textarea
        className="w-full border p-2"
        placeholder="Enter question"
        value={form.questionText}
        onChange={(e) =>
          update("questionText", e.target.value)
        }
        required
      />

      {/* Type & Difficulty */}
      <div className="grid grid-cols-2 gap-4">
        <select
          value={form.questionType}
          onChange={(e) =>
             update("questionType", e.target.value as QuestionFormType["questionType"])

          }
          className="border p-2"
        >
          <option value="single">Single Correct</option>
          <option value="multiple">Multiple Correct</option>
          <option value="fill">Fill in the Blank</option>
        </select>

        <select
          value={form.difficulty}
          onChange={(e) =>
    update("difficulty", e.target.value as QuestionFormType["difficulty"])
          }
          className="border p-2"
        >
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="difficult">Difficult</option>
        </select>
      </div>

      {/* MCQ Options */}
      {form.questionType !== "fill" &&
        form.options.map((opt, i) => (
          <div key={i} className="flex gap-2">
            <input
              className="border p-2 flex-1"
              placeholder={`Option ${i + 1}`}
              value={opt.optionText}
              onChange={(e) =>
                updateOption(i, "optionText", e.target.value)
              }
            />

            <input
              type="checkbox"
              checked={opt.isCorrect}
              onChange={(e) =>
                updateOption(
                  i,
                  "isCorrect",
                  e.target.checked
                )
              }
            />
          </div>
        ))}

      {/* Fill Answer */}
      {form.questionType === "fill" && (
        <input
          className="border p-2 w-full"
          placeholder="Correct Answer"
          value={form.fillAnswer}
          onChange={(e) =>
            update("fillAnswer", e.target.value)
          }
        />
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2"
      >
        {isEdit ? "Update Question" : "Create Question"}
      </button>
    </form>
  )
}
