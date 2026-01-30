import { useEffect, useRef, useState } from "react";
import "../../table-list.css";
import type { SlideFormValues } from "../../types/bnner.types";

type Props = {
  value?: SlideFormValues;
  onSubmit: (payload: SlideFormValues) => void;
  onCancel: () => void;
  loading?: boolean;
};

const EMPTY_FORM: SlideFormValues = {
  id:"",
  type: "image",
  title: "",
  caption: "",
  description: "",
  file: null,
  fileUrl: "",
  videoLength: 5,
  additionalInfo: [],
  isActive: true,
  additionalInfoInput: "",
  showBookConsultation: false,
  buttonText: "",
};

export default function SlideForm({
  value,
  onSubmit,
  onCancel,
  loading,
}: Props) {
  const [form, setForm] = useState<SlideFormValues>(EMPTY_FORM);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);

  /* ===============================
     PREFILL (EDIT MODE)
  =============================== */
  useEffect(() => {
    if (value) {
      setForm({ ...EMPTY_FORM, ...value });

     
      if (value.fileUrl) {
        setPreviewUrl(value.fileUrl);
      }
    }
  }, [value]);

  /* ===============================
     HELPERS
  =============================== */
  const update = <K extends keyof SlideFormValues>(
    key: K,
    val: SlideFormValues[K]
  ) => setForm((f) => ({ ...f, [key]: val }));

  /* ===============================
     FILE HANDLING (SINGLE SOURCE)
  =============================== */
  const applyFile = (file: File) => {
    const url = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      file,
      fileUrl: url, // UI only
    }));

    setPreviewUrl(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    applyFile(selected);
  };

  const clearFile = () => {
    setForm((prev) => ({ ...prev, file: null, fileUrl: "" }));
    setPreviewUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  /* ===============================
     ADDITIONAL INFO
  =============================== */
  const addAdditionalInfo = () => {
    if (!form.additionalInfoInput.trim()) return;

    setForm((prev) => ({
      ...prev,
      additionalInfo: [
        ...prev.additionalInfo,
        { text: prev.additionalInfoInput.trim(), isActive: true },
      ],
      additionalInfoInput: "",
    }));
  };

  const removeAdditionalInfo = (index: number) => {
    setForm((prev) => ({
      ...prev,
      additionalInfo: prev.additionalInfo.filter((_, i) => i !== index),
    }));
  };

  /* ===============================
     SUBMIT
  =============================== */
  const handleSubmit = () => {
    onSubmit(form); // ✅ form.file is guaranteed correct
  };

  return (
    <div className="slide-form">
      <h2>{value ? "Edit Slide" : "Create Slide"}</h2>

      {/* ================= Slide Type ================= */}
      <div className="field">
        <label>Slide Type</label>
        <div className="slide-type-toggle">
          <button
            type="button"
            className={form.type === "image" ? "active" : ""}
            onClick={() => update("type", "image")}
          >
            🖼 Image
          </button>
          <button
            type="button"
            className={form.type === "video" ? "active" : ""}
            onClick={() => update("type", "video")}
          >
            🎥 Video
          </button>
        </div>
      </div>

      {/* ================= Title + Caption ================= */}
      <div className="row two">
        <div className="field">
          <label>Title *</label>
          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>

        <div className="field">
          <label>Caption *</label>
          <input
            value={form.caption}
            onChange={(e) => update("caption", e.target.value)}
          />
        </div>
      </div>

      {/* ================= Upload ================= */}
      <input
        ref={fileRef}
        type="file"
        hidden
        accept={form.type === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
      />

      <div
        className="upload-dropzone"
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (f) applyFile(f); // ✅ FIX
        }}
      >
        {previewUrl ? (
          <div className="upload-preview-card">
            <button
              type="button"
              className="preview-close"
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
            >
              ✕
            </button>

            {form.type === "image" ? (
              <img src={previewUrl} alt="Preview" />
            ) : (
              <video src={previewUrl} controls />
            )}
          </div>
        ) : (
          <div className="upload-placeholder">
            <p>Click or drag & drop a {form.type}</p>
            <span>
              {form.type === "video"
                ? "MP4, MOV up to 50MB"
                : "JPG, PNG up to 10MB"}
            </span>
          </div>
        )}
      </div>

      {/* ================= Video Length ================= */}
      {form.type === "video" && (
        <div className="field">
          <label>Video Length (seconds) *</label>
          <input
            type="number"
            min={1}
            max={120}
            value={form.videoLength}
            onChange={(e) =>
              update("videoLength", Number(e.target.value) || 1)
            }
          />
        </div>
      )}

      {/* ================= Description ================= */}
      <div className="field">
        <label>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      {/* ================= Additional Info ================= */}
      {/* <div className="field">
        <label>Additional Info</label>

        <div className="additional-info-row">
          <input
            value={form.additionalInfoInput}
            onChange={(e) =>
              update("additionalInfoInput", e.target.value)
            }
            onKeyDown={(e) => e.key === "Enter" && addAdditionalInfo()}
          />
          <button type="button" onClick={addAdditionalInfo}>
            +
          </button>
        </div>

        <ul className="additional-info-list">
          {form.additionalInfo.map((item, i) => (
            <li key={i}>
              <span>{item.text}</span>
              <button type="button" onClick={() => removeAdditionalInfo(i)}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div> */}

      <div className="field">
        <label>Additional Info</label>

        <div className="additional-info-row">
          <input
            type="text"
            placeholder="Add info point"
            value={form.additionalInfoInput}
            onChange={(e) =>
              setForm({ ...form, additionalInfoInput: e.target.value })
            }
          />

          <button
            type="button"
            className="icon-btn add"
            onClick={addAdditionalInfo}
            aria-label="Add info"
          >
            +
          </button>
        </div>

        {form.additionalInfo.length > 0 && (
          <ul className="additional-info-list">
            {form.additionalInfo.map((item, index) => (
              <li key={index}>
                <span>{item.text}</span>
                <button
                  type="button"
                  onClick={() => removeAdditionalInfo(index)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ================= Book Consultation ================= */}
      <div className="book-row">
        <label>
          <input
            type="checkbox"
            checked={form.showBookConsultation}
            onChange={(e) =>
              setForm({
                ...form,
                showBookConsultation: e.target.checked,
                buttonText: e.target.checked
                  ? form.buttonText || "BOOK FREE CONSULTATION"
                  : "",
              })
            }
          />
          Show Book Consultation
        </label>

        {form.showBookConsultation && (
          <div className="book-input">
            <input
              type="text"
              placeholder="e.g. BOOK FREE CONSULTATION"
              value={form.buttonText}
              onChange={(e) =>
                setForm({ ...form, buttonText: e.target.value })
              }
            />
          </div>
        )}
      </div>

      {/* ================= Footer ================= */}
      <div className="slide-form-footer">
        <label>
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => update("isActive", e.target.checked)}
          />
          Active
        </label>

        <div className="slide-form-actions">
          <button className="secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="primary"
            disabled={!form.title || !form.caption || loading}
            onClick={handleSubmit}
          >
            {value ? "Update" : "Create"}
          </button>
        </div>
      </div>

      {/* DEBUG */}
      <pre className="debug">
        {JSON.stringify(form, null, 2)}
      </pre>
    </div>
  );
}


// import { useEffect, useRef, useState } from "react";
// import "../../table-list.css";
// import type { SlideFormValues } from "../../types/bnner.types";

// type Props = {
//   value?: SlideFormValues;              // for Edit
//   onSubmit: (payload: SlideFormValues) => void;
//   onCancel: () => void;
//   loading?: boolean;
// };

// const EMPTY_FORM: SlideFormValues = {
//   type: "image",
//   title: "",
//   caption: "",
//   description: "",
//    file: null as File | null,
//   fileUrl: "",
//   videoLength: 5,
//   additionalInfo: [],
//   isActive: true,
//   additionalInfoInput: "",
//   showBookConsultation: false,
//   buttonText: "",
// };

// export default function SlideForm({
//   value,
//   onSubmit,
//   onCancel,
//   loading,
// }: Props) {
//   const [form, setForm] = useState<SlideFormValues>(EMPTY_FORM);
// const [file, setFile] = useState<File | null>(null);
// const [previewUrl, setPreviewUrl] = useState<string | null>(null);

// const fileRef = useRef<HTMLInputElement | null>(null);

//   /* ===============================
//      PREFILL (EDIT MODE)
//   =============================== */
//   useEffect(() => {
//     if (value) {
//       setForm({ ...EMPTY_FORM, ...value });
//     }
//   }, [value]);

//   /* ===============================
//      HELPERS
//   =============================== */
//   const update = <K extends keyof SlideFormValues>(
//     key: K,
//     val: SlideFormValues[K]
//   ) => setForm((f) => ({ ...f, [key]: val }));

//  const addAdditionalInfo = () => {
//   if (!form.additionalInfoInput.trim()) return;

//   setForm((prev) => ({
//     ...prev,
//     additionalInfo: [
//       ...prev.additionalInfo,
//       {
//         text: prev.additionalInfoInput.trim(),
//         isActive: true,
//       },
//     ],
//     additionalInfoInput: "",
//   }));
// };

// const removeAdditionalInfo = (index: number) => {
//   setForm((prev) => ({
//     ...prev,
//     additionalInfo: prev.additionalInfo.filter((_, i) => i !== index),
//   }));
// };


//   /* ===============================
//      SUBMIT
//   =============================== */
//   const handleSubmit = () => {
//     onSubmit(form);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const selected = e.target.files?.[0];
//   if (!selected) return;

//    const url = URL.createObjectURL(selected);

//   setFile(selected);
//   setPreviewUrl(url);

//   setForm(prev => ({
//     ...prev,
//     file: selected,
//     fileUrl: url,
//   }));
// };


//   return (
//  <div className="slide-form">
//   <h2>{value ? "Edit Slide" : "Create Slide"}</h2>

//   {/* Slide Type */}
//   <div className="field">
//     <label>Slide Type</label>
//     <div className="slide-type-toggle">
//       <button
//         type="button"
//         className={form.type === "image" ? "active" : ""}
//         onClick={() => update("type", "image")}
//       >
//         🖼 Image
//       </button>
//       <button
//         type="button"
//         className={form.type === "video" ? "active" : ""}
//         onClick={() => update("type", "video")}
//       >
//         🎥 Video
//       </button>
//     </div>
//   </div>

//   {/* Title */}
//   <div className="field">
//     <label>Title *</label>
//     <input
//       placeholder="Enter slide title"
//       value={form.title}
//       onChange={(e) => update("title", e.target.value)}
//     />
//   </div>

//   {/* Subtitle */}
//   <div className="field">
//     <label>Caption *</label>
//     <input
//       placeholder="Enter slide subtitle"
//       value={form.caption}
//       onChange={(e) => update("caption", e.target.value)}
//     />
//   </div>

//   {/* Upload  onClick={openFilePicker}*/}

//   {/* <input
//   type="file"
//   accept={form.type === "video" ? "video/*" : "image/*"}
//   hidden
//   ref={fileRef}
//   onChange={handleFileChange}
// /> */}
//   {/* <div className="field">
//     <label>{form.type === "video" ? "Video File *" : "Image File *"}</label>
//     <div className="upload-box" >
//       <p>Click to upload a {form.type}</p>
//       <span>
//         {form.type === "video"
//           ? "MP4, MOV up to 50MB"
//           : "JPG, PNG up to 10MB"}
//       </span>
//     </div>
//   </div> */}

//   {/* Video Length */}
//   {/* {form.type === "video" && (
//     <div className="field">
//       <label>Video Length (seconds) *</label>
//       <input
//         type="number"
//         min={1}
//         max={60}
//         value={form.videoLength}
//         onChange={(e) => update("videoLength", Number(e.target.value))}
//       />
//     </div>
//   )} */}

//   {/* <input
//   ref={fileRef}
//   type="file"
//   hidden
//   accept={form.type === "video" ? "video/*" : "image/*"}
//   onChange={(e) => {
//     const selected = e.target.files?.[0];
//     if (!selected) return;
//     setFile(selected);
//     setPreviewUrl(URL.createObjectURL(selected));
//   }}
// /> */}

// <input
//   ref={fileRef}
//   type="file"
//   hidden
//   accept={form.type === "video" ? "video/*" : "image/*"}
//    onChange={handleFileChange}
//   // onChange={(e) => {
//   //   const f = e.target.files?.[0];
//   //   if (!f) return;
//   //   setFile(f);
//   //   setPreviewUrl(URL.createObjectURL(f));
//   // }}
// />

// <div
//   className="upload-dropzone"
//   onClick={() => fileRef.current?.click()}
//   onDragOver={(e) => e.preventDefault()}
//   onDrop={(e) => {
//     e.preventDefault();
//     const f = e.dataTransfer.files?.[0];
//     if (!f) return;
//     setFile(f);
//     setPreviewUrl(URL.createObjectURL(f));
//   }}
// >
//   {previewUrl ? (
//     <div className="upload-preview-card">
//       {/* CLOSE ICON */}
//       <button
//         type="button"
//         className="preview-close"
//         onClick={(e) => {
//           e.stopPropagation();
//           setFile(null);
//           setPreviewUrl(null);
//           if (fileRef.current) fileRef.current.value = "";
//         }}
//       >
//         ✕
//       </button>

//       {/* MEDIA */}
//       {form.type === "image" ? (
//         <img src={previewUrl} alt="Preview" />
//       ) : (
//         <video src={previewUrl} controls />
//       )}
//     </div>
//   ) : (
//     <div className="upload-placeholder">
//       <p>Click or drag & drop a {form.type}</p>
//       <span>
//         {form.type === "video"
//           ? "MP4, MOV up to 50MB"
//           : "JPG, PNG up to 10MB"}
//       </span>
//     </div>
//   )}
// </div>

// {form.type === "video" && (
//   <div className="field">
//     <label>
//       Video Length (seconds) <span className="req">*</span>
//     </label>
//     <input
//       type="number"
//       min={1}
//       max={120}
//       value={form.videoLength}
//       onChange={(e) =>
//         setForm((p) => ({
//           ...p,
//           videoLength: Number(e.target.value) || 1,
//         }))
//       }
//       placeholder="Enter video duration"
//     />
//   </div>
// )}


//   {/* Description */}
//   <div className="field">
//     <label>Description</label>
//     <textarea
//       placeholder="Enter slide description"
//       value={form.description}
//       onChange={(e) => update("description", e.target.value)}
//     />
//   </div>

//   {/* Additional Info */}
//   {/* <div className="field">
//     <label>Additional Info</label>
//     <div className="additional-info">
//       <input
//         placeholder="Add info point"
//         value={infoText}
//         onChange={(e) => setInfoText(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && addAdditionalInfo()}
//       />
//       <button onClick={addAdditionalInfo}>+</button>
//     </div>
//   </div> */}

// <div className="field">
//   <label>Additional Info</label>

//   <div className="additional-info-row">
//     <input
//       type="text"
//       placeholder="Add info point"
//       value={form.additionalInfoInput}
//       onChange={(e) =>
//         setForm({ ...form, additionalInfoInput: e.target.value })
//       }
//     />

//     <button
//       type="button"           // ✅ VERY IMPORTANT
//       className="icon-btn add"
//       onClick={addAdditionalInfo}
//       aria-label="Add info"
//     >
//       +
//     </button>
//   </div>

//   {form.additionalInfo.length > 0 && (
//     <ul className="additional-info-list">
//       {form.additionalInfo.map((item, index) => (
//         <li key={index}>
//           <span>{item.text}</span>
//           <button
//             type="button"
//             onClick={() => removeAdditionalInfo(index)}
//           >
//             ✕
//           </button>
//         </li>
//       ))}
//     </ul>
//   )}
// </div>

// <div>

// <div className="book-row">
//   <div className="book-toggle">
//     <input
//       type="checkbox"
//       id="showBook"
//       checked={form.showBookConsultation}
//       onChange={(e) =>
//         setForm({
//           ...form,
//           showBookConsultation: e.target.checked,
//           buttonText: e.target.checked
//             ? form.buttonText || "BOOK FREE CONSULTATION"
//             : ""
//         })
//       }
//     />
//     <label htmlFor="showBook">Show Book Consultation</label>
//   </div>

//   {form.showBookConsultation && (
//     <div className="book-input">
//       <input
//         type="text"
//         placeholder="e.g. BOOK FREE CONSULTATION"
//         value={form.buttonText}
//         onChange={(e) =>
//           setForm({ ...form, buttonText: e.target.value })
//         }
//       />
//     </div>
//   )}
// </div>

// </div>


//   {/* Footer */}
//   <div className="slide-form-footer">
//     <label>
//       <input
//         type="checkbox"
//         checked={form.isActive}
//         onChange={(e) => update("isActive", e.target.checked)}
//       />{" "}
//       Active
//     </label>

//     <div className="slide-form-actions">
//       <button className="secondary" onClick={onCancel}>
//         Cancel
//       </button>
//       <button
//         className="primary"
//         onClick={handleSubmit}
//         disabled={!form.title || !form.caption}
//       >
//         {value ? "Update" : "Create"}
//       </button>
//     </div>
//   </div>

//        <pre className="bg-gray-100 p-4 text-xs rounded overflow-auto">
//         {JSON.stringify(form, null, 2)}
//       </pre>
// </div>
//   );
// }
