import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./index";

const opportunities = [
  {
    id: 1,
    title: "تدريب في STC",
    specialization: "تقنية معلومات",
    availableSlots: 5,
    location: "الرياض",
    // image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
  },
  {
    id: 2,
    title: "تدريب في أرامكو",
    specialization: "هندسة ميكانيكية",
    availableSlots: 3,
    location: "الظهران",
    // image: "https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg",
  },
  {
    id: 3,
    title: "تدريب في هيئة الغذاء والدواء",
    specialization: "صيدلة",
    availableSlots: 4,
    location: "الرياض",
    // image: "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg",
  },
];

function StudentDashboard() {
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
