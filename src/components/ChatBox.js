import React from "react";

export default function ChatBox({ children }) {
  return (
    <div className="h-[450px] max-h-[500px] overflow-y-auto p-4 flex flex-col space-y-2 bg-gray-900 rounded-lg text-white">
      {children}
    </div>
  );
}
