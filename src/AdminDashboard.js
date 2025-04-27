import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import StudentsList from "./components/StudentsList";
import AddUserForm from "./components/AddUserForm";
import "./index.css";

function AdminDashboard() {
  const [selectedSection, setSelectedSection] = useState("add-user");

  const [formData, setFormData] = useState({
    id: "", // الرقم التدريبي
    name: "",
    email: "",
    phone: "",
    password: "",
    type: "student", // جاهز بالإنجليزي
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/almnasa-backend/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert("❌ فشل في الإرسال إلى السيرفر");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar userType="admin" onSelect={setSelectedSection} />
      <div className="content">
        {selectedSection === "add-user" && <AddUserForm />}
        {/* نموذج إضافة مستخدم */}
        {selectedSection === "view-students" && <StudentsList />}
        {/* عرض الطلاب */}
      </div>

      <>
        {/* <div className="content">
        <h2>إضافة مستخدم جديد</h2>
        <div className="opportunities-grid">
          <div className="opportunity-card">
            <form className="apply-form" onSubmit={handleSubmit}>
              <input
                type="text"
                // placeholder="الرقم التدريبي"
                placeholder="الرقم التدريبي او اسم المستخدم"
                required
                value={formData.id}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="الاسم الكامل"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="tel"
                placeholder="رقم الجوال"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="كلمة المرور"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="student">طالب</option>
                <option value="org">جهة تدريبية</option>
                <option value="admin">إداري</option>
              </select>
              <button type="submit" className="submit-btn">
                تسجيل
              </button>
            </form>
          </div>
        </div>
      </div> */}
      </>
    </div>
  );
}

export default AdminDashboard;
