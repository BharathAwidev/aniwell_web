import { useEffect, useState } from "react"
import { deleteQuestion, getQuestions } from "../../services/question.service"
import { useNavigate } from "react-router"


export default function QuestionTable() {
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<any>(null)
const navigate = useNavigate()
  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const res = await getQuestions({ page, limit: 10 })
      setQuestions(res.data.data)
      setPagination(res.data.pagination)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [page])

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this question?"))
      return

    await deleteQuestion(id)
    fetchQuestions()
  }

  if (loading) {
    return <div className="p-4 text-gray-500">Loading questions...</div>
  }

  if (!questions.length) {
    return (
      <div className="p-4 text-gray-500">
        No questions found
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
    <h1 className="text-xl font-semibold">Questions</h1>

    <button
      onClick={() => navigate("/questions/new")}
      className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
    >
      + Create Question
    </button>
  </div>
      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Question</th>
            <th className="border px-2 py-1">Subject</th>
            <th className="border px-2 py-1">Difficulty</th>
            <th className="border px-2 py-1">Years</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>

        <tbody>
          {questions.map((q, index) => (
            <tr key={q.id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">
                {(page - 1) * 10 + index + 1}
              </td>

              <td className="border px-2 py-1">
                {q.questionText}
              </td>

              <td className="border px-2 py-1">
                {q.subject?.name}
              </td>

              <td className="border px-2 py-1 capitalize">
                {q.difficulty}
              </td>

              <td className="border px-2 py-1">
                {q.questionYears
                  ?.map((y: any) => y.examYear)
                  .join(", ")}
              </td>

              <td className="border px-2 py-1 space-x-2">
                <button
                  className="text-blue-600 hover:underline"
                   onClick={() => navigate(`/questions/${q.id}/edit`)}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(q.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {pagination && (
        <div className="flex gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-2">
            Page {pagination.page} of{" "}
            {pagination.totalPages}
          </span>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
