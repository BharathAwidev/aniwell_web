import { api } from "./client";


export const FlowCalciAPI = {
  getAll: (flowId:number) => api.get(`Flow/getFlow?flow_id=${flowId}`).then((r) => r.data),
  
}