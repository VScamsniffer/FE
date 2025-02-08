import React, { useState } from "react";
import { addUser } from "../api";

function AddUser({ onUserAdded }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = await addUser({ username, email });
            setMessage("사용자가 성공적으로 추가되었습니다.");
            onUserAdded(); // 데이터 갱신
        } catch (error) {
            setMessage("사용자 추가 실패");
        }
        setUsername("");
        setEmail("");
    };

    return (
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-xl font-bold">새 사용자 추가</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">추가</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddUser;
