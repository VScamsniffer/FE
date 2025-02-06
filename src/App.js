import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // ✅ 상단 네비게이션 바 추가
import Footer from "./components/Footer"; // ✅ 하단 푸터 추가
import Home from "./pages/Home";
import RolePlaying from "./pages/RolePlaying";
import ScamCheck from "./pages/ScamCheck";
import Response from "./pages/Response";
import SignUp from "./pages/SignUp";
import Logo from "./components/Logo"; // ✅ 로고 컴포넌트 추가

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
      <Header />
      

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






// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import ChatContainer from "./components/ChatContainer"; // ✅ 채팅 UI 유지
// import Home from "./pages/Home";
// import RolePlaying from "./pages/RolePlaying";
// import ScamCheck from "./pages/ScamCheck";
// import Response from "./pages/Response";

// export default function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <MainContent />
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// // ✅ 페이지 전환 시 ChatContainer 유지
// function MainContent() {
//   const location = useLocation();

//   return (
//     <div className="flex items-center justify-center flex-grow bg-gray-100 px-4">
//       <ChatContainer key={location.pathname} />
//     </div>
//   );
// }
