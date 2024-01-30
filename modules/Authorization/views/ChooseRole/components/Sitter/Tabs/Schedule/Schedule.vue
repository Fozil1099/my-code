<script lang="ts" setup>
import DayModal from "./DayModal.vue";
import { onMounted, ref, nextTick } from "vue";
import _store from "@/modules/Authorization/store";
import { weekDays } from "@/utils/constants";
import { LazyScroll, modal } from "@com";
import { TeacherSchedule } from "@/modules/Authorization/store/types";

const store = _store();
const dataToChange = ref<TeacherSchedule>();

const editSchedule = (item: TeacherSchedule) => {
  dataToChange.value = item;
  nextTick(() => {
    modal("add-day").show();
  });
};

const deleteSchedule = async (id?: number) => {
  if (!id) return;
  await store.deleteTeacherSchedule(id);
  store.getTeacherScheduleList({ page: 1, isLazy: true, page_size: 10 });
};

onMounted(() => {
  store.getTeacherScheduleList({ page: 1, isLazy: true, page_size: 10 });
});
</script>

<template>
  <div
    v-if="store.teacherScheduleList.results.length"
    class="grid md:grid-cols-2 gap-5 mb-7 max-h-[45vh] overflow-auto custom-vertical-scrollbar"
  >
    <LazyScroll
      :otherParams="{
        page_size: 10,
        isLazy: true,
      }"
      :storeFetch="store.getTeacherScheduleList"
      :storeList="store.teacherScheduleList"
    >
      <div v-for="item in store.teacherScheduleList.results" class="card p-4">
        <h2 class="text-xl text-primary font-medium tracking-[0.3px]">
          {{ item.start_week && weekDays[item.start_week - 1].title }} -
          {{ item.end_week && weekDays[item.end_week - 1].title }}
        </h2>
        <div class="flex justify-between items-center mt-3">
          <span class="text-base font-normal tracking-sm text-dark">
            {{ item.start_time }} - {{ item.end_time }}
          </span>

          <div class="flex justify-end items-center gap-4">
            <div class="cursor-pointer" @click="editSchedule(item)">
              <Icon icon="Pen New Square" color="#FFB82F" size="24" />
            </div>
            <div class="cursor-pointer" @click="deleteSchedule(item.id)">
              <Icon icon="Trash Bin Trash" size="24" color="#ea5455" />
            </div>
          </div>
        </div>
      </div>
    </LazyScroll>
  </div>

  <button
    v-modal="'add-day'"
    class="w-full btn-outline-primary"
    @click="dataToChange = undefined"
  >
    Add day
  </button>

  <DayModal :editData="dataToChange" />
</template>
