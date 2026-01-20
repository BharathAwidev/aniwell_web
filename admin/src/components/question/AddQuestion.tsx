import { useState } from "react"
import type {
  Question,
  QuestionType,
  DifficultyLevel,
  EntranceType,
  SyllabusType,
  Subject,
  ClassStandard,
} from "./types"
import { subjectChapterTopicMap } from "../../data/subjectChapters"


interface Props {
  onAdd: (question: Question) => void
}

export default function AddQuestion({ onAdd }: Props) {
  // Core metadata
  const [entranceType, setEntranceType] =
    useState<EntranceType>("school")
  const [syllabus, setSyllabus] =
    useState<SyllabusType>("cbse")
  const [classStandard, setClassStandard] =
    useState<ClassStandard>("6")
  const [difficulty, setDifficulty] =
    useState<DifficultyLevel>("easy")

  // Subject hierarchy
  const [subject, setSubject] = useState<Subject>("maths")
  const [chapter, setChapter] = useState<string>("")
  const [topic, setTopic] = useState<string>("")

  // Question data
  const [type, setType] =
    useState<QuestionType>("single")
  const [question, setQuestion] = useState<string>("")
  const [options, setOptions] =
    useState<string[]>(["", ""])
  const [correct, setCorrect] = useState<
    number | number[] | string | null
  >(null)

  // Helpers
  const addOption = () =>
    setOptions(prev => [...prev, ""])

  const updateOption = (i: number, value: string) => {
    const updated = [...options]
    updated[i] = value
    setOptions(updated)
  }

  const toggleCorrect = (i: number) => {
    if (type === "multiple") {
      setCorrect(prev =>
        Array.isArray(prev)
          ? prev.includes(i)
            ? prev.filter(x => x !== i)
            : [...prev, i]
          : [i]
      )
    } else {
      setCorrect(i)
    }
  }

  // Submit
  const submit = () => {
    if (!question.trim()) {
      alert("Enter question")
      return
    }

    if (type === "single" && correct === null) {
      alert("Select correct answer")
      return
    }

    if (
      type === "multiple" &&
      (!Array.isArray(correct) || correct.length === 0)
    ) {
      alert("Select at least one correct answer")
      return
    }

    if (type === "fill" && typeof correct !== "string") {
      alert("Enter correct answer")
      return
    }

    if (!chapter || !topic) {
      alert("Select chapter and topic")
      return
    }

    onAdd({
      type,
      difficulty,
      entranceType,
      syllabus,
      subject,
      classStandard,
      chapter,
      topic,
      question,
      options: type === "fill" ? [] : options,
      correctAnswer: correct,
    })

    // Reset
    setQuestion("")
    setOptions(["", ""])
    setCorrect(null)
    setType("single")
    setDifficulty("easy")
    setChapter("")
    setTopic("")
  }

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-bold text-lg">Add Question</h2>

      {/* Row 1: Entrance + Syllabus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          className="border p-2 w-full rounded"
          value={entranceType}
          onChange={(e) =>
            setEntranceType(e.target.value as EntranceType)
          }
        >
          <option value="school">School</option>
          <option value="jee">JEE</option>
          <option value="neet">NEET</option>
          <option value="gate">GATE</option>
          <option value="cat">CAT</option>
        </select>

        <select
          className="border p-2 w-full rounded"
          value={syllabus}
          onChange={(e) =>
            setSyllabus(e.target.value as SyllabusType)
          }
        >
          <option value="cbse">CBSE</option>
          <option value="icse">ICSE</option>
          <option value="state">State</option>
          <option value="ncert">NCERT</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Row 2: Class + Subject + Difficulty */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select
          className="border p-2 w-full rounded"
          value={classStandard}
          onChange={(e) =>
            setClassStandard(
              e.target.value as ClassStandard
            )
          }
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={`${i + 1}`}>
              Class {i + 1}
            </option>
          ))}
        </select>

        <select
          className="border p-2 w-full rounded"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value as Subject)
            setChapter("")
            setTopic("")
          }}
        >
          <option value="maths">Maths</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="biology">Biology</option>
          <option value="english">English</option>
          <option value="computer">Computer</option>
        </select>

        <select
          className="border p-2 w-full rounded"
          value={difficulty}
          onChange={(e) =>
            setDifficulty(
              e.target.value as DifficultyLevel
            )
          }
        >
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="difficult">Difficult</option>
        </select>
      </div>

      {/* Row 3: Chapter + Topic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select
          className="border p-2 w-full rounded"
          value={chapter}
          onChange={(e) => {
            setChapter(e.target.value)
            setTopic("")
          }}
        >
          <option value="">Select Chapter</option>
          {subjectChapterTopicMap[subject] &&
            Object.keys(
              subjectChapterTopicMap[subject]
            ).map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
        </select>

        <select
          className="border p-2 w-full rounded"
          value={topic}
          disabled={!chapter}
          onChange={(e) => setTopic(e.target.value)}
        >
          <option value="">
            {chapter
              ? "Select Topic"
              : "Select Chapter first"}
          </option>
          {chapter &&
            subjectChapterTopicMap[subject]?.[
              chapter
            ]?.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
        </select>
      </div>

      {/* Question Type */}
      <select
        className="border p-2 w-full rounded"
        value={type}
        onChange={(e) => {
          const t = e.target.value as QuestionType
          setType(t)
          if (t === "multiple") setCorrect([])
          else if (t === "fill") setCorrect("")
          else setCorrect(null)
        }}
      >
        <option value="single">Single Correct</option>
        <option value="multiple">Multiple Correct</option>
        <option value="fill">Fill in the Blank</option>
      </select>

      {/* Question */}
      <textarea
        className="border p-2 w-full rounded"
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* Options */}
      {(type === "single" || type === "multiple") && (
        <div className="space-y-2">
          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type={
                  type === "single" ? "radio" : "checkbox"
                }
                checked={
                  type === "single"
                    ? correct === i
                    : Array.isArray(correct) &&
                      correct.includes(i)
                }
                onChange={() => toggleCorrect(i)}
              />
              <input
                className="border p-2 flex-1 rounded"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) =>
                  updateOption(i, e.target.value)
                }
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addOption}
            className="text-blue-600 text-sm"
          >
            + Add Option
          </button>
        </div>
      )}

      {/* Fill Blank */}
      {type === "fill" && (
        <input
          className="border p-2 w-full rounded"
          placeholder="Correct answer"
          value={
            typeof correct === "string" ? correct : ""
          }
          onChange={(e) => setCorrect(e.target.value)}
        />
      )}

      <button
        onClick={submit}
        className="bg-blue-600 text-white py-2 rounded w-full"
      >
        Add Question
      </button>
    </div>
  )
}
