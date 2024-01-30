<script lang="ts" setup>
import Swiper from "swiper";
import { onMounted, ref } from "vue";
import { CustomersCard } from ".";

const swiper = ref();

onMounted(() => {
  swiper.value = new Swiper(
    document.getElementById("baby-swiper") || ".baby-swiper",
    {
      slidesPerView: 5,
      speed: 400,

      parallax: true,
      observer: true,
      observeParents: true,
      spaceBetween: 20,
    }
  );
  swiper.value.init();
});
</script>

<template>
  <div class="w-full bg-white py-[100px]">
    <div class="max-w-screen-base mx-auto relative">
      <div class="w-full text-center">
        <h2 class="text-4xl leading-normal font-bold text-dark mb-4">
          People who need unknownProject
        </h2>
        <span class="text-sm text-secondary-900 tracking-sm">
          Find orders according to your strengths and capabilities.
        </span>
      </div>
      <div
        class="absolute -left-20 top-[50%] cursor-pointer arrow"
        @click="swiper.slidePrev()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M21.667 31.6673L11.667 20.0007L21.667 8.33398"
            stroke="#A3A5BB"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M28.334 31.6673L18.334 20.0007L28.334 8.33398"
            stroke="#A3A5BB"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div
        class="absolute -right-20 top-[50%] cursor-pointer arrow"
        @click="swiper.slideNext()"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.333 31.6673L28.333 20.0007L18.333 8.33398"
            stroke="#A3A5BB"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.666 31.6673L21.666 20.0007L11.666 8.33398"
            stroke="#A3A5BB"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div id="baby-swiper" class="baby-swiper overflow-hidden py-10">
        <div class="swiper-wrapper">
          <div v-for="_ in 10" class="swiper-slide">
            <CustomersCard />
          </div>
        </div>
      </div>

      <div class="w-full flex justify-center">
        <button class="btn-primary">All orders</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.arrow:hover {
  path {
    @apply stroke-primary;
  }
}
</style>
