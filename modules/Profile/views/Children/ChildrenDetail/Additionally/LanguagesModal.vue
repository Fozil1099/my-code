<script lang="ts" setup>
import { CustomSelect, Modal, modal } from "@com";
import _store from "@/modules/Authorization/store";
import { ref } from "vue";
import { Language } from "@/modules/Authorization/store/types";

const store = _store();
let selectedLangs = ref<Language[]>([]);
const cmSelect = ref();

const saveSkills = async () => {
  store.children.language = selectedLangs.value;
  modal("add-lang").hide();
};

const onShowModal = () => {
  cmSelect.value.clear();
  selectedLangs.value = JSON.parse(JSON.stringify(store.children.language));
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
      :test="(el) => el.id"
      label="name"
    />
  </Modal>
</template>
