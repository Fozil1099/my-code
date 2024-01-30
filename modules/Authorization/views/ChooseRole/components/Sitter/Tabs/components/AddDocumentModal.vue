<script lang="ts" setup>
import { Modal, Input, FileInput, modal } from "@com";
import { ref } from "vue";

interface Emit {
  (event: "saveFiles", value: Form): void;
}

interface Props {
  oldData?: {
    title: string;
    files: File[];
  };
}

interface Form {
  title: string;
  files: File[];
}

const emit = defineEmits<Emit>();
const props = defineProps<Props>();
const isValid = ref(false);
const fileInput = ref();

const form = ref<Form>({
  title: "",
  files: [],
});

const save = () => {
  const { title, files } = form.value;
  emit("saveFiles", {
    title,
    files,
  });
  modal("add-doc-modal").hide();
};

const checkValidation = () => {
  if (form.value.title.length && form.value.files.length) isValid.value = true;
  else isValid.value = false;
};

const onShowModal = () => {
  if (props.oldData) {
    form.value = JSON.parse(JSON.stringify(props.oldData));
  }
};

const removeFile = (value) => {
  form.value.files.splice(value.index, 1);
  fileInput.value.valueSetNull();
  checkValidation();
};

const hideModal = () => {
  form.value = {
    title: "",
    files: [],
  };
  fileInput.value.valueSetNull();
};
</script>

<template>
  <Modal
    id="add-doc-modal"
    title="Add document"
    size="max-w-[40rem]"
    okClass="w-full"
    cancelClass="w-full"
    ok="Add"
    cancel="Close"
    :ok-disabled="!isValid"
    @ok="save"
    @show="onShowModal"
    @hide="hideModal"
  >
    <Input
      v-model="form.title"
      id="Title"
      label="Title"
      placeholder="Title"
      type="text"
      inputClass="w-full"
      @input="checkValidation"
    />
    <FileInput
      ref="fileInput"
      v-model="form.files"
      :multiple="true"
      id="Documents"
      label="Documents"
      @input="checkValidation"
      @remove="removeFile"
    />
  </Modal>
</template>
