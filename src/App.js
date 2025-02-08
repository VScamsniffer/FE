import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // ✅ 상단 네비게이션 바 추가
import Footer from "./components/Footer"; // ✅ 하단 푸터 추가
import Home from "./pages/Home";
import RolePlaying from "./pages/RolePlaying";
import ScamCheck from "./pages/ScamCheck";
import Response from "./pages/Response";
import SignUp from "./pages/SignUp";

export default function App() {
  const [user, setUser] = useState(null); // ✅ 로그인한 사용자 정보 저장

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
      <Header user={user} setUser={setUser}/> {/* ✅ 로그인한 사용자 표시 */}
      

      <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roleplaying" element={<RolePlaying />} />
            <Route path="/scamcheck" element={<ScamCheck />} />
            <Route path="/response" element={<Response />} />
            <Route path="/signup" element={<SignUp setUser={setUser}/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

