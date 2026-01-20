"use client";

import { useEffect, useState } from "react";

type TableViewProps = {
  formId: string;            // e.g. "appointments"
  onCreateNew: () => void;   // opens NewData tab
};

export default function TableView({ formId, onCreateNew }: TableViewProps) {
  const [schema, setSchema] = useState<any>(null);   // form schema
  const [rows, setRows] = useState<any[]>([]);       // table data
  const [loading, setLoading] = useState(true);
  const [editingRow, setEditingRow] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newRow, setNewRow] = useState<any>({});


  useEffect(() => {
    async function loadData() {
      try {
        // Load schema
        const formRes = await fetch("/JSON/forms.json");
        const formData = await formRes.json();
        const found = formData.find((f: any) => f.id === formId);
        setSchema(found);

        // Load table rows
        const tableRes = await fetch("/JSON/tables.json");
        const tableData = await tableRes.json();
        setRows(tableData[formId] || []);
      } catch (err) {
        console.error("Failed to load table:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [formId]);

  if (loading) return <p>Loading table...</p>;
  if (!schema) return <p>Form not found.</p>;

  const handleDelete = async (rowId: number) => {
    await fetch("/api/tables/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formId, rowId })
    });

    // Update UI instantly
    setRows((prev) => prev.filter((r) => r.id !== rowId));
  };

  const handleSaveEdit = async () => {
    await fetch("/api/tables/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formId, updatedRow: editingRow })
    });

    // Update UI instantly
    setRows((prev) =>
      prev.map((r) => (r.id === editingRow.id ? editingRow : r))
    );

    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="create-button" onClick={() => {
        // initialize empty row based on schema
        const initial: any = {};
        const fields = schema.fields[0];
        Object.keys(fields).forEach((key) => {
          initial[key.toLowerCase()] = "";
        });
        setNewRow(initial);
        setIsCreateModalOpen(true);
      }}>
        Create New
      </button>

      <table>
        <thead>
          <tr>
            {Object.keys(schema.fields[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {Object.keys(schema.fields[0]).map((key) => (
                <td key={key}>{row[key.toLowerCase()]}</td>
              ))}
              <td>
                <button
                  onClick={() => {
                    setEditingRow(row);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>

                <button className="danger" onClick={() => handleDelete(row.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && editingRow && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Edit Row</h2>

            {Object.keys(schema.fields[0]).map((key) => {
              const fieldDef = schema.fields[0][key]; // could be "string" or { type, options }
              const lower = key.toLowerCase();

              // CASE 1 — Select field
              if (typeof fieldDef === "object" && fieldDef.type === "select") {
                return (
                  <div key={key}>
                    <label htmlFor={lower}>{key}</label>
                    <select
                      id={lower}
                      value={editingRow[lower] || ""}
                      onChange={(e) =>
                        setEditingRow({
                          ...editingRow,
                          [lower]: e.target.value
                        })
                      }
                    >
                      <option value="">Select...</option>
                      {fieldDef.options.map((opt: string) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              // CASE 2 — Date field
              if (fieldDef === "date") {
                return (
                  <div key={key}>
                    <label htmlFor={lower}>{key}</label>
                    <input
                      type="date"
                      id={lower}
                      value={editingRow[lower] || ""}
                      onChange={(e) =>
                        setEditingRow({
                          ...editingRow,
                          [lower]: e.target.value
                        })
                      }
                    />
                  </div>
                );
              }

              // CASE 3 — Number field
              if (fieldDef === "number") {
                return (
                  <div key={key}>
                    <label htmlFor={lower}>{key}</label>
                    <input
                      type="number"
                      id={lower}
                      value={editingRow[lower] || ""}
                      onChange={(e) =>
                        setEditingRow({
                          ...editingRow,
                          [lower]: e.target.value
                        })
                      }
                    />
                  </div>
                );
              }

              // CASE 4 — Default text input
              return (
                <div key={key}>
                  <label htmlFor={lower}>{key}</label>
                  <input
                    id={lower}
                    value={editingRow[lower] || ""}
                    onChange={(e) =>
                      setEditingRow({
                        ...editingRow,
                        [lower]: e.target.value
                      })
                    }
                  />
                </div>
              );
            })}

            <div className="modal-actions">
              <button onClick={handleSaveEdit}>Save</button>
              <button className="danger" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isCreateModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Create New Entry</h2>

            {Object.keys(schema.fields[0]).map((key) => {
              const fieldDef = schema.fields[0][key];
              const lower = key.toLowerCase();

              // SELECT
              if (typeof fieldDef === "object" && fieldDef.type === "select") {
                return (
                  <div key={key}>
                    <label htmlFor={lower}>{key}</label>
                    <select
                      id={lower}
                      value={newRow[lower] || ""}
                      onChange={(e) =>
                        setNewRow({ ...newRow, [lower]: e.target.value })
                      }
                    >
                      <option value="">Select...</option>
                      {fieldDef.options.map((opt: string) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              // DATE
              if (fieldDef === "date") {
                return (
                  <div key={key}>
                    <label htmlFor={lower}>{key}</label>
                    <input
                      type="date"
                      id={lower}
                      value={newRow[lower] || ""}
                      onChange={(e) =>
                        setNewRow({ ...newRow, [lower]: e.target.value })
                      }
                    />
                  </div>
                );
              }

              // NUMBER
              if (fieldDef === "number") {
                return (
                  <div key={key}>
                    <label htmlFor={lower}>{key}</label>
                    <input
                      type="number"
                      id={lower}
                      value={newRow[lower] || ""}
                      onChange={(e) =>
                        setNewRow({ ...newRow, [lower]: e.target.value })
                      }
                    />
                  </div>
                );
              }

              // DEFAULT TEXT
              return (
                <div key={key}>
                  <label htmlFor={lower}>{key}</label>
                  <input
                    id={lower}
                    value={newRow[lower] || ""}
                    onChange={(e) =>
                      setNewRow({ ...newRow, [lower]: e.target.value })
                    }
                  />
                </div>
              );
            })}

            <div className="modal-actions">
              <button
                onClick={async () => {
                  const currentUserName = "Admin";
                  let finalRow = { ...newRow };

                  if (schema.type === "Assignment") {
                    finalRow = {
                      ...finalRow,
                      status: finalRow.status || "Open",
                      assignee: finalRow.assignee || currentUserName
                    };
                  }

                  await fetch("/api/tables/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ formId, row: finalRow })
                  });

                  setRows((prev) => [
                    ...prev,
                    { id: prev.length + 1, ...finalRow }
                  ]);

                  setIsCreateModalOpen(false);
                }}
              >
                Save
              </button>
              <button className="danger" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        button {
          margin-right: 10px;
          font-size: 0.75rem;
          padding: 0.2rem 0.5rem;
          cursor: pointer;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
        }
        .danger {
          background: #dc2626;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th,
        td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
          text-align: left;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        input {
          padding: 6px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        select {
          padding: 6px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        label {
          font-weight: bold;
          margin-bottom: 4px;
          margin-right: 8px;
          display: block;
        }

        .create-button {
          font-size: 0.75rem;
          padding: 0.2rem 0.5rem;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}