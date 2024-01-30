<script lang="ts" setup>
import { Location } from "@com";
import Filters from "../components/Filters";
import Sorts from "../components/Sorts";
import { TeachersCard } from "@/modules/Home/components/Teachers";

import { store as specialistStore } from "@m/Specialists";

const store = specialistStore();
</script>

<template>
  <div class="w-full">
    <div class="max-w-screen-base mx-auto">
      <div class="text-center py-[60px]">
        <h1 class="text-4xl font-bold tracking-[0.54px] text-dark">
          Specialists
        </h1>
      </div>
      <div class="flex items-start gap-10">
        <div class="md:w-1/4">
          <Filters />
        </div>
        <div class="md:w-3/4">
          <div class="h-[700px] mb-10" v-if="store.mainFilters.teacherOnMap">
            <Location />
          </div>
          <Sorts class="mb-5" />
          <div class="grid md:grid-cols-4 sm:grid-cols-2 gap-5">
            <TeachersCard v-for="_ in 20" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
