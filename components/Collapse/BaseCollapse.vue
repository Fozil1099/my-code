<script lang="ts" setup>
import { Collapse, vCollapse } from "@com";
import { ref, getCurrentInstance } from "vue";

interface Props {
  id?: string;
  title?: string;
  headerClass?: string;
}

const props = defineProps<Props>();
const isOpen = ref(false);
const id = getCurrentInstance()?.uid;
</script>

<template>
  <div>
    <div
      class="flex justify-between items-center cursor-pointer"
      :class="props.headerClass"
      v-collapse="`base-collapse-${id}` || props.id"
      @click="isOpen = !isOpen"
    >
      <h4 class="text-dark text-base font-semibold tracking-sm">
        {{ props.title }}
      </h4>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        class="duration-200"
        :class="isOpen && '-rotate-180'"
      >
        <path
          d="M19 9L12 15L5 9"
          stroke="#1D1D21"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <Collapse :id="`base-collapse-${id}` || props.id">
      <slot />
    </Collapse>
  </div>
</template>
