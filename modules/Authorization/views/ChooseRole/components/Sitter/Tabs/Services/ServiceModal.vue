<script lang="ts" setup>
import { Modal, FormControl, Textarea, modal, LazySelect, Input } from "@com";
import { helpers, required } from "@vuelidate/validators";
import _store from "@/modules/Authorization/store";
import useVuelidate, { Validation } from "@vuelidate/core";
import { reactive, watch, Ref, ref } from "vue";
import { ServiceType } from "@/modules/Authorization/store/types";
import { computed } from "vue";

interface Props {
  serviceId?: number | null;
}

interface Form {
  id?: number;
  service_type: ServiceType | null;
  description: string;
  service_cost: {
    amount: number | null;
    price: number | null;
  }[];
}

const store = _store();
const props = defineProps<Props>();

let isValid = ref(true);
const form = reactive<Form>({
  service_type: null,
  description: "",
  service_cost: [
    {
      amount: null,
      price: null,
    },
  ],
});

const rules = computed(() => {
  return {
    service_type: {
      required: required,
    },
    description: {
      required: required,
    },
    service_cost: {
      $each: helpers.forEach({
        amount: { required },
        price: { required },
      }),
    },
  };
});

const validate: Ref<Validation> = useVuelidate(rules, form);

// functions
let timer = ref();
const checkValidation = () => {
  clearTimeout(timer.value);
  timer.value = setTimeout(async () => {
    const success = await validate.value.$validate();
    if (!success) {
      isValid.value = true;
    } else {
      isValid.value = false;
    }
    return success;
  }, 300);
};

const savaService = async () => {
  const success = await validate.value.$validate();
  if (!success) return;
  const { id, service_type, ...rest } = form;
  if (id) {
    await store.updateTeacherService({
      id,
      service_type: service_type?.id,
      ...rest,
    });
  } else {
    await store.createTeacherService({
      service_type: service_type?.id,
      ...rest,
    });
  }

  modal("add-serve").hide();
  store.getTeacherServiceList({ page: 1, isLazy: true, page_size: 10 });
};

const onHideModal = () => {
  form.id = undefined;
  form.service_type = null;
  form.description = "";
  form.service_cost = [
    {
      amount: null,
      price: null,
    },
  ];
};

const onShowModal = async () => {
  if (!props.serviceId) return;
  const { data } = await store.getTeacherService(props.serviceId);
  console.log(data);

  Object.assign(form, data);
};

const addServiceCost = () => {
  form.service_cost.push({
    amount: null,
    price: null,
  });
  checkValidation();
};

const removePrice = (index: number) => {
  form.service_cost.splice(index, 1);
  checkValidation();
};

// hooks
watch(() => form.service_type, checkValidation);
</script>

<template>
  <Modal
    id="add-serve"
    :title="form.id ? 'Add service' : 'Add service'"
    size="max-w-[36rem]"
    okClass="w-full"
    cancelClass="w-full"
    :ok="form.id ? 'Save' : 'Add'"
    cancel="Close"
    :ok-disabled="isValid"
    @ok="savaService"
    @hide="onHideModal"
    @show="onShowModal"
  >
    <FormControl for="Service" label="Service">
      <LazySelect
        v-model="form.service_type"
        id="Service"
        :options="store.serviceTypeList"
        placeholder="Not selected"
        :fetch="store.getServiceTypeList"
        :getOptionLabel="(el) => el.name"
        clearable
      ></LazySelect>
    </FormControl>
    <Textarea
      v-model="form.description"
      id="Job description"
      inputClass="w-full"
      label="Job description"
      placeholder="Job description"
      rows="6"
      @input="checkValidation"
    />
    <div
      v-for="(_, index) in form.service_cost"
      class="grid grid-cols-2 gap-2 relative"
    >
      <Input
        v-model="form.service_cost[index].amount"
        id="Amount"
        label="Amount"
        placeholder="Amount"
        type="number"
        inputClass="w-full"
        @input="checkValidation"
      />
      <Input
        v-model="form.service_cost[index].price"
        id="Price per hour"
        label="Price per hour"
        placeholder="Price per hour"
        type="number"
        inputClass="w-full"
        @input="checkValidation"
      />
      <div
        class="absolute top-[50%] right-2 cursor-pointer"
        @click="removePrice(index)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6.50155 6.502L17.5 17.4991M17.5 6.50195L6.50159 17.4991"
            stroke="#5C5F7C"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
    <div class="pt-2.5">
      <button class="btn-outline-primary w-full" @click="addServiceCost">
        Add cost
      </button>
    </div>
  </Modal>
</template>
