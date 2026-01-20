"use client";

import { useState } from "react";
import Navbar from "../components/layout/navbar";
import Sidebar from "../components/layout/sidebar";
import Workspace from "../components/layout/workspace";
import Footer from "../components/layout/footer";
import ProfilePopup from "../components/layout/profile";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showProfile, setShowProfile] = useState(false);

  // Temporary user until auth is wired
  const user = {
    id: "user-1",
    name: "Admin",
    department: "IT",
    role: "Admin",
    start: "2023-01-01"
  };

  // Forward table-opening requests to Workspace
  const openTable = (formId: string) => {
    setActiveTab("Tables");
    // Workspace will handle the actual table opening
  };

  return (
    <div className="home-container">
      <Navbar onProfileClick={() => setShowProfile(true)} />

      <div className="main-layout">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="workspace-area">
          <Workspace activeTab={activeTab} />
        </div>
      </div>

      <Footer />

      {showProfile && (
        <ProfilePopup
          onClose={() => setShowProfile(false)}
          user={user}
          openTable={openTable}
        />
      )}

      <style jsx>{`
        .home-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
        }

        .main-layout {
          display: flex !important;
          flex-direction: row !important;
          height: 100%;
        }

        .workspace-area {
          flex: 1;
          overflow-y: auto;
          background: #f9fafb;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}