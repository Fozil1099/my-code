<script lang="ts" setup>
import { Location } from "@com";
import TeacherMainCard from "./components/TeacherMainCard";
import SkillsAndLangs from "./components/SkillsAndLangs";
import Education from "./components/Education";
import Services from "./components/Services";
import Work from "./components/Work";
import { Details, Information } from "./components/Info";
import { ref, onMounted } from "vue";
import Additionally from "./components/Additionally";

let navbarHeight = ref("110px");

onMounted(() => {
  const el = document.getElementById("navbar");

  navbarHeight.value = el?.offsetHeight
    ? el?.offsetHeight + 10 + "px"
    : "110px";
});
</script>

<template>
  <div class="w-full">
    <div class="max-w-screen-base mx-auto py-[60px]">
      <div class="flex items-start gap-10">
        <div class="md:w-1/4 sticky" :style="`top: ${navbarHeight}`">
          <TeacherMainCard :reviews="true" />
        </div>
        <div class="md:w-3/4 grid gap-5">
          <div class="card p-5">
            <h2 class="mb-3 title">About</h2>
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
          <div class="grid grid-cols-2 gap-5">
            <Details />
            <Information />
          </div>
          <div class="card p-5">
            <h2 class="mb-3 title">About</h2>
            <span class="text-normal"
              >Tashkent, Uzbekistan / 19 Berkeley Street, W1J 8ED</span
            >
            <div class="h-[540px] mt-3">
              <Location />
            </div>
          </div>
          <Services />
          <SkillsAndLangs />
          <Education />
          <Work />
          <Additionally />
        </div>
      </div>
    </div>
  </div>
</template>
