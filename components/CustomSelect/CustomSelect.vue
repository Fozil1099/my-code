<script lang="ts" setup>
import { useIntersectionObserver, watchDebounced } from "@vueuse/core";
import { Input } from "..";
import { watch, ref, onMounted } from "vue";

// types

interface Props {
  placeholder?: string;
  modelValue?: number[] | any[];
  value?: number[] | any[];
  options: {
    next?: number | null;
    results: any[];
  };
  reduce?: Function;
  test?: Function;
  label?: string;
  pageSize?: string | number;
  optionsClass?: string;
  getOptionLabel?: Function;
  fetch: Function;
  otherParams?: any[];
}
interface Emits {
  (event: "update:modelValue", value: number[] | any[]): void;
  (event: "input", value: number[] | any[]): void;
}

// variables

const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  reduce: (item) => item,
  getOptionLabel: (item) => item,
});
const target = ref(null);
const localOption = ref<any[]>([]);
const nextPage = ref<number | null>(null);
const search = ref<string>("");
const inputValue = ref<number[] | any[]>([]);

useIntersectionObserver(target, async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    if (!nextPage.value) return;
    await fetchList();
  }
});

// functions

const onInput = () => {
  emit("input", inputValue.value);
  emit("update:modelValue", inputValue.value);
};

const onCheck = (item) => {
  if (props.test) {
    const test = props.test(item);
    const index = inputValue.value.findIndex(
      (el) => (props.test && props.test(el)) == test
    );
    if (index < 0) inputValue.value.push(item);
    else inputValue.value.splice(index, 1);
  } else {
    const value = props.reduce(item);
    const index = inputValue.value.findIndex((el) => el == value);
    if (index < 0) inputValue.value.push(value);
    else inputValue.value.splice(index, 1);
  }
  onInput();
};

const fetchList = async () => {
  if (!props.fetch) return;
  await props.fetch({
    search: search.value,
    next: nextPage.value,
    page_size: props.pageSize || 15,
    ...props.otherParams,
  });
  if (nextPage.value == 1 || !nextPage.value) {
    localOption.value = props.options.results;
  } else {
    localOption.value.push(...props.options.results);
  }
  nextPage.value = props.options.next || null;
};

// hooks

defineExpose({
  clear: () => {
    search.value = "";
  },
});

watch(
  () => props.modelValue,
  () => {
    inputValue.value = props.modelValue || [];
  }
);

watch(
  () => props.value,
  () => {
    inputValue.value = props.value || [];
  }
);

watchDebounced(
  () => search.value,
  () => {
    nextPage.value = 1;
    fetchList();
  },
  { debounce: 600 }
);

onMounted(async () => {
  await fetchList();
  localOption.value = props.options.results;
  nextPage.value = props.options.next || null;
  inputValue.value = props.modelValue || [];
});
</script>

<template>
  <Input
    v-model="search"
    id="search"
    placeholder="Search"
    type="text"
    icon="Minimalistic Magnifer"
    inputClass="w-full"
  />
  <div class="w-full max-h-[200px] overflow-auto custom-vertical-scrollbar">
    <div
      v-for="item in localOption"
      :class="
        props.optionsClass ||
        'flex items-center justify-between py-3 cursor-pointer'
      "
      @click="onCheck(item)"
    >
      <h4>
        {{ props.label ? item[props.label] : props.getOptionLabel(item) }}
      </h4>
      <template v-if="props.test">
        <svg
          v-if="
            inputValue.some &&
            inputValue.some(
              (el) =>
                (props.test && props.test(el)) ==
                (props.test && props.test(item))
            )
          "
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
            class="fill-primary"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 21.25C9.62178 21.25 7.91356 21.2484 6.61358 21.0736C5.33517 20.9018 4.56445 20.5749 3.9948 20.0052L2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.83687 22.7516 9.66418 22.75 12 22.75V21.25ZM1.25 12C1.25 14.3358 1.24841 16.1631 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659L3.9948 20.0052C3.42514 19.4355 3.09825 18.6648 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12H1.25ZM21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C20.9018 18.6648 20.5749 19.4355 20.0052 20.0052L21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.7516 16.1631 22.75 14.3358 22.75 12H21.25ZM12 22.75C14.3358 22.75 16.1631 22.7516 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659L20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0736C16.0864 21.2484 14.3782 21.25 12 21.25V22.75ZM12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.6648 3.09825 19.4355 3.42514 20.0052 3.9948L21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1631 1.24841 14.3358 1.25 12 1.25V2.75ZM22.75 12C22.75 9.66418 22.7516 7.83687 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414L20.0052 3.9948C20.5749 4.56445 20.9018 5.33517 21.0736 6.61358C21.2484 7.91356 21.25 9.62178 21.25 12H22.75ZM12 1.25C9.66418 1.25 7.83687 1.24841 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414L3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62178 2.75 12 2.75V1.25ZM2.75 12C2.75 9.62178 2.75159 7.91356 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948L2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24841 7.83687 1.25 9.66418 1.25 12H2.75Z"
            fill="#5C5F7C"
          />
        </svg>
      </template>
      <template v-else>
        <svg
          v-if="inputValue.includes && inputValue.includes(props.reduce(item))"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
            class="fill-primary"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 21.25C9.62178 21.25 7.91356 21.2484 6.61358 21.0736C5.33517 20.9018 4.56445 20.5749 3.9948 20.0052L2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.83687 22.7516 9.66418 22.75 12 22.75V21.25ZM1.25 12C1.25 14.3358 1.24841 16.1631 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659L3.9948 20.0052C3.42514 19.4355 3.09825 18.6648 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12H1.25ZM21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C20.9018 18.6648 20.5749 19.4355 20.0052 20.0052L21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.7516 16.1631 22.75 14.3358 22.75 12H21.25ZM12 22.75C14.3358 22.75 16.1631 22.7516 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659L20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0736C16.0864 21.2484 14.3782 21.25 12 21.25V22.75ZM12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.6648 3.09825 19.4355 3.42514 20.0052 3.9948L21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1631 1.24841 14.3358 1.25 12 1.25V2.75ZM22.75 12C22.75 9.66418 22.7516 7.83687 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414L20.0052 3.9948C20.5749 4.56445 20.9018 5.33517 21.0736 6.61358C21.2484 7.91356 21.25 9.62178 21.25 12H22.75ZM12 1.25C9.66418 1.25 7.83687 1.24841 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414L3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62178 2.75 12 2.75V1.25ZM2.75 12C2.75 9.62178 2.75159 7.91356 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948L2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24841 7.83687 1.25 9.66418 1.25 12H2.75Z"
            fill="#5C5F7C"
          />
        </svg>
      </template>
    </div>
    <div ref="target"></div>
  </div>
</template>
