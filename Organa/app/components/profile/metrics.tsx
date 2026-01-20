"use client";

export default function Metrics() {
  const metricsData = {
    tasksCompleted: 42,
    hoursWorked: 120,
    productivityScore: 87,
  };

  return (
    <div className="metrics-container">
      <div className="metric">
        <span className="label">Tasks Completed</span>
        <span className="value">{metricsData.tasksCompleted}</span>
      </div>

      <div className="metric">
        <span className="label">Hours Worked</span>
        <span className="value">{metricsData.hoursWorked}</span>
      </div>

      <div className="metric">
        <span className="label">Productivity Score</span>
        <span className="value">{metricsData.productivityScore}%</span>
      </div>

      <style jsx>{`
        .metrics-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .metric {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          background: #fafafa;
        }

        .label {
          font-weight: 500;
        }

        .value {
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}