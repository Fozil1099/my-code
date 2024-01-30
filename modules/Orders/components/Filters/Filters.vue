<script lang="ts" setup>
import { BaseCollapse, CustomSelect, Input } from "@com";
import { ref } from "vue";
import { store as ordersStore } from "@m/Orders";

let min = ref(5);
let max = ref(10);

const store = ordersStore();
</script>

<template>
  <div class="card px-5">
    <div class="py-[18px]">
      <h3 class="text-xl tracking-[0.3px] font-semibold">Filtres</h3>
    </div>
    <div class="py-[18px] flex justify-between items-center">
      <h4 class="text-dark text-base font-semibold tracking-sm">
        Orders on the map
      </h4>
      <input
        v-model="store.mainFilters.ordersOnMap"
        type="checkbox"
        class="switch-classic"
      />
    </div>
    <div class="line"></div>
    <div class="py-[18px] flex justify-between items-center">
      <h4 class="text-dark text-base font-semibold tracking-sm">Online</h4>
      <input type="checkbox" class="switch-classic" />
    </div>
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
