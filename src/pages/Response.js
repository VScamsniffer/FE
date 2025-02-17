import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ChatBox from "../components/ChatBox";

export default function Response() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "📢 보이스피싱 피해를 입으셨다면, 해당되는 상황을 선택하세요." },
  ]);
  const chatContainerRef = useRef(null);
  const [scenario, setScenario] = useState(null);
  const ws = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  
  const scenarios = [
    { id: 1, name: "통장에서 돈이 인출되었어요.", description: "통장에서 돈이 인출되었어요." },
    { id: 2, name: "개인정보 및 신용정보를 누출했어요.", description: "개인정보 및 신용정보를 누출했어요." }
  ];

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:8000/ws/solution/");

    ws.current.onopen = () => {
      console.log("✅ WebSocket 연결 성공!");
      setIsConnected(true);
    };

    ws.current.onclose = () => {
      console.log("WebSocket 연결 종료");
      setIsConnected(false);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket 에러:", error);
      setIsConnected(false);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 WebSocket 응답:", data);
      
      const newMessage = {
        type: "bot",
        text: data.message
      };
      
      setMessages(prev => [...prev, newMessage]);

      // 추가 질문 옵션 처리
      if (data.type === "follow_up" && data.options) {
        const optionsMessage = {
          type: "options",
          options: data.options
        };
        setMessages(prev => [...prev, optionsMessage]);
      }
    };
  };

  const handleScenarioSelect = (selectedScenario) => {
    setScenario(selectedScenario);
    const userMessage = {
      type: "user",
      text: selectedScenario.name
    };
    setMessages(prev => [...prev, userMessage]);

    // WebSocket으로 선택된 시나리오 전송
    if (ws.current && isConnected) {
      ws.current.send(JSON.stringify({
        selected_option: selectedScenario.name
      }));
    }
  };

  const handleUserResponse = (response) => {
    const userMessage = {
      type: "user",
      text: response
    };
    setMessages(prev => [...prev, userMessage]);

    // WebSocket으로 사용자 응답 전송
    if (ws.current && isConnected) {
      ws.current.send(JSON.stringify({
        message: response
      }));
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const renderMessage = (msg, index) => {
    if (msg.type === "options") {
      return (
        <div key={index} className="flex flex-col space-y-2">
          {msg.options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              onClick={() => handleUserResponse(option)}
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              {option}
            </button>
          ))}
        </div>
      );
    }

    return (
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
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-[600px]">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">대처방안</h1>

        <ChatBox>
          <div ref={chatContainerRef} className="h-[450px] max-h-[500px] overflow-y-auto p-2 flex flex-col space-y-2">
            {messages.map((msg, index) => renderMessage(msg, index))}
          </div>
        </ChatBox>

        {!scenario && (
          <div className="mt-4 p-4 bg-gray-800 rounded-md">
            <h3 className="text-xl text-white mb-4">현재 상황을 선택해주세요:</h3>
            {scenarios.map((scenarioOption) => (
              <button
                key={scenarioOption.id}
                onClick={() => handleScenarioSelect(scenarioOption)}
                className="w-full p-2 bg-blue-500 text-white rounded-md mb-2"
              >
                {scenarioOption.name}
              </button>
            ))}
          </div>
        )}

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