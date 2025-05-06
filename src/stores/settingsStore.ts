import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    isLightMode: localStorage.getItem("lightMode") === "true" || false,
  }),

  actions: {
    toggleLightMode() {
      this.isLightMode = !this.isLightMode;
      localStorage.setItem("lightMode", this.isLightMode.toString());
    },
  },
});
