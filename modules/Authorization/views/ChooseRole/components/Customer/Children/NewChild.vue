<script lang="ts" setup>
import { Tabs, Tab } from "@com";
import ChildInformation from "./Tabs/ChildInformation";
import Schedule from "./Tabs/Schedule";
import MedicalRecord from "./Tabs/MedicalRecord";
import Additionally from "./Tabs/Additionally";
import { computed, Ref, ref, onBeforeMount, onUnmounted } from "vue";
import { helpers, required } from "@vuelidate/validators";
import useVuelidate, { Validation } from "@vuelidate/core";
import _store from "@/modules/Authorization/store";
import { useRoute, useRouter } from "vue-router";
import { objectToFormData } from "@/utils/formmatter";

const store = _store();
const router = useRouter();
const tab = ref();
const route = useRoute();

const rules = computed(() => {
  return {
    full_name: {
      required: helpers.withMessage("Field is required", required),
    },
    birth_date: {
      required: helpers.withMessage("Field is required", required),
    },
    gender: {
      required: helpers.withMessage("Field is required", required),
    },
  };
});

const validate: Ref<Validation> = useVuelidate(rules, store.children);

// functions

const getImage = (image) => {
  if (!image) return "";
  return typeof image == "string" ? null : image;
};

const clearChildrenData = () => {
  store.children = {
    full_name: "",
    birth_date: "",
    gender: "",
    description: "",
    image: null,
    language: [],
    medical_records: {
      medication: "",
      special_equipment_needs: "",
      allergies: "",
    },
    additionally: {
      hobby: "",
    },
    schedule: [],
  };
};

const saveAll = async () => {
  const success = await validate.value.$validate();
  if (!success) {
    tab.value.selectedIndex(0);
    return;
  }
  const { language, image, additionally, medical_records, ...rest } =
    store.children;
  const data = objectToFormData({
    language: language.map((el) => el.id),
    additionally: JSON.stringify(additionally),
    medical_records: JSON.stringify(medical_records),
    image: getImage(image),
    ...rest,
    id: route.params.id || null,
  });
  if (data.get("id")) await store.updateChildren(data);
  else await store.createChildren(data);
  clearChildrenData();
  router.push({ name: "fill-information-customer-child" });
};
// hooks
onBeforeMount(() => {
  if (route.params.id) store.getChildren(route.params.id as string);
});

onUnmounted(() => {
  if (!store.children.id) return;
  clearChildrenData();
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col justify-between py-6 overflow-x-hidden sm:overflow-x-visible"
  >
    <div>
      <h1 class="text-dark text-4xl font-bold">Customer</h1>
      <div class="mt-[60px] flex-col justify-start items-start gap-8 flex">
        <Tabs
          ref="tab"
          class="w-full"
          pill
          tab-class="min-w-[100px]"
          tab-active-class=" min-w-[100px]"
          positionClass="flex items-center justify-between overflow-x-auto"
        >
          <Tab title="General" class="pt-2.5">
            <ChildInformation :validate="validate" />
          </Tab>
          <Tab title="Schedule" class="pt-5"> <Schedule /> </Tab>
          <Tab title="Medical records"> <MedicalRecord /> </Tab>
          <Tab title="Additionally"> <Additionally /> </Tab>
          <!-- <Tab title="Documents"> <Documents /> </Tab> -->
        </Tabs>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-5 mt-[100px] w-full">
      <button
        class="btn-outline-secondary"
        @click="$router.push({ name: 'fill-information-customer-child' })"
      >
        Back
      </button>
      <button class="btn-primary" @click="saveAll">Next</button>
    </div>
  </div>
</template>
