"use client";

import { useEffect, useState, ReactNode } from "react";
import CreateForm from "../tabcomponents/tables/createform";
import TableView from "../tabcomponents/tables/tableview";

type TableTab = {
  id: string;
  title: string;
  content: ReactNode;
};

export default function Tables() {
  const [tabs, setTabs] = useState<TableTab[]>([
    { id: "default", title: "Tables Dashboard", content: "Default tables content" }
  ]);

  const [activeTab, setActiveTab] = useState("default");
  const [forms, setForms] = useState<any[]>([]);

  // Load forms.json for launcher
  useEffect(() => {
    async function loadForms() {
      try {
        const res = await fetch("/JSON/forms.json");
        const data = await res.json();
        setForms(data);
      } catch (err) {
        console.error("Failed to load forms:", err);
      }
    }

    loadForms();
  }, []);

  // Helper to open tabs
  const openTablesTab = (type: string, formId?: string) => {
    const id = `tab-${Date.now()}`;

    let content: ReactNode = null;
    let title = type;

    if (type === "CreateForm") {
      title = "Create Form";
      content = (
        <CreateForm
          onSave={() => {
            setActiveTab("default");
            // Reload forms after creation
            fetch("/JSON/forms.json")
              .then((r) => r.json())
              .then((d) => setForms(d));
          }}
          onCancel={() => setActiveTab("default")}
        />
      );
    }

    if (type === "TableView" && formId) {
      const form = forms.find((f) => f.id === formId);
      title = form?.name || "Table";

      content = (
        <TableView
          formId={formId}
          onCreateNew={() => openTablesTab("NewData", formId)}
        />
      );
    }

    const newTab = { id, title, content };
    setTabs((prev) => [...prev, newTab]);
    setActiveTab(id);
  };

  const closeTab = (id: string) => {
    const filtered = tabs.filter((t) => t.id !== id);
    setTabs(filtered);

    if (activeTab === id && filtered.length > 0) {
      setActiveTab(filtered[0].id);
    }
  };

  const handleDeleteForm = async (formId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this form and all its table data?"
    );
    if (!confirmDelete) return;

    // Delete form schema
    await fetch("/api/forms/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formId })
    });

    // Delete table data
    await fetch("/api/tables/deleteTable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formId })
    });

    // Refresh launcher list
    const res = await fetch("/JSON/forms.json");
    const updated = await res.json();
    setForms(updated);

    // Close any open tabs for this form
    setTabs((prev) => prev.filter((t) => !t.title.includes(formId)));
  };

  const renderContent = () => {
    if (activeTab === "default") {
      return (
        <div className="tables-launcher">
          <h2>Tables</h2>

          <button
            className="new-button"
            onClick={() => openTablesTab("CreateForm")}
          >
            New Form
          </button>

          <div className="table-list">
            {forms.map((f) => (
              <div key={f.id} className="table-item">
                <button
                  className="nav-button"
                  onClick={() => openTablesTab("TableView", f.id)}
                >
                  {f.name}
                  <button
                      className="danger-button"
                      onClick={() => handleDeleteForm(f.id)}
                    >
                      x
                  </button>
                </button>
              </div>
            ))}
          </div>

          <style jsx>{`
            h2 {
              text-align: left;
              padding: 0.5rem;
              border-bottom: 2px solid #e5e7eb;
              text-transform: uppercase;
              font-size: 0.75rem;
              letter-spacing: 0.05em;
              font-weight: 600;
            }
            .nav-button {
              padding: 0.75rem 1.5rem;
              padding-right: 0.2rem;
              background: #3b82f6;
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-size: 1rem;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .new-button {
              position: absolute;
              top: 5.75rem;
              right: 1.5rem;
              padding: 0.2rem 0.6rem;
              background: #10b981;
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-size: 0.8rem;
            }
            .table-list {
              display: flex;
              gap: 0.5rem;
              margin-top: 1rem;
            }
            .table-item {
              display: flex;
              gap: 0.5rem;
              align-items: center;
            }
            .danger-button {
              background: #aaaaaa00;
              color: black;
              border: none;
              width: 1.25rem;
              height: 1.25rem;
              cursor: pointer;
              margin-left: 2rem;
              padding-bottom: 0.2rem;
            }
          `}</style>
        </div>
      );
    }

    return tabs.find((t) => t.id === activeTab)?.content;
  };

  return (
    <div className="tables-container">
      <div className="subtab-bar">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`subtab ${tab.id === activeTab ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
            {tab.id !== "default" && (
              <span
                className="close"
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
              >
                ×
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="content-area">{renderContent()}</div>

      <style jsx>{`
        .tables-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .subtab-bar {
          display: flex;
          gap: 0.1rem;
          padding: 0.1rem;
          background: #f3f4f6;
          border-bottom: 1px solid #e5e5e5;
        }
        .subtab {
          padding: 0.4rem 0.75rem;
          background: #e5e7eb;
          border-radius: 3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .subtab.active {
          background: #d1d5db;
          font-weight: 600;
        }
        .close {
          cursor: pointer;
          font-weight: bold;
        }
        .content-area {
          flex: 1;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}