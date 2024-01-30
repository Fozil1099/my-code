<script lang="ts" setup>
import { TeachersCard } from "@/modules/Home/components/Teachers";
import Categories from "./components/Categories";
import Filters from "./components/Filters";
import EventCard from "@/modules/Events/components/EventCard";
import { ref } from "vue";

let category = ref("specialists");
</script>

<template>
  <div>
    <Categories v-model="category" />
    <Filters class="my-10" />
    <div class="w-full grid gap-5 grid-cols-3">
      <EventCard v-if="category == 'events'" v-for="_ in 6" />
      <TeachersCard v-else v-for="_ in 6" />
    </div>
  </div>
</template>
