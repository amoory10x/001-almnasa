import React from "react";

function SidebarItem({ label, onClick }) {
  return (
    <p
      className="cursor-pointer p-2 rounded hover:bg-gray-300 transition"
      onClick={onClick}
    >
      {label}
    </p>
  );
}

export default SidebarItem;
