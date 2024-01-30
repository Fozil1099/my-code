import { defineStore } from "pinia";
import $axios from "@/plugins/axios";

export default defineStore("Orders", {
  state: () => {
    return {
      mainFilters: {
        ordersOnMap: false,
      },
    };
  },

  actions: {},
});
