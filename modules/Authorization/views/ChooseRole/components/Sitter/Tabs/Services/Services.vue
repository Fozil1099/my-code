<script lang="ts" setup>
import { Modal, modal } from "@/components";
import ServiceModal from "./ServiceModal.vue";
import _store from "@/modules/Authorization/store";
import { onMounted, ref, nextTick } from "vue";
import { useI18n } from "vue-i18n";

const store = _store();
let serviceId = ref<number | null>(null);
let serviceForDelete = ref<number | null>(null);
const { t } = useI18n();

const openEditModal = (id: number) => {
  serviceId.value = id;
  nextTick(() => {
    modal("add-serve").show();
  });
};

const deleteService = async () => {
  if (!serviceForDelete.value) return;
  await store.deleteTeacherService(serviceForDelete.value);
  modal("delete-service").hide();
  store.getTeacherServiceList({ page: 1, isLazy: true, page_size: 10 });
};

onMounted(() => {
  store.getTeacherServiceList({ page: 1, isLazy: true, page_size: 10 });
});
</script>

<template>
  <div class="w-full">
    <div
      v-if="store.teacherServiceList.results.length"
      class="grid md:grid-cols-2 gap-5 my-10 max-h-[45vh] overflow-auto custom-vertical-scrollbar"
    >
      <LazyScroll
        :otherParams="{
          page_size: 30,
          isLazy: true,
        }"
        :storeFetch="store.getTeacherServiceList"
        :storeList="store.teacherServiceList"
      >
        <div
          v-for="item in store.teacherServiceList.results"
          class="flex w-full shadow-base bg-white border-[0.1px] border-light-200 rounded-xl overflow-hidden cursor-pointer"
          @click="openEditModal(item.id)"
        >
          <div
            class="h-full w-[180px] flex items-center justify-center bg-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.1967 5.1967C3 7.3934 3 10.9289 3 18C3 25.0711 3 28.6066 5.1967 30.8033C7.3934 33 10.9289 33 18 33C25.0711 33 28.6066 33 30.8033 30.8033C33 28.6066 33 25.0711 33 18C33 10.9289 33 7.3934 30.8033 5.1967C28.6066 3 25.0711 3 18 3C10.9289 3 7.3934 3 5.1967 5.1967ZM22.5 18C23.3284 18 24 16.9926 24 15.75C24 14.5074 23.3284 13.5 22.5 13.5C21.6716 13.5 21 14.5074 21 15.75C21 16.9926 21.6716 18 22.5 18ZM15 15.75C15 16.9926 14.3284 18 13.5 18C12.6716 18 12 16.9926 12 15.75C12 14.5074 12.6716 13.5 13.5 13.5C14.3284 13.5 15 14.5074 15 15.75ZM12.5962 23.3301C12.9662 22.8309 13.6708 22.7262 14.1699 23.0962C15.2624 23.906 16.5812 24.375 18 24.375C19.4188 24.375 20.7376 23.906 21.8301 23.0962C22.3292 22.7262 23.0338 22.8309 23.4038 23.3301C23.7738 23.8292 23.6691 24.5338 23.1699 24.9038C21.7113 25.985 19.9275 26.625 18 26.625C16.0725 26.625 14.2887 25.985 12.8301 24.9038C12.3309 24.5338 12.2262 23.8292 12.5962 23.3301Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="p-4 w-full">
            <div class="flex justify-between items-center mb-2">
              <h1
                class="text-dark text-xl leading-sm font-medium max-w-[190px] overflow-hidden overflow-ellipsis text-nowrap"
              >
                {{ item.service_type?.name }}
              </h1>
              <div class="flex items-center gap-3">
                <div
                  v-modal="'delete-service'"
                  class="cursor-pointer"
                  @click.stop="serviceForDelete = item.id"
                >
                  <Icon icon="Trash Bin Trash" color="#FF3737" />
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M7.5 4.16699L12.5 10.0003L7.5 15.8337"
                    stroke="#1D1D21"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <span
              v-if="item.info.children"
              class="text-secondary-900 text-base font-normal leading-sm"
            >
              {{ item.info.children }} children
            </span>
            <h6
              v-if="item.info.price"
              class="text-secondary-900 text-base font-normal leading-sm mt-1.5"
            >
              {{ item.info.price }} $
            </h6>
          </div>
        </div>
      </LazyScroll>
    </div>
    <button
      v-modal="'add-serve'"
      class="btn-outline-primary w-full"
      @click="serviceId = null"
    >
      Add service
    </button>

    <ServiceModal :service-id="serviceId" />
    <Modal
      id="delete-service"
      :title="t('Confirm')"
      okClass="btn-danger w-full"
      cancelClass="w-full"
      @ok="deleteService"
    >
      <h2 class="text-xl">{{ t("Are you sure") }}</h2>
    </Modal>
  </div>
</template>
