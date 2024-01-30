<script lang="ts" setup>
import { Tabs, Tab } from "@com";
import General from "./Tabs/General";
import Schedule from "./Tabs/Schedule";
import Services from "./Tabs/Services";
import Skills from "./Tabs/Skills";
import Education from "./Tabs/Education";
import Work from "./Tabs/Work";
import { ref, computed, Ref, onMounted, watch } from "vue";
import { helpers, required } from "@vuelidate/validators";
import useVuelidate, { Validation } from "@vuelidate/core";
import _store from "@/modules/Authorization/store";
import { objectToFormData } from "@/utils/formmatter";
import { useRouter } from "vue-router";
import { useSessionStorage } from "@vueuse/core";

const store = _store();
const router = useRouter();

const disabledTabs = ref([false, true, true, true, true, true]);
const tabs = ref();
let currentIndex = ref(0);
const userTab = useSessionStorage("current-user-tab", 0);

const rules = computed(() => {
  return {
    full_name: {
      required: helpers.withMessage("Field is required", required),
    },
    gender: {
      required: helpers.withMessage("Field is required", required),
    },
    birth_date: {
      required: helpers.withMessage("Field is required", required),
    },
    martial_status: {
      required: helpers.withMessage("Field is required", required),
    },
    religion: {
      required: helpers.withMessage("Field is required", required),
    },
    zodiac_sign: {
      required: helpers.withMessage("Field is required", required),
    },
    location: {
      required: helpers.withMessage("Field is required", required),
    },
  };
});

const validate: Ref<Validation> = useVuelidate(
  rules,
  store.currentUser.profile
);

// functions
const openTab = (index: number) => {
  disabledTabs.value = disabledTabs.value.map((_, i) =>
    i <= index ? false : true
  );
  tabs.value.selectById(index);
};

const saveGeneralSettings = async () => {
  const success = await validate.value.$validate();
  if (!success) return;
  const {
    profile: {
      full_name,
      gender,
      birth_date,
      city_of_residence,
      martial_status,
      religion,
      zodiac_sign,
      description,
      image,
      location,
      camera,
    },
  } = store.currentUser;
  await store.updateCurrentUser(
    objectToFormData({
      profile: {
        full_name,
        gender,
        birth_date,
        city_of_residence: city_of_residence?.id,
        martial_status,
        religion: religion?.id,
        zodiac_sign,
        description,
        image: typeof image == "string" ? null : image || "",
        location: JSON.stringify(location),
        camera,
      },
    })
  );
  openTab(1);
};

const nextTab = async () => {
  const sections = {
    0: saveGeneralSettings,
    1: () => openTab(2),
    2: () => openTab(3),
    3: () => openTab(4),
    4: () => openTab(5),
    5: () => {
      router.push("/");
    },
  };
  sections[currentIndex.value]();
};

// hooks

watch(
  () => currentIndex.value,
  () => {
    userTab.value = currentIndex.value;
  }
);

onMounted(async () => {
  const { data } = await store.getCurrentUser({}, false);
  Object.assign(store.currentUser.profile, data.profile);
  const success = await validate.value.$validate();
  if (success) {
    openTab(userTab.value);
  } else {
    openTab(0);
  }
  validate.value.$reset();
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col justify-between py-6 overflow-x-hidden sm:overflow-x-visible"
  >
    <div>
      <div class="flex justify-between items-center">
        <h1 class="text-dark text-4xl font-bold">Teacher</h1>

        <button class="btn-outline-secondary" @click="$router.push('/')">
          Skip
        </button>
      </div>
      <div class="mt-[60px] flex-col justify-start items-start gap-8 flex">
        <Tabs
          ref="tabs"
          class="w-full"
          pill
          tab-class="min-w-[100px]"
          tab-active-class="min-w-[100px]"
          positionClass="flex items-center justify-between overflow-x-auto"
          :disabled-tabs="disabledTabs"
          @selected-index="currentIndex = $event"
        >
          <Tab title="General" class="pt-2.5">
            <General :validate="validate" />
          </Tab>
          <Tab title="Schedule" class="pt-5" :disabled="true">
            <Schedule />
          </Tab>
          <Tab title="Services" :disabled="true"> <Services /> </Tab>
          <Tab title="Skills" :disabled="true"> <Skills /> </Tab>
          <Tab title="Education" :disabled="true"> <Education /> </Tab>
          <Tab title="Work" :disabled="true"> <Work /> </Tab>
        </Tabs>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-5 mt-[100px] w-full">
      <button
        v-if="currentIndex"
        class="btn-outline-secondary"
        @click="openTab(currentIndex - 1)"
      >
        Back
      </button>
      <div v-else></div>
      <button class="btn-primary" @click="nextTab">Next</button>
    </div>
  </div>
</template>
