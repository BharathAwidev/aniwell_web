import { useNavigate } from "react-router-dom";
import SlideForm from "./SlideForm";
import { saveSlideWithFile } from "../../api/slide.api";
import type { SlideFormValues } from "../../types/bnner.types";

export default function SlideCreate() {
  const navigate = useNavigate();

  const handleCreate = async (payload: SlideFormValues) => {
    try {
      await saveSlideWithFile(payload);
      navigate("/banners/slides");
    } catch (err) {
      console.error("Create slide failed", err);
    }
  };

  return (
    <div className="list-page">
      <h2>Create Slide</h2>

      <SlideForm
        onSubmit={handleCreate}
        onCancel={() => navigate("/banners/slides")}
      />
    </div>
  );
}
