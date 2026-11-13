'use client';

import React, { useEffect, useState } from "react";
import "./Stickybuttons.css";

const Stickybuttons: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setCurrentDate(new Date());

    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted || !currentDate) {
    return null;
  }

  // Line 1: Date (e.g. "Fri, Nov 13, 2026")
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Line 2: Time (e.g. "12:27:10 PM")
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <aside
      className="sticky-datetime-container"
      aria-label="Current date and time"
    >
      <div className="sticky-datetime-pill">
        <span className="datetime-live-indicator" aria-hidden="true">
          <span className="datetime-live-dot" />
        </span>
        <div className="datetime-content">
          <span className="datetime-date">{formattedDate}</span>
          <span className="datetime-time">{formattedTime}</span>
        </div>
      </div>
    </aside>
  );
};

export default Stickybuttons;
