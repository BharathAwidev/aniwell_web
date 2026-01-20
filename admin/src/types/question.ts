export type QuestionType = "single" | "multiple" | "fill"
export type Difficulty = "easy" | "moderate" | "difficult"

export interface QuestionOption {
  optionText: string
  isCorrect: boolean
}

export interface QuestionForm {
  questionText: string
  questionType: QuestionType
  difficulty: Difficulty
  entranceType: string
  syllabus: string
  classStandard: number
  subjectId: number
  chapterId: number
  topicId: number
  examYear: number
  options: QuestionOption[]
  fillAnswer?: string
}
