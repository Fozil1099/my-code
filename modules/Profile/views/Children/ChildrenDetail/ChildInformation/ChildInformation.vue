<script lang="ts" setup>
import { FormControl, ImageInput, Input, Textarea } from "@com";
import { store as _authStore } from "@/modules/Authorization";
import { formatDate } from "@/utils/features";
import { useI18n } from "vue-i18n";
import useVuelidate, { Validation } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { Ref, computed, inject } from "vue";
import { objectToFormData } from "@/utils/formmatter";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const authStore = _authStore();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const openAllMenus = inject("openAllMenus", () => {});

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
// functions

const getImage = (image) => {
  if (!image) return "";
  return typeof image == "string" ? null : image;
};

const saveAll = async () => {
  const success = await validate.value.$validate();
  if (!success) return;
  const { image, full_name, birth_date, gender, description } =
    authStore.children;

  const data = objectToFormData({
    image: getImage(image),
    full_name,
    birth_date,
    gender,
    description,
    id: Number(route.params.id) || null,
  });
  if (data.get("id")) {
    await authStore.updateChildren(data);
    toast.success(t("Successfully"));
  } else {
    const {
      data: { id },
    } = await authStore.createChildren(data);

    await router.push({ name: "profile-children-general", params: { id } });
    openAllMenus();
  }
};
</script>

<template>
  <div class="card p-5">
    <div class="md:flex gap-5">
      <ImageInput
        height="h-full"
        class="w-full md:w-2/5"
        v-model="authStore.children.image"
      />
      <div class="md:w-3/5">
        <div class="grid gap-3">
          <Input
            v-model="authStore.children.full_name"
            id="full_name"
            label="Full name"
            placeholder="Full name"
            type="text"
            inputClass="w-full"
            :required="validate.full_name.$errors"
          />
          <div class="grid grid-cols-2 gap-5">
            <FormControl
              for="Birth date"
              label="Birth date"
              :required="validate.birth_date.$errors"
            >
              <DatePicker
                v-model="authStore.children.birth_date"
                id="Birth date"
                :autoApply="true"
                format="dd.MM.yyyy"
                placeholder="DD.MM.YY."
                :enableTimePicker="false"
                :locale="'en'"
                @update:model-value="
                  authStore.children.birth_date = formatDate(
                    authStore.children.birth_date,
                    true
                  )
                "
              ></DatePicker>
            </FormControl>
            <FormControl
              for="Gender"
              label="Gender"
              :required="validate.gender.$errors"
            >
              <v-select
                id="Gender"
                v-model="authStore.children.gender"
                :options="['male', 'female']"
                placeholder="Gender"
                :getOptionLabel="(el) => t(el)"
                clearable
              ></v-select>
            </FormControl>
          </div>

          <Textarea
            v-model="authStore.children.description"
            id="full_name"
            label="About child"
            placeholder="About child"
            inputClass="w-full"
            rows="6"
          />
        </div>
      </div>
    </div>
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
