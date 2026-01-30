import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SlideForm from "./SlideForm";
import { getSlide, saveSlideWithFile } from "../../api/slide.api";
import type { SlideFormValues } from "../../types/bnner.types";

export default function SlideEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [value, setValue] = useState<SlideFormValues | null>(null);
  const [loading, setLoading] = useState(false);

  /* ===============================
     LOAD SLIDE
  =============================== */
  useEffect(() => {
    if (!id) return;

    getSlide(Number(id)).then((res) => {
      const slide = res.data.result;

      setValue({
        id: slide.id,
        type: slide.type,
        title: slide.title,
        caption: slide.caption,
        description: slide.description,
        file: null,                 
        fileUrl: slide.file_path,   // preview only
        videoLength: slide.video_length || 5,
        additionalInfo: slide.additional_info || [],
        additionalInfoInput: "",
        isActive: !!slide.is_active,
        showBookConsultation: !!slide.show_book_consultation,
        buttonText: slide.button_text || "",
      });
    });
  }, [id]);

  /* ===============================
     UPDATE
  =============================== */
  const handleUpdate = async (payload: SlideFormValues) => {
    if (!id) return;

    setLoading(true);
    try {
      await saveSlideWithFile({
        ...payload,
        id: Number(id),
      });
      navigate("/banners/slides");
    } finally {
      setLoading(false);
    }
  };

  if (!value) {
    return <div className="loading">Loading slide...</div>;
  }

  return (
    <div className="list-page">
      <h2>Edit Slide</h2>

      <SlideForm
        value={value}
        loading={loading}
        onSubmit={handleUpdate}
        onCancel={() => navigate("/banners/slides")}
      />
    </div>
  );
}
