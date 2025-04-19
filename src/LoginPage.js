import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = () => {
    if (username === "111" && password === "111") {
      history.push("/student");
    } else if (username === "222" && password === "222") {
      history.push("/organization");
    } else if (username === "333" && password === "333") {
      history.push("/admin");
    } else {
      alert("البيانات غير صحيحة");
    }
  };

  return (
    <div className="login-container">
      <h1>تسجيل الدخول</h1>
      <input
        type="text"
        placeholder="اسم المستخدم"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>تسجيل الدخول</button>
    </div>
  );
}

export default LoginPage;
