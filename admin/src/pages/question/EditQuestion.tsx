import { useParams } from "react-router"
import type { QuestionForm as QuestionFormType } from "../../types/question"
import { useEffect, useState } from "react"
import QuestionForm from "../../components/question/QuestionForm"
import { getQuestionById, updateQuestion } from "../../services/question.service"


export default function EditQuestion() {
    const { id } = useParams()
    const [data, setData] = useState<QuestionFormType | null>(null)

    useEffect(() => {
        getQuestionById(Number(id)).then((res) => {
            const q = res.data

            const mapped: QuestionFormType = {
                questionText: q.questionText,
                questionType: q.questionType,
                difficulty: q.difficulty,
                entranceType: q.entranceType,
                syllabus: q.syllabus,
                classStandard: q.classStandard,
                subjectId: q.subjectId,
                chapterId: q.chapterId,
                topicId: q.topicId,
                examYear: q.questionYears?.[0]?.examYear,
                options: q.options ?? [],
                fillAnswer: q.fillAnswer?.answerText ?? "",
            }

            setData(mapped)
        })
    }, [id])

    if (!data) return <div>Loading...</div>

    const handleSubmit = async (formData: QuestionFormType) => {
        await updateQuestion(Number(id), formData)
        alert("Question updated")
    }

    return (
        <QuestionForm
            initialValues={data}
            onSubmit={handleSubmit}
            isEdit
        />
    )
}
