import React, { useEffect, useState } from "react"

function DarkLightMode() {
    const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
    if (saved) document.documentElement.classList.add("dark");
  }, []);

  const toggle = () => {
    setDarkMode(!darkMode);
    if (!darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", !darkMode);
  };
  return (
    <button
      onClick={toggle}
      className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  )
}

export default DarkLightMode
