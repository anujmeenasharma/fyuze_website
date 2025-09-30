"use client";
import { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [darkText, setDarkText] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkText, setDarkText }}>
      {children}
    </ThemeContext.Provider>
  );
}
