<script lang="ts" setup>
import { Input, FormControl } from "@com";
</script>

<template>
  <div class="card p-5 grid md:grid-cols-4 gap-5">
    <Input
      id="Search"
      label="Search"
      placeholder="Search"
      type="text"
      inputClass="w-full"
    />
    <FormControl for="Sort" label="Sort by">
      <v-select
        id="Sort"
        :options="['Male', 'Female']"
        placeholder="Not selected"
        clearable
      ></v-select>
    </FormControl>
    <FormControl for="Day" label="Day">
      <v-select
        id="Day"
        :options="['Male', 'Female']"
        placeholder="Not selected"
        clearable
      ></v-select>
    </FormControl>
    <div>
      <FormControl label="Time" inputClass="grid grid-cols-2 gap-2">
        <DatePicker
          :autoApply="true"
          format="HH:mm"
          placeholder="From"
          time-picker
          :locale="'en'"
        ></DatePicker>
        <DatePicker
          :autoApply="true"
          format="HH:mm"
          placeholder="To"
          time-picker
          :locale="'en'"
        ></DatePicker>
      </FormControl>
    </div>
  </div>
</template>
