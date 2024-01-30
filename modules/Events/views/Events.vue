<script lang="ts" setup>
import { Input } from "@com";
import EventCard from "../components/EventCard";

const Category = [
  {
    title: "All",
    active: true,
  },
  {
    title: "Personal events",
  },
  {
    title: "Children's activities",
  },
  {
    title: "District events",
  },
  {
    title: "Public events",
  },
  {
    title: "Offsite events",
  },
];

const SubCategory = [
  {
    title: "All",
    active: true,
  },
  {
    title: "Category",
  },
  {
    title: "Category",
  },
  {
    title: "Category",
  },
  {
    title: "Category",
  },
  {
    title: "Category",
  },
];
</script>

<template>
  <div class="w-full">
    <div class="max-w-screen-base mx-auto">
      <div class="text-center py-[60px]">
        <h1 class="text-4xl font-bold tracking-[0.54px] text-dark">Events</h1>
      </div>
      <div class="max-w-[600px] w-full mx-auto">
        <Input placeholder="Search" input-class="w-full" />
      </div>
      <ul class="flex items-center justify-center gap-10 mt-14">
        <li
          v-for="item in Category"
          :class="
            item.active
              ? 'text-primary text-xl font-normal tracking-[0.3px]'
              : 'text-normal-20'
          "
        >
          {{ item.title }}
        </li>
      </ul>
      <ul class="flex items-center justify-center gap-10 mt-14">
        <li
          v-for="item in SubCategory"
          :class="
            item.active
              ? 'text-white text-base tracking-sm font-normal bg-primary px-3 py-2 rounded-md shadow-base'
              : 'text-muted-20'
          "
        >
          {{ item.title }}
        </li>
      </ul>
      <div class="py-[60px] grid grid-cols-4 gap-5">
        <EventCard v-for="_ in 12" />
      </div>
    </div>
  </div>
</template>
