"use client";

import Metrics from "../profile/metrics";
import Schedule from "../profile/schedule";
import TimeClock from "../profile/timeclock";
import Workload from "../profile/workload";
import React, { useState } from "react";

type ProfilePopupProps = {
  onClose: () => void;
  user: { id: string; name: string; department: string; role: string; start: string };
  openTable: (formId: string) => void;
};

export default function ProfilePopup({ onClose, user, openTable }: ProfilePopupProps) {
  const [activeTab, setActiveTab] = useState<"metrics" | "schedule" | "workload">("metrics");

  return (
    <div className="overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="nav">
          <button
            className={activeTab === "metrics" ? "active" : ""}
            onClick={() => setActiveTab("metrics")}
          >
            Metrics
          </button>
          <button
            className={activeTab === "schedule" ? "active" : ""}
            onClick={() => setActiveTab("schedule")}
          >
            Schedule
          </button>
          <button
            className={activeTab === "workload" ? "active" : ""}
            onClick={() => setActiveTab("workload")}
          >
            Workload
          </button>
        </div>

        <div className="content-layout">
          <div className="left-panel">
            <TimeClock />
          </div>

          <div className="right-panel">
            {activeTab === "metrics" && <Metrics />}
            {activeTab === "schedule" && <Schedule />}
            {activeTab === "workload" && <Workload user={user} openTable={openTable} />}
          </div>
        </div>

        <style jsx>{`
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          .popup {
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            width: 80vw;
            max-width: 1000px;
            height: 70vh;
            position: relative;
            display: flex;
            flex-direction: column;
            top: 10%;
            left: 10%;
            overflow: hidden;
          }

          .close-btn {
            position: absolute;
            top: 0.25rem;
            right: 0.25rem;
            background: #f3f4f6;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 1.2rem;
            padding: 3px 8px;
            z-index: 50;
          }

          .nav {
            display: flex;
            gap: 0.1rem;
            margin-bottom: 1rem;
            position: relative;
            top: 0;
            left: 250px;
          }

          .nav button {
            padding: 0.5rem 1rem;
            background: #f3f4f6;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }

          .nav .active {
            background: #d1d5db;
            font-weight: 600;
          }

          .content-layout {
            display: flex;
            flex: 1;
            gap: 1rem;
            overflow: hidden;
          }

          .left-panel {
            width: 250px;
            flex-shrink: 0;
            background: #f9fafb;
            border-right: 1px solid #e5e5e5;
            overflow-y: auto;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            padding-left: 1.5rem;
          }

          .right-panel {
            flex: 1;
            padding: 1rem;
            overflow-y: auto;
            position: absolute;
            top: 2rem;
            left: 250px;
            right: 0;
            bottom: 0;
          }
        `}</style>
      </div>
    </div>
  );
}