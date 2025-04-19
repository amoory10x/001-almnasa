import React from "react";
import { useHistory, useLocation } from "react-router-dom";

function Header() {
  const history = useHistory();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isHomePage = location.pathname === "/";

  const handleClick = () => {
    if (isHomePage) {
      history.push("/login");
    } else {
      history.push("/login"); // لاحقًا ممكن يكون "/logout"
    }
  };

  return (
    <div className="header-title">
      <p>منصة التدريب التعاوني</p>
      {!isLoginPage && (
        <button onClick={handleClick}>
          {isHomePage ? "تسجيل الدخول" : "تسجيل الخروج"}
        </button>
      )}
    </div>
  );
}

export default Header;
