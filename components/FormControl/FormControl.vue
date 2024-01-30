<script lang="ts" setup>
import { ErrorObject } from "@vuelidate/core";
import { useI18n } from "vue-i18n";

// types

interface Props {
  for?: string;
  label?: string;
  placeholder?: string;
  modelValue?: string;
  value?: string;
  type?: string;
  class?: string;
  labelClass?: string;
  inputClass?: string;
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
const props = defineProps<Props>();
const { t } = useI18n();

// functions
</script>

<template>
  <div class="py-[10px]" :class="props.class">
    <label
      class="block text-secondary-900 text-[14px] font-normal tracking-[0.21px] mb-2"
      :labelClass="props.labelClass"
      :for="props.for"
    >
      {{ props.label }}<span v-if="props.required" class="text-danger">*</span>
    </label>
    <div
      :class="
        props.inputClass + (props.required?.length ? ' required__class' : '')
      "
    >
      <slot />
    </div>
    <span
      v-if="props.required?.length"
      class="whitespace-nowrap text-danger text-sm font-normal flex gap-1 items-center"
    >
      <div
        class="bg-danger w-4 h-4 text-white flex items-center justify-center rounded-full"
      >
        !
      </div>
      {{ t(String(props.required[0].$message)) }}
    </span>
  </div>
</template>

<style lang="scss">
.required__class {
  .v-select {
    @apply bg-danger/30;
  }
  input.dp__pointer {
    @apply bg-danger/30;
  }

  input {
    &::placeholder {
      color: white !important;
    }
  }

  .dp__icon {
    stroke: white;
    fill: white;
  }
}
</style>
