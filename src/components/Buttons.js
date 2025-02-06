import React from "react";

export default function Buttons() {
  return (
    <div className="mt-4 flex justify-between">
      <button className="w-1/2 bg-gray-900 text-white py-2 rounded-lg mr-2">
        롤플레잉
      </button>
      <button className="w-1/2 bg-gray-900 text-white py-2 rounded-lg">
        보이스피싱 판별
      </button>
    </div>
  );
}
