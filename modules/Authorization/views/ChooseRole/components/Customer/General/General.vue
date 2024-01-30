<script lang="ts" setup>
import _store from "@/modules/Authorization/store";
import { formatDate } from "@/utils/features";
import { Input, FormControl, ImageInput, Location, LazySelect } from "@com";
import useVuelidate, { Validation } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { ref, onMounted, reactive, watch, computed, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { objectToFormData } from "@/utils/formmatter";
import { useLocalStorage } from "@vueuse/core";
import { CityView } from "@m/Authorization/store/types";

interface FormData {
  full_name: string;
  city_of_residence: null | CityView;
  birth_date: null | string;
  gender: null | string;
  location: null | {
    lat?: number;
    lng?: number;
  };
}

//variables
const store = _store();
const { t } = useI18n();
let openMap = ref(false);
const router = useRouter();
const region = useLocalStorage("region", null);

let image = ref<string | null | File>(null);

const formData = reactive<FormData>({
  full_name: "",
  city_of_residence: null,
  birth_date: null,
  gender: null,
  location: null,
});

const rules = computed(() => {
  return {
    full_name: {
      required: helpers.withMessage("Field is required", required),
    },
    location: {
      required: helpers.withMessage("Field is required", required),
    },
  };
});

const validate: Ref<Validation> = useVuelidate(rules, formData);

// functions
const saveInformation = async () => {
  const success = await validate.value.$validate();
  if (!success) return;
  const { city_of_residence, ...rest } = formData;
  await store.updateCurrentUser({
    profile: { ...rest, city_of_residence: city_of_residence?.id },
  });

  router.push({ name: "fill-information-customer-child" });
};

// hooks
watch(
  () => image.value,
  async () => {
    if (typeof image.value == "string") return;
    await store.updateCurrentUser(
      objectToFormData({
        profile: {
          image: image.value || "",
        },
      })
    );
  }
);

onMounted(async () => {
  await store.getCurrentUser();
  const { birth_date, city_of_residence, full_name, gender, location } =
    store.currentUser.profile;
  Object.assign(formData, {
    birth_date,
    city_of_residence,
    full_name,
    gender,
    location,
  });
  image.value = store.currentUser.profile.image;

  if (formData.location) openMap.value = true;
});
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between py-6">
    <div>
      <h1 class="text-dark text-4xl font-bold">Customer</h1>
      <div class="mt-[60px] flex-col justify-start items-start gap-8 flex">
        <div class="w-full">
          <div class="grid md:grid-cols-2 gap-x-5 w-full">
            <ImageInput v-model="image" />
            <div
              class="flex-col justify-start items-start gap-2 inline-flex my-2.5"
            >
              <div
                class="text-secondary-900 text-sm font-normal tracking-tight"
              >
                Location<span class="text-danger">*</span>
              </div>
              <div
                class="self-stretch h-[250px] flex-col justify-start items-start gap-2 flex"
              >
                <Location
                  v-if="openMap"
                  v-model="formData.location"
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

            <Input
              v-model="formData.full_name"
              id="full_name"
              label="Full name"
              placeholder="Full name"
              type="text"
              inputClass="w-full"
              :required="validate.full_name.$errors"
            />
            <FormControl for="Gender" label="Gender">
              <v-select
                v-model="formData.gender"
                id="Gender"
                :options="['male', 'female']"
                placeholder="Gender"
                :getOptionLabel="(el) => t(el)"
                clearable
              ></v-select>
            </FormControl>
            <FormControl for="Birth date" label="Birth date">
              <DatePicker
                v-model="formData.birth_date"
                id="Birth date"
                :autoApply="true"
                format="dd.MM.yyyy"
                return-format="YYYY-MM-DD"
                placeholder="DD.MM.YY."
                :enableTimePicker="false"
                :locale="'en'"
                @update:model-value="
                  formData.birth_date = formatDate(formData.birth_date, true)
                "
              ></DatePicker>
            </FormControl>
            <FormControl for="city" label="City of residence">
              <LazySelect
                v-model="formData.city_of_residence"
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
        </div>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-5 mt-[100px] w-full">
      <button class="btn-outline-secondary">Skip</button>
      <button class="btn-primary" @click="saveInformation">Next</button>
    </div>
  </div>
</template>
