// stores/counter.js
import { defineStore } from "pinia";

export const useSidebarStore = defineStore("counter", {
  state: () => {
    return {
      currentTheme: localStorage.getItem("currentTheme") || "dark",
    };
  },

  actions: {
    changeTheme(newTheme: string) {
      this.currentTheme = newTheme;
      localStorage.setItem("currentTheme", this.currentTheme);
    },
  },
});
