"use client";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function Grid({
  dashboardId,
  table,
  widgets,
  onEdit
}: {
  dashboardId: string;
  table: string;
  widgets: any[];
  onEdit: () => void;
}) {
  const [rowCount, setRowCount] = useState<number | null>(null);

  // Store refs for multiple chart widgets
  const chartRefs = useRef<{ [key: string]: HTMLCanvasElement | null }>({});
  const chartInstances = useRef<{ [key: string]: Chart | null }>({});

  // Load table data
  useEffect(() => {
    async function loadTable() {
      try {
        const res = await fetch("/JSON/tables.json");
        const data = await res.json();

        const rows = data[table] || [];
        setRowCount(rows.length);
      } catch (err) {
        console.error("Failed to load table data:", err);
      }
    }

    loadTable();
  }, [table]);

  // Render Chart.js widgets
  useEffect(() => {
    widgets.forEach((w) => {
      if (w.widgetId === "bar-basic") {
        const canvas = chartRefs.current[w.id];
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Destroy old chart if it exists
        if (chartInstances.current[w.id]) {
          chartInstances.current[w.id]?.destroy();
        }

        // Create new chart
        chartInstances.current[w.id] = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Total"],
            datasets: [
              {
                label: "Count",
                data: [rowCount || 0],
                backgroundColor: "#60a5fa"
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    });

    // Cleanup on unmount
    return () => {
      Object.values(chartInstances.current).forEach((chart) => chart?.destroy());
    };
  }, [widgets, rowCount]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold uppercase">{table}</h2>

        <button
          onClick={onEdit}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Edit Layout
        </button>
      </div>

      {/* Render widgets */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {widgets.map((w) => {
          // COUNT widget
          if (w.mapping?.type === "count" && w.widgetId === "stat-basic") {
            return (
              <div
                key={w.id}
                className="p-4 bg-white rounded shadow border h-40 flex flex-col justify-center items-center"
              >
                <p className="text-gray-500 text-sm">Total Rows</p>
                <p className="text-4xl font-bold">
                  {rowCount !== null ? rowCount : "…"}
                </p>
              </div>
            );
          }

          // BAR CHART widget
          if (w.widgetId === "bar-basic") {
            return (
              <div
                key={w.id}
                className="p-4 bg-white rounded shadow border h-64"
              >
                <canvas
                  ref={(el) => {
                    chartRefs.current[w.id] = el;
                  }}
                  className="w-full h-full"
                />
              </div>
            );
          }

          // Unknown widget fallback
          return (
            <div
              key={w.id}
              className="p-4 bg-white rounded shadow border h-40 flex items-center justify-center"
            >
              <p className="text-gray-500">Unknown widget type</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}