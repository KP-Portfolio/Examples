"use client";

export default function KbSidenav() {
  const categories = ["General", "Policies", "How-To", "Troubleshooting"];

  return (
    <div className="kb-sidenav">
      <ul>
        {categories.map((cat, i) => (
          <li key={i}>{cat}</li>
        ))}
      </ul>

      <style jsx>{`
        .kb-sidenav {
          width: 200px;
          padding: 1rem;
          border-right: 1px solid #e5e7eb;
          background: #fafafa;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          padding: 0.5rem 0;
          cursor: pointer;
        }

        li:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}