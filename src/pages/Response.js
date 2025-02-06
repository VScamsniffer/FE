import React, { useState, useEffect, useRef } from "react";
import ChatBox from "../components/ChatBox";
import BackToHome from "../components/BackToHome";

export default function Response() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "📢 보이스피싱 피해를 입으셨다면, 해당되는 상황을 선택하세요." },
  ]);
  const chatContainerRef = useRef(null);

  // 사용자 선택 핸들러
  const handleUserResponse = (response) => {
    const newMessages = [...messages, { type: "user", text: response }];
    setMessages(newMessages);

    // 챗봇 응답 추가 (대처 방법 제공)
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
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">대처방안</h1>

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

          {/* 사용자 선택 버튼 */}
          <div className="flex justify-between mt-3">
            <button
              onClick={() => handleUserResponse("계좌에서 돈이 빠져나갔어요.")}
              className="bg-red-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-600 transition"
            >
              돈이 빠져나감
            </button>
            <button
              onClick={() => handleUserResponse("의심스러운 전화를 받았어요.")}
              className="bg-blue-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-600 transition"
            >
              의심 전화
            </button>
          </div>
        </ChatBox>

        {/* 메인으로 돌아가기 버튼 */}
        <BackToHome />
      </div>
    </div>
  );
}
