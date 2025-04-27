import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";

function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost/almnasa-backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, password }),
      });

      const data = await res.json();

      if (data.type === "student") {
        localStorage.setItem("user_id", userId);
        localStorage.setItem("user_type", "student");
        history.push("/student");
      } else if (data.type === "org") {
        localStorage.setItem("org_id", userId);
        localStorage.setItem("user_type", "org");
        history.push("/organization");
      } else if (data.type === "admin") {
        localStorage.setItem("admin_id", userId);
        localStorage.setItem("user_type", "admin");
        history.push("/admin");
      } else {
        alert(data.message || "❌ بيانات الدخول غير صحيحة");
      }
    } catch (err) {
      alert("❌ حدث خطأ في الاتصال بالسيرفر");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h1>تسجيل الدخول</h1>
      <input
        type="text"
        placeholder="الرقم التدريبي او اسم المستخدم"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
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
