<script lang="ts" setup>
import { Input } from "@com";
import { reactive } from "vue";

interface FormData {
  mail: string;
}

const formData = reactive<FormData>({
  mail: "",
});
</script>

<template>
  <div>
    <h1
      class="text-[36px] font-bold leading-tight mt-12 tracking-[0.54px] text-center"
    >
      Forgot password
    </h1>
    <div
      class="text-gray-500 text-base font-normal font-['Roboto'] leading-tight tracking-tight mt-3 text-center"
    >
      Don't worry! It happens. Please enter your email and we will send you the
      code
    </div>

    <form
      class="mt-10 mb-4"
      @submit.prevent="$router.push({ name: 'confirm-code' })"
    >
      <Input
        v-model="formData.mail"
        id="mail"
        label="Mail"
        placeholder="Mail"
        type="email"
        icon="Letter"
        inputClass="w-full"
      />

      <button type="submit" class="btn-primary w-full mt-[30px]">Send</button>
      <button
        type="button"
        class="btn-outline-secondary w-full mt-4"
        @click="$router.go(-1)"
      >
        Back
      </button>
    </form>
  </div>
</template>
