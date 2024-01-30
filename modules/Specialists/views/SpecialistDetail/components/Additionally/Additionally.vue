<script lang="ts" setup>
const additionally = [
  {
    date: "September 2023",
    title: "Best unknown month",
  },
  {
    date: "September 2023",
    title: "Best unknown month",
  },
  {
    date: "September 2023",
    title: "Best unknown month",
  },
  {
    date: "September 2023",
    title: "Best unknown month",
  },
  {
    date: "September 2023",
    title: "Best unknown month",
  },
];
</script>

<template>
  <div class="card p-5">
    <h3 class="title">Additionally</h3>

    <h4 class="font-bold text-xl tracking-[0.3px] mt-8">
      Awards and achievements
    </h4>
    <div class="grid grid-cols-5 gap-5 mt-3">
      <div
        class="card bg-light-500 grid gap-5 p-5"
        v-for="item in additionally"
      >
        <div class="w-full flex justify-center">
          <img src="@/assets/images/cup.svg" />
        </div>
        <div class="w-full text-center">
          <span class="text-muted">September 2023</span>
          <h4 class="text-base font-medium tracking-sm mt-2">
            Best unknown month
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>
