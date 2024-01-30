<script lang="ts" setup>
import { Modal } from "@com";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <Modal id="auth-not" size="w-auto" footer-hidden>
    <img src="@/assets/images/modal/skater.png" alt="" />
    <template #footer>
      <div class="p-5">
        <button
          class="btn-primary w-full"
          @click="router.push({ name: 'login' })"
        >
          Log in
        </button>
        <button
          class="btn-outline-primary w-full mt-3"
          @click="router.push({ name: 'register' })"
        >
          Sign up
        </button>
      </div>
    </template>
  </Modal>
</template>
