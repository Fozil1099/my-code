<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const category = [
  {
    name: "Profile",
    route: "profile",
  },
  {
    name: "Children",
    route: "profile-children",
  },
  {
    name: "Orders",
    route: "profile-orders",
  },
  {
    name: "Favorites",
    route: "profile-favorites",
  },
  {
    name: "Settings",
    route: "profile-settings",
  },
  {
    name: "Support",
    route: "profile-support",
  },
];
</script>

<template>
  <div class="card">
    <div v-for="(item, index) in category">
      <div
        class="flex items-center justify-between py-[18px] px-5 cursor-pointer"
        @click="item.route && router.push({ name: item.route })"
      >
        <div
          class="hover:text-primary"
          :class="
            item.route == route.name
              ? 'text-primary text-base font-semibold tracking-sm'
              : ' text-normal-semibold'
          "
        >
          {{ item.name }}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9 5L15 12L9 19"
            :stroke="item.route == route.name ? '#6354FF' : '#1D1D21'"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div v-if="index < category.length - 1" class="line"></div>
    </div>
  </div>
</template>
