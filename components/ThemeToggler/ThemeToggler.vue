<template>
  <button
    v-if="sidebar.currentTheme === 'light'"
    @click="sidebar.changeTheme('dark')"
  >
    <Icon icon="Moon" color="#7367f0" />
  </button>
  <button v-else>
    <!-- <img src="@/assets/icons/Sun.svg" @click="sidebar.changeTheme('light')" /> -->
    <Icon icon="Sun" @click="sidebar.changeTheme('light')" color="#7367f0" />
  </button>
</template>

<script setup lang="ts">
import { useSidebarStore } from "@/store/layoutConfig";
import Icon from "@/components/Icons/Icon.vue";

const sidebar = useSidebarStore();
</script>
