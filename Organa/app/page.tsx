"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "./Logo.png";

export default function Page() {
  const router = useRouter();

  return (
    <div className="page">
      <nav className="navigation">
        <div className="nav-left">
          <Image src={Logo} width={40} height={40} alt="Organa Logo" className="logo" />
          <h3 className="brand">Organa</h3>
        </div>

        <div className="nav-right">
          <button className="nav-btn" onClick={() => router.push("/signin")}>
            Sign In
          </button>

          <button
            className="nav-btn secondary"
            onClick={() => router.push("/register")}
          >
            Register
          </button>

          <button className="nav-btn ghost" onClick={() => router.push("/howto")}>
            How To
          </button>
        </div>
      </nav>

      <main className="hero">
        <h1>Organization Nirvana Starts Here</h1>
        <p className="subtitle">
          Streamline your workflows, empower your teams, and bring clarity to your
          entire organization — all in one place.
        </p>

        <div className="cta">
          <button className="cta-btn" onClick={() => router.push("/signin")}>
            Get Started
          </button>

          <button className="cta-btn ghost" onClick={() => router.push("/howto")}>
            Learn More
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>© 2024 Organa. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: linear-gradient(to bottom right, #fafafa, #f0f4ff);
          font-family: system-ui, sans-serif;
        }

        .navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: white;
          border-bottom: 1px solid #e5e5e5;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .brand {
          font-size: 1.4rem;
          font-weight: 600;
        }

        .logo {
          width: 48px;
          height: 48px;
        }

        .nav-right {
          display: flex;
          gap: 1rem;
        }

        .nav-btn {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: none;
          background: #3b82f6;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .nav-btn:hover {
          background: #2563eb;
        }

        .nav-btn.secondary {
          background: #10b981;
        }

        .nav-btn.secondary:hover {
          background: #059669;
        }

        .nav-btn.ghost {
          background: transparent;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .nav-btn.ghost:hover {
          background: #f3f4f6;
        }

        .hero {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 4rem 2rem;
        }

        .hero h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .subtitle {
          max-width: 600px;
          font-size: 1.2rem;
          color: #4b5563;
          margin-bottom: 2rem;
        }

        .cta {
          display: flex;
          gap: 1rem;
        }

        .cta-btn {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border-radius: 8px;
          border: none;
          background: #3b82f6;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .cta-btn:hover {
          background: #2563eb;
        }

        .cta-btn.ghost {
          background: transparent;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .cta-btn.ghost:hover {
          background: #f3f4f6;
        }

        .footer {
          padding: 1rem;
          text-align: center;
          background: white;
          border-top: 1px solid #e5e5e5;
        }
      `}</style>
    </div>
  );
}