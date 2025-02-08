import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser, logout } from "../api";
import Logo from "./Logo";

export default function Header({ user, setUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await fetchUser();  // ✅ fetchUser 내부에서 쿠키에서 토큰 가져옴
        if (data) {
          console.log("✅ 사용자 확인:", data.username);
          setUser(data.username);
        } else {
          console.log("❌ 사용자 정보 없음");
          setUser(null);
        }
      } catch (error) {
        console.error("❌ 사용자 확인 실패:", error);
        setUser(null);
      } finally {
        setLoading(false);  // ✅ 로딩 상태 업데이트
      }
    };

    checkUser();
  }, [setUser]);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("❌ 로그아웃 실패:", error);
    }
  };

  return (
    <header className="bg-gray-900 text-white py-3 px-6 flex justify-between items-center shadow-md">
      {/* 로고 */}
      <Link to="/">
        <Logo />
      </Link>

      {/* 네비게이션 메뉴 */}
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

        {!loading && (
          user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">👤 {user}님</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link to="/signup" className="hover:text-gray-300 transition">
              로그인
            </Link>
          )
        )}
      </nav>
    </header>
  );
}
