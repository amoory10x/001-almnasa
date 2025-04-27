import React, { useEffect, useState } from "react";
import "../index.css";

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    type: "student",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost/almnasa-backend/get_students.php")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("فشل في تحميل الطلاب:", err));
  }, []);

  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData({
      id: student.id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      password: student.password,
      type: student.type,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل تريد حذف هذا الطالب؟")) {
      await fetch("http://localhost/almnasa-backend/delete_user.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updated = { ...formData, id: editingId };

    const res = await fetch(
      "http://localhost/almnasa-backend/update_user.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      }
    );
    const result = await res.json();
    if (result.success) {
      const updatedList = students.map((s) =>
        s.id === editingId ? updated : s
      );
      setStudents(updatedList);
      setEditingId(null);
      setFormData({
        id: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        type: "student",
      });
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="students-list">
      <h2>قائمة المتدربين</h2>

      {/* شريط البحث */}
      <input
        type="text"
        placeholder="🔍 ابحث عن متدرب بالاسم..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="students-table">
        {filteredStudents.map((student) => (
          <div className="student-row" key={student.id}>
            {editingId === student.id ? (
              <form className="edit-form" onSubmit={handleSave}>
                <input
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                  placeholder="الرقم التدريبي"
                />
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="الاسم"
                />
                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="البريد الإلكتروني"
                />
                <input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="رقم الجوال"
                />
                <input
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="كلمة المرور"
                />
                <div className="edit-buttons">
                  <button type="submit" className="submit-btn">
                    💾 حفظ
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setEditingId(null)}
                  >
                    ❌ إلغاء
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="student-info">
                  <span>
                    <strong>{student.name}</strong>
                  </span>
                  <span>{student.id}</span>
                  <span>{student.email}</span>
                  <span>{student.phone}</span>
                  <span>{student.password}</span>
                  <span>{student.type}</span>
                </div>
                <div className="form-buttons">
                  <button
                    className="submit-btn"
                    onClick={() => handleEdit(student)}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(student.id)}
                  >
                    🗑️
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentsList;
