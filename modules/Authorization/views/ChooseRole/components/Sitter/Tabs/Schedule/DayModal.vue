<script lang="ts" setup>
import { Modal, FormControl, modal } from "@com";
import { required } from "@vuelidate/validators";
import _store from "@/modules/Authorization/store";
import useVuelidate, { Validation } from "@vuelidate/core";
import { reactive, watch, Ref, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { weekDays } from "@/utils/constants";
import { TeacherSchedule } from "@/modules/Authorization/store/types";

interface Props {
  editData?: TeacherSchedule;
}

interface Form {
  id?: number;
  start_week: number | null;
  end_week: number | null;
  start_time: { hours: number; minutes: number } | null;
  end_time: { hours: number; minutes: number } | null;
}

const store = _store();
const { t } = useI18n();
const props = defineProps<Props>();

let isValid = ref(true);
const form = reactive<Form>({
  start_week: null,
  end_week: null,
  start_time: null,
  end_time: null,
});

const rules = computed(() => {
  return {
    start_week: {
      required,
    },
    end_week: {
      required,
    },
    start_time: {
      required,
    },
    end_time: {
      required,
    },
  };
});

const validate: Ref<Validation> = useVuelidate(rules, form);

// functions

const checkValidation = async (): Promise<boolean> => {
  const success = await validate.value.$validate();
  if (!success) {
    isValid.value = true;
  } else {
    isValid.value = false;
  }
  return success;
};

const savaSchedule = async () => {
  const success = await checkValidation();
  if (!success) return;
  const { id, start_time, end_time, ...rest } = form;
  if (id) {
    await store.updateTeacherSchedule({
      id,
      start_time: `${start_time?.hours}:${start_time?.minutes}`,
      end_time: `${end_time?.hours}:${end_time?.minutes}`,
      ...rest,
    });
  } else {
    await store.createTeacherSchedule({
      start_time: `${start_time?.hours}:${start_time?.minutes}`,
      end_time: `${end_time?.hours}:${end_time?.minutes}`,
      ...rest,
    });
  }
  modal("add-day").hide();
  store.getTeacherScheduleList({ page: 1, isLazy: true });
};

const onHideModal = () => {
  form.id = undefined;
  form.start_week = null;
  form.end_week = null;
  form.start_time = null;
  form.end_time = null;
};

const onShowModal = () => {
  if (!props.editData) return;
  const { start_time, end_time, ...rest } = props.editData;
  Object.assign(form, {
    start_time: {
      hours: Number(start_time.split(":")[0]),
      minutes: Number(start_time.split(":")[1]),
    },
    end_time: {
      hours: Number(end_time.split(":")[0]),
      minutes: Number(end_time.split(":")[1]),
    },
    ...rest,
  });
};
// hooks
watch(() => form.start_week, checkValidation);
watch(() => form.end_week, checkValidation);
</script>

<template>
  <Modal
    id="add-day"
    :title="form.id ? 'Edit day' : 'Add day'"
    size="max-w-[36rem]"
    okClass="w-full"
    cancelClass="w-full"
    :ok="form.id ? 'Save' : 'Add'"
    cancel="Close"
    :ok-disabled="isValid"
    @ok="savaSchedule"
    @hide="onHideModal"
    @show="onShowModal"
  >
    <FormControl label="Day" inputClass="grid grid-cols-2 gap-2">
      <v-select
        v-model="form.start_week"
        :options="weekDays"
        placeholder="From"
        :getOptionLabel="(el) => t(el.title)"
        :reduce="(el) => el.index"
        clearable
        @input="checkValidation"
      ></v-select>
      <v-select
        v-model="form.end_week"
        :options="weekDays"
        placeholder="To"
        :selectable="(el) => (form.start_week || 0) <= el.index"
        :getOptionLabel="(el) => t(el.title)"
        :reduce="(el) => el.index"
        clearable
        @input="checkValidation"
      ></v-select>
    </FormControl>
    <FormControl label="Time" inputClass="grid grid-cols-2 gap-2">
      <DatePicker
        v-model="form.start_time"
        :autoApply="true"
        format="HH:mm"
        placeholder="From"
        time-picker
        :locale="'en'"
        @update:model-value="checkValidation"
      ></DatePicker>
      <DatePicker
        v-model="form.end_time"
        :autoApply="true"
        format="HH:mm"
        placeholder="To"
        time-picker
        :locale="'en'"
        @update:model-value="checkValidation"
      ></DatePicker>
    </FormControl>
  </Modal>
</template>
