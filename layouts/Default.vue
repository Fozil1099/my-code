<script lang="ts" setup>
import { AuthNotification, Breadcrumb } from "@/components";
import { Footer, Navbar } from "@/navigation";
import { onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";

interface BCrumb {
  name: string;
  active?: boolean;
  to?: string;
}

const route = useRoute();
let navbarHeight = ref();
let breadcrumb = ref(route.meta.breadcrumb as BCrumb[]);

watch(
  () => route.meta.breadcrumb as BCrumb[],
  () => {
    breadcrumb.value = route.meta.breadcrumb as BCrumb[];
  }
);

onMounted(() => {
  const el = document.getElementById("navbar");

  navbarHeight.value = el?.offsetHeight ? el?.offsetHeight + "px" : "100px";
});
</script>

<template>
  <div :style="`padding-top: ${navbarHeight};`">
    <Navbar id="navbar" />
    <div v-if="breadcrumb && breadcrumb.length" class="w-full bg-light-100">
      <div class="max-w-screen-base mx-auto py-[38px]">
        <Breadcrumb :list="breadcrumb" />
      </div>
    </div>
    <slot />
    <Footer />

    <AuthNotification />
  </div>
</template>
