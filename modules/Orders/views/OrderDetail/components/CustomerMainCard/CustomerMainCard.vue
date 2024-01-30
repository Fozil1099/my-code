<script lang="ts" setup>
import { isUserLoggedIn } from "@/auth/jwtService";
import { modal } from "@/components";

const onBook = () => {
  if (!isUserLoggedIn()) {
    modal("auth-not").show();
  }
};
</script>

<template>
  <div class="card rounded-2xl p-5">
    <div class="rounded-2xl overflow-hidden pb-5">
      <img
        src="@/assets/images/static/baby.png"
        alt=""
        class="w-full object-cover"
      />
    </div>
    <div class="w-full py-4 flex items-center justify-center gap-2.5">
      <div class="rounded-full w-3 h-3 bg-success"></div>
      <h3 class="text-2xl font-semibold tracking-[0.36px]">Inna Koralova</h3>
    </div>
    <div class="grid gap-3 py-6">
      <div class="flex items-center justify-between">
        <span class="text-muted">Time</span>
        <span class="text-normal-20">9:00 - 18:00</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-muted">Date</span>
        <span class="text-normal-20">01.11.23 - 30.11.23</span>
      </div>
    </div>
    <button class="btn-primary w-full mt-5" @click="onBook">Book</button>
  </div>
</template>
