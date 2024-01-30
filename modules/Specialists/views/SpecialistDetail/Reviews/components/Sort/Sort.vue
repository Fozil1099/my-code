<script lang="ts" setup>
import { FormControl } from "@com";
</script>

<template>
  <div class="card px-5 py-2.5 flex items-end justify-between">
    <div class="max-w-96 w-full">
      <FormControl label="Sort by">
        <v-select
          id="sort_by"
          :options="['Latest', 'Latest']"
          placeholder="Day"
          clearable
        ></v-select>
      </FormControl>
    </div>
    <div class="text-primary font-medium text-xl py-2.5">1040 reviews</div>
  </div>
</template>
