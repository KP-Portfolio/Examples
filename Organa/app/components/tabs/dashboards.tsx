"use client";

import { useEffect, useState, ReactNode } from "react";
import Grid from "../tabcomponents/dashboards/grid";
import GridEdit from "../tabcomponents/dashboards/gridedit";

type DashboardTab = {
  id: string;
  title: string;
  content: ReactNode;
};

export default function Dashboards() {
  const [tabs, setTabs] = useState<DashboardTab[]>([
    {
      id: "default",
      title: "Dashboards",
      content: "Dashboard launcher"
    }
  ]);

  const [activeTab, setActiveTab] = useState("default");
  const [tables, setTables] = useState<string[]>([]);

  // Load tables.json for launcher
  useEffect(() => {
    async function loadTables() {
      try {
        const res = await fetch("/JSON/tables.json");
        const data = await res.json();
        setTables(Object.keys(data));
      } catch (err) {
        console.error("Failed to load tables:", err);
      }
    }

    loadTables();
  }, []);

  // Open a NEW dashboard tab
  const openDashboardTab = (tableName: string) => {
    const id = `dash-${Date.now()}`;

    const defaultWidgets = [
      {
        id: "w1",
        widgetId: "stat-basic",
        area: "a",
        mapping: { type: "count" }
      },
      {
        id: "w2",
        widgetId: "bar-basic",
        area: "b",
        mapping: { type: "count" }
      }
    ];

    const newTab = {
      id,
      title: tableName,
      content: (
        <Grid
          dashboardId={id}
          table={tableName}
          widgets={defaultWidgets}
          onEdit={() => openEditTab(id)}
        />
      )
    };

    setTabs((prev) => [...prev, newTab]);
    setActiveTab(id);
  };

  // Open edit tab
  const openEditTab = (dashboardId: string) => {
    const id = `${dashboardId}-edit`;

    const editTab = {
      id,
      title: `Edit ${dashboardId}`,
      content: <GridEdit dashboardId={dashboardId} />
    };

    setTabs((prev) => [...prev, editTab]);
    setActiveTab(id);
  };

  // Close tab
  const closeTab = (id: string) => {
    const filtered = tabs.filter((t) => t.id !== id);
    setTabs(filtered);

    if (activeTab === id && filtered.length > 0) {
      setActiveTab(filtered[0].id);
    }
  };

  // Launcher content (matches Tables UI)
  const renderContent = () => {
    if (activeTab === "default") {
      return (
        <div className="tables-launcher">
          <h2>Dashboards</h2>

          <div className="table-list">
            {tables.map((t) => (
              <div key={t} className="table-item">
                <button
                  className="nav-button"
                  onClick={() => openDashboardTab(t)}
                >
                  {t}

                  <button
                    className="danger-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Delete dashboard not implemented:", t);
                    }}
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
              text-transform: capitalize;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
              background: transparent;
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
          text-transform: capitalize;
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