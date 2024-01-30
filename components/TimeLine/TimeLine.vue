<script lang="ts" setup>
interface Props {
  date?: string;
  description?: string;
  title?: string;
  icon?: string;
  colorClass?: string;
  borderClassColor?: string;
  iconColor?: string;
  iconSize?: string;
  src?: string | null;
  username?: string;
  isUsers?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <ol
    class="relative border-l"
    :class="
      props.borderClassColor
        ? props.borderClassColor
        : 'border-gray-200 dark:border-gray-700'
    "
  >
    <li class="pb-7 ml-4">
      <template v-if="isUsers">
        <span
          v-if="props.src"
          class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900 avatar-tooltip"
        >
          <img
            class="rounded-full shadow-lg"
            :src="props.src"
          />
          <span
            v-if="props.username"
            class="avatar-tooltiptext tooltip-right text-xs"
            >{{ props.username }}</span
          >
        </span>
        <span
          v-else
          class="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 avatar-tooltip"
          :class="props.colorClass ? props.colorClass : 'bg-primary'"
        >
          <Icon icon="User" size="16" color="#fff" />
          <span
            v-if="props.username"
            class="avatar-tooltiptext tooltip-right text-xs"
            >{{ props.username }}</span
          >
        </span>
      </template>
      <template v-else>
        <span
          v-if="props.icon"
          class="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900"
          :class="props.colorClass ? props.colorClass : 'bg-primary'"
        >
          <Icon
            :icon="props.icon"
            :color="props.iconColor"
            :size="props.iconSize"
          />
        </span>
        <div
          v-else
          class="absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900"
          :class="
            props.colorClass ? props.colorClass : 'bg-gray-200 dark:bg-gray-700'
          "
        ></div>
      </template>
      <time
        v-if="props.date"
        class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
        >{{ props.date }}</time
      >
      <h3
        v-if="props.title"
        class="text-lg font-semibold text-gray-900 dark:text-white"
      >
        {{ props.title }}
      </h3>
      <p
        v-if="props.description"
        class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
      >
        {{ props.description }}
      </p>
      <slot />
    </li>
  </ol>
</template>
