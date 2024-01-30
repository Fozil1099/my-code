<script lang="ts" setup>
import { Default } from "@/layouts";
import Menu from "../components/Menu";
</script>

<template>
  <Default>
    <div class="w-full">
      <div class="max-w-screen-base mx-auto">
        <div class="text-center py-[60px]">
          <h1 class="text-4xl font-bold tracking-[0.54px] text-dark">
            Profile
          </h1>
        </div>
        <div class="flex items-start gap-10">
          <div class="md:w-1/4">
            <Menu />
          </div>

          <div class="md:w-3/4">
            <slot />
          </div>
        </div>
      </div></div
  ></Default>
</template>
