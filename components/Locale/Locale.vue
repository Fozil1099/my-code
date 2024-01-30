<script lang="ts" setup>
import i18n from "@/plugins/i18n";
import { useI18n } from "vue-i18n";
import { DropDown } from "@com";

defineProps<{
  class?: string;
}>();
const { locale } = useI18n();

function onChangeLocale(lang) {
  i18n.global.locale.value = lang;
  localStorage.setItem("last-locale", lang);
}
</script>
<template>
  <!-- lang -->
  <div class="mx-auto cursor-pointer lang flex justify-end">
    <DropDown>
      <template #button>
        <div class="flex items-center justify-center" :class="class">
          <div class="inline-block w-[28px]">
            <img
              v-if="locale == 'en'"
              class="w-[28px]"
              src="@/assets/images/flags/en.jpg"
              alt="en"
            />

            <img
              v-if="locale == 'ar'"
              class="w-[28px]"
              src="@/assets/images/flags/ar.png"
              alt="ar"
            />
          </div>
          <svg
            class="relative w-[10px] h-[6px]"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
          >
            <path
              d="M9 1L5 5L1 1"
              stroke="#5C5F7C"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </template>

      <div
        class="bg-white p-0 py-2 rounded-xl border-[0.05px] border-solid border-light-200 w-[200px]"
      >
        <div
          class="p-4 hover:bg-primary/10 hover:text-primary flex items-center"
          @click="onChangeLocale('en')"
        >
          <img
            class="mr-2 inline-block w-[28px]"
            src="@/assets/images/flags/en.jpg"
            alt="en"
          />
          <span class="text-normal">English</span>
        </div>

        <div
          class="p-4 hover:bg-primary/10 hover:text-primary flex"
          @click="onChangeLocale('ar')"
        >
          <img
            class="mr-2 inline-block w-[28px]"
            src="@/assets/images/flags/ar.png"
            alt="ar"
          />
          <span class="text-normal">Arabic</span>
        </div>
      </div>
    </DropDown>
  </div>
</template>
