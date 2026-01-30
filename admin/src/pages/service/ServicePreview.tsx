import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getService } from "../../api/service.api";

type KeyValue = {
  key: string;
  value: string;
};

type ServicePreviewData = {
  service: {
    id: number;
    title: string;
    description: string;
    dimension: string;
    style: string;
    section_name: string;
    category_name: string;
  };
  tags: { value: string }[];
  designDetails: KeyValue[];
  features: KeyValue[];
};

export default function ServicePreview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [data, setData] = useState<ServicePreviewData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  /* ---------------- Load ---------------- */

  useEffect(() => {
    if (!id) return;

    getService(Number(id))
      .then((res) => {
        setData(res.data.result);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Service not found</p>;

  const { service } = data;

  /* ---------------- UI ---------------- */

  return (
    <div style={{ maxWidth: 900 }}>
      <h2>Service Preview</h2>

      <button onClick={() => navigate("/services")}>
        ← Back
      </button>

      <button
        onClick={() =>
          navigate(`/services/${service.id}/edit`)
        }
        style={{ marginLeft: 10 }}
      >
        ✏️ Edit
      </button>

      <hr />

      <PreviewRow label="Title" value={service.title} />
      <PreviewRow
        label="Section"
        value={service.section_name}
      />
      <PreviewRow
        label="Category"
        value={service.category_name}
      />
      <PreviewRow label="Style" value={service.style} />
      <PreviewRow
        label="Dimension"
        value={service.dimension}
      />
      <PreviewRow
        label="Description"
        value={service.description}
      />

      <PreviewList
        label="Tags"
        items={data.tags.map((t) => t.value)}
      />

      <PreviewKeyValue
        label="Design Details"
        items={data.designDetails}
      />

      <PreviewKeyValue
        label="Features"
        items={data.features}
      />
    </div>
  );
}

/* ---------------- Small UI Blocks ---------------- */

const PreviewRow = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => (
  <div style={{ marginBottom: 10 }}>
    <strong>{label}:</strong> {value || "-"}
  </div>
);

const PreviewList = ({
  label,
  items,
}: {
  label: string;
  items: string[];
}) => (
  <div style={{ marginBottom: 12 }}>
    <strong>{label}:</strong>
    <ul>
      {items.map((i, idx) => (
        <li key={idx}>{i}</li>
      ))}
    </ul>
  </div>
);

const PreviewKeyValue = ({
  label,
  items,
}: {
  label: string;
  items: { key: string; value: string }[];
}) => (
  <div style={{ marginBottom: 12 }}>
    <strong>{label}:</strong>
    <ul>
      {items.map((i, idx) => (
        <li key={idx}>
          <b>{i.key}</b> : {i.value}
        </li>
      ))}
    </ul>
  </div>
);
