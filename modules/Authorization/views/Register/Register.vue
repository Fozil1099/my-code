<script lang="ts" setup>
import { Input } from "@com";
import useVuelidate, { Validation } from "@vuelidate/core";
import { email, helpers, required, minLength } from "@vuelidate/validators";
import { Ref } from "vue";
import { computed } from "vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import _store from "../../store";
import { useSessionStorage } from "@vueuse/core";

interface FormData {
  email: string;
  password: string;
}

const formData = reactive<FormData>({
  email: "",
  password: "",
});
const router = useRouter();
const store = _store();

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("Field is required", required),
      email: helpers.withMessage("It's not email", email),
    },
    password: {
      required: helpers.withMessage("Field is required", required),
      minLength: helpers.withMessage("Minimum 8 symbols", minLength(8)),
    },
  };
});

const validate: Ref<Validation> = useVuelidate(rules, formData);

const register = async () => {
  const success = await validate.value.$validate();
  if (!success) return;
  await store.register(formData);
  useSessionStorage("sign-email", formData.email);

  router.push({ name: "register-confirm" });
};
</script>

<template>
  <div>
    <h1
      class="text-[36px] font-bold leading-tight mt-12 tracking-[0.54px] text-center"
    >
      Sign up
    </h1>

    <form class="mt-10 mb-4" @submit.prevent="register">
      <Input
        v-model="formData.email"
        id="email"
        label="Mail"
        placeholder="Mail"
        type="email"
        icon="Letter"
        inputClass="w-full"
        :required="validate.email.$errors"
      />
      <Input
        v-model="formData.password"
        id="password"
        label="Password"
        placeholder="Password"
        type="password"
        icon="Key"
        inputClass="w-full"
        :required="validate.password.$errors"
      />

      <div class="text-center mt-4">
        <a
          href="#"
          class="text-sm font-medium text-primary text-[14px] tracking-[0.28px] cursor-pointer hover:underline"
          @click="$router.push({ name: 'forgot-password' })"
          >Forgot your password?</a
        >
      </div>

      <button type="submit" class="btn-primary w-full mt-7">Sign up</button>
    </form>

    <div class="w-full text-center">
      <div class="py-[18px] justify-center items-center gap-3 inline-flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="103"
          height="2"
          viewBox="0 0 103 2"
          fill="none"
        >
          <path
            d="M0.5 1H102.5"
            stroke="url(#paint0_linear_1562_28933)"
            stroke-linecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1562_28933"
              x1="103"
              y1="1.00012"
              x2="0.5"
              y2="1"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#B8B8D2" />
              <stop offset="1" stop-color="#B8B8D2" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div
          class="text-center text-slate-400 text-sm font-normal tracking-tight"
        >
          or log in with
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="103"
          height="2"
          viewBox="0 0 103 2"
          fill="none"
        >
          <path
            d="M0.5 1H102.5"
            stroke="url(#paint0_linear_1562_28935)"
            stroke-linecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1562_28935"
              x1="102.5"
              y1="1"
              x2="0.5"
              y2="1"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#B8B8D2" stop-opacity="0" />
              <stop offset="1" stop-color="#B8B8D2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-[12px] mt-4">
      <div
        class="flex cursor-pointer h-[52px] items-center justify-center relative bg-light-100 rounded-[8px] overflow-hidden border-[0.1px] border-solid border-light-200 hover:shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
        >
          <g clip-path="url(#clip0_1562_28938)">
            <path
              d="M24.3333 12.2659C24.3333 11.282 24.2517 10.5641 24.0749 9.81958H12.5782V14.2601H19.3265C19.1905 15.3637 18.4558 17.0256 16.8231 18.1423L16.8002 18.291L20.4352 21.0428L20.6871 21.0674C23 18.98 24.3333 15.9088 24.3333 12.2659Z"
              fill="#4285F4"
            />
            <path
              d="M12.5782 23.9657C15.8843 23.9657 18.6598 22.9021 20.687 21.0674L16.8231 18.1424C15.7891 18.847 14.4013 19.3389 12.5782 19.3389C9.34014 19.3389 6.59186 17.2516 5.61217 14.3666L5.46857 14.3785L1.68883 17.237L1.6394 17.3712C3.65299 21.28 7.78905 23.9657 12.5782 23.9657Z"
              fill="#34A853"
            />
            <path
              d="M5.61223 14.3666C5.35373 13.6221 5.20413 12.8243 5.20413 12C5.20413 11.1757 5.35374 10.378 5.59863 9.63346L5.59179 9.4749L1.76468 6.5705L1.63947 6.6287C0.80957 8.25074 0.333374 10.0722 0.333374 12C0.333374 13.9278 0.80957 15.7492 1.63947 17.3713L5.61223 14.3666Z"
              fill="#FBBC05"
            />
            <path
              d="M12.5782 4.66101C14.8775 4.66101 16.4285 5.63156 17.3129 6.44263L20.7686 3.14539C18.6463 1.21758 15.8843 0.0343018 12.5782 0.0343018C7.78905 0.0343018 3.65299 2.71992 1.6394 6.62869L5.59857 9.63345C6.59186 6.74839 9.34014 4.66101 12.5782 4.66101Z"
              fill="#EB4335"
            />
          </g>
          <defs>
            <clipPath id="clip0_1562_28938">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0.333374)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div
        class="flex cursor-pointer h-[52px] items-center justify-center relative bg-light-100 rounded-[8px] overflow-hidden border-[0.1px] border-solid border-light-200 hover:shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12Z"
            fill="#1877F2"
          />
          <path
            d="M18 12C18 8.7 15.3 6 12 6C8.7 6 6 8.7 6 12C6 15 8.175 17.475 11.025 17.925V13.725H9.525V12H11.025V10.65C11.025 9.15 11.925 8.325 13.275 8.325C13.95 8.325 14.625 8.475 14.625 8.475V9.975H13.875C13.125 9.975 12.9 10.425 12.9 10.875V12H14.55L14.25 13.725H12.825V18C15.825 17.55 18 15 18 12Z"
            fill="white"
          />
        </svg>
      </div>
      <div
        class="flex cursor-pointer h-[52px] items-center justify-center relative bg-light-100 rounded-[8px] overflow-hidden border-[0.1px] border-solid border-light-200 hover:shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
        >
          <path
            d="M0.666626 12C0.666626 18.6274 6.03921 24 12.6666 24C19.294 24 24.6666 18.6274 24.6666 12C24.6666 5.37258 19.294 0 12.6666 0C6.03921 0 0.666626 5.37258 0.666626 12Z"
            fill="#1DA1F2"
          />
          <path
            d="M18.6666 8.25C18.2166 8.475 17.7666 8.55 17.2416 8.625C17.7666 8.325 18.1416 7.875 18.2916 7.275C17.8416 7.575 17.3166 7.725 16.7166 7.875C16.2666 7.425 15.5916 7.125 14.9166 7.125C13.3416 7.125 12.1416 8.625 12.5166 10.125C10.4916 10.05 8.69163 9.075 7.41663 7.575C6.74163 8.7 7.11663 10.125 8.16663 10.875C7.79163 10.875 7.41663 10.725 7.04163 10.575C7.04163 11.7 7.86663 12.75 8.99163 13.05C8.61663 13.125 8.24163 13.2 7.86663 13.125C8.16663 14.1 9.06663 14.85 10.1916 14.85C9.29163 15.525 7.94163 15.9 6.66663 15.75C7.79163 16.425 9.06663 16.875 10.4166 16.875C14.9916 16.875 17.5416 13.05 17.3916 9.525C17.9166 9.225 18.3666 8.775 18.6666 8.25Z"
            fill="white"
          />
        </svg>
      </div>
    </div>

    <div class="w-full py-7 mt-14">
      <p
        class="font-medium text-transparent text-[14px] text-center tracking-[0.21px] leading-[16px] whitespace-nowrap"
      >
        <span class="text-dark">Already have an account? </span>
        <span
          class="text-primary cursor-pointer hover:underline"
          @click="$router.push({ name: 'login' })"
          >Login</span
        >
      </p>
    </div>
  </div>
</template>
