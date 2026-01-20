"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  Name: string;
  Email: string;
  Role: string;
  Department?: string;
  Start?: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const emptyUser: User = {
    id: "",
    Name: "",
    Email: "",
    Role: "",
    Department: "",
    Start: ""
  };

  const [newUser, setNewUser] = useState<User>(emptyUser);
  

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("/JSON/users.json");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch("/api/users/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    // Update UI instantly
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleEdit = async (updatedUser: User) => {
    await fetch("/api/users/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    // Update UI instantly
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="users-container">
      <button
        className="add-user-btn"
        onClick={() => {
          setNewUser(emptyUser);
          setIsCreateModalOpen(true);
        }}
      >
        +
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td>{user.Role}</td>
              <td>{user.Department}</td>
              <td>{user.Start}</td>
              <td>
                <button onClick={() => {
                  setEditingUser(user);
                  setIsModalOpen(true);
                }}>
                  Edit
                </button>
                <button className="danger" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
{/* Modals for editing user */}
      {isModalOpen && editingUser && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Edit User</h2>

            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={editingUser.Name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, Name: e.target.value })
              }
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={editingUser.Email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, Email: e.target.value })
              }
            />

            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={editingUser ? editingUser.Role : newUser.Role}
              onChange={(e) => {
                const value = e.target.value;
                editingUser
                  ? setEditingUser({ ...editingUser, Role: value })
                  : setNewUser({ ...newUser, Role: value });
              }}
            >
              <option value="">Select role...</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>

            <label htmlFor="department">Department</label>
              <select
              id="department"
              value={editingUser ? editingUser.Department : newUser.Department}
              onChange={(e) => {
                const value = e.target.value;
                editingUser
                  ? setEditingUser({ ...editingUser, Department: value })
                  : setNewUser({ ...newUser, Department: value });
              }}
            >
              <option value="">Select department...</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>

            <label htmlFor="start">Start Date</label>
              <input
              type="date"
              id="start"
              value={editingUser ? editingUser.Start : newUser.Start}
              onChange={(e) => {
                const value = e.target.value;
                editingUser
                  ? setEditingUser({ ...editingUser, Start: value })
                  : setNewUser({ ...newUser, Start: value });
              }}
            />

            <div className="modal-actions">
              <button
                onClick={async () => {
                  await handleEdit(editingUser);
                  setIsModalOpen(false);
                }}
              >
                Save
              </button>

              <button className="danger" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isCreateModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Create User</h2>

            <label htmlFor="Name">Name</label>
            <input
              id="Name"
              value={newUser.Name}
              onChange={(e) => setNewUser({ ...newUser, Name: e.target.value })}
            />

            <label htmlFor="Email">Email</label>
            <input
              id="Email"
              value={newUser.Email}
              onChange={(e) => setNewUser({ ...newUser, Email: e.target.value })}
            />

            <label htmlFor="Role">Role</label>
            <select
              id="Role"
              value={newUser.Role}
              onChange={(e) => setNewUser({ ...newUser, Role: e.target.value })}
            >
              <option value="">Select role...</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>

            <label htmlFor="Department">Department</label>
            <select
              id="Department"
              value={newUser.Department}
              onChange={(e) => setNewUser({ ...newUser, Department: e.target.value })}
            >
              <option value="">Select department...</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>

            <label htmlFor="Start">Start Date</label>
            <input
              id="Start"
              type="date"
              value={newUser.Start}
              onChange={(e) => setNewUser({ ...newUser, Start: e.target.value })}
            />

            <div className="modal-actions">
              <button
                onClick={async () => {
                  await fetch("/api/users/save", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ rows: [newUser] })
                  });

                  // Update UI instantly
                  setUsers((prev) => [
                    ...prev,
                    {
                      ...newUser,
                      id: "temp-" + Date.now() // UI placeholder until reload
                    }
                  ]);

                  setIsCreateModalOpen(false);
                }}
              >
                Save
              </button>

              <button className="danger" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .users-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          padding: 0.5rem;
          padding-top: 1rem;
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
          padding: 0.1rem 0.25rem;
          border: none;
          background: #4f46e5;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.6rem;
        }

        .danger {
          background: #dc2626;
        }
        
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        input {
          padding: 6px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        select {
          padding: 6px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
        }

        .add-user-btn {
          position: absolute;
          top: -0.5rem;
          right: -1rem;
          padding: 0.2rem 0.6rem;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}