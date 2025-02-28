import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ChatBox from "../components/ChatBox";

export default function ScamCheck() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "📢 음성 파일을 업로드하여 보이스피싱 여부를 확인하세요." },
  ]);
  const chatContainerRef = useRef(null);

  
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    const newMessages = [...messages, { type: "user", text: `📁 ${uploadedFile.name}` }];
    setMessages(newMessages);

    uploadFileToServer(newMessages, uploadedFile);
  };

  // 파일 업로드 및 분석 요청
const uploadFileToServer = async (currentMessages, file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
      const response = await fetch("https://vscamchecksniffer.work.gd/upload-audio/", {
      // const response = await fetch("http://127.0.0.1:8000/upload-audio/", {
          method: "POST",
          body: formData,
      });

      if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data.probability.toFixed(2) >= 50){
            const resultMessage = {
              type: "bot",
              text: `🟢 파일이 성공적으로 분석되었습니다. 보이스피싱일 확률: ${data.probability.toFixed(2)}%`,
            };
            setMessages([...currentMessages, resultMessage]);
          } else {
            const resultMessage = {
              type: "bot",
              text: `🟢 파일이 성공적으로 분석되었습니다. 보이스피싱이 아닐 확률: ${(100 - data.probability.toFixed(2))}%`,
            };
            setMessages([...currentMessages, resultMessage]);
          }
      } else {
          throw new Error("파일 업로드 실패");
      }
  } catch (error) {
      console.error(error);
      setMessages([...currentMessages, { type: "bot", text: "🔴 파일 업로드 중 오류가 발생했습니다." }]);
  }
};

  
// const analyzeFile = async (localPath) => {
//   try {
//     const response = await fetch("http://127.0.0.1:8090/analyze-file/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ local_path: localPath }),  // ✅ Django 서버에 저장된 로컬 파일 경로 전달
//     });

//     const data = await response.json();
//     if (response.ok) {
//       console.log("✅ 보이스피싱 확률:", data.result);
//       setMessages((prev) => [...prev, { type: "bot", text: `보이스피싱 확률: ${data.result}%` }]);
//     } else {
//       console.error("❌ 분석 실패:", data.error);
//       setMessages((prev) => [...prev, { type: "bot", text: `🔴 분석 오류: ${data.error}` }]);
//     }
//   } catch (error) {
//     console.error("❌ 네트워크 오류:", error);
//   }
// };



  // Ensure the chat scrolls down as new messages come in
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
                className={`p-3 max-w-xs rounded-lg break-words ${msg.type === "user" ? "bg-blue-500 text-white self-end text-right" : "bg-gray-700 text-white self-start text-left"}`}
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
          <Link to="/roleplaying" className="btn flex-1">롤플레잉</Link>
          <Link to="/response" className="btn flex-1">대처방안</Link>
        </div>
      </div>
    </div>
  );
}
