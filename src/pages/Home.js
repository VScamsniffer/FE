import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 px-6">
      {/* ✅ 왼쪽 - YouTube 썸네일 (클릭하면 동영상 재생) */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4">
        {isPlaying ? (
          <iframe
            className="w-full h-56 md:h-[350px] rounded-lg shadow-md"
            src="https://www.youtube.com/embed/z6owhe-HitE"
            title="보이스피싱 경각심 영상"
            allow="encrypted-media"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="relative w-full h-56 md:h-[350px] rounded-lg shadow-md cursor-pointer" onClick={() => setIsPlaying(true)}>
            <img
              className="w-full h-full rounded-lg"
              src="https://img.youtube.com/vi/z6owhe-HitE/maxresdefault.jpg"
              alt="보이스피싱 경각심 영상 썸네일"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 6.707a1 1 0 011.414 0L10 11.086l4.293-4.379a1 1 0 011.414 1.414l-5 5.086a1 1 0 01-1.414 0l-5-5.086a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* ✅ 오른쪽 - 프로젝트 소개 */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">vScam Sniffer</h1>
        <p className="text-gray-700 mt-2 text-center">
          보이스피싱 예방 및 대응을 위한 AI 기반 프로젝트입니다.
          <br /> 음성 분석을 통해 보이스피싱 가능성을 판별하고,
          <br /> 롤플레잉과 대응 방안을 제공합니다.
        </p>

        {/* ✅ 기능 선택 버튼 */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          보이스피싱범 잡으러 가기!
        </h2>

        {/* ✅ 버튼 가로 정렬 (화면이 작아지면 세로 정렬) */}
        <div className="mt-4 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full">
          <Link to="/scamcheck" className="btn flex-1">
            보이스피싱 판별
          </Link>
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
