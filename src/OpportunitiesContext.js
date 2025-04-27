import React, { createContext, useState, useEffect } from "react";

export const OpportunitiesContext = createContext();

export const OpportunitiesProvider = ({ children }) => {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("opportunities");
    if (stored) {
      setOpportunities(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("opportunities", JSON.stringify(opportunities));
  }, [opportunities]);

  return (
    <OpportunitiesContext.Provider value={{ opportunities, setOpportunities }}>
      {children}
    </OpportunitiesContext.Provider>
  );
};
