<script lang="ts" setup>
import { CustomSelect, Modal, modal } from "@com";
import _store from "@/modules/Authorization/store";
import { ref } from "vue";

const store = _store();
let selectedLangs = ref<number[]>([]);
const cmSelect = ref();

const onShowModal = () => {
  cmSelect.value.clear();
  selectedLangs.value = store.teacherLanguageList.results.map((el) => el.id);
};

const saveSkills = async () => {
  await store.updateTeacherLanguage({ languages: selectedLangs.value });
  store.getTeacherLanguage({ page_size: 100 });
  modal("add-lang").hide();
};
</script>

<template>
  <Modal
    id="add-lang"
    title="Add language"
    size="max-w-[36rem]"
    okClass="w-full"
    cancelClass="w-full"
    ok="Add"
    cancel="Close"
    @show="onShowModal"
    @ok="saveSkills"
  >
    <CustomSelect
      ref="cmSelect"
      v-model="selectedLangs"
      :fetch="store.getLanguageList"
      :options="store.languageList"
      :reduce="(el) => el.id"
      label="name"
    />
  </Modal>
</template>
