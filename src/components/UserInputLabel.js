import React from "react";

export default function UserInputLabel({ text }) {
  return (
    <div className="mt-4 text-right">
      <span className="px-3 py-1 text-sm bg-pink-200 text-pink-700 rounded-full">
        {text}
      </span>
    </div>
  );
}
