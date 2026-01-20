"use client";

import Image from "next/image";
import Logo from "../../../public/Logo.png";

export default function Navbar({ onProfileClick }: { onProfileClick: () => void }) {
  return (
    <nav className="navbar">
      <div className="left">
        <Image src={Logo} width={40} height={40} alt="Organa Logo" className="logo" />
        <h3 className="brand">Organa</h3>
      </div>

      <div className="center">
        <input
          type="text"
          placeholder="Search..."
          className="search"
        />
      </div>

      <div className="right">
        <button className="profile-icon" onClick={onProfileClick}>U</button>
      </div>

      <style jsx>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
          background: #ffffff;
          border-bottom: 1px solid #e5e5e5;
        }

        .left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo {
          width: 40px;
          height: 40px;
        }

        .brand {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .center {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .search {
          width: 60%;
          max-width: 400px;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        .right {
          display: flex;
          align-items: center;
        }

        .profile-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </nav>
  );
}