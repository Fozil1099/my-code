<script lang="ts" setup>
import { ref, watch, onMounted, computed } from "vue";
import { ErrorObject } from "@vuelidate/core";

// types

interface Props {
  id?: string;
  label?: string;
  placeholder?: string;
  modelValue?: string | number | null;
  value?: string;
  type?: string;
  class?: string;
  labelClass?: string;
  icon?: string;
  inputClass?: string;
  iconClass?: string;
  mask?: string | RegExp;
  required?: ErrorObject[];
}
interface Emits {
  (event: "update:modelValue", value: string | number | null): void;
  (event: "input", value: string | number | null): void;
  (event: "blur", value): void;
}

// variables

const emit = defineEmits<Emits>();
const inputValue = ref<string | number | null>("");
const props = defineProps<Props>();
let type = ref<string>("");

const classes = computed(
  () =>
    props.inputClass +
    ` ${!props.icon ? " rounded-l-lg " : ""}` +
    `${
      props.required?.length
        ? " bg-danger/30 placeholder:text-white "
        : " bg-light-100 placeholder:text-secondary-400"
    }` +
    `${props.type == "password" ? " pl-4 pr-10" : " px-4"}`
);

// functions

const onInput = () => {
  emit("input", inputValue.value);
  emit("update:modelValue", inputValue.value);
};

// hooks

watch(
  () => props.modelValue,
  () => {
    inputValue.value = props.modelValue || "";
  }
);

watch(
  () => props.value,
  () => {
    inputValue.value = props.value || "";
  }
);

onMounted(() => {
  inputValue.value = props.modelValue || "";
  type.value = props.type || "text";
});
</script>

<template>
  <div class="py-[10px]" :class="props.class">
    <label
      class="block text-secondary-900 text-[14px] font-normal tracking-[0.21px]"
      :labelClass="props.labelClass"
      :for="props.id"
    >
      {{ props.label }}<span v-if="props.required" class="text-danger">*</span>
    </label>
    <div class="with__icon relative" :class="props.icon ? ' flex gap-1' : ''">
      <div
        v-if="props.icon"
        class="input__part px-4 py-3 rounded-l-lg gap-2 mt-2 border-[0.1px]"
        :class="
          props.iconClass +
          `${
            props.required?.length
              ? ' bg-danger/30 placeholder:text-danger'
              : ' bg-light-100 border-light-200'
          }`
        "
      >
        <Icon
          :icon="props.icon"
          :color="props.required?.length ? '#FFF' : '#6354FF'"
        />
      </div>
      <input
        v-if="props.mask"
        v-maska
        :data-maska="props.mask"
        v-model="inputValue"
        :id="props.id"
        :type="type"
        :placeholder="props.placeholder"
        class="py-3 rounded-r-lg gap-2 mt-2 border-[0.1px] text-[16px] leading-5 border-light-200 focus:border-light-400 focus:bg-light-900 focus:outline-none placeholder:text-[16px] placeholder:leading-5"
        :class="classes"
        @input="onInput"
        @blur="emit('blur', $event)"
      />
      <input
        v-else
        v-model="inputValue"
        :id="props.id"
        :type="type"
        :placeholder="props.placeholder"
        class="py-3 rounded-r-lg gap-2 mt-2 border-[0.1px] text-[16px] leading-5 border-light-200 focus:border-light-400 focus:bg-light-900 focus:outline-none placeholder:text-[16px] placeholder:leading-5"
        :class="classes"
        @input="onInput"
        @blur="emit('blur', $event)"
      />
      <div
        v-if="props.type == 'password'"
        class="absolute right-3 top-[calc(50%-7px)]"
      >
        <div
          v-if="type == 'password'"
          @click="type = 'text'"
          class="cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.5819 11.9999C15.5819 13.9799 13.9819 15.5799 12.0019 15.5799C10.0219 15.5799 8.42188 13.9799 8.42188 11.9999C8.42188 10.0199 10.0219 8.41992 12.0019 8.41992C13.9819 8.41992 15.5819 10.0199 15.5819 11.9999Z"
              stroke="#5C5F7C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.9998 20.2702C15.5298 20.2702 18.8198 18.1902 21.1098 14.5902C22.0098 13.1802 22.0098 10.8102 21.1098 9.40021C18.8198 5.80021 15.5298 3.72021 11.9998 3.72021C8.46984 3.72021 5.17984 5.80021 2.88984 9.40021C1.98984 10.8102 1.98984 13.1802 2.88984 14.5902C5.17984 18.1902 8.46984 20.2702 11.9998 20.2702Z"
              stroke="#5C5F7C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div v-else @click="type = 'password'" class="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14.5319 9.46992L9.47188 14.5299C8.82188 13.8799 8.42188 12.9899 8.42188 11.9999C8.42188 10.0199 10.0219 8.41992 12.0019 8.41992C12.9919 8.41992 13.8819 8.81992 14.5319 9.46992Z"
              stroke="#5C5F7C"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77"
              stroke="#5C5F7C"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.42188 19.5302C9.56188 20.0102 10.7719 20.2702 12.0019 20.2702C15.5319 20.2702 18.8219 18.1902 21.1119 14.5902C22.0119 13.1802 22.0119 10.8102 21.1119 9.40018C20.7819 8.88018 20.4219 8.39018 20.0519 7.93018"
              stroke="#5C5F7C"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.5114 12.7002C15.2514 14.1102 14.1014 15.2602 12.6914 15.5202"
              stroke="#5C5F7C"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.47 14.5298L2 21.9998"
              stroke="#5C5F7C"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22.0013 2L14.5312 9.47"
              stroke="#5C5F7C"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <span
      v-if="props.required?.length"
      class="whitespace-nowrap text-danger text-sm font-normal flex gap-1 items-center"
    >
      <div
        class="bg-danger w-4 h-4 rounded-ful text-white flex items-center justify-center rounded-full"
      >
        !
      </div>
      {{ $t(String(props.required[0].$message)) }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.with__icon:focus-within {
  .input__part {
    @apply bg-light-400;
  }
}
</style>
