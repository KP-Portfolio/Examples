"use client";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Organa</p>

      <style jsx>{`
        .footer {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border-top: 1px solid #e5e5e5;
          font-size: 0.85rem;
          color: #6b7280;
          flex-shrink: 0; /* prevents layout push */
        }

        p {
          margin: 0;
        }
      `}</style>
    </footer>
  );
}