<script lang="ts" setup>
import { FormControl, Input, Modal, Textarea, modal } from "@com";
import _store from "@/modules/Authorization/store";
import { Schedule } from "@/modules/Authorization/store/types";
import { weekDays } from "@/utils/constants";
import { reactive, ref, computed, Ref } from "vue";
import { required } from "@vuelidate/validators";
import useVuelidate, { Validation } from "@vuelidate/core";
import { watchDebounced } from "@vueuse/core";

//types
interface Props {
  schedule: Schedule | null;
}

interface Time {
  hours: number;
  minutes: number;
}

const store = _store();
const props = defineProps<Props>();

const form = reactive<Schedule>({
  weekday: [],
  children: null,
  title: "",
  description: "",
  time_start: "",
  time_end: "",
});

let timeStart = ref<Time | null>(null);
let timeEnd = ref<Time | null>(null);
let isValid = ref(false);

const rules = computed(() => {
  return {
    weekday: {
      required,
    },
    description: {
      required,
    },
    title: {
      required,
    },
    time_start: {
      required,
    },
    time_end: {
      required,
    },
  };
});

const validate: Ref<Validation> = useVuelidate(rules, form);

// methods

const clearForm = () => {
  form.id = undefined;
  Object.assign(form, {
    weekday: [],
    children: null,
    title: "",
    description: "",
    time_start: "",
    time_end: "",
  });

  timeStart.value = null;
  timeEnd.value = null;
  isValid.value = false;
};

const saveForm = async () => {
  const success = await validate.value.$validate();
  if (!success) return;
  if (!store.children.id) {
    if (!store.children.schedule) store.children.schedule = [];
    store.children.schedule.push(JSON.parse(JSON.stringify(form)));
  } else {
    if (!form.id) {
      await store.createChildrenSchedule({
        ...form,
        children: store.children.id,
      });
    } else {
      await store.updateChildrenSchedule({
        ...form,
        children: store.children.id,
      });
    }

    await store.getChildrenScheduleList({
      page: 1,
      isLazy: true,
      page_size: 10,
      children: String(store.children.id),
    });
  }

  modal("add-schedule-modal").hide();
};

const changeTime = () => {
  if (timeStart.value) {
    form.time_start = timeStart.value.hours + ":" + timeStart.value.minutes;
  } else {
    form.time_start = "";
  }

  if (timeEnd.value) {
    form.time_end = timeEnd.value.hours + ":" + timeEnd.value.minutes;
  } else {
    form.time_end = "";
  }
};

const onShowModal = () => {
  if (!props.schedule) return;

  const { weekday, children, title, description, time_start, time_end } =
    props.schedule;
  Object.assign(form, {
    weekday,
    children,
    title,
    description,
    time_start,
    time_end,
  });
};

// hooks

watchDebounced(
  form,
  async () => {
    const success = await validate.value.$validate();

    if (success) isValid.value = true;
    else isValid.value = false;
  },
  { debounce: 600 }
);
</script>

<template>
  <Modal
    id="add-schedule-modal"
    title="Add task"
    size="max-w-[32rem]"
    okClass="w-full"
    cancelClass="w-full"
    @hide="clearForm"
    @ok="saveForm"
    :ok-disabled="!isValid"
    @show="onShowModal"
  >
    <FormControl for="Day" label="Day">
      <v-select
        v-model="form.weekday"
        id="Day"
        :options="weekDays"
        placeholder="Day"
        label="title"
        multiple
        :reduce="(el) => el.index"
        clearable
      ></v-select>
    </FormControl>
    <FormControl
      for="time-from"
      label="Time"
      inputClass="grid md:grid-cols-2 gap-3"
    >
      <DatePicker
        v-model="timeStart"
        id="Birth date"
        :autoApply="true"
        format="HH:mm"
        placeholder="From"
        time-picker
        :locale="'en'"
        @update:model-value="changeTime"
      ></DatePicker>
      <DatePicker
        v-model="timeEnd"
        id="Birth date"
        :autoApply="true"
        format="HH:mm"
        placeholder="To"
        time-picker
        :locale="'en'"
        @update:model-value="changeTime"
      ></DatePicker>
    </FormControl>
    <Input
      v-model="form.title"
      id="title"
      inputClass="w-full"
      label="Title"
      placeholder="Title"
    />
    <Textarea
      v-model="form.description"
      for="Description"
      label="Description"
      placeholder="Description"
      inputClass="w-full"
    />
  </Modal>
</template>
