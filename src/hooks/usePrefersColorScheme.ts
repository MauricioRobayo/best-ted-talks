import { useEffect, useState } from "react";

const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

const usePrefersColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<"dark" | "light">(
    darkModeQuery.matches ? "dark" : "light"
  );
  useEffect(() => {
    darkModeQuery.addEventListener("change", (event) => {
      setColorScheme(event.matches ? "dark" : "light");
    });
  }, []);

  return colorScheme;
};

export default usePrefersColorScheme;
