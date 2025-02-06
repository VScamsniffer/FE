import React, { useState, useEffect, useRef } from "react";
import ChatBox from "../components/ChatBox";
import BackToHome from "../components/BackToHome";

export default function ScamCheck() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "📢 음성 파일을 업로드하여 보이스피싱 여부를 확인하세요." },
  ]);
  const chatContainerRef = useRef(null);

  // 파일 업로드 핸들러 (여러 번 가능)
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    // 사용자 메시지 추가 (파일 업로드)
    const newMessages = [
      ...messages,
      { type: "user", text: `📁 ${uploadedFile.name}` }
    ];
    setMessages(newMessages);

    // 파일 분석 실행
    analyzeFile(newMessages, uploadedFile);
  };

  // 보이스피싱 판별 (임시 로직)
  const analyzeFile = (currentMessages, file) => {
    if (!file) return;

    setTimeout(() => {
      const isScam = Math.random() > 0.5; // 50% 확률로 보이스피싱 여부 결정
      const resultMessage = isScam
        ? { type: "bot", text: "🔴 보이스피싱 가능성이 있습니다. 주의하세요!" }
        : { type: "bot", text: "🟢 정상적인 통화로 판단됩니다." };

      const recommendationMessage = isScam
        ? {
            type: "bot",
            text: `🚨 권장 조치:
            1️⃣ 경찰(112) 또는 금융감독원(1332)에 신고하세요.  
            2️⃣ 해당 은행 고객센터에 즉시 연락하여 계좌 지급정지를 요청하세요.  
            3️⃣ 개인정보 유출 여부를 확인하고, 계정 보안을 강화하세요.  
            4️⃣ 추가 피해를 방지하기 위해 가족 및 지인들에게 알리세요.`,
          }
        : { type: "bot", text: "✅ 추가 검토가 필요하면 전문가 상담을 받아보세요. 신뢰할 수 있는 금융기관에 문의하세요." };

      setMessages([...currentMessages, resultMessage, recommendationMessage]);
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
        <h1 className="text-2xl font-bold text-gray-900">보이스피싱 판별</h1>

        {/* ✅ 채팅창 (스크롤 가능) */}
        <ChatBox>
          <div
            ref={chatContainerRef}
            className="h-80 max-h-96 overflow-y-auto p-2 flex flex-col space-y-2"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 max-w-xs rounded-lg break-words ${
                  msg.type === "user"
                    ? "bg-blue-500 text-white self-end text-right"
                    : "bg-gray-700 text-white self-start text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* 파일 업로드 버튼 */}
          <div className="flex justify-end mt-3">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="hidden"
              id="audio-upload"
            />
            <label
              htmlFor="audio-upload"
              className="cursor-pointer bg-gray-800 text-white py-2 px-3 rounded-full text-sm font-semibold shadow-md hover:bg-gray-700 transition"
            >
              +
            </label>
          </div>
        </ChatBox>

        {/* 메인으로 돌아가기 버튼 */}
        <BackToHome />
      </div>
    </div>
  );
}
