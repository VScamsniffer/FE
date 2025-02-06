import React from "react";
import SocialLogin from "../components/SocialLogin";

export default function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          회원가입
        </h1>
        <p className="text-gray-600 text-center mt-2">
          소셜 계정으로 빠르게 가입하세요
        </p>

        {/* 동그라미 소셜 로그인 버튼 */}
        <div className="mt-6 flex justify-center">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}
