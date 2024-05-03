import { create } from "zustand";

type ThemeState = {
  theme: string;
  toggleTheme: () => void;
};
const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));
export default useThemeStore;
