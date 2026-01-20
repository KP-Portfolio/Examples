"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  // Dummy credentials for testing
  const DUMMY_EMAIL = "test@organa.com";
  const DUMMY_PASSWORD = "password123";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      setError("");
      router.push("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit} className="form">
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="button">
          Sign In
        </button>
      </form>

      <style jsx>{`
        .container {
          max-width: 400px;
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
          background: #3b82f6;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .button:hover {
          background: #2563eb;
        }

        .error {
          color: red;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}