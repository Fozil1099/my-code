<script lang="ts" setup>
import { reactive } from "vue";
import _store from "../../store";
import { useRouter } from "vue-router";

interface FormData {
  role_unique_name?: "teacher" | "customer";
}

const router = useRouter();
const store = _store();
const formData = reactive<FormData>({
  role_unique_name: undefined,
});

const saveData = async () => {
  if (!formData.role_unique_name) return;
  await store.updateCurrentUser(formData);

  router.push(`/choose-role/${formData.role_unique_name}`);
};
</script>

<template>
  <div>
    <h1
      class="text-[36px] font-bold leading-tight mt-12 tracking-[0.54px] text-center"
    >
      Choose role
    </h1>
    <div
      class="text-gray-500 text-base font-normal leading-tight tracking-tight mt-3 text-center"
    >
      Choose one of the roles to move on
    </div>

    <form class="mt-10 mb-4" @submit.prevent="saveData()">
      <div
        class="w-full pl-2.5 pr-8 py-2.5 rounded-2xl shadow border border-zinc-200 justify-between items-center inline-flex cursor-pointer"
        :class="
          formData.role_unique_name === 'customer' ? 'bg-primary' : 'bg-white'
        "
        @click="formData.role_unique_name = 'customer'"
      >
        <img src="@/assets/images/roles/customer.svg" />
        <div class="self-stretch justify-end items-center gap-1 inline-flex">
          <div
            class="text-right text-dark text-3xl font-semibold leading-loose tracking-[0.42px]"
            :class="
              formData.role_unique_name === 'customer'
                ? 'text-white'
                : 'text-dark'
            "
          >
            Сustomer
          </div>
        </div>
      </div>
      <div
        class="w-full pl-2.5 pr-8 py-2.5 rounded-2xl shadow border border-zinc-200 justify-between items-center inline-flex cursor-pointer mt-4"
        :class="
          formData.role_unique_name === 'teacher' ? 'bg-primary' : 'bg-white'
        "
        @click="formData.role_unique_name = 'teacher'"
      >
        <img src="@/assets/images/roles/teacher.svg" />
        <div class="self-stretch justify-end items-center gap-1 inline-flex">
          <div
            class="text-right text-3xl font-semibold leading-loose tracking-[0.42px]"
            :class="
              formData.role_unique_name === 'teacher'
                ? 'text-white'
                : 'text-dark'
            "
          >
            Teacher
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="btn-primary w-full mt-10"
        :disabled="!formData.role_unique_name"
      >
        Next
      </button>
    </form>
  </div>
</template>
