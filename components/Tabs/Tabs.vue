<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { provide, ref } from "vue";
import { useI18n } from "vue-i18n";

interface Props {
  vertical?: boolean;
  pill?: boolean;
  tabActiveClass?: string;
  tabClass?: string;
  disabledTabs?: boolean[];
  positionClass?: string;
}

interface Emits {
  (event: "selected", value: string);
  (event: "selectedIndex", value: number);
}

const props = withDefaults(defineProps<Props>(), {
  pill: false,
});

const slots = defineSlots();
const emit = defineEmits<Emits>();

const { t } = useI18n();

const tabTitles = ref(
  slots
    .default()
    .map((tab) => (tab.props && !tab.props.hide ? tab.props.title : null))
    .filter((el) => el)
);

const disabledTabs = ref<boolean[]>([]);

const selectedTitle = ref<string>(tabTitles.value[0]);

provide("selectedTitle", selectedTitle);

// functions

function onTitleSelected(title, index: number) {
  selectedTitle.value = title;
  emit("selected", selectedTitle.value);
  emit("selectedIndex", index);
}

function selectById(index: number) {
  selectedTitle.value = tabTitles.value[index];
  emit("selected", selectedTitle.value);
  emit("selectedIndex", index);
}

const getClass = (title: string, disabled: boolean) => {
  if (disabled) {
    return "text-secondary-900 opacity-60 text-[16px] leading-[20px] tracking-sm  cursor-not-allowed";
  }
  if (title == selectedTitle.value) {
    if (props.pill)
      return "rounded-lg flex justify-center items-center bg-primary px-8 py-4 text-white duration-100 shadow-buttonShadow font-medium text-[16px] leading-[20px] tracking-sm";
    return props.tabActiveClass || "border-b-[3px] border-primary text-primary";
  } else {
    if (props.pill)
      return "rounded-lg flex justify-center items-center bg-white px-8 py-4 text-primary duration-100 hover:bg-primary hover:text-white font-medium text-[16px] leading-[20px] tracking-sm";
    return props.tabClass || "";
  }
};

// hooks

defineExpose({ select: onTitleSelected, selectById });

watch(
  () => props.disabledTabs,
  () => {
    disabledTabs.value = props.disabledTabs || [];
  }
);

onMounted(() => {
  disabledTabs.value = props.disabledTabs || [];
});
</script>

<template>
  <div class="tabs__main">
    <ul
      class="font-base mb-5 border-0 text-sm text-gray-500"
      :class="props.positionClass || 'flex flex-wrap'"
    >
      <li
        v-for="(title, index) in tabTitles"
        :key="title"
        class="mr-2 cursor-pointer px-5 py-2"
        :class="getClass(title, disabledTabs[index])"
        @click="disabledTabs[index] ? '' : onTitleSelected(title, index)"
      >
        {{ t(title) }}
      </li>
    </ul>
    <div :class="props.vertical && 'w-5/6'" class="tabs__main__body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.active {
  box-shadow: 0 4px 18px -4px rgba(115, 103, 240, 0.65);
}

@media (min-width: 0px) and (max-width: 480px) {
  /* .tw-pagination > section > div{
      flex-wrap: wrap !important;
    } */
  .tabs__main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    ul {
      width: 100% !important;
    }

    &__body {
      width: 100% !important;
    }
  }
}
</style>
