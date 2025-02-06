import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import KakaoLogin from "react-kakao-login";
import NaverLogin from "react-naver-login";

// ✅ 로고 파일 import
import googleLogo from "../assets/google.svg";
import kakaoLogo from "../assets/kakao.svg";
import naverLogo from "../assets/naver.svg";

export default function SocialLogin() {
  const handleGoogleSuccess = (response) => {
    console.log("Google Login Success:", response);
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  const handleKakaoSuccess = (response) => {
    console.log("Kakao Login Success:", response);
  };

  const handleNaverSuccess = (response) => {
    console.log("Naver Login Success:", response);
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      {/* Google 로그인 */}
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <div className="w-14 h-14 flex items-center justify-center bg-white border rounded-full shadow-md cursor-pointer">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            render={(renderProps) => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <img src={googleLogo} alt="Google" className="w-8 h-8" />
              </button>
            )}
          />
        </div>
      </GoogleOAuthProvider>

      {/* Kakao 로그인 */}
      <KakaoLogin
        token="YOUR_KAKAO_REST_API_KEY"
        onSuccess={handleKakaoSuccess}
        onFailure={(err) => console.error("Kakao Login Failed:", err)}
        render={(props) => (
          <button
            onClick={props.onClick}
            className="w-14 h-14 flex items-center justify-center bg-yellow-400 rounded-full shadow-md cursor-pointer"
          >
            <img src={kakaoLogo} alt="Kakao" className="w-8 h-8" />
          </button>
        )}
      />

      {/* Naver 로그인 */}
      <NaverLogin
        clientId="YOUR_NAVER_CLIENT_ID"
        callbackUrl="http://localhost:3000"
        onSuccess={handleNaverSuccess}
        onFailure={(err) => console.error("Naver Login Failed:", err)}
        render={(props) => (
          <button
            onClick={props.onClick}
            className="w-14 h-14 flex items-center justify-center bg-green-500 rounded-full shadow-md cursor-pointer"
          >
            <img src={naverLogo} alt="Naver" className="w-8 h-8" />
          </button>
        )}
      />
    </div>
  );
}
