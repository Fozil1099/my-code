<script lang="ts" setup>
import { Locale } from "@com";
</script>

<template>
  <section class="flex flex-col md:flex-row h-screen items-center">
    <div class="fixed top-16 right-24 z-50">
      <Locale
        class="gap-[8px] px-[16px] py-[14px] relative bg-light-100 rounded-[8px] border-[0.1px] border-solid border-light-200"
      />
    </div>
    <div
      class="bg-indigo-600 hidden lg:block w-full md:w-11/12 xl:w-7/12 h-screen relative"
    >
      <div class="fixed top-16 left-24 text-white text-[36px] font-bold">
        unknownProject
      </div>
      <img
        src="@/assets/images/login-bg.svg"
        alt=""
        class="w-full h-full object-cover"
      />

      <p
        class="absolute top-16 right-24 [font-family:'Roboto-Bold',Helvetica] font-bold text-transparent text-[72px] text-right tracking-[1.08px] leading-[normal]"
      >
        <span class="text-white">Find the </span><br />
        <span class="text-[#6354ff]">best unknown </span><br />
        <span class="text-white">for your child</span><br />
      </p>
    </div>

    <div
      class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
    >
      <div class="w-full h-100">
        <slot />
      </div>
    </div>
  </section>
</template>
