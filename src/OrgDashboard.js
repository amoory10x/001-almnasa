import React from "react";
import Sidebar from "./Sidebar";
import { useHistory } from "react-router-dom";

function OrgDashboard() {
  const history = useHistory();
  return (
    <div className="dashboard">
      <Sidebar userType="organization" />
      <div className="content">
        <h2>أهلاً بكم في لوحة تحكم الجهة التدريبية</h2>
        <p>يمكنكم اضافة وحذف الفرص التدريبية.</p>
        <button onClick={() => history.push("/login")}>تسجيل خروج</button>
      </div>
    </div>
  );
}

export default OrgDashboard;
