import React from "react";
import { Link } from "react-router-dom";

export default function BackToHome() {
  return (
    <div className="mt-6 flex justify-center">
      <Link to="/" className="bg-gray-500 text-white py-2 px-4 rounded-full text-center">
        메인으로 돌아가기
      </Link>
    </div>
  );
}
