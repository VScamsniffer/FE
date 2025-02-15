import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api";
import Logo from "./Logo";

export default function Header({ user, loading, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // 로그아웃 후 메인 페이지로 이동
    } catch (error) {
      console.error("❌ 로그아웃 실패:", error);
    }
  };

  return (
    <header className="bg-gray-900 text-white py-3 px-6 flex justify-between items-center shadow-md">
      <Link to="/">
        <Logo />
      </Link>
      <nav className="flex space-x-6">
        <Link to="/scamcheck" className="hover:text-gray-300 transition">
          보이스피싱 판별
        </Link>
        <Link to="/roleplaying" className="hover:text-gray-300 transition">
          롤플레잉
        </Link>
        <Link to="/response" className="hover:text-gray-300 transition">
          대처방안
        </Link>

        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">👤 {user}님</span>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition">
              로그아웃
            </button>
          </div>
        ) : (
          <Link to="/signup" className="hover:text-gray-300 transition">
            로그인
          </Link>
        )}
      </nav>
    </header>
  );
}
