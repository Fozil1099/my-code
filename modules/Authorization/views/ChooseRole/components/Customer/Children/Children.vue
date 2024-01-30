<script lang="ts" setup>
import { onMounted, ref } from "vue";
import _store from "@/modules/Authorization/store";
import { Modal, modal } from "@com";
import { useI18n } from "vue-i18n";

// variables
const store = _store();
const { t } = useI18n();

const studentIdForDelete = ref<number>();

// functions
const deleteChildren = async () => {
  if (!studentIdForDelete.value) return;
  await store.deleteChildren(studentIdForDelete.value);
  store.getChildrenList({ isLazy: true, page: 1 });
  modal("delete-child").hide();
};

onMounted(() => {
  store.getChildrenList({ isLazy: true, page: 1 });
});
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between py-6">
    <div>
      <h1 class="text-dark text-4xl font-bold">Customer</h1>
      <div class="mt-[60px] flex-col justify-start items-start gap-8 flex">
        <div class="w-full">
          <div
            class="grid md:grid-cols-2 gap-5 my-10 max-h-[55vh] overflow-auto custom-vertical-scrollbar"
          >
            <LazyScroll
              :otherParams="{
                page_size: 30,
                isLazy: true,
              }"
              :storeFetch="store.getChildrenList"
              :storeList="store.childrenList"
            >
              <div
                v-for="item in store.childrenList.results"
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
                          $router.push({
                            name: 'fill-information-customer-edit-child',
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
                    <span class="text-base font-normal leading-sm"
                      >7 years</span
                    >
                    <span class="text-primary text-base font-normal leading-sm"
                      >Have a schedule</span
                    >
                  </div>
                </div>
              </div>
            </LazyScroll>
          </div>
          <button
            class="btn-outline-primary w-full"
            @click="
              $router.push({ name: 'fill-information-customer-new-child' })
            "
          >
            Add child
          </button>
        </div>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-5 mt-[100px] w-full">
      <div></div>
      <button class="btn-primary" @click="$router.push('/')">Next</button>
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
