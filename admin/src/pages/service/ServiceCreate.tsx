import { useNavigate } from "react-router-dom";
import type { ServiceFormValues } from "../../types/service.types";
import { saveService } from "../../api/service.api";
import ServiceForm from "./ServiceForm";


export default function ServiceCreate() {
  const navigate = useNavigate();

  const handleCreate = async (payload: ServiceFormValues) => {
    try {
      console.log("CREATE PAYLOAD 👉", payload);

      await saveService(payload);

      alert("Service created successfully ✅");
      navigate("/services");

    } catch (error) {
      console.error(error);
      alert("Failed to create service ❌");
    }
  };

  return (
    <>
      <h2>Create Service</h2>
      <ServiceForm onSubmit={handleCreate} />
    </>
  );
}
