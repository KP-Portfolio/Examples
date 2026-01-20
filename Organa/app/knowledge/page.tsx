"use client";

import React from "react";
import KbBody from "../components/knowledge/kbbody";
import KbSidenav from "../components/knowledge/kbsidenav";
import KbNav from "../components/knowledge/kbnav";

export default function Knowledge() {
  return (
    <div className="kb-page">
      <KbNav />

      <div className="kb-content">
        <KbSidenav />
        <KbBody />
      </div>

      <style jsx>{`
        .kb-page {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 100vh;
        }

        .kb-content {
          display: flex;
          flex: 1;
          min-height: 0;
        }
      `}</style>
    </div>
  );
}