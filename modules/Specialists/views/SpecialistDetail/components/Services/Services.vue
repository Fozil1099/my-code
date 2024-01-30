<script lang="ts" setup>
import { Tab, Tabs } from "@com";
import ServiceDetail from "./ServiceDetail.vue";
</script>

<template>
  <div class="card p-5">
    <h3 class="title">Services</h3>
    <Tabs
      class="py-8"
      pill
      positionClass="flex items-center gap-3 overflow-x-auto"
    >
      <Tab title="Service">
        <ServiceDetail />
      </Tab>
      <Tab title="Service1"></Tab>
      <Tab title="Service2"></Tab>
      <Tab title="Service3"></Tab>
      <Tab title="Service4"></Tab>
    </Tabs>
  </div>
</template>
