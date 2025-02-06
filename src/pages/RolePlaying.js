import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ChatBox from "../components/ChatBox";

export default function RolePlaying() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "📢 보이스피싱 시나리오를 체험해보세요. 상대방의 질문에 답변하세요." },
  ]);
  const chatContainerRef = useRef(null);

  // 사용자 응답 핸들러
  const handleUserResponse = (response) => {
    const newMessages = [...messages, { type: "user", text: response }];
    setMessages(newMessages);

    setTimeout(() => {
      const botResponses = [
        { type: "bot", text: "📞 (전화) '안녕하세요. 경찰청 금융사기팀입니다. 본인 확인이 필요합니다.'" },
        { type: "bot", text: "💳 '고객님의 카드가 정지될 예정입니다. 계좌번호를 확인해 주세요.'" },
        { type: "bot", text: "📢 '저희는 공공기관입니다. OTP 인증번호를 입력해 주세요.'" }
      ];
      const botResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages([...newMessages, botResponse]);
    }, 2000);
  };

  // ✅ 채팅창 스크롤이 아래로 자동 이동하도록 설정
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-[600px]">
        
        {/* ✅ 채팅창 상단에 제목 추가 */}
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">롤플레잉</h1>

        {/* ✅ 채팅창 */}
        <ChatBox>
          <div ref={chatContainerRef} className="h-[450px] max-h-[500px] overflow-y-auto p-2 flex flex-col space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 max-w-xs rounded-lg break-words ${
                  msg.type === "user" ? "bg-blue-500 text-white self-end text-right" : "bg-gray-700 text-white self-start text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </ChatBox>

        {/* ✅ 하단 버튼 (현재 페이지 버튼 제거, 나머지 2개 유지) */}
        <div className="mt-4 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full">
          <Link to="/scamcheck" className="btn flex-1">
            보이스피싱 판별
          </Link>
          <Link to="/response" className="btn flex-1">
            대처방안
          </Link>
        </div>
      </div>
    </div>
  );
}
