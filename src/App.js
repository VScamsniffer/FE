import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RolePlaying from "./pages/RolePlaying";
import ScamCheck from "./pages/ScamCheck";
import Response from "./pages/Response";
import SignUp from "./pages/SignUp";

const API_BASE_URL = "http://127.0.0.1:8000"; // Django 서버 주소

export default function App() {
  const [user, setUser] = useState(null); // 로그인한 사용자 정보 상태 저장

  // 로그인된 사용자 정보 fetch
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user/`, {
        withCredentials: true, // 쿠키에 인증 정보 포함
      });

      if (response.data) {
        setUser(response.data); // 사용자 정보 설정
      }
    } catch (error) {
      console.error("로그인된 사용자 정보를 가져오는 데 실패했습니다.");
      setUser(null); // 실패 시 사용자 정보 초기화
    }
  };

  // 컴포넌트가 마운트될 때 사용자 정보 가져오기
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 로그아웃 요청
  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/logout/`, {}, { withCredentials: true });
      setUser(null); // 로그아웃 후 사용자 상태 초기화
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header user={user} logout={logout} /> {/* Header에 사용자 정보와 로그아웃 버튼 전달 */}

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
