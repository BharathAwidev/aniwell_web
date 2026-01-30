import React, { useEffect, useState } from "react";

import { SERVICE_STYLES, type ServiceFormValues, type ServiceStyle } from "../../types/service.types";
import "../../service-form.css";
import { SectionAPI } from "../../api/section.api";

/* ---------------- Section Types ---------------- */

type Category = {
  id: string;
  name: string;
};

type Section = {
  id: string;
  name: string;
  categories: Category[];
};

type Props = {
  initialValues?: Partial<ServiceFormValues>;
  onSubmit: (payload: ServiceFormValues) => void;
};

/* ---------------- Defaults ---------------- */

const EMPTY: ServiceFormValues = {
  section_id: "",
  category_id: "",
  title: "",
  description: "",
  dimension: "",
  style: SERVICE_STYLES.MODERN,
  tags: [{ value: "" }],
  designDetails: [{ key: "", value: "" }],
  features: [{ key: "", value: "" }],
};

export default function ServiceForm({
  initialValues,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<ServiceFormValues>({
    ...EMPTY,
    ...initialValues, 
  });

  const [sections, setSections] = useState<Section[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  /* ---------------- Load Sections ---------------- */

  useEffect(() => {

    SectionAPI.getAll().then((res) => { 
        setSections(res.result || []);
      });;
    // fetch("/api/sections") // 🔁 replace with real API
    //   .then((r) => r.json())
    //   .then((res) => {
    //     setSections(res.result || []);
    //   });
  }, []);

  /* ---------------- Prefill for Edit ---------------- */

  useEffect(() => {
    if (initialValues) {
      setForm({ ...EMPTY, ...initialValues });
    }
  }, [initialValues]);

  /* ---------------- Load Categories on Section Change ---------------- */

  useEffect(() => {
    if (form.section_id && sections.length) {
      const selected = sections.find(
        (s) => s.id === form.section_id
      );
      setCategories(selected?.categories || []);
    }
  }, [form.section_id, sections]);

  /* ---------------- Helpers ---------------- */

  const update = <K extends keyof ServiceFormValues>(
    key: K,
    value: ServiceFormValues[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSectionChange = (sectionId: string) => {
    update("section_id", sectionId || "");
    update("category_id", "");

    const selected = sections.find((s) => s.id === sectionId);
    setCategories(selected?.categories || []);
  };

  /* ---------------- Tags ---------------- */

  const addTag = () =>
    update("tags", [...form.tags, { value: "" }]);

  const removeTag = (index: number) =>
    update(
      "tags",
      form.tags.filter((_, i) => i !== index)
    );

  const updateTag = (index: number, value: string) => {
    const clone = [...form.tags];
    clone[index].value = value;
    update("tags", clone);
  };

  /* ---------------- Design Details ---------------- */

  const addDesign = () =>
    update("designDetails", [
      ...form.designDetails,
      { key: "", value: "" },
    ]);

  const removeDesign = (index: number) =>
    update(
      "designDetails",
      form.designDetails.filter((_, i) => i !== index)
    );

  const updateDesign = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const clone = [...form.designDetails];
    clone[index] = { ...clone[index], [field]: value };
    update("designDetails", clone);
  };

  /* ---------------- Features ---------------- */

  const addFeature = () =>
    update("features", [
      ...form.features,
      { key: "", value: "" },
    ]);

  const removeFeature = (index: number) =>
    update(
      "features",
      form.features.filter((_, i) => i !== index)
    );

  const updateFeature = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const clone = [...form.features];
    clone[index] = { ...clone[index], [field]: value };
    update("features", clone);
  };

  /* ---------------- Submit ---------------- */

  const submit = () => {
    console.log("SERVICE PAYLOAD 👉", form);
    onSubmit(form);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="page">
      <div className="card">

        {/* Grid */}
        <div className="grid">

          {/* Section */}
          <div className="field">
            <label>Section</label>
            <select
              value={form.section_id ?? ""}
              onChange={(e) =>
                onSectionChange(e.target.value)
              }
            >
              <option value="">Select Section</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="field">
            <label>Category</label>
            <select
              value={form.category_id ?? ""}
              disabled={!categories.length}
              onChange={(e) =>
                update(
                  "category_id",
                  e.target.value || ""
                )
              }
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Style */}
          <div className="field">
            <label>Style</label>
            <select
              value={form.style}
              onChange={(e) =>
                update("style", e.target.value as ServiceStyle)
              }
            >
              {Object.values(SERVICE_STYLES).map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="field">
            <label>Title *</label>
            <input
              value={form.title}
              onChange={(e) =>
                update("title", e.target.value)
              }
              placeholder="Enter title"
            />
          </div>

          {/* Dimension */}
          <div className="field">
            <label>Dimension</label>
            <input
              value={form.dimension}
              onChange={(e) =>
                update("dimension", e.target.value)
              }
              placeholder="120 x 120"
            />
          </div>

          {/* Description */}
          <div className="field full">
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                update("description", e.target.value)
              }
              placeholder="Enter description"
            />
          </div>
        </div>

        {/* Tags */}
        <section>
          <h3>Tags</h3>

          {form.tags.map((tag, index) => (
            <div className="row" key={index}>
              <input
                value={tag.value}
                placeholder="Tag"
                onChange={(e) =>
                  updateTag(index, e.target.value)
                }
              />
              <button
                type="button"
                className="icon"
                onClick={() => removeTag(index)}
              >
                ❌
              </button>
            </div>
          ))}

          <button className="link" onClick={addTag}>
            ＋ Add Tag
          </button>
        </section>

        {/* Design Details */}
        <section className="boxed">
          <h3>Design Details</h3>

          {form.designDetails.map((item, index) => (
            <div className="kv-row" key={index}>
              <input
                placeholder="Key"
                value={item.key}
                onChange={(e) =>
                  updateDesign(index, "key", e.target.value)
                }
              />
              <input
                placeholder="Value"
                value={item.value}
                onChange={(e) =>
                  updateDesign(index, "value", e.target.value)
                }
              />
              <button
                type="button"
                className="icon"
                onClick={() => removeDesign(index)}
              >
                ❌
              </button>
            </div>
          ))}

          <button className="link" onClick={addDesign}>
            ＋ Add Design Detail
          </button>
        </section>

        {/* Features */}
        <section className="boxed">
          <h3>Features</h3>

          {form.features.map((item, index) => (
            <div className="kv-row" key={index}>
              <input
                placeholder="Key"
                value={item.key}
                onChange={(e) =>
                  updateFeature(index, "key", e.target.value)
                }
              />
              <input
                placeholder="Value"
                value={item.value}
                onChange={(e) =>
                  updateFeature(index, "value", e.target.value)
                }
              />
              <button
                type="button"
                className="icon"
                onClick={() => removeFeature(index)}
              >
                ❌
              </button>
            </div>
          ))}

          <button className="link" onClick={addFeature}>
            ＋ Add Feature
          </button>
        </section>

        {/* Footer */}
        <div className="footer">
          <button className="btn ghost">Cancel</button>
          <button className="btn primary" onClick={submit}>
            Save
          </button>
        </div>
     <pre className="bg-gray-100 p-4 text-xs rounded overflow-auto">
        {JSON.stringify(form, null, 2)}
      </pre>
      </div>
    </div>
  );
}
