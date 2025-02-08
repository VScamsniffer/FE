import React from "react";
// import logo from "../assets/logo.jpg"; // ✅ 로고 이미지 불러오기
import logo from "../assets/logo3.png"; // ✅ 로고 이미지 불러오기

export default function Logo() {
  return (
    <div>
      <img src={logo} alt="vScam Sniffer" className="h-26 sm:h-20 w-auto" />
    </div>
  );
}
