<script lang="ts" setup>
import { Input, FormControl } from "@com";
import AddDocumentModal from "../../components/AddDocumentModal.vue";
import { useRoute, useRouter } from "vue-router";
import _store from "@/modules/Authorization/store";
import { onMounted, reactive, computed, Ref, ref } from "vue";
import { formatDate } from "@/utils/features";
import { openFile } from "@/utils/files";
import { helpers, required } from "@vuelidate/validators";
import useVuelidate, { Validation } from "@vuelidate/core";
import { getFileName, objectToFormData } from "@/utils/formmatter";
import { Attachments } from "@/modules/Authorization/store/types";

interface CustomFile {
  file_id: number;
  name: string;
}

interface Form {
  id?: number | null;
  post: string;
  organization: string;
  start_date: string;
  end_date: string;
  until_now?: boolean;
  files?: File[] | CustomFile[];
  attachment_title?: string;
  content_type?: string;
}

// variables
const router = useRouter();
const route = useRoute();
const store = _store();

const form = reactive<Form>({
  post: "",
  organization: "",
  start_date: "",
  end_date: "",
  until_now: false,
  attachment_title: "",
  files: [],
});
const attachment = reactive<Attachments>({
  id: null,
  content_type: null,
  object_id: null,
  deleted_files: [],
});

let oldData = ref({
  title: "",
  files: [],
});

const rules = computed(() => {
  return {
    post: {
      required: helpers.withMessage("Field is required", required),
    },
    organization: {
      required: helpers.withMessage("Field is required", required),
    },
    start_date: {
      required: helpers.withMessage("Field is required", required),
    },
  };
});

const validate: Ref<Validation> = useVuelidate(rules, form);

// functions
const toBack = () => {
  router.push({ name: "fill-information-teacher" });
};

const saveFiles = async (value: { title: string; files: File[] }) => {
  if (!form.id) {
    form.files = value.files;
    form.attachment_title = value.title;
  } else {
    const { id, object_id, content_type } = attachment;
    if (id) {
      await store.updateTeacherAttachment(
        objectToFormData({
          id,
          object_id,
          content_type,
          title: value.title,
          files: value.files,
          deleted_files: [],
        })
      );
    } else {
      await store.createTeacherAttachment(
        objectToFormData({
          object_id,
          content_type,
          title: value.title,
          files: value.files,
          deleted_files: [],
        })
      );
    }
    refresh();
  }
};

const saveForm = async () => {
  const success = await validate.value.$validate();
  if (!success) return;
  if (!form.id) {
    const { until_now, end_date, ...rest } = form;
    await store.createTeacherWork(
      objectToFormData({
        until_now: end_date?.length ? until_now : true,
        end_date,
        ...rest,
      })
    );
  } else {
    const { post, organization, end_date, start_date, until_now, id } = form;
    await store.updateTeacherWork(
      objectToFormData({
        id,
        post,
        organization,
        end_date,
        start_date,
        until_now: end_date?.length ? until_now : true,
      })
    );
  }
  toBack();
};

const removeFile = async (file) => {
  if (file.file_id) {
    await store.updateTeacherAttachment({
      id: attachment.id,
      object_id: attachment.object_id,
      content_type: attachment.content_type,
      deleted_files: [file.file_id],
    });
    refresh();
  }
};

const refresh = async () => {
  const {
    data: {
      post,
      organization,
      start_date,
      end_date,
      until_now,
      content_type,
      attachments,
    },
  } = await store.getTeacherWork(route.params.id);
  Object.assign(form, {
    id: route.params.id,
    post,
    organization,
    start_date,
    end_date,
    until_now,
    attachment_title: attachments && attachments[0]?.title,
    files:
      (attachments &&
        attachments[0]?.files.map(({ id, file }) => ({
          file_id: id,
          name: file,
        }))) ||
      [],
  });

  attachment.id = attachments && attachments[0]?.id;
  attachment.object_id = Number(route.params.id);
  attachment.content_type = content_type;
};

