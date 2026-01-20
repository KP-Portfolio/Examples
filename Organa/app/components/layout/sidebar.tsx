"use client";

export default function Sidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <aside className="sidebar">
      <nav className="nav">
        <button
          className={`nav-item ${activeTab === "Dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("Dashboard")}
        >
          Dashboards
        </button>

        <button
          className={`nav-item ${activeTab === "Tables" ? "active" : ""}`}
          onClick={() => setActiveTab("Tables")}
        >
          Tables
        </button>

        <button
          className={`nav-item ${activeTab === "User Admin" ? "active" : ""}`}
          onClick={() => setActiveTab("User Admin")}
        >
          Admin
        </button>

        <button
          className="nav-item"
          onClick={() => (window.location.href = "/knowledge")}
        >
          Knowledge
        </button>
      </nav>

      <style jsx>{`
        .sidebar {
          width: 220px;
          height: 100%;
          flex-shrink: 0;
          background: #ffffff;
          border-right: 1px solid #e5e5e5;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .nav {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .nav-item {
          padding: 0.6rem 0.75rem;
          border-radius: 3px;
          border: none;
          background: #f3f4f6;
          text-align: left;
          cursor: pointer;
          font-size: 0.95rem;
          transition: 0.2s ease;
        }

        .nav-item:hover {
          background: #e5e7eb;
        }

        .active {
          background: #d1d5db;
          font-weight: 600;
        }
      `}</style>
    </aside>
  );
}