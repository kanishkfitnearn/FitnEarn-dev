"use client";
import React, { createContext, useContext, useState } from "react";

const generalContext = createContext();

export const GeneralProvider = ({ children }) => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [username, setUserName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedHealthCategories, setSelectedHealthCategories] = useState([]);
  const [selectedBlogCategories, setSelectedBlogCategories] = useState([]);

  return (
    <generalContext.Provider
      value={{
        selectedLevel,
        setSelectedLevel,
        username,
        setUserName,
        selectedCategories,
        setSelectedCategories,
        selectedHealthCategories,
        setSelectedHealthCategories,
        selectedBlogCategories,
        setSelectedBlogCategories,
      }}
    >
      {children}
    </generalContext.Provider>
  );
};

export const General = () => useContext(generalContext);
