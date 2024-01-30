<script lang="ts" setup>
import { Input } from "@com";
import { reactive } from "vue";
import { useSessionStorage } from "@vueuse/core";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

interface FormData {
  code: string[];
}

const router = useRouter();
const formData = reactive<FormData>({
  code: [],
});
const email = useSessionStorage("email", null);

const onInputCode = (value: string | number | null, positionIndex: number) => {
  if (value && RegExp(/\D/g).test(String(value))) return;
  document
    .getElementById(
      `code-${String(value).length ? positionIndex + 1 : positionIndex - 1}`
    )
    ?.focus();
};

onMounted(() => {
  if (!email.value) {
    router.go(-1);
  }
});
</script>

<template>
  <div>
    <h1
      class="text-[36px] font-bold leading-tight mt-12 tracking-[0.54px] text-center"
    >
      Confirmation
    </h1>
    <div
      class="text-gray-500 text-base font-normal font-['Roboto'] leading-tight tracking-tight mt-3 text-center"
    >
      We sent code to
      <a :href="'mailto:' + email" class="text-primary">{{ email }}</a>
    </div>

    <form
      class="mt-10 mb-4"
      @submit.prevent="
        formData.code.length == 5 ? $router.push({ name: 'choose-role' }) : ''
      "
    >
      <div class="flex items-center justify-between">
        <Input
          v-for="item in 5"
          mask="#"
          v-model="formData.code[item]"
          :id="`code-${item}`"
          placeholder="*"
          inputClass="w-16 h-16 text-center text-3xl font-semibold placeholder:text-xl"
          @input="onInputCode($event, item)"
          @keyup.backspace="
            formData.code[item].length ? '' : onInputCode('', item)
          "
        />
      </div>

      <button type="submit" class="btn-primary w-full mt-[30px]">
        Confirm
      </button>
      <button
        type="button"
        class="btn-outline-secondary w-full mt-4"
        :disabled="formData.code.length != 5"
        @click="$router.go(-1)"
      >
        Back
      </button>
    </form>
  </div>
</template>
