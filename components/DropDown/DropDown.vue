<script lang="ts" setup>
import { onMounted, ref } from "vue";

interface Emits {
  (event: "click", value: boolean): void;
}

const emit = defineEmits<Emits>();

const isOpen = ref<boolean>(false);
const props = defineProps<{
  id?: string;
  disabled?: boolean;
  class?: string;
}>();

const handleClickOutside = (event) => {
  if (!event.target.closest(`#${props.id || id}`)) {
    isOpen.value = false;
  }
};
const id = "drop" + Math.floor(Math.random() * (10 ** 10 - 0) + 0);

const openDropDown = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  emit("click", isOpen.value);
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
</script>
<template>
  <div class="relative" :id="props.id || id" @click="openDropDown">
    <slot name="button"></slot>

    <div
      class="absolute top-full z-50"
      :class="props.class"
      @click.stop
      v-show="isOpen"
      v-if="!props.disabled"
    >
      <slot></slot>
    </div>
  </div>
</template>
