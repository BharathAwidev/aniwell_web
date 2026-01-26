import { api } from "./client"

export const getFlows = () => api.get("/Flow/flowList")

export const saveFlow = (payload:any) =>
  api.post("/Flow/saveFullFlow", payload)

export const getFlow = (flow_id:number) =>
  api.get("/Flow/getFlow", { params:{ flow_id } })

export const deleteEntity = (type:string,id:number) =>
  api.delete("/Flow/delete", { params:{ type,id } })
