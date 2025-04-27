import React, { useState } from "react";
import "../index.css";

function AddUserForm() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    type: "student",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost/almnasa-backend/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    alert(result.message || "تمت العملية بنجاح");

    setFormData({
      id: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      type: "student",
    });
  };

  return (
    <div>
      <h2>إضافة مستخدم جديد</h2>
      <div className="opportunities-grid">
        <div className="opportunity-card">
          <form className="apply-form" onSubmit={handleSubmit}>
            <input
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="اسم المستخدم / الرقم التدريبي"
              required
            />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="الاسم الكامل"
              required
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="البريد الإلكتروني"
              required
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="رقم الجوال"
              required
            />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="كلمة المرور"
              required
            />
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="student">طالب</option>
              <option value="org">جهة تدريبية</option>
              <option value="admin">كادر إداري</option>
            </select>
            <button className="submit-btn" type="submit">
              تسجيل
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUserForm;
