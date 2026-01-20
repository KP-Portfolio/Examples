"use client";

import { useState } from "react";
import type { Field, FormSchema } from "@/definitions";

type FieldType = "text" | "number" | "date" | "select";

type CreateFormProps = {
  onSave: (form: FormSchema) => void;
  onCancel: () => void;
};

export default function CreateForm({ onSave, onCancel }: CreateFormProps) {
  const [name, setName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [formType, setFormType] = useState("General");

  const addField = () => {
    setFields([...fields, { name: "", type: "text", options: [] }]);
  };

  type FieldKey = "name" | "type" | "options";

  const updateField = (i: number, key: FieldKey, value: any) => {
    const updated = [...fields];
    updated[i] = { ...updated[i], [key]: value };
    setFields(updated);
  };

  const handleSave = () => {
    let finalFields = [...fields];

    // ⭐ Auto‑inject workload fields for Assignment forms
    if (formType === "Assignment") {
      finalFields.push({
        name: "Status",
        type: "select",
        options: ["Assigned", "Open", "Pending", "Closed"]
      });

      finalFields.push({
        name: "Assignee",
        type: "text",
        options: []
      });
    }

    onSave({
      id: `form-${Date.now()}`,
      name,
      type: formType,
      fields: finalFields
    });
  };

  return (
    <div>
      <h2>Create New Table Form</h2>

      <label htmlFor="form-name">Form Name</label>
      <input
        id="form-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="form-type" className="block text-sm font-medium mb-1">
        Form Type
      </label>
      <select
        id="form-type"
        value={formType}
        onChange={(e) => setFormType(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      >
        <option value="General">General</option>
        <option value="Assignment">Assignment</option>
        <option value="CRM">CRM</option>
        <option value="Ecommerce">Ecommerce</option>
      </select>

      <h3>Fields</h3>
      {fields.map((f, i) => (
        <div key={i}>
          <input
            placeholder="Field Name"
            value={f.name}
            onChange={(e) => updateField(i, "name", e.target.value)}
          />

          <label htmlFor={`field-type-${i}`}>Field Type</label>
          <select
            id={`field-type-${i}`}
            value={f.type}
            onChange={(e) =>
              updateField(i, "type", e.target.value as FieldType)
            }
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="select">Select</option>
          </select>

          {f.type === "select" && (
            <input
              id="field-type-options"
              placeholder="Comma-separated options"
              onChange={(e) =>
                updateField(i, "options", e.target.value.split(","))
              }
            />
          )}
        </div>
      ))}

      <button onClick={addField}>Add Field</button>
      <button onClick={handleSave}>Save Form</button>
      <button onClick={onCancel}>Cancel</button>

      <style jsx>{`
        h2 {
          font-size: 1.5em;
          font-weight: bold;
        }
        label {
          display: block;
          margin-top: 10px;
          font-weight: bold;
        }
        input,
        select {
          margin-top: 5px;
          margin-bottom: 15px;
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
          border: 1px solid black;
          border-radius: 4px;
        }
        button {
          margin-right: 10px;
          padding: 8px 12px;
          cursor: pointer;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}