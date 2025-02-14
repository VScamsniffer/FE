import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ChatBox from "../components/ChatBox";

export default function RolePlaying() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "📢 보이스피싱 시나리오를 체험해보세요. 상대방의 질문에 답변하세요." },
  ]);
  const chatContainerRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    // ws.current = new WebSocket("ws://localhost:8000/ws/rp/");
    // ws.current = new WebSocket("ws://40.82.157.231:8000/ws/rp/");
    // ws.current = new WebSocket("wss://40.82.157.231:8000/ws/rp/");
    ws.current = new WebSocket("wss://vscamsniffer.work.gd/ws/rp/");

    ws.current.onopen = () => {
      console.log("✅ WebSocket 연결 성공!");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 WebSocket 응답:", data);

      if (data.message) {
        setMessages((prevMessages) => [...prevMessages, { type: "bot", text: data.message }]);
      }
    };

    ws.current.onerror = (error) => {
      console.error("⚠️ WebSocket 오류 발생:", error);
    };

    ws.current.onclose = () => {
      console.log("🔴 WebSocket 연결 종료됨.");
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const handleUserResponse = (response) => {
    if (response.trim() === "") return;

    setMessages((prevMessages) => [...prevMessages, { type: "user", text: response }]);
    console.log("📤 WebSocket 전송:", response);
    ws.current.send(JSON.stringify({ message: response }));
  };

  const handleVoiceInput = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("음성 인식 기능이 지원되지 않습니다.");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "ko-KR";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("🎤 음성 입력 인식됨:", transcript);
      handleUserResponse(transcript);
    };

    recognition.onerror = (event) => {
      console.error("음성 인식 오류:", event.error);
    };
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col justify-between h-[600px]">
        <h1 className="text-2xl font-bold text-center text-white mb-4">롤플레잉 채팅</h1>

        <ChatBox>
          <div
            ref={chatContainerRef}
            className="h-[450px] max-h-[500px] overflow-y-auto p-2 flex flex-col space-y-2"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 max-w-xs rounded-lg break-words ${
                  msg.type === "user"
                    ? "bg-blue-500 text-white self-end text-right"
                    : "bg-green-500 text-white self-start text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </ChatBox>

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            onKeyDown={(e) => e.key === "Enter" && handleUserResponse(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-500 rounded-md text-white hover:bg-green-400"
            onClick={() => handleUserResponse(document.querySelector("input").value)}
          >
            보내기
          </button>
          <button
            className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-400"
            onClick={handleVoiceInput}
          >
            🎤
          </button>
        </div>

        <div className="mt-4 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full">
          <Link to="/scamcheck" className="btn flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md text-center">
            보이스피싱 판별
          </Link>
          <Link to="/response" className="btn flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md text-center">
            대처방안
          </Link>
        </div>
      </div>
    </div>
  );
}
