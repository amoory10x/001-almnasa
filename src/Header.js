import React from "react";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  return (
    <div className="header-title">
      <p>منصة التدريب التعاوني</p>
      <button onClick={() => history.push("/login")}>تسجيل خروج</button>
    </div>
  );
}

export default Header;
