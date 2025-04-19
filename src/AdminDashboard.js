import React from "react";
import Sidebar from "./Sidebar";
import { useHistory } from "react-router-dom";

function AdminDashboard() {
  const history = useHistory();
  return (
    <div className="dashboard">
      <Sidebar userType="admin" />
      <div className="content">
        <h2>لوحة تحكم الكادر التعليمي</h2>
        <p>تابع أداء الطلاب وجهات التدريب من هنا.</p>
        <button onClick={() => history.push("/login")}>تسجيل خروج</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
