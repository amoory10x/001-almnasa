import React from "react";
import SidebarItem from "./SidebarItem";

function SidebarMenu({ userType, onSelect }) {
  const studentItems = [{ label: "الفرص التدريبية", value: "opportunities" }];

  const orgItems = [
    { label: "إضافة / حذف فرصة تدريبية", value: "manage-opportunities" },
  ];

  const adminItems = [
    { label: "اضافة مستخدم جديد", value: "add-user" },
    { label: "عرض جميع المتدربين", value: "view-students" },
    { label: "عرض جميع الجهات", value: "manage-orgs" },
  ];

  const items =
    userType === "student"
      ? studentItems
      : userType === "organization"
      ? orgItems
      : userType === "admin"
      ? adminItems
      : [];

  return (
    <div>
      {items.map((item, index) => (
        <SidebarItem
          key={index}
          label={item.label}
          onClick={() => onSelect(item.value)}
        />
      ))}
    </div>
  );
}

export default SidebarMenu;
