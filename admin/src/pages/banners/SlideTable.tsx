import { Edit, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, Image, Video } from "lucide-react";
import "../../table-list.css";
import type { Slide } from "../../types/bnner.types";

interface Props {
  slides: Slide[];
  onEdit: (slide: Slide) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onSort: (id: number, dir: "up" | "down") => void;
}

export default function SlideTable({
  slides,
  onEdit,
  onDelete,
  onToggleStatus,
  onSort,
}: Props) {
  if (!slides.length) {
    return (
      <div className="table-empty">
        <p>No slides found</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="table-list">
        <thead>
          <tr>
            <th>#</th>
            <th>Media</th>
            <th>Title</th>
            <th>Type</th>
            <th>Status</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {slides
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((slide, index) => (
              <tr key={slide.id}>
                {/* Sort */}
                <td>
                  <div className="sort-cell">
                    <span>{slide.sortOrder}</span>
                    <div className="sort-icons">
                      <button
                        disabled={index === 0}
                        onClick={() => onSort(slide.id, "up")}
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        disabled={index === slides.length - 1}
                        onClick={() => onSort(slide.id, "down")}
                      >
                        <ArrowDown size={12} />
                      </button>
                    </div>
                  </div>
                </td>

                {/* Media */}
                <td>
                  <div className="media-thumb">
                    {slide.type === "image" ? (
                      <img src={slide.fileUrl} alt={slide.title} />
                    ) : (
                      <div className="video-thumb">
                        <Video size={20} />
                      </div>
                    )}
                  </div>
                </td>

                {/* Title */}
                <td>
                  <div className="title-cell">
                    <strong>{slide.title}</strong>
                    <div className="subtitle">{slide.caption}</div>
                  </div>
                </td>

                {/* Type */}
                <td>
                  <span
                    className={`badge ${
                      slide.type === "image" ? "badge-green" : "badge-blue"
                    }`}
                  >
                    {slide.type === "image" ? (
                      <>
                        <Image size={12} /> Image
                      </>
                    ) : (
                      <>
                        <Video size={12} /> Video
                      </>
                    )}
                  </span>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`badge ${
                      slide.isActive ? "badge-green" : "badge-gray"
                    }`}
                  >
                    {slide.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Actions */}
                <td>
                  <div className="action-icons">
                    <button
                      className="icon-btn icon-view"
                      title={slide.isActive ? "Hide" : "Show"}
                      onClick={() => onToggleStatus(slide.id)}
                    >
                      {slide.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>

                    <button
                      className="icon-btn icon-edit"
                      title="Edit"
                      onClick={() => onEdit(slide)}
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      className="icon-btn icon-delete"
                      title="Delete"
                      onClick={() => onDelete(slide.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
