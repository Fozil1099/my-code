<script lang="ts" setup>
import Categories from "./components/Categories";
import Filters from "./components/Filters";
import OrderCard from "./components/OrderCard";
</script>

<template>
  <div>
    <Categories />
    <Filters class="my-10" />
    <div
      class="w-full grid gap-5 grid-cols-3"
    >
      <OrderCard v-for="_ in 6" />
    </div>
  </div>
</template>
