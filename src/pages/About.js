import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white shadow-lg rounded-lg p-6 relative">
        <h1 className="text-2xl font-bold text-gray-900">About Page</h1>
        <p className="mt-4 text-gray-700">이 페이지는 React Router를 사용해서 만든 페이지야!</p>

        {/* 홈으로 이동하는 버튼 */}
        <div className="mt-4">
          <Link to="/" className="bg-gray-900 text-white py-2 px-4 rounded-lg">
            홈으로 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
