import React, { useState } from "react";

function Sidebar({ userType }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <div
      className={`${
        isSidebarVisible ? "block" : "hidden"
      } sidebar bg-gray-200 w-64 h-screen fixed z-10 transition-all`}
    >
      <button
        onClick={toggleSidebar}
        className="p-2 m-4 text-white bg-green-500 rounded-md"
      >
        {isSidebarVisible ? "إخفاء الشريط" : "إظهار الشريط"}
      </button>
      <div className="p-4">
        {userType === "student" && (
          <div>
            <p>الفرص التدريبية</p>
            <p>رفع التقرير</p>
          </div>
        )}
        {userType === "organization" && (
          <div>
            <p>اضافة \ حذف فرصة تدريبية</p>
            <p>تقييم المتدربين</p>
          </div>
        )}
        {userType === "admin" && (
          <div>
            <p>عرض الفرص التدريبية</p>
            <p>إدارة الجهات</p>
            <p>عرض جميع المتدربين</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
