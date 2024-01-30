<script lang="ts" setup>
import { Collapse, vCollapse } from "@com";
</script>

<template>
  <div class="w-full bg-white py-[100px]">
    <div class="max-w-4xl mx-auto">
      <div class="w-full text-center">
        <h2 class="text-4xl leading-normal font-bold text-dark mb-4">
          Questions and answers
        </h2>
      </div>
      <div class="flex flex-col gap-4 py-10">
        <div
          v-for="(_, index) in 5"
          class="p-6 bg-light-100 border-[0.1px] border-light-200 rounded-xl"
        >
          <div
            v-collapse="'question' + index"
            class="w-full flex items-center justify-between cursor-pointer"
          >
            <h2 class="text-dark text-2xl font-semibold">Question</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
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
              width="28"
              height="28"
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
          </div>
          <Collapse :id="'question' + index">
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

    <div class="w-full flex justify-center">
      <button class="btn-primary">All questions and answers</button>
    </div>
  </div>
</template>
