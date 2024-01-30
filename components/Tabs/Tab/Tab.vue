<template>
  <div v-if="props.title == selectedTitle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

const props = defineProps<{
  title: string;
  hide?: boolean;
}>();

const emit = defineEmits<{
  (e: "selected"): void;
}>();
const selectedTitle: string = inject("selectedTitle") || "";
</script>
