<template>
  <li
    :style="`mask-image: url('/icons/${props.icon}.svg');
        background: ${
          sidebar.currentTheme === 'light'
            ? props.color || '#000'
            : props.darkColor || props.color || '#fff'
        };
        color: ${
          sidebar.currentTheme === 'light'
            ? props.color || '#000'
            : props.darkColor || props.color || '#fff'
        };
        width: ${props.size || 20}px;
        height: ${props.size || 20}px;
        mask-size: ${props.size || 20}px;`"
    style="mask-position: center; mask-repeat: no-repeat"
  ></li>
</template>

<script setup lang="ts">
import { useSidebarStore } from "@/store/layoutConfig";
const props = defineProps<{
  icon: string;
  color?: string;
  darkColor?: string;
  size?: string;
}>();

const sidebar = useSidebarStore();
</script>
