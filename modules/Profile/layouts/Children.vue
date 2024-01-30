<script lang="ts" setup>
import { Default } from "@/layouts";
import ProfileChildMenu from "../components/ProfileChildMenu";
import { onBeforeMount, Ref, computed, ref, onUnmounted, provide } from "vue";
import { store as _authStore } from "@/modules/Authorization";
import { useRoute, useRouter } from "vue-router";
import { helpers, required } from "@vuelidate/validators";
import useVuelidate, { Validation } from "@vuelidate/core";

const authStore = _authStore();
const router = useRouter();
const route = useRoute();

provide("openAllMenus", async () => {  
  await authStore.getChildren(route.params.id as string);
  const success = await validate.value.$validate();
  if (!success) checkCheckEndReturn();
  else isOpenAll.value = false;
});

let isOpenAll = ref(true);

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

const validate: Ref<Validation> = useVuelidate(rules, authStore.children);

const checkCheckEndReturn = () => {
  if (route.params.name == "profile-children-general") return;
  router.push({
    name: "profile-children-general",
    params: { id: route.params.id },
  });
};

// hooks
onBeforeMount(async () => {
  if (Number(route.params.id)) {
    await authStore.getChildren(route.params.id as string);
    const success = await validate.value.$validate();
    if (!success) checkCheckEndReturn();
    else isOpenAll.value = false;
  } else {
    checkCheckEndReturn();
  }
});

onUnmounted(() => {
  authStore.children = {
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
  };
});
</script>

<template>
  <Default>
    <div class="w-full">
      <div class="max-w-screen-base mx-auto py-[60px]">
        <div class="flex items-start gap-10">
          <div class="md:w-1/4">
            <ProfileChildMenu :disabled-all="isOpenAll" />
          </div>

          <div class="md:w-3/4">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </Default>
</template>
