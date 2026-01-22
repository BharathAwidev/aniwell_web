import { api } from "../api/client"

export const createQuestion = (data: any) => {
    return api.post("/questions", data)
}

export const getQuestions = (params: any) => {
    return api.get("/questions", { params })
}

export const getQuestionById = (id: number) => {
  return api.get(`/questions/${id}`)
}

export const updateQuestion = (id: number, data: any) =>
    api.put(`/questions/${id}`, data)

export const deleteQuestion = (id: number) =>
    api.delete(`/questions/${id}`)

