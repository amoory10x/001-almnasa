import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import "./index.css";
import StudentsList from "./components/StudentsList";

function OrgDashboard() {
  const [selectedSection, setSelectedSection] = useState("add-user");
  const [opportunities, setOpportunities] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newForm, setNewForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    organization_name: "",
    available_seats: "",
    description: "",
    status: "مفتوحة",
  });

  const orgId = localStorage.getItem("org_id");
  console.log(localStorage.getItem("org_id"));
  console.log("البيانات المرسلة:", { ...formData, org_id: orgId });
  useEffect(() => {
    fetch("http://localhost/almnasa-backend/get_opportunities.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ org_id: orgId }),
    })
      .then((res) => res.json())
      .then((data) => setOpportunities(Array.isArray(data) ? data : []))
      .catch((err) => console.error("خطأ في جلب البيانات", err));
  }, [orgId]);

  const handleDelete = async (id) => {
    if (window.confirm("هل تريد حذف هذه الفرصة؟")) {
      await fetch("http://localhost/almnasa-backend/delete_opportunity.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setOpportunities(opportunities.filter((o) => o.id !== id));
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ ...item });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost/almnasa-backend/update_opportunity.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, id: editingId }),
    });
    setOpportunities(
      opportunities.map((item) =>
        item.id === editingId ? { ...formData, id: editingId } : item
      )
    );
    setEditingId(null);
    resetForm();
  };

  const handleAddOpportunity = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost/almnasa-backend/add_opportunity.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, org_id: orgId }),
      }
    );

    const result = await response.json();
    console.log("نتيجة من PHP:", result);
    alert(result.message); // <-- يعرض لك الرسالة

    if (result.id) {
      setOpportunities([...opportunities, { ...formData, id: result.id }]);
    }
    resetForm();
    setNewForm(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      organization_name: "",
      available_seats: "",
      description: "",
      status: "مفتوحة",
    });
  };

  return (
    <div className="dashboard">
      <Sidebar userType="organization" onSelect={setSelectedSection} />
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
                    required
                  />
                  <input
                    value={formData.organization_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        organization_name: e.target.value,
                      })
                    }
                    placeholder="اسم الجهة"
                    required
                  />
                  <input
                    type="number"
                    value={formData.available_seats}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        available_seats: e.target.value,
                      })
                    }
                    placeholder="عدد المقاعد"
                    required
                  />
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="الوصف"
                    required
                  />
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="مفتوحة">مفتوحة</option>
                    <option value="مغلقة">مغلقة</option>
                    <option value="ممتلئة">ممتلئة</option>
                  </select>
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
                    <strong>الجهة:</strong> {item.organization_name}
                  </p>
                  <p>
                    <strong>عدد المقاعد:</strong> {item.available_seats}
                  </p>
                  <p>
                    <strong>الوصف:</strong> {item.description}
                  </p>
                  <p>
                    <strong>الحالة:</strong> {item.status}
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
                  value={formData.organization_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      organization_name: e.target.value,
                    })
                  }
                  placeholder="اسم الجهة"
                  required
                />
                <input
                  type="number"
                  value={formData.available_seats}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      available_seats: e.target.value,
                    })
                  }
                  placeholder="عدد المقاعد"
                  required
                />
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="الوصف"
                  required
                />
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="مفتوحة">مفتوحة</option>
                  <option value="مغلقة">مغلقة</option>
                  <option value="ممتلئة">ممتلئة</option>
                </select>
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
