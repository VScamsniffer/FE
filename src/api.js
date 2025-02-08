const API_BASE_URL = "http://127.0.0.1:8000"; // Django 서버 주소

// ✅ 로그인 요청 (JWT 토큰 발급)
export const login = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error("로그인 실패");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
    return data;
};

// ✅ 소셜 로그인 요청 (토큰 저장 포함)
// export const socialLogin = async (provider) => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/accounts/${provider}/login/token/`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         if (!response.ok) {
//             throw new Error("소셜 로그인 실패");
//         }

//         const data = await response.json();
//         console.log("🔍 소셜 로그인 응답:", data);

//         // ✅ 토큰 저장
//         localStorage.setItem("accessToken", data.access);
//         localStorage.setItem("refreshToken", data.refresh);
        
//         return data;
//     } catch (error) {
//         console.error("❌ 소셜 로그인 오류:", error);
//         throw error;
//     }
// };

export const socialLogin = async (provider) => {
    try {
      const response = await fetch(`${API_BASE_URL}/accounts/${provider}/login/token/`);
      const data = await response.json();
  
      if (data.access) {
        console.log("✅ 소셜 로그인 성공:", data);
        localStorage.setItem("accessToken", data.access); // ✅ 토큰 저장
        localStorage.setItem("refreshToken", data.refresh);
      } else {
        console.error("❌ 토큰이 반환되지 않았습니다.");
      }
    } catch (error) {
      console.error("❌ 소셜 로그인 오류:", error);
      throw error;
    }
  };
  

// ✅ 로그인된 사용자 정보 가져오기
export const fetchUser = async () => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('accessToken='))
      ?.split('=')[1];  // ✅ 쿠키에서 토큰 가져오기
  
    if (!token) {
      console.log("❌ 토큰이 없습니다.");
      return null;
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.warn("❌ 사용자 정보 가져오기 실패");
        return null;
      }
  
      return await response.json();
    } catch (error) {
      console.error("❌ 사용자 정보 가져오기 오류:", error);
      return null;
    }
  };
  

// ✅ 로그아웃 요청
export const logout = async () => {
    try {
        await fetch(`${API_BASE_URL}/api/logout/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        console.log("✅ 로그아웃 성공");
    } catch (error) {
        console.error("❌ 로그아웃 요청 오류:", error);
    } finally {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";  // 메인 페이지로 리디렉션
    }
};
