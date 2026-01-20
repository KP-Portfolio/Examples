"use client";

export default function Schedule() {
  const scheduleItems = [
    {
      day: "Monday",
      start: "8:00 AM",
      end: "5:00 PM",
      breaks: ["10:00 AM – 10:15 AM", "3:00 PM – 3:15 PM"],
      lunch: "12:00 PM – 1:00 PM",
    },
    {
      day: "Tuesday",
      start: "8:00 AM",
      end: "5:00 PM",
      breaks: ["10:00 AM – 10:15 AM", "3:00 PM – 3:15 PM"],
      lunch: "12:00 PM – 1:00 PM",
    },
    {
      day: "Wednesday",
      start: "8:00 AM",
      end: "5:00 PM",
      breaks: ["10:00 AM – 10:15 AM", "3:00 PM – 3:15 PM"],
      lunch: "12:00 PM – 1:00 PM",
    },
    {
      day: "Thursday",
      start: "8:00 AM",
      end: "5:00 PM",
      breaks: ["10:00 AM – 10:15 AM", "3:00 PM – 3:15 PM"],
      lunch: "12:00 PM – 1:00 PM",
    },
    {
      day: "Friday",
      start: "8:00 AM",
      end: "5:00 PM",
      breaks: ["10:00 AM – 10:15 AM", "3:00 PM – 3:15 PM"],
      lunch: "12:00 PM – 1:00 PM",
    },
  ];

  return (
    <div className="schedule-container">
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Shift</th>
            <th>Breaks & Lunch</th>
          </tr>
        </thead>

        <tbody>
          {scheduleItems.map((item, index) => (
            <tr key={index}>
              <td>{item.day}</td>

              <td>
                {item.start} – {item.end}
              </td>

              <td>
                <div className="lunch">Lunch: {item.lunch}</div>

                <div className="breaks">
                  {item.breaks.map((b, i) => (
                    <div key={i} className="break-item">
                      Break: {b}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .schedule-container {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th,
        td {
          padding: 0.5rem;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: top;
          font-size: 0.75rem;
        }

        th {
          background: #f3f4f6;
          font-weight: 600;
          font-size: 0.85rem;
          text-align: left;
        }

        .lunch {
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .break-item {
          margin-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
}