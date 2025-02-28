import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ChatBox from "../components/ChatBox";


export const useKeyword = () => {
  const [isComposing, setIsComposing] = useState(false);

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  return { isComposing, handleCompositionStart, handleCompositionEnd };
};


export default function RolePlaying() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "📢 보이스피싱 시나리오를 체험해보세요. 상대방의 질문에 답변하세요." },
  ]);
  const [scenario, setScenario] = useState(null);
  const chatContainerRef = useRef(null);
  const ws = useRef(null);
  const audioPlayerRef = useRef(null);
  const [isComposing, setIsComposing] = useState(false);


  const scenarios = [
    { id: 1, name: "경찰 사칭", description: "경찰 사칭" },
    { id: 2, name: "은행 사칭", description: "은행 사칭" },
    { id: 3, name: "가족 납치", description: "대출 사칭" },
    // { id: 4, name: "가족 납치", description: "가족 납치" },
    // { id: 5, name: "협박", description: "협박" }
  ];
  const inputRef = useRef(null);
  useEffect(() => {
    // ws.current = new WebSocket("http://40.82.157.231:8000/ws/rp/");
    // ws.current = new WebSocket("https://40.82.157.231:8000/ws/rp/");
    // ws.current = new WebSocket("https://vscamsniffer.work.gd/ws/rp/");
    // ws.current = new WebSocket("ws://127.0.0.1:8000/ws/rp/");
    ws.current = new WebSocket("wss://vscamsniffer.work.gd/ws/rp/");


    ws.current.onopen = () => {
      console.log("✅ WebSocket 연결 성공!");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 WebSocket 응답:", data);
    
      const newMessage = {
        type: "bot",
        text: data.message
      };
    
      setMessages(prev => [...prev, newMessage]);
    
      // 🔹 오디오 데이터가 있는 경우 처리
      if (data.audio) {
        try {
          // Base64 -> Blob 변환
          const byteCharacters = atob(data.audio);
          const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
          const byteArray = new Uint8Array(byteNumbers);
          const audioBlob = new Blob([byteArray], { type: "audio/wav" });
    
          // Blob을 URL로 변환 후 오디오 재생
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play();
    
        } catch (error) {
          console.error("🎵 오디오 처리 중 오류 발생:", error);
        }
      }
    };
    
    

    ws.current.onerror = (error) => {
      console.error("⚠️ WebSocket 오류 발생:", error);
    };

    ws.current.onclose = (event) => {
      console.log("🔴 WebSocket 연결 종료됨.", event.code, event.reason, event.wasClean);
      // if (!event.wasClean) {
      //   console.log("WebSocket 재시도 중...");
      //   // 재시도 로직
      //   // setTimeout(initWebsocket, 300); // 200ms 후에 재시도
      // }
    };
    

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);
  const isEnterPressed = useRef(false);
  const handleScenarioSelect = (selectedScenario) => {
    setScenario(selectedScenario);
    
    // Send initial scenario selection to backend
    const scenarioPayload = {
      type: "scenario_select",
      scenario: selectedScenario.name
    };
    
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(scenarioPayload));
    }

    setMessages(prevMessages => [
      ...prevMessages,
      { type: "bot", text: `${selectedScenario.name} 시나리오를 선택하셨습니다. 모델준비까지 잠시만 기다려주세요.` }
    ]);
  };

  

  const handleSendMessage = () => {
    if (!inputRef.current) return;
  
    const message = inputRef.current.value.trim();
    if (!message) return;


    requestAnimationFrame(() => {
      isEnterPressed.current = false;
    });

    handleUserResponse(message);
  
  };


  const handleKeyDown = (e) => {
    // IME가 활성화되지 않았을 때만 Enter 키 동작을 처리하도록
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      // console.log("사용자 입력값:", e.target.value);

      handleSendMessage();
    }
  };
  
  const handleCompositionStart = () => {
    setIsComposing(true); // IME 활성화 시 isComposing 상태를 true로 설정
  };
  
  const handleCompositionEnd = () => {
    setIsComposing(false); // IME 종료 시 isComposing 상태를 false로 설정
  };
  const handleUserResponse = (response) => {
    console.log("입력 값:", response);

    if (!response || !response.trim()) {  // 빈 값이나 공백만 있는 경우 return
      console.log("빈 값 또는 공백만 있는 메시지");  // 공백 처리된 메시지 로그
      return;
    }

    // Add user message to chat
    setMessages(prevMessages => [...prevMessages, { type: "user", text: response }]);
    // Send message to backend with scenario context
    if (scenario && ws.current && ws.current.readyState === WebSocket.OPEN) {
      const messagePayload = {
        type: "user_message",
        message: response,
        scenario: scenario.name
      };
      ws.current.send(JSON.stringify(messagePayload));
    }

    // Clear input field
    const inputField = document.querySelector("input");
    if (inputField) {
      inputField.value = "";
    }
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
                {msg.audio && (
                  <audio ref={audioPlayerRef} controls>
                    <source src={msg.audio} type="audio/mpeg" />
                    해당 브라우저에서 음성읽기 기능을 제공하지 않습니다.
                  </audio>
                )}
              </div>
            ))}
          </div>

          {!scenario && (
            <div className="scenario-selection mt-4 p-4 bg-gray-800 rounded-md">
              <h3 className="text-xl text-white">시나리오를 선택하세요:</h3>
              <div className="space-y-2 mt-3">
                {scenarios.map((scenarioOption) => (
                  <button
                    key={scenarioOption.id}
                    onClick={() => handleScenarioSelect(scenarioOption)}
                    className="p-2 bg-blue-500 text-white rounded-md w-full"
                  >
                    {scenarioOption.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </ChatBox>

        <div className="flex items-center space-x-2 mt-4">
        <input
            ref={inputRef}
            type="text"
            placeholder="메시지를 입력하세요..."
            className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}  // IME 시작 시 상태 업데이트
            onCompositionEnd={handleCompositionEnd}    
          />
          <button
            className="px-4 py-2 bg-green-500 rounded-md text-white hover:bg-green-400"
            onClick={handleSendMessage}
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
