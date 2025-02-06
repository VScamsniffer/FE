import React from "react";
import "./index.css";

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white shadow-lg rounded-lg p-6 relative">
        {/* Logo and Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">vSS prompt</h1>
          <span className="px-3 py-1 text-sm bg-purple-200 text-purple-700 rounded-full">단계 1</span>
        </div>

        {/* Message Box */}
        <div className="mt-4 p-4 bg-gray-900 text-white rounded-lg relative">
          <p className="text-sm text-center">보기를 선택해주세요</p>
        </div>

        {/* Questions */}
        <div className="mt-4 p-4 bg-gray-900 text-white rounded-lg relative">
          <p className="text-sm">1. 신분증을 촬영하여 상대에게 전송하였나요?</p>
        </div>
        <div className="mt-4 p-4 bg-gray-900 text-white rounded-lg relative">
          <p className="text-sm">2. 보유 중인 계좌의 계좌번호나 카드 번호를 상대에게 알려주었나요?</p>
        </div>

        {/* Chat Indicator */}
        <div className="flex justify-center mt-4">
          <div className="w-3 h-3 bg-gray-500 rounded-full mx-1"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full mx-1"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full mx-1"></div>
        </div>

        {/* User Input Label */}
        <div className="mt-4 text-right">
          <span className="px-3 py-1 text-sm bg-pink-200 text-pink-700 rounded-full">사용자 입력</span>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-between">
          <button className="w-1/2 bg-gray-900 text-white py-2 rounded-lg mr-2">롤플레잉</button>
          <button className="w-1/2 bg-gray-900 text-white py-2 rounded-lg">보이스피싱 판별</button>
        </div>
      </div>
    </div>
  );
}
