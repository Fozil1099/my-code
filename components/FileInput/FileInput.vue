<script lang="ts" setup>
import { nextTick, ref, watch, onMounted } from "vue";
// import ShowFileModal from "./ShowFileModal.vue";
import { ErrorObject } from "@vuelidate/core";
import { openFile } from "@/utils/files";
import { getFileName } from "@/utils/formmatter";

interface ReturnValue {
  item: string | File;
  index: number;
}
interface Emits {
  (event: "update:modelValue", value: File | File[]): void;
  (event: "input", value: File | File[]): void;
  (event: "remove", value: ReturnValue | string | File): void;
  (event: "show", value: ReturnValue | string | File): void;
}

interface Props {
  id: string;
  modelValue?: string | string[] | File | File[] | null;
  value?: string | string[];
  eye?: boolean;
  minus?: boolean;
  class?: string;
  multiple?: boolean;
  labelClass?: string;
  label?: string;
  inputClass?: string;
  required?: ErrorObject[];
}

const props = withDefaults(defineProps<Props>(), {
  eye: true,
  minus: true,
});
const emit = defineEmits<Emits>();
const inputValue = ref<string | string[] | File[] | File | null>(null);
const input = ref<boolean>(true);
const image = ref<string>("");
// const imageCard = ref();
const onShowFile = (item) => {
  console.log(item);
  image.value = item;
  console.log(image.value);
  nextTick(() => {
    // UIkit.modal("#file-modal").show();
    emit("show", item);
  });
};

const clickInput = () => {
  document.getElementById(props.id)?.click();
};

watch(
  () => props.modelValue,
  () => {
    if (!props.modelValue) {
      valueSetNull();
      nextTick(() => {
        inputValue.value = props.modelValue || null;
      });
    } else {
      inputValue.value = props.modelValue;
    }
  }
);
const valueSetNull = () => {
  const inp = document.getElementById(props.id) as HTMLInputElement;
  inp.value = "";
};

const onInputFile = (value) => {
  const valueSize: File[] = Object.values(value.target.files);
  if (!props.multiple) {
    emit("update:modelValue", value.target.files[0]);
    emit("input", value.target.files[0]);
  } else {
    emit("update:modelValue", valueSize);
    emit("input", valueSize);
  }
};

defineExpose({ valueSetNull });

onMounted(() => {
  if (!props.modelValue) {
    nextTick(() => {
      inputValue.value = props.modelValue || null;
    });
  } else {
    inputValue.value = props.modelValue;
  }
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
    <div class="relative">
      <input
        :id="props.id"
        class="form-file-input"
        :class="props.inputClass"
        @input="onInputFile"
        v-on="emit"
        type="file"
        :multiple="multiple"
      />
      <Icon
        icon="Folder"
        color="#5C5F7C"
        class="absolute top-3.5 bottom-3.5 right-3 cursor-pointer"
        @click="clickInput"
      />
    </div>
    <span
      v-if="props.required?.length"
      class="whitespace-nowrap text-danger text-sm font-normal fixed flex gap-1 items-center"
    >
      <div
        class="bg-danger w-4 h-4 rounded-ful text-white flex items-center justify-center rounded-full"
      >
        !
      </div>
      {{ $t(String(props.required[0].$message)) }}
    </span>
    <template v-if="typeof inputValue === 'string'">
      <div class="flex justify-between items-center mt-3">
        <span class="rounded-lg bg-primary px-3 py-2 text-white">{{
          getFileName(inputValue)
        }}</span>

        <div class="flex justify-end gap-3">
          <Icon
            v-if="props.eye"
            icon="Eye"
            @click="onShowFile(inputValue)"
            class="cursor-pointer"
            size="24"
            color="#909498"
          /><Icon
            v-if="props.minus"
            icon="Trash Bin Trash"
            @click="emit('remove', inputValue)"
            class="cursor-pointer"
            size="24"
            color="#ea5455"
          />
        </div>
      </div>
    </template>
    <template v-else-if="Array.isArray(inputValue)">
      <div
        class="flex justify-between items-center mt-3 mx-5"
        v-for="(i, index) in inputValue"
      >
        <span class="rounded-lg bg-primary px-3 py-2 text-white">{{
          getFileName(i)
        }}</span>

        <div class="flex justify-end gap-3">
          <Icon
            v-if="props.eye"
            icon="Eye"
            @click="openFile(i)"
            class="cursor-pointer"
            size="24"
            color="#909498"
          /><Icon
            v-if="props.minus"
            icon="Trash Bin Trash"
            @click="emit('remove', { item: i, index })"
            class="cursor-pointer"
            size="24"
            color="#ea5455"
          />
        </div>
      </div>
    </template>
    <template v-else-if="typeof inputValue === 'object' && inputValue">
      <div class="flex justify-between items-center mt-3">
        <span class="rounded-lg bg-primary px-3 py-2 text-white">{{
          getFileName(inputValue)
        }}</span>

        <div class="flex justify-end gap-3">
          <Icon
            v-if="props.eye"
            icon="Eye"
            @click="onShowFile(inputValue)"
            class="cursor-pointer"
            size="24"
            color="#909498"
          /><Icon
            v-if="props.minus"
            icon="Trash Bin Trash"
            @click="emit('remove', inputValue)"
            class="cursor-pointer"
            size="24"
            color="#ea5455"
          />
        </div></div
    ></template>
    <!-- <ShowFileModal :image="image" ref="imageCard" /> -->
  </div>
</template>
