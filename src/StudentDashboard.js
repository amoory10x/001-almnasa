import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import "./index.css";

function StudentDashboard() {
  const [opportunities, setOpportunities] = useState([]);
  const [activeFormId, setActiveFormId] = useState(null);
  const [selectedSection, setSelectedSection] = useState("opportunities");

  useEffect(() => {
    fetch("http://localhost/almnasa-backend/get_all_opportunities.php")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setOpportunities(data);
        else console.error("بيانات غير صالحة:", data);
      })
      .catch((err) => console.error("خطأ في جلب الفرص:", err));
  }, []);

  const handleToggleForm = (id) => {
    setActiveFormId(activeFormId === id ? null : id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ تم إرسال طلب التقديم بنجاح!");
    setActiveFormId(null);
  };

  return (
    <div className="dashboard">
      <Sidebar userType="student" onSelect={setSelectedSection} />
      <div className="content">
        <h2>الفرص التدريبية المتاحة</h2>
        <div className="opportunities-grid">
          {opportunities.map((op) => (
            <div className="opportunity-card" key={op.id}>
              <h3>{op.title}</h3>
              <p>
                <strong>الجهة:</strong> {op.organization_name}
              </p>
              <p>
                <strong>عدد المقاعد:</strong> {op.available_seats}
              </p>
              <p>
                <strong>الوصف:</strong> {op.description}
              </p>
              <p>
                <strong>الحالة:</strong>
                <span
                  style={{
                    color: op.status === "مفتوحة" ? "#16a34a" : "#dc2626",
                    fontWeight: "bold",
                  }}
                >
                  {op.status}
                </span>
              </p>

              {activeFormId === op.id ? (
                <form className="apply-form" onSubmit={handleSubmit}>
                  <input type="text" placeholder="الاسم الكامل" required />
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    required
                  />
                  <input type="tel" placeholder="رقم الجوال" required />
                  <input type="text" placeholder="تخصصك الدراسي" required />
                  <input type="file" accept=".pdf,.doc,.docx" />
                  <textarea placeholder="رسالة أو ملاحظات" rows="3"></textarea>
                  <div className="form-buttons">
                    <button type="submit" className="submit-btn">
                      إرسال
                    </button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setActiveFormId(null)}
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              ) : (
                <button onClick={() => handleToggleForm(op.id)}>التقديم</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
