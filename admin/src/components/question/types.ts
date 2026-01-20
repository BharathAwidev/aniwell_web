export type QuestionType = "single" | "multiple" | "fill"
export type DifficultyLevel = "easy" | "moderate" | "difficult"

export type EntranceType = "school" | "jee" | "neet" | "gate" | "cat"
export type SyllabusType = "cbse" | "icse" | "state" | "ncert" | "other"

export type Subject =
    | "maths"
    | "physics"
    | "chemistry"
    | "biology"
    | "english"
    | "computer"
    | "other"

export type ClassStandard =
    | "1" | "2" | "3" | "4" | "5"
    | "6" | "7" | "8" | "9" | "10"
    | "11" | "12"


export interface Question {
    type: QuestionType
    difficulty: DifficultyLevel
    entranceType: EntranceType
    syllabus: SyllabusType
    subject: Subject
    chapter: string
    topic: string
    classStandard: ClassStandard
    question: string
    options?: string[]
    correctAnswer: number | number[] | string | null


}
