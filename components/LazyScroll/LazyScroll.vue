<script lang="ts" setup>
import { onMounted, ref } from "vue";

interface Props {
  otherParams: any;
  storeFetch: Function;
  storeList: any;
}

const props = defineProps<Props>();

const observerRef = ref<HTMLElement | null>(null);
const createObserver = () => {
  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const callback: IntersectionObserverCallback = (entries, _) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (props.storeList.next) {
          await props.storeFetch({
            page: props.storeList.next,
            ...props.otherParams,
          });
        }
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  if (observerRef.value) {
    observer.observe(observerRef.value);
  }
};

onMounted(() => {
  createObserver();
});
</script>

<template>
  <slot />
  <div ref="observerRef" style="height: 1px"></div>
</template>
