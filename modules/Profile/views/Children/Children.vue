<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { store as _authStore } from "@/modules/Authorization";
import { Modal, modal } from "@com";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

// variables
const authStore = _authStore();
const { t } = useI18n();
const router = useRouter();

const studentIdForDelete = ref<number>();

// functions
const deleteChildren = async () => {
  if (!studentIdForDelete.value) return;
  await authStore.deleteChildren(studentIdForDelete.value);
  authStore.getChildrenList({ isLazy: true, page: 1 });
  modal("delete-child").hide();
};

onMounted(() => {
  authStore.getChildrenList({ isLazy: true, page: 1 });
});
</script>

<template>
  <div>
    <div class="flex-col justify-start items-start gap-8 flex">
      <div class="w-full">
        <div
          class="grid md:grid-cols-2 gap-5 max-h-[55vh] overflow-auto custom-vertical-scrollbar"
        >
          <LazyScroll
            :otherParams="{
              page_size: 30,
              isLazy: true,
            }"
            :storeFetch="authStore.getChildrenList"
            :storeList="authStore.childrenList"
          >
            <div
              v-for="item in authStore.childrenList.results"
              class="flex w-full shadow-base bg-white border-[0.1px] border-light-200 rounded-xl overflow-hidden"
            >
              <img
                class="h-full max-w-[180px] max-h-[125px] object-cover"
                :src="item.image || ''"
                alt=""
              />
              <div class="p-4 w-full">
                <div class="flex justify-between items-center mb-2">
                  <h1
                    class="text-dark text-xl leading-sm font-medium max-w-[190px] overflow-hidden overflow-ellipsis"
                  >
                    {{ item.full_name }}
                  </h1>
                  <div class="flex items-center gap-4">
                    <Icon
                      icon="Pen New Square"
                      color="#FFB82F"
                      class="cursor-pointer"
                      @click="
                        router.push({
                          name: 'profile-children-general',
                          params: { id: item.id },
                        })
                      "
                    />
                    <Icon
                      v-modal="'delete-child'"
                      icon="Trash Bin Trash"
                      color="#FF3737"
                      class="cursor-pointer"
                      @click="studentIdForDelete = item.id"
                    />
                  </div>
                </div>
                <span
                  class="text-secondary-900 text-base font-normal leading-sm"
                  >{{ item.gender }}</span
                >
                <div class="mt-2 flex justify-between items-center">
                  <span class="text-base font-normal leading-sm">7 years</span>
                  <span class="text-primary text-base font-normal leading-sm"
                    >Have a schedule</span
                  >
                </div>
              </div>
            </div>

            <div
              class="rounded-xl border-2 border-dashed border-primary cursor-pointer flex items-center justify-center max-h-[125px] p-6"
              @click="
                router.push({
                  name: 'profile-children-general',
                  params: { id: 'new' },
                })
              "
            >
              <div class="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                >
                  <circle
                    cx="22.0013"
                    cy="21.9993"
                    r="18.3333"
                    stroke="#A495FF"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M16.5 29.334C18.059 30.4896 19.955 31.1673 22 31.1673C24.045 31.1673 25.941 30.4896 27.5 29.334"
                    stroke="#A495FF"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M29.3346 19.25C29.3346 20.7688 28.5138 22 27.5013 22C26.4888 22 25.668 20.7688 25.668 19.25C25.668 17.7312 26.4888 16.5 27.5013 16.5C28.5138 16.5 29.3346 17.7312 29.3346 19.25Z"
                    fill="#A495FF"
                  />
                  <ellipse
                    cx="16.5013"
                    cy="19.25"
                    rx="1.83333"
                    ry="2.75"
                    fill="#A495FF"
                  />
                </svg>
                <h6 class="mt-1 text-primary font-medium text-base tracking-sm">
                  Add children
                </h6>
              </div>
            </div>
          </LazyScroll>
        </div>
      </div>
    </div>

    <Modal
      id="delete-child"
      :title="t('Confirm')"
      @ok="deleteChildren"
      okClass="btn-danger w-full"
      cancelClass="w-full"
    >
      <h2 class="text-xl">{{ t("Are you sure") }}</h2>
    </Modal>
  </div>
</template>
