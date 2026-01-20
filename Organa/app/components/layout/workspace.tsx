"use client";

import Dashboard from "../tabs/dashboards";
import Tables from "../tabs/tables";
import Admin from "../tabs/admin";

export default function Workspace({
  activeTab,
}: {
  activeTab: string;
}) {
  const renderTab = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Tables":
        return <Tables />;
      case "User Admin":
        return <Admin />;
      default:
        return <p>Select a section from the sidebar to begin.</p>;
    }
  };

  return (
    <div className="workspace">

      <div className="content-area">{renderTab()}</div>

      <style jsx>{`
        .workspace {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #ffffff;
          border-radius: 6px;
          border: 1px solid #e5e5e5;
        }

        .active-label {
          font-weight: 600;
        }

        .content-area {
          flex: 1;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}