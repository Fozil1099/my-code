<script lang="ts" setup>
import { FormControl, Textarea } from "@com";
import { ref, onMounted, watch } from "vue";
import { store as _authStore } from "@/modules/Authorization";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";

const authStore = _authStore();
const router = useRouter();
const route = useRoute();

const { t } = useI18n();

let medication = ref(false);
let specialEquipmentNeeds = ref(false);
let allergies = ref(false);

const saveAll = async () => {
  const { medical_records } = authStore.children;

  const data = {
    medical_records,
    id: route.params.id,
  };
  await authStore.updateChildren(data);
  toast.success(t("Successfully"));
};

watch(
  () => authStore.children.medical_records?.medication,
  (val) => {
    if (val) medication.value = true;
  }
);

watch(
  () => authStore.children.medical_records?.special_equipment_needs,
  (val) => {
    if (val) specialEquipmentNeeds.value = true;
  }
);

watch(
  () => authStore.children.medical_records?.allergies,
  (val) => {
    if (val) allergies.value = true;
  }
);

onMounted(() => {
  if (!authStore.children.medical_records) {
    authStore.children.medical_records = {
      medication: "",
      special_equipment_needs: "",
      allergies: "",
    };
    return;
  }
  if (authStore.children.medical_records.medication) {
    medication.value = true;
  }
  if (authStore.children.medical_records.special_equipment_needs) {
    specialEquipmentNeeds.value = true;
  }
  if (authStore.children.medical_records.allergies) {
    allergies.value = true;
  }
});
</script>

<template>
  <div class="card p-5">
    <FormControl
      for="Medication"
      label="Medication/Treatments"
      inputClass="flex items-center gap-2 mt-5"
    >
      <input v-model="medication" type="checkbox" class="switch-classic" />
      <span class="text-sm font-normal tracking-sm">
        {{ medication ? "Have" : "No have" }}
      </span>
    </FormControl>
    <Textarea
      v-if="medication"
      v-model="authStore.children.medical_records.medication"
      for="Medication"
      inputClass="w-full"
      placeholder="Medication/Treatments"
      rows="6"
    />
    <FormControl
      for="equipment"
      label="Special equipment needs"
      inputClass="flex items-center gap-2 mt-5"
    >
      <input
        v-model="specialEquipmentNeeds"
        type="checkbox"
        class="switch-classic"
      />
      <span class="text-sm font-normal tracking-sm">
        {{ specialEquipmentNeeds ? "Have" : "No have" }}
      </span>
    </FormControl>
    <Textarea
      v-if="specialEquipmentNeeds"
      v-model="authStore.children.medical_records.special_equipment_needs"
      id="equipment"
      inputClass="w-full"
      placeholder="Special equipment needs"
      rows="6"
    />
    <FormControl
      for="allergies"
      label="Allergies"
      inputClass="flex items-center gap-2 mt-5"
    >
      <input v-model="allergies" type="checkbox" class="switch-classic" />
      <span class="text-sm font-normal tracking-sm">
        {{ allergies ? "Have" : "No have" }}
      </span>
    </FormControl>
    <Textarea
      v-if="allergies"
      v-model="authStore.children.medical_records.allergies"
      id="allergies"
      inputClass="w-full"
      placeholder="Allergies"
      rows="6"
    />
  </div>
  <div class="w-full flex items-start justify-end gap-5 mt-10">
    <div
      class="btn-outline-secondary max-w-[210px] w-full"
      @click="router.push({ name: 'profile-children' })"
    >
      Close
    </div>
    <div class="btn-primary max-w-[210px] w-full" @click="saveAll">Save</div>
  </div>
</template>
