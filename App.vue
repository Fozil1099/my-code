<script setup lang="ts">
import { Default, Empty, Auth, Information } from "@/layouts";
import { localLayouts } from "@m/Profile";

const layouts = {
  default: Default,
  empty: Empty,
  auth: Auth,
  information: Information,
  ...localLayouts,
};

// const body = ref<HTMLElement | null>(document.querySelector("body"));

// watch(
//   () => sidebar.currentTheme,
//   () => {
//     if (sidebar.currentTheme === "light") {
//       body.value?.classList.remove("dark");
//       body.value?.classList.add("light");
//     } else {
//       body.value?.classList.remove("light");
//       body.value?.classList.add("dark");
//     }
//   }
// );

// onMounted(() => {
//   body.value?.classList.add(sidebar.currentTheme);
// });
</script>

<template>
  <component :is="layouts[<string>$route.meta.layout] || Empty">
    <RouterView />
  </component>
</template>
