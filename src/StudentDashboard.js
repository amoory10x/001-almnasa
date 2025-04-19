import React, { useState, useContext } from "react";
import Sidebar from "./Sidebar";
import "./index.css";
import { OpportunitiesContext } from "./OpportunitiesContext";

function StudentDashboard() {
  const { opportunities } = useContext(OpportunitiesContext);
  const [activeFormId, setActiveFormId] = useState(null);

  const handleToggleForm = (id) => {
    setActiveFormId(activeFormId === id ? null : id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ تم إرسال الطلب بنجاح!");
    setActiveFormId(null);
  };

  return (
    <div className="dashboard">
      <Sidebar userType="student" />
      <div className="content">
        <h2>الفرص التدريبية المتاحة</h2>
        <div className="opportunities-grid">
          {opportunities.map((op) => (
            <div className="opportunity-card" key={op.id}>
              {/* <img src={op.image} alt="فرصة" /> */}
              <h3>{op.title}</h3>
              <p>
                <strong>التخصص:</strong> {op.specialization}
              </p>
              <p>
                <strong>الموقع:</strong> {op.location}
              </p>
              <p>
                <strong>المقاعد المتاحة:</strong> {op.availableSlots}
              </p>

              {activeFormId === op.id ? (
                <form className="apply-form" onSubmit={handleSubmit}>
                  <input type="text" placeholder="الاسم الكامل" />
                  <input type="email" placeholder="البريد الإلكتروني" />
                  <input type="tel" placeholder="رقم الجوال" />
                  <input type="text" placeholder="التخصص" />
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
