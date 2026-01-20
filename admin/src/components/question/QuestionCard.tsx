import type { Question } from "./types"


interface Props {
  index: number
  data: Question
}

export default function QuestionCard({ index, data }: Props) {
  const { question, options = [], type, correctAnswer } = data
  const difficulty = data.difficulty ?? "easy"
  const entranceType = data.entranceType ?? ""
  const syllabus = data.syllabus ?? ""
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="font-medium mb-2">
        {index}. {question}
      </p>

      {type !== "fill" &&
        options.map((opt, i) => (
          <div
            key={i}
            className={`p-1 rounded ${(Array.isArray(correctAnswer)
                ? correctAnswer.includes(i)
                : correctAnswer === i)
                ? "bg-green-100"
                : ""
              }`}
          >
            {opt}
          </div>
        ))}

      {type === "fill" && (
        <p className="text-green-600">
          Correct Answer: {correctAnswer}
        </p>
      )}

      <span
        className={`text-xs px-2 py-1 rounded ${data.difficulty === "easy"
            ? "bg-green-100 text-green-700"
            : data.difficulty === "moderate"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
      >
        {difficulty.toUpperCase()}
      </span>

      {entranceType.toUpperCase()} · {syllabus.toUpperCase()}

      {/* <p className="text-xs text-gray-500 mt-1">
  {data.subject.toUpperCase()} · Class {data.classStandard}
</p> */}
    </div>
  )
}
