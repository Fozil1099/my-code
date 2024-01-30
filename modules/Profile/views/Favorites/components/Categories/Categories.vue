<script lang="ts" setup>
import { reactive, ref } from "vue";

interface Emits {
  (event: "update:modelValue", value: string): void;
}

const emit = defineEmits<Emits>();

const categories = reactive([
  {
    name: "Specialists",
    value: 10,
    key: "specialists",
  },
  {
    name: "Events",
    value: 10,
    key: "events",
  },
  {
    name: "News",
    value: 10,
    key: "news",
  },
]);

let value = ref("specialists");

const changeTab = (item) => {
  value.value = item.key;

  emit("update:modelValue", value.value);
};
</script>

<template>
  <div class="flex items-center justify-start gap-5">
    <div
      v-for="item in categories"
      class="flex gap-2 py-[14px] px-5 text-xl font-normal tracking-[0.3px] cursor-pointer"
      :class="
        value == item.key ? 'bg-primary text-white rounded-lg shadow-base' : ''
      "
      @click="changeTab(item)"
    >
      <span>{{ item.name }}</span>
      <span :class="value == item.key || 'text-primary'">{{ item.value }}</span>
    </div>
  </div>
</template>
