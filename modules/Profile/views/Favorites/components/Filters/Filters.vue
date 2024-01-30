<script lang="ts" setup>
import { FormControl, Input } from "@com";
</script>

<template>
  <div class="card px-5 py-2.5 grid grid-cols-2 gap-5">
    <Input
      label="Search"
      placeholder="Search"
      input-class="w-full"
      icon="Minimalistic Magnifer"
    />
    <FormControl label="Sort by">
      <v-select
        id="sort_by"
        :options="['Latest', 'Latest']"
        placeholder="Day"
        clearable
      ></v-select>
    </FormControl>
  </div>
</template>
