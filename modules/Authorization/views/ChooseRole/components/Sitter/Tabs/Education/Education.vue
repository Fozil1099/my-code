<script lang="ts" setup>
import { Modal, modal } from "@com";
import _store from "@/modules/Authorization/store";
import { formatDate } from "@/utils/features";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const store = _store();
let itemForDelete = ref();
const { t } = useI18n();
const router = useRouter();

const deleteService = async () => {
  if (!itemForDelete.value) return;
  await store.deleteTeacherEducation(itemForDelete.value);
  modal("delete-edu").hide();
  store.getTeacherEducationList({ page: 1, isLazy: true, page_size: 10 });
};

onMounted(() => {
  store.getTeacherEducationList({ page: 1, isLazy: true });
});
</script>

<template>
  <div class="w-full">
    <div
      class="grid md:grid-cols-2 gap-5 my-10 max-h-[45vh] overflow-auto custom-vertical-scrollbar"
    >
      <LazyScroll
        :otherParams="{
          page_size: 30,
          isLazy: true,
        }"
        :storeFetch="store.getTeacherEducationList"
        :storeList="store.teacherEducationList"
      >
        <div
          v-for="item in store.teacherEducationList.results"
          class="flex w-full shadow-base bg-white border-[0.1px] border-light-200 rounded-xl overflow-hidden cursor-pointer"
          @click="
            router.push({
              name: `fill-information-teacher-edit-education`,
              params: {
                id: item.id,
              },
            })
          "
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
                d="M21.3255 5.24947C19.194 4.25018 16.8053 4.25017 14.6738 5.24947L8.23379 8.26868C9.40671 8.39525 10.479 9.13409 10.9768 10.2957C11.7111 12.0089 10.9174 13.993 9.2042 14.7272L7.59069 15.4188C6.78892 15.7624 6.33391 15.9609 6.02674 16.1184C6.02505 16.1429 6.02346 16.1682 6.02197 16.1943L14.6739 20.2505C16.8054 21.2498 19.1941 21.2498 21.3256 20.2505L31.3623 15.5451C33.5455 14.5216 33.5455 10.9785 31.3623 9.95496L21.3255 5.24947Z"
                fill="white"
              />
              <path
                d="M7.49971 19.3721V24.9381C7.49971 26.4502 8.25496 27.8658 9.57771 28.5984C11.7803 29.8181 15.3057 31.5 17.9997 31.5C20.6937 31.5 24.2191 29.8181 26.4217 28.5984C27.7444 27.8658 28.4997 26.4502 28.4997 24.9381V19.3722L22.2807 22.2878C19.5441 23.5707 16.4555 23.5707 13.7188 22.2878L7.49971 19.3721Z"
                fill="white"
              />
              <path
                d="M8.31816 12.6593C8.88925 12.4146 9.15379 11.7532 8.90904 11.1821C8.66429 10.611 8.00293 10.3465 7.43184 10.5913L5.76478 11.3057C4.92857 11.664 4.21992 11.9677 3.66381 12.2806C3.07207 12.6135 2.56277 13.0042 2.18128 13.5827C1.7998 14.1612 1.64132 14.7833 1.56844 15.4583C1.49995 16.0927 1.49997 16.8636 1.5 17.7734V22.1253C1.5 22.7466 2.00368 23.2503 2.625 23.2503C3.24632 23.2503 3.75 22.7466 3.75 22.1253V17.8317C3.75 16.848 3.75152 16.1992 3.80544 15.6998C3.85643 15.2276 3.94569 14.9942 4.05968 14.8213C4.17367 14.6484 4.35303 14.4745 4.767 14.2416C5.20477 13.9953 5.80049 13.7383 6.70465 13.3508L8.31816 12.6593Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="p-4 w-full">
            <div class="flex justify-between items-center mb-2">
              <h1
                class="text-dark text-xl leading-sm font-medium max-w-[190px] overflow-hidden overflow-ellipsis text-nowrap"
              >
                {{ item.educational_institution }}
              </h1>
              <div class="flex items-center gap-3">
                <div
                  v-modal="'delete-edu'"
                  class="cursor-pointer"
                  @click.stop="itemForDelete = item.id"
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
              class="text-secondary-900 text-base font-normal leading-sm text-ellipsis overflow-hidden text-nowrap"
            >
              {{ item.faculty }}
            </span>
            <h6
              class="text-secondary-900 text-base font-normal leading-sm mt-1.5"
            >
              {{ formatDate(item.start_date) }} -
              {{ item.until_now ? 'Present' : formatDate(item.end_date) }}
            </h6>
          </div>
        </div>
      </LazyScroll>
    </div>
    <button
      class="btn-outline-primary w-full"
      @click="$router.push({ name: 'fill-information-teacher-add-education' })"
    >
      Add education
    </button>
    <Modal
      id="delete-edu"
      :title="t('Confirm')"
      okClass="btn-danger w-full"
      cancelClass="w-full"
      @ok="deleteService"
    >
      <h2 class="text-xl">{{ t("Are you sure") }}</h2>
    </Modal>
  </div>
</template>
