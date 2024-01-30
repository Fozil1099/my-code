<template>
  <div class="flex justify-between items-center mb-4">
    <div class="">
      <h1 class="text-2xl font-semibold dark:text-gray-300">{{ props.title }}</h1>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}
const props = defineProps<Props>();
</script>
