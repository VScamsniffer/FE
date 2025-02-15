import React from "react";
import { socialLogin } from "../api"; // 백엔드 API 요청
import googleLogo from "../assets/google.svg";
import kakaoLogo from "../assets/kakao.svg";
import naverLogo from "../assets/naver.svg";

export default function SocialLogin() {
  
  const handleSocialLogin = (provider) => {
    const loginUrl = `http://127.0.0.1:8000/accounts/${provider}/login/`;
    window.location.href = loginUrl; // ✅ 페이지 리디렉션을 통해 소셜 로그인 수행
  };

  return (
    <div className="flex justify-center gap-4">
      {/* Google 로그인 */}
      <button
        className="w-14 h-14 flex items-center justify-center bg-white border rounded-full shadow-md"
        onClick={() => handleSocialLogin("google")}
      >
        <img src={googleLogo} alt="Google" className="w-8 h-8" />
      </button>

      {/* Kakao 로그인 */}
      <button
        className="w-14 h-14 flex items-center justify-center bg-yellow-400 rounded-full shadow-md"
        onClick={() => handleSocialLogin("kakao")}
      >
        <img src={kakaoLogo} alt="Kakao" className="w-8 h-8" />
      </button>

      {/* Naver 로그인 */}
      <button
        className="w-14 h-14 flex items-center justify-center bg-green-500 rounded-full shadow-md"
        onClick={() => handleSocialLogin("naver")}
      >
        <img src={naverLogo} alt="Naver" className="w-8 h-8" />
      </button>
    </div>
  );
}
