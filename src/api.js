// const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://vscamsniffer.work.gd";

console.log("API BASE URL:", API_BASE_URL);

// ✅ 로그인 요청 (JWT 토큰 발급)
export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/api/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error("로그인 실패");

  const data = await response.json();
  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);

  return data;
};

// ✅ 사용자 정보 가져오기
const MAX_RETRY = 3;
export const fetchUser = async (retryCount = 0) => {
  console.log("🔄 fetchUser 함수 호출");
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.log("❌ 액세스 토큰이 없습니다.");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/user/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log("📥 fetchUser 응답 상태 코드:", response.status);

    if (response.status === 401) {
      if (retryCount < MAX_RETRY) {
        console.warn("🔄 accessToken 만료: refreshToken으로 갱신 시도");
        const newToken = await refreshAccessToken();
        return newToken ? fetchUser(retryCount + 1) : null;
      } else {
        console.error("❌ 최대 재시도 횟수 초과");
        return null;
      }
    }
    if (!response.ok) throw new Error("사용자 정보 가져오기 실패");

    const userData = await response.json();
    console.log("✅ 사용자 정보:", userData);
    return userData;

  } catch (error) {
    console.error("❌ 사용자 정보 가져오기 오류:", error);
    return null;
  }
};

// ✅ 토큰 갱신 요청
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    console.log("❌ refreshToken이 없습니다.");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      console.warn("❌ refreshToken 사용 불가");
      return null;
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.access);
    console.log("✅ 새 accessToken 저장:", data.access);

    return data.access;
  } catch (error) {
    console.error("❌ 토큰 갱신 오류:", error);
    return null;
  }
};

// ✅ 소셜 로그인 요청
export const socialLogin = async (provider) => {
  console.log(`🔄 ${provider} 로그인 요청`);

  try {
    const response = await fetch(`${API_BASE_URL}/accounts/${provider}/login/callback/`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) throw new Error("소셜 로그인 실패");

    const data = await response.json();
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);

    console.log("✅ 소셜 로그인 성공:", data);
    return data;
  } catch (error) {
    console.error(`❌ ${provider} 로그인 오류:`, error);
    throw error;
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
    window.location.href = "/";  // ✅ 메인 페이지로 리디렉션
  }
};
