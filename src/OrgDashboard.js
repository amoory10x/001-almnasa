import React, { useState, useContext } from "react";
import Sidebar from "./Sidebar";
import "./index.css";
import { OpportunitiesContext } from "./OpportunitiesContext";

function OrgDashboard() {
  const { opportunities, setOpportunities } = useContext(OpportunitiesContext);
  // const [opportunities, setOpportunities] = useState([
  //   {
  //     id: 1,
  //     title: "تدريب في الموارد البشرية",
  //     specialization: "إدارة أعمال",
  //     availableSlots: 3,
  //     location: "جدة",
  //   },
  //   {
  //     id: 2,
  //     title: "تدريب في تقنية المعلومات",
  //     specialization: "تقنية معلومات",
  //     availableSlots: 5,
  //     location: "الرياض",
  //   },
  // ]);

  const [editingId, setEditingId] = useState(null);
  const [newForm, setNewForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    specialization: "",
    location: "",
    availableSlots: "",
  });

  const handleDelete = (id) => {
    if (window.confirm("هل تريد حذف هذه الفرصة؟")) {
      setOpportunities(opportunities.filter((o) => o.id !== id));
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ ...item });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setOpportunities(
      opportunities.map((item) =>
        item.id === editingId ? { ...formData, id: editingId } : item
      )
    );
    setEditingId(null);
    setFormData({
      title: "",
      specialization: "",
      location: "",
      availableSlots: "",
    });
  };

  const handleAddOpportunity = (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      id: Date.now(),
    };
    setOpportunities([...opportunities, newItem]);
    setNewForm(false);
    setFormData({
      title: "",
      specialization: "",
      location: "",
      availableSlots: "",
    });
  };

  return (
    <div className="dashboard">
      <Sidebar userType="organization" />
      <div className="content">
        <h2>فرص التدريب الخاصة بكم</h2>
        <div className="opportunities-grid">
          {opportunities.map((item) => (
            <div className="opportunity-card org-card" key={item.id}>
              {editingId === item.id ? (
                <form className="apply-form" onSubmit={handleSaveEdit}>
                  <input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="عنوان الفرصة"
                  />
                  <input
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                    placeholder="التخصص"
                  />
                  <input
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="الموقع"
                  />
                  <input
                    value={formData.availableSlots}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availableSlots: e.target.value,
                      })
                    }
                    placeholder="عدد المقاعد"
                  />
                  <div className="form-buttons">
                    <button type="submit" className="submit-btn">
                      حفظ
                    </button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setEditingId(null)}
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="card-header">
                    <h3>{item.title}</h3>
                  </div>
                  <p>
                    <strong>التخصص:</strong> {item.specialization}
                  </p>
                  <p>
                    <strong>الموقع:</strong> {item.location}
                  </p>
                  <p>
                    <strong>عدد المقاعد:</strong> {item.availableSlots}
                  </p>
                  <div className="card-actions">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      🗑️
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      تعديل
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* بطاقة الإضافة */}
          <div className="add-card" onClick={() => setNewForm(!newForm)}>
            <div className="add-icon">+</div>
            <p>إضافة فرصة</p>
            {newForm && (
              <form
                className="add-form"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleAddOpportunity}
              >
                <input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="عنوان الفرصة"
                  required
                />
                <input
                  value={formData.specialization}
                  onChange={(e) =>
                    setFormData({ ...formData, specialization: e.target.value })
                  }
                  placeholder="التخصص"
                  required
                />
                <input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="الموقع"
                  required
                />
                <input
                  value={formData.availableSlots}
                  onChange={(e) =>
                    setFormData({ ...formData, availableSlots: e.target.value })
                  }
                  placeholder="عدد المقاعد"
                  required
                />
                <button type="submit" className="submit-btn">
                  إضافة
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrgDashboard;
