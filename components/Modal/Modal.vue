<script lang="ts" setup>
import { onMounted } from "vue";

interface Props {
  id: string;
  title?: string;
  cancel?: string;
  ok?: string;
  okClass?: string;
  cancelClass?: string;
  okDisabled?: boolean;
  cancelDisabled?: boolean;
  cancelHidden?: boolean;
  okHidden?: boolean;
  size?: string;
  footerHidden?: boolean;
}

interface Emits {
  (event: "ok"): void;
  (event: "cancel"): void;
  (event: "show"): void;
  (event: "hide"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

onMounted(() => {
  let modal = document.getElementById(props.id) as any;

  modal.show = function () {
    emit("show");
  }.bind(modal);

  modal.hide = function () {
    emit("hide");
  }.bind(modal);
});
</script>

<template>
  <div :id="props.id" class="hide">
    <div
      class="overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full"
      style="background: rgba(0, 0, 0, 0.6)"
    >
      <div
        class="modal-container relative p-4 w-full max-h-full"
        :class="props.size || ' max-w-2xl'"
      >
        <!-- Modal content -->
        <div class="relative bg-white rounded-xl shadow-base">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between py-4 pt-4 pb-1.5 px-5 rounded-t dark:border-gray-600"
          >
            <h3 class="text-base font-semibold text-dark tracking-sm">
              {{ props.title }}
            </h3>
            <button v-modal="id" type="button" class="active:-scale-90">
              <img src="@/assets/images/modal/x-button.svg" alt="" />
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="px-4 pb-4 pt-2.5 md:px-5 space-y-1">
            <slot />
          </div>
          <!-- Modal footer -->
          <div
            v-if="!footerHidden"
            class="flex items-center justify-end p-4 md:px-5 border-gray-200 rounded-b gap-3"
          >
            <button
              v-if="!props.cancelHidden"
              v-modal="props.id"
              type="button"
              class="btn-outline-secondary"
              :class="props.cancelClass"
              :disabled="props.cancelDisabled"
              @click="emit('cancel')"
            >
              {{ props.cancel || "Cancel" }}
            </button>
            <button
              v-if="!props.okHidden"
              type="button"
              :disabled="props.okDisabled"
              class="btn-primary"
              :class="props.okClass"
              @click="emit('ok')"
            >
              {{ props.ok || "Ok" }}
            </button>
          </div>
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal-container {
  animation: openModal 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.hide {
  .modal-container {
    animation: closeModal 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
  transition: 0.2s all;
  visibility: hidden;
}

@keyframes openModal {
  0% {
    transform: scale(0.8);
    scale: 0;
  }
  100% {
    transform: scale(1);
    scale: 1;
  }
}

@keyframes closeModal {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}
</style>
