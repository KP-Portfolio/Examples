"use client";

import { useState } from "react";

export default function GridEdit({ dashboardId }: { dashboardId: string }) {
  const [selectedTable, setSelectedTable] = useState("");
  const [layout, setLayout] = useState("2-col");

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Editing: {dashboardId}</h2>

      {/* Table selection */}
      <div className="flex flex-col gap-2">
        <label htmlFor="data-select" className="font-medium">Select Data Table</label>
        <select
          id="data-select"
          className="border rounded p-2"
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
        >
          <option value="">Choose a table…</option>
          <option value="users">Users</option>
          <option value="orders">Orders</option>
          <option value="inventory">Inventory</option>
        </select>
      </div>

      {/* Layout selection */}
      <div className="flex flex-col gap-2">
        <label className="font-medium">Dashboard Layout</label>

        <div className="flex gap-4">
          <button
            onClick={() => setLayout("1-col")}
            className={`px-4 py-2 rounded border ${
              layout === "1-col" ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            1 Column
          </button>

          <button
            onClick={() => setLayout("2-col")}
            className={`px-4 py-2 rounded border ${
              layout === "2-col" ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            2 Column
          </button>

          <button
            onClick={() => setLayout("3-col")}
            className={`px-4 py-2 rounded border ${
              layout === "3-col" ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            3 Column
          </button>
        </div>
      </div>

      {/* Widget editor placeholder */}
      <div className="p-4 bg-gray-100 rounded border">
        <p className="text-gray-600">
          Widget editor will appear here once a table is selected.
        </p>
      </div>
    </div>
  );
}