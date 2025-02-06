import React, { useState, useEffect, useRef } from "react";
import ChatBox from "../components/ChatBox";
import BackToHome from "../components/BackToHome";

export default function RolePlaying() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "📢 보이스피싱 상황을 시뮬레이션합니다. 상대방의 질문에 답변하세요." },
  ]);
  const chatContainerRef = useRef(null);

  // 사용자 입력 핸들러
  const handleUserResponse = (response) => {
    const newMessages = [...messages, { type: "user", text: response }];
    setMessages(newMessages);

    // 챗봇 응답 추가 (랜덤 보이스피싱 시나리오)
    setTimeout(() => {
      const responses = [
        { type: "bot", text: "📞 (전화) '안녕하세요, 고객님. 경찰청 금융사기팀입니다. 본인 확인이 필요합니다.'" },
        { type: "bot", text: "💳 '고객님의 카드가 정지될 예정입니다. 계좌번호를 확인해 주세요.'" },
        { type: "bot", text: "📢 '저희는 공공기관입니다. OTP 인증번호를 입력해 주세요.'" }
      ];
      const botResponse = responses[Math.floor(Math.random() * responses.length)];
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
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">롤플레잉</h1>

        {/* ✅ 채팅창 (스크롤 가능) */}
        <ChatBox>
          <div ref={chatContainerRef} className="h-80 max-h-96 overflow-y-auto p-2 flex flex-col space-y-2">
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

          {/* 사용자 입력 버튼 */}
          <div className="flex justify-between mt-3">
            <button
              onClick={() => handleUserResponse("네, 제 계좌번호는 123-456입니다.")}
              className="bg-red-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-600 transition"
            >
              계좌번호 제공
            </button>
            <button
              onClick={() => handleUserResponse("무슨 일이죠? 자세히 설명해주세요.")}
              className="bg-blue-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-600 transition"
            >
              추가 질문
            </button>
          </div>
        </ChatBox>

        {/* 메인으로 돌아가기 버튼 */}
        <BackToHome />
      </div>
    </div>
  );
}
