import React from "react";
import { useLocation, Link } from "react-router-dom";
import ChatBox from "./ChatBox";

export default function ChatContainer() {
  const location = useLocation();

  // ✅ 각 페이지에 맞는 버튼 설정
  const getButtons = () => {
    switch (location.pathname) {
      case "/scamcheck":
        return (
          <>
            <Link to="/roleplaying" className="btn">롤플레잉</Link>
            <Link to="/response" className="btn">대처방안</Link>
          </>
        );
      case "/roleplaying":
        return (
          <>
            <Link to="/scamcheck" className="btn">보이스피싱 판별</Link>
            <Link to="/response" className="btn">대처방안</Link>
          </>
        );
      case "/response":
        return (
          <>
            <Link to="/scamcheck" className="btn">보이스피싱 판별</Link>
            <Link to="/roleplaying" className="btn">롤플레잉</Link>
          </>
        );
      default:
        return (
          <>
            <Link to="/scamcheck" className="btn">보이스피싱 판별</Link>
            <Link to="/roleplaying" className="btn">롤플레잉</Link>
            <Link to="/response" className="btn">대처방안</Link>
          </>
        );
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-[600px]">
      {/* ✅ 채팅 UI 유지 */}
      <ChatBox>
        <p className="text-sm text-center">📢 원하는 기능을 선택하세요</p>
      </ChatBox>

      {/* ✅ 페이지에 따라 하단 버튼 변경 */}
      <div className="mt-4 flex justify-between space-x-2">{getButtons()}</div>
    </div>
  );
}
