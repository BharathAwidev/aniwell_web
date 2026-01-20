

import QuestionForm from "../../components/question/QuestionForm"
import { createQuestion } from "../../services/question.service"
import type { QuestionForm as QuestionFormType} from "../../types/question"

export default function CreateQuestion() {
  const initialValues: QuestionFormType = {
    questionText: "",
    questionType: "single",
    difficulty: "easy",
    entranceType: "school",
    syllabus: "cbse",
    classStandard: 6,
    subjectId: 1,
    chapterId: 1,
    topicId: 1,
    examYear: new Date().getFullYear(),
    options: [
      { optionText: "", isCorrect: false },
      { optionText: "", isCorrect: false },
      { optionText: "", isCorrect: false },
      { optionText: "", isCorrect: false },
    ],
    fillAnswer: "",
  }

  const handleSubmit = async (data: QuestionFormType) => {
    await createQuestion(data)
    alert("Question created")
  }

  return (
    <QuestionForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  )
}
