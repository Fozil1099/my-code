<script lang="ts" setup>
import { Modal } from "@com";
</script>

<template>
  <Modal id="successfully" size="max-w-[560px]" footer-hidden>
    <div class="w-full text-center">
      <h3 class="text-[28px] font-bold leading-8 tracking-[0.42px]">
        Successfully
      </h3>
      <div class="flex items-center justify-center py-6">
        <img src="@/assets/images/modal/successfully.png" alt="" />
      </div>
      <span class="text-normal">
        The phone number has been successfully confirmed
      </span>
    </div>
    <template #footer>
      <div class="p-5">
        <button class="btn-primary w-full" v-modal="'successfully'">
          Confirm
        </button>
      </div>
    </template>
  </Modal>
</template>
