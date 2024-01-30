<script lang="ts" setup>
import { Modal, Input, FileInput } from "@com";
import { ref } from "vue";

const file = ref("https://github.com/asdas.png");
</script>

<template>
  <Modal
    id="add-doc"
    title="Add document"
    size="max-w-[40rem]"
    okClass="w-full"
    cancelClass="w-full"
    ok="Add"
    cancel="Close"
  >
    <Input
      id="Title"
      label="Title"
      placeholder="Title"
      type="text"
      inputClass="w-full"
    />
    <FileInput v-model="file" id="Documents" label="Documents" />
  </Modal>
</template>
