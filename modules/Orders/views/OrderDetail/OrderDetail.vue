<script lang="ts" setup>
import { Location } from "@com";
import CustomerMainCard from "./components/CustomerMainCard";
import SkillsAndLangs from "./components/SkillsAndLangs";
import Services from "./components/Services";
import Children from "./components/Children";
import { ref, onMounted } from "vue";

let navbarHeight = ref("100px");

onMounted(() => {
  const el = document.getElementById("navbar");

  navbarHeight.value = el?.offsetHeight ? el?.offsetHeight + "px" : "100px";
});
</script>

<template>
  <div class="w-full">
    <div class="max-w-screen-base mx-auto py-[60px]">
      <div class="flex items-start gap-10">
        <div
          class="md:w-1/4"
          :class="`sticky top-[calc(${navbarHeight}+10px)]`"
        >
          <CustomerMainCard />
        </div>
        <div class="md:w-3/4 grid gap-5">
          <div class="card p-5">
            <h2 class="mb-3 title">Job description</h2>
            <span class="text-normal">
              Have experience working in a private kindergarten. A large game
              library for children 5-7 years old. Certified counselor, many
              years of experience working with children 6-9 years old. I have no
              experience working with babies, but I will be happy to look after
              your baby.Have experience working in a private kindergarten. A
              large game library for children 5-7 years old. Certified
              counselor, many years of experience working with children 6-9
              years old. I have no experience working with babies, but I will be
              happy to look after your baby.
            </span>
          </div>
          <div class="card p-5">
            <h2 class="mb-3 title">Location</h2>
            <span class="text-normal"
              >Tashkent, Uzbekistan / 19 Berkeley Street, W1J 8ED</span
            >
            <div class="h-[540px] mt-3">
              <Location />
            </div>
          </div>
          <Children />
          <Services />
          <SkillsAndLangs />
        </div>
      </div>
    </div>
  </div>
</template>
