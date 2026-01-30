import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ServiceFormValues } from "../../types/service.types";
import { getService, saveService } from "../../api/service.api";
import ServiceForm from "./ServiceForm";

export default function ServiceEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] =
    useState<ServiceFormValues>();
  const [loading, setLoading] = useState(true);

  /* ---------------- Load Service ---------------- */

  useEffect(() => {
    if (!id) return;

    getService(Number(id))
      .then((res) => {
        const data = res.data.result;

        setInitialValues({
          ...data.service,
          tags: data.tags,
          designDetails: data.designDetails,
          features: data.features,
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  /* ---------------- Update ---------------- */

  const handleUpdate = async (payload: ServiceFormValues) => {
    try {
      console.log("UPDATE PAYLOAD 👉", payload);

      await saveService({
        ...payload,
        id: Number(id),
      });

      alert("Service updated successfully ✅");
      navigate("/services");

    } catch (error) {
      console.error(error);
      alert("Failed to update service ❌");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!initialValues) return <p>Service not found</p>;

  return (
    <>
      <h2>Edit Service</h2>

      <ServiceForm
        initialValues={initialValues}
        onSubmit={handleUpdate}
      />
    </>
  );
}
