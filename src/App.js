import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RolePlaying from "./pages/RolePlaying";
import ScamCheck from "./pages/ScamCheck";
import Response from "./pages/Response";
import SignUp from "./pages/SignUp";
import { fetchUser } from "./api";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

console.log("API URL:", process.env.REACT_APP_API_URL);

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; 
    const extractTokens = () => {
      console.log("🔄 extractTokens 호출됨");
      const queryParams = new URLSearchParams(window.location.search);
      const accessToken = queryParams.get("accessToken");
      const refreshToken = queryParams.get("refreshToken");

      if (accessToken && refreshToken) {
        console.log("🔑 토큰 저장");
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        window.history.replaceState(null, "", window.location.pathname);
      }
    };

    const initializeUser = async () => {
      console.log("🔄 extractinitializeUserTokens 호출됨");
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("❌ 액세스 토큰이 없습니다.");
        setLoading(false);
        return;
      }

      try {
        const fetchedUser = await fetchUser(); // ✅ 사용자 정보 가져오기
        if (isMounted && fetchedUser) {
          console.log("✅ 사용자 정보:", fetchedUser);
          setUser(fetchedUser.username);
        } else {
          console.log("❌ 사용자 정보 없음");
        }
      } catch (error) {
        console.error("❌ 사용자 정보 가져오기 오류:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    extractTokens();
    initializeUser();
    return () => {
      isMounted = false;  // ✅ 컴포넌트 언마운트 시 상태 변경 방지
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header user={user} onLogout={logout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roleplaying" element={<RolePlaying />} />
            <Route path="/scamcheck" element={<ScamCheck />} />
            <Route path="/response" element={<Response />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
