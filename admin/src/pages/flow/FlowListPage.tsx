import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import { getFlows } from "../../api/flowManager.api"

export default function FlowListPage() {
  const [flows,setFlows] = useState<any[]>([])
  const nav = useNavigate()

  useEffect(()=>{
    getFlows().then(r => {
        console.log(r)
        setFlows(r.data.result)
    }
        
    )
  },[])

  return (
    <div className="p-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Flows</h1>
        <button
          onClick={()=>nav("/flows/create")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Create Flow
        </button>
      </div>

      <div className="grid gap-3">
        {flows.map(f=>(
          <div key={f.flow_id} className="border p-4 rounded flex justify-between">
            <div>
              <div className="font-semibold">{f.name}</div>
              <div className="text-sm text-gray-500">{f.flow_type}</div>
            </div>
            <button
              onClick={()=>nav(`/flows/${f.flow_id}/edit`)}
              className="text-blue-600"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
