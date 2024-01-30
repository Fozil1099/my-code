<script lang="ts" setup>
import { FormControl, ImageInput, Input, LazySelect, Location } from "@com";
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { store as _authStore } from "@/modules/Authorization";
import { useRouter } from "vue-router";

// variables

const authStore = _authStore();
let openMap = ref(false);
const { t } = useI18n();
const router = useRouter();

const region = useLocalStorage("region", null);
</script>

<template>
  <div class="w-full">
    <div class="max-w-screen-base mx-auto py-[60px]">
      <div class="flex gap-5">
        <div class="md:w-2/3">
          <div class="card px-5 py-2.5 grid grid-cols-2 gap-5">
            <ImageInput height="h-full" />
            <div>
              <Input
                placeholder="Full name"
                label="Full name"
                input-class="w-full"
              />
              <FormControl for="Birth date" label="Birth date">
                <DatePicker
                  id="Birth date"
                  :autoApply="true"
                  format="dd.MM.yyyy"
                  return-format="YYYY-MM-DD"
                  placeholder="DD.MM.YY."
                  :enableTimePicker="false"
                  :locale="'en'"
                ></DatePicker>
                <!-- @update:model-value="
                    formData.birth_date = formatDate(formData.birth_date, true)
                  " -->
              </FormControl>
              <FormControl for="Gender" label="Gender">
                <v-select
                  id="Gender"
                  :options="['male', 'female']"
                  placeholder="Gender"
                  :getOptionLabel="(el) => t(el)"
                  clearable
                ></v-select>
              </FormControl>
              <FormControl for="city" label="City of residence">
                <LazySelect
                  id="city"
                  :options="authStore.cityList"
                  placeholder="Not selected"
                  :otherProps="{ parent_id: region || undefined }"
                  :fetch="authStore.getCityList"
                  :getOptionLabel="(el) => el.name"
                  clearable
                ></LazySelect>
              </FormControl>
            </div>
          </div>
        </div>
        <div class="md:w-1/3">
          <div class="card p-5">
            <div class="text-secondary-900 text-sm font-normal tracking-tight">
              Location<span class="text-danger">*</span>
            </div>
            <div
              class="self-stretch h-[315px] flex-col justify-start items-start gap-2 flex mt-2"
            >
              <Location v-if="openMap" :getLocation="true" />
              <div
                v-else
                class="self-stretch h-full flex-col justify-start items-start gap-5 flex cursor-pointer"
                @click="openMap = true"
              >
                <div
                  class="w-full h-full py-[76px] rounded-lg shadow border border-light-200 justify-center items-center inline-flex bg-light-100"
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
          </div>
        </div>
      </div>
      <div class="w-full flex items-start justify-end gap-5 mt-10">
        <div
          class="btn-outline-secondary max-w-[210px] w-full"
          @click="router.push({ name: 'profile' })"
        >
          Close
        </div>
        <div class="btn-primary max-w-[210px] w-full">Save</div>
      </div>
    </div>
  </div>
</template>
