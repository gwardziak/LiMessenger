import { themes } from "./css/themes";

export const loadTheme = () => {
  const theme = localStorage.getItem("theme");

  if (theme) {
    return (themes as any)[theme];
  }

  return themes.light;
};

export const setTheme = (theme: string) => {
  localStorage.setItem("theme", theme);
};
