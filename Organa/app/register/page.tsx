"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [orgCode, setOrgCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy validation for testing
    if (!orgCode || !email || !password || !confirm) {
      setError("All fields are required");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    // Simulate successful registration
    setError("");
    router.push("/signin");
  };

  return (
    <div className="container">
      <h2>Create Your Organization Account</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Organization Code"
          value={orgCode}
          onChange={(e) => setOrgCode(e.target.value)}
          className="input"
          required
        />

        <input
          type="email"
          placeholder="Organization Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="input"
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="button">
          Register
        </button>
      </form>

      <style jsx>{`
        .container {
          max-width: 450px;
          margin: 4rem auto;
          padding: 2rem;
          border-radius: 8px;
          border: 1px solid #e5e5e5;
          background: #fff;
          text-align: center;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input {
          padding: 0.75rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        .button {
          padding: 0.75rem;
          border-radius: 6px;
          border: none;
          background: #10b981;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .button:hover {
          background: #059669;
        }

        .error {
          color: red;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}