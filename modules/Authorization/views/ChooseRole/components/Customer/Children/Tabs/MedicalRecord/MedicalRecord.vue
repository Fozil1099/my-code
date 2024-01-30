<script lang="ts" setup>
import { FormControl, Textarea } from "@com";
import { ref, onMounted } from "vue";
import _store from "@/modules/Authorization/store";
// import { useI18n } from "vue-i18n";

const store = _store();
// const { t } = useI18n();

let medication = ref(false);
let specialEquipmentNeeds = ref(false);
let allergies = ref(false);

onMounted(() => {
  if (!store.children.medical_records) {
    store.children.medical_records = {
      medication: "",
      special_equipment_needs: "",
      allergies: "",
    };
    return;
  }
  if (store.children.medical_records.medication) {
    medication.value = true;
  }
  if (store.children.medical_records.special_equipment_needs) {
    specialEquipmentNeeds.value = true;
  }
  if (store.children.medical_records.allergies) {
    allergies.value = true;
  }
});
</script>

<template>
  <div>
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
      v-model="store.children.medical_records.medication"
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
      v-model="store.children.medical_records.special_equipment_needs"
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
      v-model="store.children.medical_records.allergies"
      id="allergies"
      inputClass="w-full"
      placeholder="Allergies"
      rows="6"
    />
  </div>
</template>
