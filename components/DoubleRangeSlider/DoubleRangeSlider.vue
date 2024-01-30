<script setup lang="ts">
import ZbRangeSlider from "./ZbRangeSlider";
import { ref, onMounted, watch } from "vue";

interface Props {
  minThreshold?: number;
  maxThreshold?: number;
  step?: number;
  min: number;
  max: number;
}

const props = withDefaults(defineProps<Props>(), {
  minThreshold: -100,
  maxThreshold: 100,
  step: 1,
});
const emit = defineEmits<{
  (event: "update:min", value: number);
  (event: "update:max", value: number);
}>();

let instance = ref();

const updateValues = (min, max) => {
  emit("update:min", min);
  emit("update:max", max);
};

watch(
  () => props.min,
  () => {
    if (props.min && props.min >= props.minThreshold) {
      instance.value.setMinValue(props.min);
    }
  }
);

watch(
  () => props.max,
  () => {
    if (
      props.max &&
      props.max <= props.maxThreshold &&
      props.max >= props.min
    ) {
      instance.value.setMaxValue(props.max);
    }
  }
);

onMounted(() => {
  instance.value = new ZbRangeSlider("my-slider");
  instance.value.onChange = (min, max) => updateValues(min, max);
});
</script>

<template>
  <div class="content">
    {{ props.min }}
    <div
      id="my-slider"
      :se-min="props.minThreshold"
      :se-step="props.step"
      :se-min-value="props.min"
      :se-max-value="props.max"
      :se-max="props.maxThreshold"
      class="slider"
    >
      <div class="slider-touch-left">
        <span></span>
      </div>
      <div class="slider-touch-right">
        <span></span>
      </div>
      <div class="slider-line">
        <span></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slider {
  display: block;
  position: relative;
  height: 36px;
  width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.slider .slider-touch-left,
.slider .slider-touch-right {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  position: absolute;
  height: 36px;
  width: 36px;
  padding: 6px;
  z-index: 2;
}
.slider .slider-touch-left span,
.slider .slider-touch-right span {
  @apply border-primary border-[2px];

  display: block;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 50%;
}
.slider .slider-line {
  @apply bg-secondary-400;

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  width: calc(100% - 36px);
  left: 18px;
  top: 16px;
  height: 2px;
  border-radius: 4px;
  z-index: 0;
  overflow: hidden;
}
.slider .slider-line span {
  @apply bg-primary;

  display: block;
  height: 100%;
  width: 0%;
}
</style>
