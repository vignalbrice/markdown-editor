import { createContext, useState } from "react";

export const themes = {
  style: "light",
};

const ThemeContextProvider = () => {
  const [style, setStyle] = useState(themes.style);
  function toggleStyle() {
    setStyle((style) => (style === "light" ? "dark" : "light"));
  }
  const ThemeContext = createContext({
    style,
    toggleStyle,
  });
  return {
    ThemeContext,
    toggleStyle,
  };
};

export default ThemeContextProvider;
