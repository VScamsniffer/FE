import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socialLogin } from "../api"; // 백엔드 API 요청
import googleLogo from "../assets/google.svg";
import kakaoLogo from "../assets/kakao.svg";
import naverLogo from "../assets/naver.svg";

export default function SocialLogin() {
  return (
    <div className="flex justify-center gap-4">
      {/* Google 로그인 */}
      <a href="http://127.0.0.1:8000/accounts/google/login/">
        <button className="w-14 h-14 flex items-center justify-center bg-white border rounded-full shadow-md">
        <img src={googleLogo} alt="Google" className="w-8 h-8" />
        </button>
      </a>

      {/* Kakao 로그인 */}
      <a href="http://127.0.0.1:8000/accounts/kakao/login/">
        <button className="w-14 h-14 flex items-center justify-center bg-yellow-400 rounded-full shadow-md">
        <img src={kakaoLogo} alt="Kakao" className="w-8 h-8" />
        </button>
      </a>

      {/* Naver 로그인 */}
      <a href="http://127.0.0.1:8000/accounts/naver/login/">
        <button className="w-14 h-14 flex items-center justify-center bg-green-500 rounded-full shadow-md">
        <img src={naverLogo} alt="Naver" className="w-8 h-8" />
        </button>
      </a>
    </div>
  );
}
