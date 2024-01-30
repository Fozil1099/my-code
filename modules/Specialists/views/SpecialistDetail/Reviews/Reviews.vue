<script lang="ts" setup>
import Sort from "./components/Sort";
import Comments from "./components/Comments";
</script>

<template>
  <div class="py-[60px] max-w-5xl mx-auto">
    <Sort />

    <div class="mt-10 grid gap-5">
      <Comments v-for="_ in 10"/>
    </div>
  </div>
</template>
