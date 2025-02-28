import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ChatBox from "../components/ChatBox";

export default function ScamCheck() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "📢 음성 파일을 업로드하여 보이스피싱 여부를 확인하세요." },
  ]);
  const chatContainerRef = useRef(null);

  // ✅ CSRF 토큰 가져오기 함수
  const getCSRFToken = () => {
    const csrfCookie = document.cookie.split("; ").find(row => row.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : "";
  };

  // ✅ 파일 업로드 핸들러
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    // 사용자 메시지 추가 (파일 업로드)
    const newMessages = [...messages, { type: "user", text: `📁 ${uploadedFile.name}` }];
    setMessages(newMessages);

    // 서버에 파일 업로드
    uploadFileToServer(newMessages, uploadedFile);
  };

  // ✅ 서버에 파일 업로드 및 결과 표시
  const uploadFileToServer = async (currentMessages, file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://127.0.0.1:8000/upload-audio/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json(); // 응답을 JSON으로 변환
  
      if (response.ok) {
        const resultMessage = {
          type: "bot",
          text: `🟢 파일이 성공적으로 업로드되었습니다. [파일 보기](${data.file_url})`,
        };
        setMessages([...currentMessages, resultMessage]);
      } else {
        const errorMessage = {
          type: "bot",
          text: `🔴 오류: ${data.error}`, // 서버에서 반환한 오류 메시지를 그대로 표시
      };
      setMessages([...currentMessages, errorMessage]);
  }
    } catch (error) {
      const errorMessage = {
        type: "bot",
        text: "🔴 파일 업로드 중 오류가 발생했습니다. 다시 시도해주세요.",
      };
      setMessages([...currentMessages, errorMessage]);
    }
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
        
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">보이스피싱 판별</h1>

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

        <div className="mt-4 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full">
          <Link to="/roleplaying" className="btn flex-1">
            롤플레잉
          </Link>
          <Link to="/response" className="btn flex-1">
            대처방안
          </Link>
        </div>
      </div>
    </div>
  );
}
