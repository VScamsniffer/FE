import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo"; // ✅ 로고 컴포넌트 추가

export default function Header() {
  return (
    <header className="bg-gray-900 text-white py-3 px-6 flex justify-between items-center shadow-md">
      {/* 로고 */}
      <Link to="/">
        <Logo />
      </Link>

      {/* 네비게이션 메뉴 */}
      <nav className="flex space-x-6">
        <Link to="/scamcheck" className="hover:text-gray-300 transition">보이스피싱 판별</Link>
        <Link to="/roleplaying" className="hover:text-gray-300 transition">롤플레잉</Link>
        <Link to="/response" className="hover:text-gray-300 transition">대처방안</Link>
      </nav>
    </header>
  );
}
