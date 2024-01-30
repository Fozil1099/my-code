<script lang="ts" setup>
import { toBase64 } from "@/utils/features";
import { useFileDialog } from "@vueuse/core";
import { ref, onMounted, watch } from "vue";

interface Props {
  modelValue?: string | null | File;
  height?: string;
}

interface Emits {
  (event: "update:modelValue", value: string | File | null): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
let currentImage = ref();

const { open, onChange } = useFileDialog({
  accept: "image/*", // Set to accept only image files
  multiple: false,
});

const clearImage = () => {
  currentImage.value = null;
  emit("update:modelValue", null);
};

onChange(async (file) => {
  if (file) {
    console.log(file[0]);

    currentImage.value = await toBase64(file[0]);
  }
  emit("update:modelValue", file ? file[0] : file);
});

watch(
  () => props.modelValue,
  () => {
    if (typeof props.modelValue == "string") {
      currentImage.value = props.modelValue;
    }
  }
);

onMounted(async () => {
  if (props.modelValue && typeof props.modelValue == "object")
    currentImage.value = await toBase64(props.modelValue);
  else currentImage.value = props.modelValue;
});
</script>

<template>
  <div class="flex-col justify-start items-start gap-2 inline-flex my-2.5">
    <div class="text-secondary-900 text-sm font-normal tracking-tight">
      Photo
    </div>
    <div
      class="self-stretch flex-col justify-start items-start gap-2 flex"
      :class="props.height || 'h-[250px]'"
    >
      <div
        class="self-stretch h-full flex-col justify-start items-start gap-5 flex"
      >
        <div
          v-if="!currentImage"
          class="w-full h-full py-[76px] bg-light-100 rounded-lg shadow border border-light-200 justify-center items-center inline-flex cursor-pointer"
          @click="open()"
        >
          <div
            class="self-stretch flex-col justify-center items-center gap-1 inline-flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.6665 7.33333C14.6665 6.32081 15.4242 5.5 16.3588 5.5H27.6409C28.5755 5.5 29.3332 6.32081 29.3332 7.33333C29.3332 8.34586 28.5755 9.16667 27.6409 9.16667H16.3588C15.4242 9.16667 14.6665 8.34586 14.6665 7.33333Z"
                fill="#C2C3D2"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.9258 38.5H26.0739C31.7958 38.5 34.6567 38.5 36.7119 37.1758C37.6016 36.6026 38.3655 35.8659 38.96 35.008C40.3332 33.0262 40.3332 30.2674 40.3332 24.7498C40.3332 19.2322 40.3329 16.4738 38.9597 14.492C38.3652 13.6341 37.6013 12.8974 36.7116 12.3242C34.6564 11 31.7955 11 26.0736 11H17.9255C12.2036 11 9.34264 11 7.28748 12.3242C6.39778 12.8974 5.63389 13.6341 5.03941 14.492C3.6665 16.4734 3.6665 19.2309 3.6665 24.7461L3.6665 24.7498C3.6665 30.2674 3.6665 33.0262 5.03971 35.008C5.63419 35.8659 6.39809 36.6026 7.28778 37.1758C9.34294 38.5 12.2039 38.5 17.9258 38.5ZM14.3609 24.7498C14.3609 20.6816 17.781 17.3836 21.9998 17.3836C26.2187 17.3836 29.6387 20.6816 29.6387 24.7498C29.6387 28.818 26.2187 32.116 21.9998 32.116C17.781 32.116 14.3609 28.818 14.3609 24.7498ZM17.4165 24.7498C17.4165 22.3088 19.4685 20.3301 21.9998 20.3301C24.5311 20.3301 26.5832 22.3088 26.5832 24.7498C26.5832 27.1907 24.5311 29.1695 21.9998 29.1695C19.4685 29.1695 17.4165 27.1907 17.4165 24.7498ZM33.2035 17.3836C32.3598 17.3836 31.6758 18.0432 31.6758 18.8568C31.6758 19.6705 32.3598 20.3301 33.2035 20.3301H34.2221C35.0658 20.3301 35.7498 19.6705 35.7498 18.8568C35.7498 18.0432 35.0658 17.3836 34.2221 17.3836H33.2035Z"
                fill="#C2C3D2"
              />
            </svg>
            <div
              class="text-center text-secondary-400 text-base font-medium leading-tight tracking-tight"
            >
              Add photo
            </div>
          </div>
        </div>
        <div
          v-else
          class="w-full rounded-lg relative"
          :class="props.height || 'h-[250px]'"
        >
          <div
            class="absolute top-2 right-2 cursor-pointer"
            @click="clearImage"
          >
            <Icon icon="Close Circle" color="red" />
          </div>
          <img
            :src="currentImage"
            class="object-contain h-full w-full"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
