"use client";

import { useEffect, useState } from "react";

type Role = {
  id: string;
  name: string;
  canViewUsers: boolean;
  canAssignRoles: boolean;
  canCreate: boolean;
  canDelete: boolean;
};

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRoles() {
      try {
        const res = await fetch("/JSON/roles.json");
        const data = await res.json();
        setRoles(data);
      } catch (err) {
        console.error("Failed to load roles:", err);
      } finally {
        setLoading(false);
      }
    }

    loadRoles();
  }, []);

  if (loading) return <p>Loading roles...</p>;

  return (
    <div className="roles-container">
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>View Users</th>
            <th>Assign Roles</th>
            <th>Create</th>
            <th>Delete</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.canViewUsers ? "Yes" : "No"}</td>
              <td>{role.canAssignRoles ? "Yes" : "No"}</td>
              <td>{role.canCreate ? "Yes" : "No"}</td>
              <td>{role.canDelete ? "Yes" : "No"}</td>
              <td>
                <button>Edit</button>
                <button className="danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .roles-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          padding: 0.5rem;
          border-bottom: 2px solid #e5e7eb;
          text-transform: uppercase;
          font-size: 1rem;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        td {
          padding: 0.5rem;
          border-bottom: 1px solid #e5e7eb;
          font-size: 0.75rem;
        }

        button {
          margin-right: 0.5rem;
          padding: 0.25rem 0.5rem;
          border: none;
          background: #4f46e5;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }

        .danger {
          background: #dc2626;
        }
      `}</style>
    </div>
  );
}