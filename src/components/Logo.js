import React from "react";
import logo from "../assets/logo.jpg"; // ✅ 로고 이미지 불러오기

export default function Logo() {
  return (
    <div>
      <img src={logo} alt="vScam Sniffer" className="h-8 sm:h-10 w-auto" />
    </div>
  );
}
