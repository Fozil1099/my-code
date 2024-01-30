<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";

interface Props {
  disabledAll: boolean;
}

const router = useRouter();
const route = useRoute();
const props = defineProps<Props>();
const category = [
  {
    name: "General",
    route: "profile-children-general",
    params: {
      id: route.params.id,
    },
  },
  {
    name: "Schedule",
    route: "profile-children-schedule",
    params: {
      id: route.params.id,
    },
  },
  {
    name: "Medical records",
    route: "profile-children-medical-records",
    params: {
      id: route.params.id,
    },
  },
  {
    name: "Additionally",
    route: "profile-children-additionally",
    params: {
      id: route.params.id,
    },
  },
  {
    name: "Documents",
    route: "profile-children-documents",
    params: {
      id: route.params.id,
    },
  },
];

const goToCategory = (item, index) => {
  if (index > 0 && props.disabledAll) return;
  router.push({ name: item.route, params: item.params });
};

const checkIsDisabled = (item, index) => {
  if (props.disabledAll && index > 0) return "text-normal-semibold opacity-50";
  if (item.route == route.name)
    return "text-primary text-base font-semibold tracking-sm";
  return " text-normal-semibold hover:text-primary";
};
</script>

<template>
  <div class="card">
    <div v-for="(item, index) in category">
      <div
        class="flex items-center justify-between py-[18px] px-5 cursor-pointer"
        @click="goToCategory(item, index)"
      >
        <div :class="checkIsDisabled(item, index)">
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
