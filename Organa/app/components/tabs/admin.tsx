"use client";

import { useState } from "react";
import Users from "../tabcomponents/admin/users";
import Roles from "../tabcomponents/admin/roles";
import { ReactNode } from "react";

type AdminTab = {
  id: string;
  title: string;
  content: ReactNode;
};

export default function Admin() {
  const [tabs, setTabs] = useState<AdminTab[]>([
    {
      id: "default",
      title: "Admin Dashboard",
      content: "Default dashboard content"
    }
  ]);

  const [activeTab, setActiveTab] = useState("default");
  const [tabName, setTabName] = useState("");

  const openNewTab = () => {
    const id = `tab-${Date.now()}`;
    setTabName(id);
    const newTab = {
      id,
      title: `${tabName}`,
      content: `Content for tab ${tabs.length}`
    };

    setTabs([...tabs, newTab]);
    setActiveTab(id);
  };

  const closeTab = (id: string) => {
    const filtered = tabs.filter(t => t.id !== id);
    setTabs(filtered);

    if (activeTab === id && filtered.length > 0) {
      setActiveTab(filtered[0].id);
    }
  };

  const renderContent = () => {
    if (activeTab === "default") {
      return (
        <div className="admin-launcher">
          <h2>Admin Dashboard</h2>
          <div className="admin-options">
            <button className="nav-button" onClick={() => openAdminTab("Users")}>Manage Users</button>
            <button className="nav-button" onClick={() => openAdminTab("Roles")}>Manage Roles</button>
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
              margin: 0.5rem;
              padding: 0.75rem 1.5rem;
              background: #3b82f6;
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-size: 1rem;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .admin-options {
              display: flex;
              gap: 1rem;
              margin-top: 1rem;
            }
          `}</style>
        </div>
      );
    }

    const tab = tabs.find(t => t.id === activeTab);
    return tab?.content;
  };

  const openAdminTab = (title: string) => {
    const id = `tab-${Date.now()}`;

    let content;

    if (title === "Users") content = <Users />;
    if (title === "Roles") content = <Roles />;

    const newTab: AdminTab = {
      id,
      title,
      content
    };

    setTabs([...tabs, newTab]);
    setActiveTab(id);
  };


  return (
    <div className="admin-container">
      <div className="subtab-bar">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`subtab ${tab.id === activeTab ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
            {tab.id !== "default" && (
              <span className="close" onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}>
                ×
              </span>
            )}
          </div>
        ))}

        <button className="new-tab" onClick={openNewTab}>+</button>
      </div>

      <div className="content-area">
        {renderContent()}
      </div>

      <style jsx>{`
        .admin-container {
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

        .new-tab {
          padding: 0.4rem 0.75rem;
          background: #d1d5db;
          border-radius: 6px;
          border: none;
          cursor: pointer;
        }

        .content-area {
          flex: 1;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}