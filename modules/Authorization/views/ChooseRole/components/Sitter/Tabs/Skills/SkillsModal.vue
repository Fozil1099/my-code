<script lang="ts" setup>
import { CustomSelect, Modal, modal } from "@com";
import { ref } from "vue";
import _store from "@/modules/Authorization/store";

const store = _store();
let selectedSkills = ref<number[]>([]);

const onShowModal = () => {
  selectedSkills.value = store.teacherSkillsList.results.map((el) => el.id);
};

const saveSkills = async () => {
  await store.updateTeacherSkills({ skills: selectedSkills.value });
  store.getTeacherSkills({ page_size: 100 });
  modal("add-skill").hide();
};
</script>

<template>
  <Modal
    id="add-skill"
    title="Add skill"
    size="max-w-[36rem]"
    okClass="w-full"
    cancelClass="w-full"
    ok="Add"
    cancel="Close"
    @show="onShowModal"
    @ok="saveSkills"
  >
    <CustomSelect
      v-model="selectedSkills"
      :options="store.skillsList"
      :fetch="store.getSkillsList"
      :reduce="(el) => el.id"
      label="name"
    />
  </Modal>
</template>
