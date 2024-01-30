<script lang="ts" setup>
import { Collapse, vCollapse } from "@com";
import ScheduleTaskModal from "./ScheduleTaskModal.vue";
import { reactive } from "vue";
import { ref } from "vue";

const weekDays = reactive([
  {
    id: 1,
    title: "Monday",
    abbreviation: "MON",
    count: 1,
  },
  {
    id: 2,
    title: "Tuesday",
    abbreviation: "TUE",
    count: 2,
  },
  {
    id: 3,
    title: "Wednesday",
    abbreviation: "WED",
    count: 15,
  },
  {
    id: 4,
    title: "Thursday",
    abbreviation: "THU",
    count: 7,
  },
  {
    id: 5,
    title: "Friday",
    abbreviation: "FRI",
    count: 11,
  },
  {
    id: 6,
    title: "Saturday",
    abbreviation: "SAT",
    count: 25,
  },
  {
    id: 7,
    title: "Sunday",
    abbreviation: "SUN",
    count: 12,
  },
]);

const selectedDayIndex = ref<number>(1);

// functions
const changeDay = (value: "next" | "prev") => {
  if (value == "next") {
    selectedDayIndex.value === 6
      ? (selectedDayIndex.value = 0)
      : (selectedDayIndex.value += 1);
  } else {
    selectedDayIndex.value === 0
      ? (selectedDayIndex.value = 6)
      : (selectedDayIndex.value -= 1);
  }
};

const calculateHeight = (count: number) => {
  let full = 260;
  let max = weekDays.reduce((acc, current) => Math.max(acc, current.count), 0);

  return (count * full) / max + 8;
};
</script>

<template>
  <div class="flex">
    <div class="grid grid-cols-7 gap-5 mx-auto">
      <div
        v-for="item in weekDays"
        class="flex flex-col items-center justify-end min-h-[250px]"
      >
        <span class="text-xl font-bold tracking-[0.3px] text-secondary-900">{{
          item.count
        }}</span>
        <div
          class="shadow border-[0.1px] border-light-200 rounded-lg min-h-2 max-w-[60px] w-[60px] max-h-[268px]"
          :style="`height: ${calculateHeight(item.count)}px`"
          :class="
            weekDays[selectedDayIndex].id == item.id
              ? 'bg-primary'
              : 'bg-light-100'
          "
        ></div>
        <h6
          class="mt-3 tracking-sm text-base font-semibold text-secondary-900 uppercase"
        >
          {{ item.abbreviation }}
        </h6>
      </div>
    </div>
  </div>
  <div class="flex w-full justify-between items-center py-3.5 mt-10">
    <div class="cursor-pointer" @click="changeDay('prev')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M20 6.6665L12 15.9998L20 25.3332"
          stroke="#5C5F7C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <h3 class="select-none">{{ weekDays[selectedDayIndex].title }}</h3>
    <div class="cursor-pointer" @click="changeDay('next')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M12 6.6665L20 15.9998L12 25.3332"
          stroke="#5C5F7C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
  <div class="py-7">
    <div class="flex flex-col gap-4">
      <div
        v-for="(_, index) in 1"
        class="p-5 bg-light-500 border-[0.1px] border-light-200 rounded-xl shadow-base"
      >
        <div
          v-collapse="'weak' + index"
          class="w-full flex items-center justify-between cursor-pointer select-none"
        >
          <div class="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M22.1663 10.5L13.9997 17.5L5.83301 10.5"
                stroke="#6354FF"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              v-if="false"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M22.1663 17.5L13.9997 10.5L5.83301 17.5"
                stroke="#6354FF"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div>
              <span class="text-base tracking-sm text-primary">
                09:00 - 10:00
              </span>
              <h2 class="text-dark text-xl tracking-[0.3px]">
                Make a breakfast
              </h2>
            </div>
          </div>
        </div>
        <Collapse :id="'weak' + index">
          <div class="text-secondary-900 text-base mt-4">
            unknownProject is not an agency. This is a site and application where
            students and others find through us socially significant and
            developmental part-time job, and parents can find a nanny for a
            child or unknown, even if this needs to be doneurgently.
          </div>
        </Collapse>
      </div>
    </div>
  </div>
  <button v-modal="'add-schedule-modal'" class="w-full btn-outline-primary">
    Add task
  </button>

  <ScheduleTaskModal />
</template>
