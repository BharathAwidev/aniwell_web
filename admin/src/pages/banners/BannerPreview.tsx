import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../table-list.css";
import { getSlide } from "../../api/slide.api";

export default function SlidePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [slide, setSlide] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getSlide(Number(id)).then((res) => {
        setSlide(res.data.result);
      });
    }
  }, [id]);

  if (!slide) return null;

  return (
    <div className="preview-page">
      <button className="secondary" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="preview-card">
        <div className="preview-media">
          {slide.type === "image" ? (
            <img src={slide.file_url} />
          ) : (
            <video src={slide.file_url} controls />
          )}
        </div>

        <div className="preview-content">
          <h1>{slide.title}</h1>
          <h3>{slide.caption}</h3>

          <p>{slide.description}</p>

          {slide.additional_info?.length > 0 && (
            <ul>
              {slide.additional_info.map((i: any, idx: number) => (
                <li key={idx}>✔ {i.text}</li>
              ))}
            </ul>
          )}

          {slide.show_book_consultation && (
            <button className="primary">
              {slide.button_text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
