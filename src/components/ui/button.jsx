// src/components/ui/button.jsx
import React from "react";

export function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      {...props}
    >
      {children}
    </button>
  );
}
