"use client";

import { useEffect, useState } from "react";
import type { FormSchema } from "@/definitions";

type User = {
  id: string;
  name: string;
  department: string;
  role: string;
  start: string;
};

type WorkloadTabProps = {
  user: User;
  openTable: (formId: string) => void;
};

export default function Workload({ user, openTable }: WorkloadTabProps) {
  const [forms, setForms] = useState<FormSchema[]>([]);
  const [tables, setTables] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const formsRes = await fetch("/JSON/forms.json");
      const formsData = await formsRes.json();

      const tablesRes = await fetch("/JSON/tables.json");
      const tablesData = await tablesRes.json();

      setForms(formsData);
      setTables(tablesData);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p>Loading workload…</p>;

  // 1. Filter assignment forms relevant to the user's role
  const relevantForms = forms.filter(
    f => f.type === "Assignment" && f.role?.includes(user.role)
  );

  // 2. Build workload widgets
  const widgets = relevantForms.map(form => {
    const rows = tables[form.id] || [];

    const openItems = rows.filter(r =>
      r.status !== "Closed" &&
      (r.assignee === user.name || form.role?.includes(user.role))
    );

    return {
      form,
      count: openItems.length
    };
  });

  return (
    <div className="workload-container">
      <h2>Your Workload</h2>

      <div className="workload-grid">
        {widgets.map(w => (
          <div
            key={w.form.id}
            className="workload-widget"
            onClick={() => openTable(w.form.id)}
          >
            <p className="title">{w.form.name}</p>
            <p className="count">{w.count}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .workload-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
        }
        .workload-widget {
          background: white;
          border: 1px solid #ddd;
          padding: 1rem;
          border-radius: 6px;
          cursor: pointer;
          text-align: center;
        }
        .count {
          font-size: 2rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}