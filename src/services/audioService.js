import { uploadAudioFile } from "../api";  // API 호출

export const handleAudioUpload = async (file, currentMessages, setMessages) => {
  try {
    const response = await uploadAudioFile(file);  // API 호출로 파일 업로드
    const successMessage = { type: "bot", text: `업로드 성공! 파일 URL: ${response.file_url}` };

    setMessages([...currentMessages, successMessage]);
  } catch (error) {
    setMessages([...currentMessages, { type: "bot", text: "❌ 업로드 실패. 다시 시도하세요." }]);
  }
};
