<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { ErrorObject } from "@vuelidate/core";
import { useI18n } from "vue-i18n";

// types

interface Props {
  id?: string;
  label?: string;
  placeholder?: string;
  modelValue?: string | null;
  value?: string;
  type?: string;
  class?: string;
  labelClass?: string;
  icon?: string;
  inputClass?: string;
  iconClass?: string;
  rows?: string;
  mask?: string | RegExp;
  required?: ErrorObject[];
}
interface Emits {
  (event: "update:modelValue", value: string): void;
  (event: "input", value: string): void;
  (event: "blur", value): void;
}

// variables

const emit = defineEmits<Emits>();
const inputValue = ref<string>("");
const props = defineProps<Props>();
const { t } = useI18n()

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
  inputValue.value = props.modelValue || ''
})
</script>

<template>
  <div class="py-[10px]" :class="props.class">
    <label
      class="block text-secondary-900 text-[14px] font-normal tracking-[0.21px]"
      :labelClass="props.labelClass"
      :for="props.id"
      >{{ props.label }}</label
    >
      <textarea
        v-model="inputValue"
        :id="props.id"
        :type="props.type || 'text'"
        :rows="props.rows || 4"
        :placeholder="props.placeholder"
        class="px-4 py-3 rounded-xl gap-2 mt-2 border-[0.1px] text-[16px] leading-5 border-light-200 focus:border-light-400 focus:bg-light-900 focus:outline-none placeholder:text-[16px] placeholder:leading-5"
        :class="props.inputClass + `${props.required?.length ? ' bg-danger/30 placeholder:text-white ': ' bg-light-100 placeholder:text-secondary-400' }`"
        @input="onInput"
        @blur="emit('blur', $event)"
      />
    <p
      v-if="props.required?.length"
      class="whitespace-nowrap text-danger text-sm font-normal fixed flex gap-1 items-center "
    >
      <div class="bg-danger w-4 h-4 rounded-ful text-white flex items-center justify-center rounded-full">
        !
      </div>
      {{ t(String(props.required[0].$message)) }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.with__icon:focus-within {
  .input__part {
    @apply bg-light-400;
  }
}
</style>

