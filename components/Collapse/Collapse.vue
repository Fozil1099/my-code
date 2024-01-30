<script lang="ts" setup></script>

<template>
  <div class="scale-y-0 h-0 duration-100 overflow-hidden w-full">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.open {
  @apply h-full scale-y-100 duration-100;
}
</style>
