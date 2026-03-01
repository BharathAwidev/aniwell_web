import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../table-list.css";
import {
  getSlides,
  deleteSlide,
  restoreSlide,
} from "../../api/slide.api";
import { getImagePath } from "../../utils/image_util";

type Slide = {
  id: number;
  type: "image" | "video";
  title: string;
  caption: string;
  file_path: string;
  is_active: number;
  created_at: string;
  deleted_at: string;
};

export default function SlideList() {
  const navigate = useNavigate();

  const [rows, setRows] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 1,
  });

  /* ===============================
     LOAD LIST
  =============================== */
  const load = async () => {
    setLoading(true);
    try {
      const res = await getSlides({
        page,
        search,
        type,
        limit: 10,
      });

      setRows(res.data.result.data);
      setPagination(res.data.result.pagination);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, search, type]);

  /* ===============================
     DELETE
  =============================== */
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this slide?")) return;
    await deleteSlide(id);
    load();
  };



  const handleRestore = async (id: number) => {
    await restoreSlide(id);
    load(); // reload list
  };

  return (
    <div className="list-page">
      <h2>Slides</h2>

      {/* ================= Toolbar ================= */}
      <div className="toolbar">
        <div className="search-box">
          <input
            placeholder="Search title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          {search && (
            <button
              className="clear-btn"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}
        </div>

        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Types</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        <button
          className="create-btn"
          onClick={() => navigate("/slides/create")}
        >
          <span className="plus">＋</span>
          Create
        </button>
      </div>

      {/* ================= Table ================= */}
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
            {loading ? (
              <tr>
                <td colSpan={6}>Loading...</td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6}>No slides found</td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={row.id}>
                  <td>{(page - 1) * 10 + idx + 1}</td>

                  <td>
                    {row.type === "image" ? (
                      <div className="media-thumb">
                        <img src={getImagePath(row.file_path)} />
                      </div>
                    ) : (
                      <div className="video-thumb">🎥</div>
                    )}
                  </td>

                  <td>
                    <strong>{row.title}</strong>
                    <div className="muted">{row.caption}</div>
                  </td>

                  <td>
                    <span className="badge">
                      {row.type.toUpperCase()}
                    </span>
                  </td>

                  <td>
                    {row.is_active ? "Active" : "Inactive"}
                  </td>

                  <td>
                    <div className="action-icons">
                      <button
                        className="icon-btn icon-view"
                        title="Preview"
                        onClick={() =>
                          navigate(`/slides/${row.id}/preview`)
                        }
                      >
                        👁
                      </button>

                      <button
                        className="icon-btn icon-edit"
                        title="Edit"
                        onClick={() =>
                          navigate(`/slides/${row.id}/edit`)
                        }
                      >
                        ✎
                      </button>

                      <button
                        className="icon-btn icon-delete"
                        title="Delete"
                        onClick={() => handleDelete(row.id)}
                      >
                        🗑
                      </button>

                      {row.deleted_at && (
                        <button
                          className="icon-btn restore"
                          onClick={() => handleRestore(row.id)}
                          title="Restore"
                        >
                          ↺
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= Pagination ================= */}
      {pagination.total_pages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span>
            Page {pagination.page} of {pagination.total_pages}
          </span>

          <button
            disabled={page === pagination.total_pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
