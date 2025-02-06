import React from "react";

export default function Question({ text }) {
  return (
    <div className="mt-4 p-4 bg-gray-900 text-white rounded-lg">
      <p className="text-sm">{text}</p>
    </div>
  );
}
