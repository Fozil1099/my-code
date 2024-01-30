<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="card p-5 flex items-center gap-5">
    <div class="max-w-[50%] object-cover rounded-lg overflow-hidden">
      <img
        class="h-full w-full object-cover"
        src="@/assets/images/static/teacher-main.png"
        alt=""
      />
    </div>
    <div class="grid relative gap-4 w-[50%]">
      <div
        class="absolute top-0 right-0 cursor-pointer"
        @click="router.push({ name: 'profile-change' })"
      >
        <Icon icon="Pen New Square" color="#FFB82F" />
      </div>
      <div>
        <span class="text-muted-sm">Full name</span>
        <h4 class="text-normal mt-2">Inna Koralova</h4>
      </div>
      <div>
        <span class="text-muted-sm">Birth date</span>
        <h4 class="text-normal mt-2">19.02.1996</h4>
      </div>
      <div>
        <span class="text-muted-sm">Gender</span>
        <h4 class="text-normal mt-2">Female</h4>
      </div>
      <div>
        <span class="text-muted-sm">City of residence</span>
        <h4 class="text-normal mt-2">Tashkent, Uzbekistan</h4>
      </div>
    </div>
  </div>
</template>
