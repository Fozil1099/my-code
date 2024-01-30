<script lang="ts" setup>
import DocumentModal from "./DocumentModal.vue";
</script>

<template>
  <div v-for="_ in 3" class="card p-4 mt-3">
    <h2 class="text-dark font-medium text-base tracking-sm">Title</h2>
    <div class="flex justify-between items-center mt-3">
      <span class="rounded-lg bg-primary px-3 py-2 text-white">
        Document.pdf
      </span>

      <div class="flex justify-end items-center gap-3">
        <Icon icon="Eye" class="cursor-pointer" size="24" color="#6354FF" />
        <Icon
          icon="Pen New Square"
          color="#FFB82F"
          class="cursor-pointer"
          size="24"
        />
        <Icon
          icon="Trash Bin Trash"
          class="cursor-pointer"
          size="24"
          color="#ea5455"
        />
      </div>
    </div>
  </div>

  <button v-modal="'add-doc'" class="w-full btn-outline-primary mt-7">
    Add document
  </button>

  <DocumentModal />
</template>
