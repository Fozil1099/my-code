<script lang="ts" setup>
import { Input } from "@com";
import { reactive, ref } from "vue";
import { useSessionStorage, watchArray } from "@vueuse/core";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import _store from "../../store";
import { setAccessToken, setRefreshToken } from "@/auth/jwtService";

interface FormData {
  code: string[];
}

const router = useRouter();
const formData = reactive<FormData>({
  code: [],
});
const email = useSessionStorage("sign-email", null);
const store = _store();
const isValid = ref(false);

const onInputCode = (value: string | number | null, positionIndex: number) => {
  if (value && RegExp(/\D/g).test(String(value))) return;
  document
    .getElementById(
      `code-${String(value).length ? positionIndex + 1 : positionIndex - 1}`
    )
    ?.focus();
};

const sendCode = async () => {
  if (!email.value || !isValid.value) return;
  const { data } = await store.verificationSignUp({
    email: email.value,
    code: formData.code.join(""),
  });

  setAccessToken(data.access);
  setRefreshToken(data.refresh);
  router.push({ name: "choose-role" });
  email.value = undefined;
};

// hooks

watchArray(formData.code, () => {
  if (formData.code.flat().join("").length == 5) isValid.value = true;
  else isValid.value = false;
});

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

    <form class="mt-10 mb-4" @submit.prevent="sendCode">
      <div class="flex items-center justify-between">
        <Input
          v-for="(_, index) in 5"
          mask="#"
          v-model="formData.code[index]"
          :id="`code-${index}`"
          placeholder="*"
          inputClass="w-16 h-16 text-center text-3xl font-semibold placeholder:text-xl"
          @input="onInputCode($event, index)"
          @keyup.backspace="
            formData.code[index].length ? '' : onInputCode('', index)
          "
        />
      </div>

      <button
        :disabled="!isValid"
        type="submit"
        class="btn-primary w-full mt-[30px]"
      >
        Confirm
      </button>
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
