// src/components/ui/card.jsx
import React from "react";

export function Card({ children }) {
  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">{children}</div>
  );
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
