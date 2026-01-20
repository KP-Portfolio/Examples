"use client";

import React, { useState, useEffect } from "react";

type Status = "available" | "busy" | "break" | "offline";

export default function TimeClock() {
  const [status, setStatus] = useState<Status>("available");
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isClockedIn) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isClockedIn]);

  const toggleClock = () => {
    if (isClockedIn) {
      // Clocking out resets the timer — change if you want to store history later
      setIsClockedIn(false);
      setElapsedSeconds(0);
    } else {
      setIsClockedIn(true);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="timeclock-container">
      <h3>Time Clock</h3>

      <div className="status-section">
        <label htmlFor="status">Status</label>
        <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
        >
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="break">Break</option>
            <option value="offline">Offline</option>
        </select>
      </div>


      <div className="timer-display">
        <span>{formatTime(elapsedSeconds)}</span>
      </div>

      <button className="clock-btn" onClick={toggleClock}>
        {isClockedIn ? "Clock Out" : "Clock In"}
      </button>

      <style jsx>{`
        .timeclock-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #fafafa;
          width: 200px;
        }

        .status-section {
          display: flex;
          flex-direction: column;
        }

        select {
          padding: 0.25rem;
          border-radius: 4px;
          border: 1px solid #d1d5db;
        }

        .timer-display {
          font-size: 1.5rem;
          font-weight: bold;
          text-align: center;
        }

        .clock-btn {
          padding: 0.5rem;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .clock-btn:hover {
          background: #4338ca;
        }
      `}</style>
    </div>
  );
}