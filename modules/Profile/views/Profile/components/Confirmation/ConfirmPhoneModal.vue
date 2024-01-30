<script lang="ts" setup>
import { Modal, FormControl, Input, modal } from "@com";
import { ref, reactive } from "vue";
import { SuccessfullyModal } from ".";

let isSendCode = ref(false);
let form = reactive({
  code: [""],
});

// functions

const onInputCode = (value: string | number | null, positionIndex: number) => {
  if (value && RegExp(/\D/g).test(String(value))) return;
  document
    .getElementById(
      `code-${String(value).length ? positionIndex + 1 : positionIndex - 1}`
    )
    ?.focus();
};

const confirm = () => {
  modal("confirm-phone-input").hide();
  modal("successfully").show();
};
</script>

<template>
  <Modal id="confirm-phone-input" size="max-w-[560px]" footer-hidden>
    <div class="w-full text-center">
      <h3 class="text-[28px] font-bold leading-8 tracking-[0.42px]">
        Сonfirm the phone number
      </h3>
      <template v-if="!isSendCode">
        <div class="flex items-center justify-center py-6">
          <img src="@/assets/images/modal/phone-hand.png" alt="" />
        </div>
        <span class="text-normal">
          Enter your phone number to get a confirmation code.
        </span>
      </template>
      <template v-else>
        <div class="mt-6">
          The code was sent to the number
          <span class="text-primary">+998 97 702 20 62</span>
        </div>

        <div class="flex items-center justify-center py-6 gap-2">
          <Input
            v-for="item in 5"
            mask="#"
            v-model="form.code[item]"
            :id="`code-${item}`"
            placeholder="*"
            inputClass="w-16 h-16 text-center text-3xl font-semibold placeholder:text-xl"
            @input="onInputCode($event, item)"
            @keyup.backspace="
              form.code[item].length ? '' : onInputCode('', item)
            "
          />
        </div>
        <div>
          The code didn't come? <span class="text-primary">Send again</span>
        </div>
      </template>
    </div>
    <template #footer>
      <div class="p-5">
        <div v-if="!isSendCode" class="w-full flex items-center gap-3">
          <div class="w-2/3">
            <Input
              label="Phone number"
              icon="Smartphone"
              inputClass="w-full py-4"
              iconClass="py-4"
              placeholder="+998"
            />
          </div>
          <button class="btn-primary w-1/3 mt-6" @click="isSendCode = true">
            Send
          </button>
        </div>

        <div v-else class="flex items-center gap-2">
          <button
            class="btn-outline-secondary w-full"
            @click="isSendCode = false"
          >
            Back
          </button>
          <button class="btn-primary w-full" @click="confirm">Confirm</button>
        </div>
      </div>
    </template>
  </Modal>
  <SuccessfullyModal />
</template>
