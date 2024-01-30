<script lang="ts" setup>
import { BaseCollapse, CustomSelect, DoubleRangeSlider, Input } from "@com";
import Rate from "./components/Rate.vue";
import { ref } from "vue";
import { store as specialistStore } from "@m/Specialists";

let min = ref(5);
let max = ref(10);

const store = specialistStore();
</script>

<template>
  <div class="card px-5">
    <div class="py-[18px]">
      <h3 class="text-xl tracking-[0.3px] font-semibold">Filtres</h3>
    </div>
    <div class="py-[18px] flex justify-between items-center">
      <h4 class="text-dark text-base font-semibold tracking-sm">
        Teachers on the map
      </h4>
      <input
        v-model="store.mainFilters.teacherOnMap"
        type="checkbox"
        class="switch-classic"
      />
    </div>
    <div class="line"></div>
    <div class="py-[18px] flex justify-between items-center">
      <h4 class="text-dark text-base font-semibold tracking-sm">
        Show only available teachers
      </h4>
      <input type="checkbox" class="switch-classic" />
    </div>
    <div class="line"></div>
    <div class="py-[18px] flex justify-between items-center">
      <h4 class="text-dark text-base font-semibold tracking-sm">
        Availability of camera
      </h4>
      <input type="checkbox" class="switch-classic" />
    </div>
    <div class="line"></div>
    <div class="py-[18px] flex justify-between items-center">
      <h4 class="text-dark text-base font-semibold tracking-sm">Online</h4>
      <input type="checkbox" class="switch-classic" />
    </div>
    <div class="line"></div>
    <Rate />
    <div class="line"></div>

    <BaseCollapse title="Price per hour" header-class="py-[18px]">
      <div class="py-[18px]">
        <DoubleRangeSlider
          :min="min"
          :max="max"
          :minThreshold="0"
          :maxThreshold="15"
          @update:min="(value) => (min = value)"
          @update:max="(value) => (max = value)"
        />
        <div class="flex items-center justify-between">
          <h6 class="text-dark text-base font-semibold tracking-sm">20$</h6>
          <h6 class="text-dark text-base font-semibold tracking-sm">80$</h6>
        </div>
        <div class="grid grid-cols-2 gap-3 mt-5">
          <Input
            v-model="min"
            id="From"
            placeholder="From"
            label="From"
            type="number"
            inputClass="w-full"
          />
          <Input
            v-model="max"
            id="To"
            label="To"
            placeholder="To"
            type="number"
            inputClass="w-full"
          />
        </div>
      </div>
    </BaseCollapse>

    <div class="line"></div>
    <BaseCollapse title="Teacher age" header-class="py-[18px]">
      <div class="py-[18px]">
        <DoubleRangeSlider
          :min="min"
          :max="max"
          :minThreshold="0"
          :maxThreshold="15"
          @update:min="(value) => (min = value)"
          @update:max="(value) => (max = value)"
        />
        <div class="flex items-center justify-between">
          <h6 class="text-dark text-base font-semibold tracking-sm">18y.</h6>
          <h6 class="text-dark text-base font-semibold tracking-sm">50y.</h6>
        </div>
        <div class="grid grid-cols-2 gap-3 mt-5">
          <Input
            id="From"
            placeholder="From"
            label="From"
            type="number"
            inputClass="w-full"
          />
          <Input
            id="To"
            label="To"
            placeholder="To"
            type="number"
            inputClass="w-full"
          />
        </div>
      </div>
    </BaseCollapse>

    <div class="line"></div>
    <BaseCollapse title="Work experience" header-class="py-[18px]">
      <div class="py-[18px]">
        <DoubleRangeSlider
          :min="min"
          :max="max"
          :minThreshold="0"
          :maxThreshold="15"
          @update:min="(value) => (min = value)"
          @update:max="(value) => (max = value)"
        />
        <div class="flex items-center justify-between">
          <h6 class="text-dark text-base font-semibold tracking-sm">5y.</h6>
          <h6 class="text-dark text-base font-semibold tracking-sm">5y.</h6>
        </div>
        <div class="grid grid-cols-2 gap-3 mt-5">
          <Input
            id="From"
            placeholder="From"
            label="From"
            type="number"
            inputClass="w-full"
          />
          <Input
            id="To"
            label="To"
            placeholder="To"
            type="number"
            inputClass="w-full"
          />
        </div>
      </div>
    </BaseCollapse>
    <div class="line"></div>
    <BaseCollapse title="Services" header-class="py-[18px]">
      <div class="py-[18px]">
        <CustomSelect
          optionsClass="flex flex-row-reverse justify-end items-center gap-3 py-3"
          :options="['Service', 'Service', 'Service']"
        />
      </div>
    </BaseCollapse>
    <div class="line"></div>
    <BaseCollapse title="Skills" header-class="py-[18px]">
      <div class="py-[18px]">
        <CustomSelect
          optionsClass="flex flex-row-reverse justify-end items-center gap-3 py-3"
          :options="['Skill', 'Skill', 'Skill']"
        />
      </div>
    </BaseCollapse>
    <div class="line"></div>
    <BaseCollapse title="Languages" header-class="py-[18px]">
      <div class="py-[18px]">
        <CustomSelect
          optionsClass="flex flex-row-reverse justify-end items-center gap-3 py-3"
          :options="['Language', 'Language', 'Language']"
        />
      </div>
    </BaseCollapse>
    <div class="line"></div>
    <BaseCollapse title="Religions" header-class="py-[18px]">
      <div class="py-[18px]">
        <CustomSelect
          optionsClass="flex flex-row-reverse justify-end items-center gap-3 py-3"
          :options="['Religion', 'Religion', 'Religion']"
        />
      </div>
    </BaseCollapse>
  </div>
</template>

<style lang="scss">
.line {
  width: 100%;
  height: 1px;
  align-self: stretch;
  border-radius: 30px;
  background: linear-gradient(
    270deg,
    rgba(224, 224, 224, 0) 5.73%,
    #e0e0e0 50%,
    rgba(224, 224, 224, 0) 93.75%
  ) !important;
}
</style>