onMounted(async () => {
  if (route.params.id) {
    refresh();
  }
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col justify-between py-6 overflow-x-hidden sm:overflow-x-visible"
  >
    <div>
      <h1 class="text-dark text-4xl font-bold">Add work</h1>

      <div class="grid md:grid-cols-2 gap-x-5 mt-[60px]">
        <Input
          v-model="form.post"
          id="post"
          label="Post"
          placeholder="Post"
          input-class="w-full"
          :required="validate.post.$errors"
        />
        <Input
          v-model="form.organization"
          id="Organization"
          label="Organization"
          placeholder="Organization"
          input-class="w-full"
          :required="validate.organization.$errors"
        />
        <FormControl
          for="getting-started"
          label="Getting started"
          :required="validate.start_date.$errors"
        >
          <DatePicker
            v-model="form.start_date"
            id="getting-started"
            :autoApply="true"
            format="dd.MM.yyyy"
            placeholder="DD.MM.YY."
            :enableTimePicker="false"
            :locale="'en'"
            @update:model-value="
              form.start_date = formatDate(form.start_date, true)
            "
          ></DatePicker>
        </FormControl>
        <FormControl for="Ending" label="Ending" v-if="!form.until_now">
          <DatePicker
            v-model="form.end_date"
            id="Ending"
            :autoApply="true"
            format="dd.MM.yyyy"
            placeholder="DD.MM.YY."
            :enableTimePicker="false"
            :locale="'en'"
            @update:model-value="
              form.end_date = formatDate(form.end_date, true);
              form.until_now = false;
            "
          ></DatePicker>
        </FormControl>
      </div>
      <div v-if="!form.end_date" class="flex items-center gap-2 mt-5">
        <input
          v-model="form.until_now"
          type="checkbox"
          class="switch-classic"
          @input="
            ($event) => {
              if ($event) form.end_date = '';
            }
          "
        />
        <span class="text-sm font-normal tracking-sm"> Until now </span>
      </div>
      <div
        class="text-secondary-900 text-[14px] font-normal tracking-[0.21px] mb-2 mt-5"
      >
        Documents
      </div>
      <div v-if="form.files?.length" class="grid gap-x-5 gap-y-3">
        <div class="card p-4">
          <div class="flex items-center justify-between">
            <h2
              v-if="typeof form.attachment_title == 'string'"
              class="text-dark font-medium text-base tracking-sm"
            >
              {{ form.attachment_title }}
            </h2>
            <div class="flex justify-end items-center gap-3">
              <div
                v-modal="'add-doc-modal'"
                class="cursor-pointer"
                @click="oldData.title = form.attachment_title || ''"
              >
                <Icon icon="Pen New Square" color="#FFB82F" size="24" />
              </div>
            </div>
          </div>
          <div
            v-for="item in form.files"
            class="flex justify-between items-center mt-3"
          >
            <span class="rounded-lg bg-primary px-3 py-2 text-white">
              {{ getFileName(typeof item == "string" ? item : item.name) }}
            </span>
            <div class="flex justify-end items-center gap-3">
              <div
                class="cursor-pointer"
                @click="openFile(typeof item == 'string' ? item : item.name)"
              >
                <Icon icon="Eye" size="24" color="#6354FF" />
              </div>
              <div class="cursor-pointer" @click="removeFile(item)">
                <Icon icon="Trash Bin Trash" size="24" color="#ea5455" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        v-if="!form.files?.length"
        v-modal="'add-doc-modal'"
        class="w-full btn-outline-primary mt-7"
        @click="oldData.title = ''"
      >
        Add document
      </button>
    </div>

    <div class="grid md:grid-cols-2 gap-5 mt-[100px] w-full">
      <button class="btn-outline-secondary" @click="toBack()">Back</button>
      <button class="btn-primary" @click="saveForm">Add</button>
    </div>

    <AddDocumentModal @saveFiles="saveFiles" :old-data="oldData" />
  </div>
</template>
