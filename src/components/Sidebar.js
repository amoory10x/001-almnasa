import React, { useState } from "react";
import SidebarMenu from "./SidebarMenu";

function Sidebar({ userType, onSelect }) {
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
        <SidebarMenu userType={userType} onSelect={onSelect} />
      </div>
    </div>
  );
}

export default Sidebar;
