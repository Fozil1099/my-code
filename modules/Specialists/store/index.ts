import { defineStore } from "pinia";
import $axios from "@/plugins/axios";

export default defineStore("Specialists", {
  state: () => {
    return {
      mainFilters: {
        teacherOnMap: false,
      },
    };
  },

  actions: {},
});
