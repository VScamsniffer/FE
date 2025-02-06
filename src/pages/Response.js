import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ChatBox from "../components/ChatBox";

export default function Response() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "📢 보이스피싱 피해를 입으셨다면, 해당되는 상황을 선택하세요." },
  ]);
  const chatContainerRef = useRef(null);

  // 사용자 응답 핸들러
  const handleUserResponse = (response) => {
    const newMessages = [...messages, { type: "user", text: response }];
    setMessages(newMessages);

    setTimeout(() => {
      let botResponse;
      if (response === "계좌에서 돈이 빠져나갔어요.") {
        botResponse = {
          type: "bot",
          text: `🚨 긴급 조치:
          1️⃣ 즉시 해당 은행 고객센터에 연락하여 계좌 지급정지를 요청하세요.
          2️⃣ 경찰(112) 또는 금융감독원(1332)에 신고하세요.
          3️⃣ 금융감독원에 피해 신고 후, 보이스피싱 대응 절차를 확인하세요.`,
        };
      } else {
        botResponse = {
          type: "bot",
          text: `✅ 조치 방법:
          1️⃣ 보이스피싱 전화 녹음을 보관하고 신고하세요.
          2️⃣ 가족이나 지인에게 알리고 추가 피해를 방지하세요.
          3️⃣ 관련 기관에 문의하여 법적 지원을 받을 수 있는지 확인하세요.`,
        };
      }
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
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">대처방안</h1>

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
          <Link to="/roleplaying" className="btn flex-1">
            롤플레잉
          </Link>
        </div>
      </div>
    </div>
  );
}
