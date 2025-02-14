import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ user, logout }) => {
  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 로그인 페이지로 이동
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header>
      <div className="header-container">
        <h1>Welcome to My App</h1>
        {user ? (
          <div className="user-info">
            <span className="username">{user.username}</span> {/* 로그인된 사용자 이름 표시 */}
            <button className="logout-button" onClick={logout}>로그아웃</button> {/* 로그아웃 버튼 */}
          </div>
        ) : (
          <button className="login-button" onClick={handleLoginClick}>로그인</button> 
        )}
      </div>
    </header>
  );
};

export default Header;
