"use client";

import { useState, useEffect } from "react";

export default function KbEdit({ article, onCancel, onSave }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  type SectionField = "heading" | "body";
  type Section = {
    heading: string;
    body: string;
  };

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setDescription(article.description);
      setSections(article.sections || []);
    }
  }, [article]);

  const [sections, setSections] = useState<Section[]>([
    { heading: "", body: "" },
  ]);

  const updateSection = (index: number, field: SectionField, value: string) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const addSection = () => {
    setSections([...sections, { heading: "", body: "" }]);
  };

  const saveArticle = () => {
    const updated = { title, description, sections };
    onSave?.(updated);
  };

  return (
    <div className="kb-edit">
      <h2>Edit Article</h2>

      <div className="field">
        <label htmlFor="kb-title">Title</label>
        <input id="kb-title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="kb-description">Description</label>
        <textarea
          id="kb-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <h3>Sections</h3>
      {sections.map((sec, i) => (
        <div key={i} className="section-editor">
          <label htmlFor={`kb-section-${i}-heading`}>Heading</label>
          <input
            id={`kb-section-${i}-heading`}
            value={sec.heading}
            onChange={(e) => updateSection(i, "heading", e.target.value)}
          />

          <label htmlFor={`kb-section-${i}-body`}>Body</label>
          <textarea
            id={`kb-section-${i}-body`}
            value={sec.body}
            onChange={(e) => updateSection(i, "body", e.target.value)}
          />
        </div>
      ))}

      <button onClick={addSection}>Add Section</button>

      <div className="actions">
        <button onClick={saveArticle}>Save Changes</button>
        <button onClick={onCancel}>Cancel</button>
      </div>

      <style jsx>{`
        .kb-edit {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .field,
        .section-editor {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        input,
        textarea {
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 4px;
        }

        .actions {
          display: flex;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
}