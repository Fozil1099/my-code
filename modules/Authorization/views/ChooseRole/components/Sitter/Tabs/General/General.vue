<script lang="ts" setup>
import _store from "@/modules/Authorization/store";
import { martialType, zodiac } from "@/utils/constants";
import { formatDate } from "@/utils/features";
import {
  Input,
  FormControl,
  ImageInput,
  Location,
  Textarea,
  LazySelect,
} from "@com";
import { Validation } from "@vuelidate/core";
import { useLocalStorage, watchDebounced } from "@vueuse/core";
import { onMounted } from "vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

interface Props {
  validate: Validation;
}

defineProps<Props>();

const store = _store();
const { t } = useI18n();
let openMap = ref(false);
const region = useLocalStorage("region", null);

// hooks

watchDebounced(
  () => store.currentUser.profile.location,
  () => {
    if (store.currentUser.profile.location) openMap.value = true;
  }
);

onMounted(() => {
  if (store.currentUser.profile.location) openMap.value = true;
});
</script>

<template>
  <div class="w-full">
    <div class="grid md:grid-cols-2 gap-x-5 w-full">
      <Input
        v-model="store.currentUser.profile.full_name"
        id="full_name"
        label="Full name"
        placeholder="Full name"
        type="text"
        :required="validate.full_name.$errors"
        inputClass="w-full"
      />
      <FormControl
        for="Gender"
        label="Gender"
        :required="validate.gender.$errors"
      >
        <v-select
          id="Gender"
          v-model="store.currentUser.profile.gender"
          :options="['male', 'female']"
          placeholder="Gender"
          :getOptionLabel="(el) => t(el)"
          clearable
        ></v-select>
      </FormControl>
      <FormControl
        for="Birth date"
        label="Birth date"
        :required="validate.birth_date.$errors"
      >
        <DatePicker
          v-model="store.currentUser.profile.birth_date"
          id="Birth date"
          :autoApply="true"
          format="dd.MM.yyyy"
          placeholder="DD.MM.YY."
          :enableTimePicker="false"
          :locale="'en'"
          @update:model-value="
            store.currentUser.profile.birth_date = formatDate(
              store.currentUser.profile.birth_date,
              true
            )
          "
        ></DatePicker>
      </FormControl>
      <FormControl for="city" label="City of residence">
        <LazySelect
          v-model="store.currentUser.profile.city_of_residence"
          id="city"
          :options="store.cityList"
          placeholder="Not selected"
          :otherProps="{ parent_id: region || undefined }"
          :fetch="store.getCityList"
          :getOptionLabel="(el) => el.name"
          clearable
        ></LazySelect>
      </FormControl>
    </div>
    <div class="grid md:grid-cols-3 gap-x-5 w-full">
      <FormControl
        for="marital"
        label="Marital status"
        :required="validate.martial_status.$errors"
      >
        <v-select
          v-model="store.currentUser.profile.martial_status"
          id="marital"
          :options="martialType"
          placeholder="Not selected"
          :getOptionLabel="(el) => t(el)"
          clearable
        ></v-select>
      </FormControl>
      <FormControl
        for="Religion"
        label="Religion"
        :required="validate.religion.$errors"
      >
        <LazySelect
          v-model="store.currentUser.profile.religion"
          id="city"
          :options="store.religionList"
          placeholder="Not selected"
          :fetch="store.getReligionList"
          :getOptionLabel="(el) => el.name"
          clearable
        ></LazySelect>
      </FormControl>
      <FormControl
        for="Zodiac"
        label="Zodiac"
        :required="validate.zodiac_sign.$errors"
      >
        <v-select
          v-model="store.currentUser.profile.zodiac_sign"
          id="Zodiac"
          :options="zodiac"
          :getOptionLabel="(el) => t(el)"
          placeholder="Not selected"
          clearable
        ></v-select>
      </FormControl>
    </div>
    <Textarea
      v-model="store.currentUser.profile.description"
      id="About"
      label="About"
      placeholder="About"
      input-class="w-full"
      rows="7"
    />
    <div class="grid md:grid-cols-2 gap-x-5 w-full">
      <ImageInput v-model="store.currentUser.profile.image" />
      <div class="flex-col justify-start items-start gap-2 inline-flex my-2.5">
        <div class="text-secondary-900 text-sm font-normal tracking-tight">
          Location<span class="text-danger">*</span>
        </div>
        <div
          class="self-stretch h-[250px] flex-col justify-start items-start gap-2 flex"
        >
          <Location
            v-if="openMap"
            v-model="store.currentUser.profile.location"
            :getLocation="true"
          />
          <div
            v-else
            class="self-stretch h-[250px] flex-col justify-start items-start gap-5 flex cursor-pointer"
            @click="openMap = true"
          >
            <div
              class="w-full h-[250px] py-[76px] rounded-lg shadow border border-light-200 justify-center items-center inline-flex"
              :class="
                validate.location.$errors.length
                  ? 'bg-danger/30'
                  : 'bg-light-100'
              "
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
                    d="M22.0026 3.66699C13.9024 3.66699 7.33594 11.0051 7.33594 19.2503C7.33594 27.431 12.017 36.3231 19.3206 39.7368C21.0231 40.5326 22.9821 40.5326 24.6846 39.7368C31.9882 36.3231 36.6693 27.431 36.6693 19.2503C36.6693 11.0051 30.1028 3.66699 22.0026 3.66699ZM22.0026 22.0003C24.0276 22.0003 25.6693 20.3587 25.6693 18.3337C25.6693 16.3086 24.0276 14.667 22.0026 14.667C19.9776 14.667 18.3359 16.3086 18.3359 18.3337C18.3359 20.3587 19.9776 22.0003 22.0026 22.0003Z"
                    fill="#C2C3D2"
                  />
                </svg>
                <div
                  class="text-center text-secondary-400 text-base font-medium leading-tight tracking-tight"
                >
                  Add location
                </div>
              </div>
            </div>
          </div>
        </div>
        <span
          v-if="validate.location.$errors.length"
          class="whitespace-nowrap text-danger text-sm font-normal flex gap-1 items-center"
        >
          <div
            class="bg-danger w-4 h-4 rounded-ful text-white flex items-center justify-center rounded-full"
          >
            !
          </div>
          {{ $t(validate.location.$errors[0].$message) }}
        </span>
      </div>
    </div>

    <FormControl inputClass="flex items-center gap-2 mt-5">
      <input
        type="checkbox"
        class="switch-classic"
        v-model="store.currentUser.profile.camera"
      />

      <span class="text-sm font-normal tracking-sm text-dark"> Camera </span>
    </FormControl>
  </div>
</template>
