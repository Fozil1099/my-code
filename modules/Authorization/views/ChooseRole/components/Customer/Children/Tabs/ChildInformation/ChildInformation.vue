<script lang="ts" setup>
import { FormControl, ImageInput, Input, Textarea } from "@com";
import _store from "@/modules/Authorization/store";
import { formatDate } from "@/utils/features";
import { useI18n } from "vue-i18n";
import { Validation } from "@vuelidate/core";

interface Props {
  validate: Validation;
}

defineProps<Props>();

const store = _store();
const { t } = useI18n();
</script>

<template>
  <div class="md:flex gap-5">
    <div class="md:w-1/2">
      <ImageInput class="w-full" v-model="store.children.image" />
    </div>
    <div class="md:w-1/2 flex flex-col gap-3">
      <Input
        v-model="store.children.full_name"
        id="full_name"
        label="Full name"
        placeholder="Full name"
        type="text"
        inputClass="w-full"
        :required="validate.full_name.$errors"
      />
      <FormControl
        for="Birth date"
        label="Birth date"
        :required="validate.birth_date.$errors"
      >
        <DatePicker
          v-model="store.children.birth_date"
          id="Birth date"
          :autoApply="true"
          format="dd.MM.yyyy"
          placeholder="DD.MM.YY."
          :enableTimePicker="false"
          :locale="'en'"
          @update:model-value="
            store.children.birth_date = formatDate(
              store.children.birth_date,
              true
            )
          "
        ></DatePicker>
      </FormControl>
      <FormControl
        for="Gender"
        label="Gender"
        :required="validate.gender.$errors"
      >
        <v-select
          id="Gender"
          v-model="store.children.gender"
          :options="['male', 'female']"
          placeholder="Gender"
          :getOptionLabel="(el) => t(el)"
          clearable
        ></v-select>
      </FormControl>
    </div>
  </div>
  <div class="w-full">
    <Textarea
      v-model="store.children.description"
      id="full_name"
      label="About child"
      placeholder="About child"
      inputClass="w-full"
      rows="6"
    />
  </div>
</template>
