import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteService, getServices } from "../../api/service.api";
import { SectionAPI } from "../../api/section.api";
import "../../table-list.css";
/* ---------------- Types ---------------- */

type Category = { id: string; name: string };
type Section = { id: string; name: string; categories: Category[] };

type ServiceRow = {
    id: number;
    section_name: string;
    category_name: string;
    title: string;
    style: string;
};

/* ---------------- Component ---------------- */

export default function ServiceList() {
    const navigate = useNavigate();

    const [rows, setRows] = useState<ServiceRow[]>([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const [sections, setSections] = useState<Section[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [sectionId, setSectionId] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string>("");

    /* ---------------- Load Sections ---------------- */

    useEffect(() => {

        SectionAPI.getAll().then((res) => {
            setSections(res.result || []);
        });;
        // fetch("/api/sections")
        //   .then((r) => r.json())
        //   .then((res) => setSections(res.result || []));
    }, []);

    /* ---------------- Load Categories ---------------- */

    useEffect(() => {
        if (!sectionId) {
            setCategories([]);
            setCategoryId("");
            return;
        }

        const selected = sections.find((s) => s.id === sectionId);
        setCategories(selected?.categories || []);
        setCategoryId("");
        setPage(1);
    }, [sectionId]);

    /* ---------------- Load Services ---------------- */

    const load = async () => {
        setLoading(true);

        const res = await getServices({
            page,
            limit: 10,
            search,
            section_id: sectionId || "",
            category_id: categoryId || "",
        });

        const result = res.data.result;

        setRows(result.data);
        setTotalPages(result.pagination.total_pages);
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, [page, search, sectionId, categoryId]);
    /* ---------------- Actions ---------------- */

    const onDelete = async (id: number) => {
        if (!confirm("Delete this service?")) return;
        await deleteService(id);
        load();
    };

    /* ---------------- UI ---------------- */

    return (
        <div className="list-page">

            <h2>Services</h2>

            {/* Toolbar */}
            <div className="toolbar">

                <div className="search-box">
                    <input
                        placeholder="Search title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {search && (
                        <button
                            className="clear-btn"
                            onClick={() => {
                                setSearch("");
                                setSectionId("");
                                setCategoryId("");
                                setPage(1);
                            }}
                            title="Clear"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <select
                    value={sectionId}
                    onChange={(e) => setSectionId(e.target.value)}
                >
                    <option value="">All Sections</option>
                    {sections.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}
                </select>

                <select
                    value={categoryId}
                    disabled={!categories.length}
                    onChange={(e) => {
                        setCategoryId(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                {/* <button className="create-btn" onClick={() => { setPage(1); load(); }}>
                    Search
                </button> */}

                <button className="create-btn" onClick={() => navigate("/services/create")}>
                    ＋ Create
                </button>
            </div>

            {/* Table */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Section</th>
                            <th>Category</th>
                            <th>Title</th>
                            <th>Style</th>
                            <th style={{ width: 220 }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ textAlign: "center" }}>
                                    No records found
                                </td>
                            </tr>
                        )}

                        {rows.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.section_name}</td>
                                <td>{row.category_name}</td>
                                <td>{row.title}</td>
                                <td>{row.style}</td>
                                <td className="actions">
                                    <button
                                        className="icon-btn preview"
                                        title="Preview"
                                        onClick={() => navigate(`/services/${row.id}/preview`)}
                                    >
                                        👁
                                    </button>

                                    <button
                                        className="icon-btn edit"
                                        title="Edit"
                                        onClick={() => navigate(`/services/${row.id}/edit`)}
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        className="icon-btn delete"
                                        title="Delete"
                                        onClick={() => onDelete(row.id)}
                                    >
                                        ❌
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Pagination */}
            <div className="pagination">
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
                    ◀ Prev
                </button>

                <span>
                    Page {page} / {totalPages}
                </span>

                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next ▶
                </button>
            </div>
        </div>
    );
}



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { deleteService, getServices } from "../../api/service.api";

// type ServiceRow = {
//   id: number;
//   section_name: string;
//   category_name: string;
//   title: string;
//   dimension: string;
//   style: string;
//   created_at: string;
// };

// export default function ServiceList() {
//   const navigate = useNavigate();

//   const [rows, setRows] = useState<ServiceRow[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [search, setSearch] = useState("");

//   /* ---------------- Load Data ---------------- */

//   const load = async () => {
//     setLoading(true);

//     const res = await getServices({
//       page,
//       limit: 10,
//       search,
//     });

//     const result = res.data.result;

//     setRows(result.data);
//     setTotalPages(result.pagination.total_pages);
//     setLoading(false);
//   };

//   useEffect(() => {
//     load();
//   }, [page]);

//   /* ---------------- Actions ---------------- */

//   const onDelete = async (id: number) => {
//     if (!confirm("Delete this service?")) return;

//     await deleteService(id);
//     load();
//   };

//   /* ---------------- UI ---------------- */

//   return (
//     <div>
//       <h2>Services</h2>

//       {/* Toolbar */}
//       <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
//         <input
//           placeholder="Search title..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <button onClick={() => load()}>Search</button>

//         <button onClick={() => navigate("/services/create")}>
//           ➕ Create
//         </button>
//       </div>

//       {/* Table */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table width="100%" border={1} cellPadding={8}>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Section</th>
//               <th>Category</th>
//               <th>Title</th>
//               <th>Style</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {rows.map((row) => (
//               <tr key={row.id}>
//                 <td>{row.id}</td>
//                 <td>{row.section_name}</td>
//                 <td>{row.category_name}</td>
//                 <td>{row.title}</td>
//                 <td>{row.style}</td>
//                 <td>
//                   <button
//                     onClick={() =>
//                       navigate(`/services/${row.id}/preview`)
//                     }
//                   >
//                     👁 Preview
//                   </button>

//                   <button
//                     onClick={() =>
//                       navigate(`/services/${row.id}/edit`)
//                     }
//                   >
//                     ✏️ Edit
//                   </button>

//                   <button onClick={() => onDelete(row.id)}>
//                     ❌ Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Pagination */}
//       <div style={{ marginTop: 16 }}>
//         <button
//           disabled={page <= 1}
//           onClick={() => setPage((p) => p - 1)}
//         >
//           ◀ Prev
//         </button>

//         <span style={{ margin: "0 12px" }}>
//           Page {page} / {totalPages}
//         </span>

//         <button
//           disabled={page >= totalPages}
//           onClick={() => setPage((p) => p + 1)}
//         >
//           Next ▶
//         </button>
//       </div>
//     </div>
//   );
// }
