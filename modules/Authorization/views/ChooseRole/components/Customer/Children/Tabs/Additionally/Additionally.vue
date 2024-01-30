<script lang="ts" setup>
import { FormControl, Textarea } from "@com";
import _store from "@/modules/Authorization/store";
import { onMounted } from "vue";
import LanguagesModal from "./LanguagesModal.vue";

const store = _store();

onMounted(() => {
  if (!store.children.additionally) store.children.additionally = { hobby: "" };
});
</script>

<template>
  <div>
    <FormControl for="Language" label="Language">
      <div
        class="px-4 py-3 rounded-lg gap-2 mt-2 border-[0.1px] text-[16px] leading-5 w-full cursor-pointer border-light-200 focus:border-light-400 focus:bg-light-900 focus:outline-none bg-light-100 flex items-center justify-between"
        v-modal="'add-lang'"
      >
        <div v-if="store.children.language.length">
          {{ store.children.language.length }} selected
        </div>
        <div v-else class="text-secondary-400 leading-5 text-[16px]">
          Not selected
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5 9L12 15L19 9"
            stroke="#5C5F7C"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="flex items-center justify-start flex-wrap gap-3 gap-y-3 mt-2">
        <div
          v-for="item in store.children.language"
          class="flex items-center justify-between gap-2 px-3 py-1.5 border-[0.1px] border-light-200 shadow-base rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.99351 2.66722C7.79057 2.84016 7.68909 2.92664 7.58072 2.99927C7.3323 3.16578 7.05331 3.28134 6.75992 3.33926C6.63193 3.36453 6.49903 3.37514 6.23324 3.39635C5.56542 3.44964 5.23151 3.47628 4.95293 3.57468C4.30859 3.80227 3.80178 4.30908 3.57419 4.95341C3.4758 5.23199 3.44915 5.5659 3.39586 6.23373C3.37465 6.49952 3.36404 6.63242 3.33877 6.76041C3.28085 7.0538 3.16529 7.33279 2.99879 7.58121C2.92615 7.68958 2.83968 7.79105 2.66673 7.994C2.2322 8.50389 2.01492 8.75885 1.88752 9.02541C1.59283 9.64195 1.59283 10.3587 1.88752 10.9752C2.01493 11.2418 2.23219 11.4968 2.66673 12.0067C2.83966 12.2096 2.92615 12.3111 2.99879 12.4194C3.16529 12.6679 3.28085 12.9468 3.33877 13.2402C3.36404 13.3682 3.37465 13.5011 3.39586 13.7669C3.44915 14.4347 3.4758 14.7687 3.57419 15.0472C3.80178 15.6916 4.30859 16.1984 4.95293 16.426C5.23151 16.5244 5.56542 16.551 6.23324 16.6043C6.49903 16.6255 6.63193 16.6361 6.75992 16.6614C7.05331 16.7193 7.3323 16.8349 7.58072 17.0014C7.68909 17.074 7.79056 17.1605 7.99351 17.3334C8.50341 17.768 8.75836 17.9852 9.02493 18.1126C9.64146 18.4073 10.3582 18.4073 10.9747 18.1126C11.2413 17.9852 11.4963 17.768 12.0062 17.3334C12.2091 17.1605 12.3106 17.074 12.419 17.0014C12.6674 16.8349 12.9464 16.7193 13.2398 16.6614C13.3677 16.6361 13.5006 16.6255 13.7664 16.6043C14.4343 16.551 14.7682 16.5244 15.0467 16.426C15.6911 16.1984 16.1979 15.6916 16.4255 15.0472C16.5239 14.7687 16.5505 14.4347 16.6038 13.7669C16.625 13.5011 16.6356 13.3682 16.6609 13.2402C16.7188 12.9468 16.8344 12.6679 17.0009 12.4194C17.0735 12.3111 17.16 12.2096 17.3329 12.0067C17.7675 11.4968 17.9847 11.2418 18.1122 10.9752C18.4068 10.3587 18.4068 9.64195 18.1122 9.02541C17.9847 8.75885 17.7675 8.5039 17.3329 7.994C17.16 7.79105 17.0735 7.68958 17.0009 7.58121C16.8344 7.33279 16.7188 7.0538 16.6609 6.76041C16.6356 6.63242 16.625 6.49952 16.6038 6.23373C16.5505 5.5659 16.5239 5.23199 16.4255 4.95341C16.1979 4.30908 15.6911 3.80227 15.0467 3.57468C14.7682 3.47628 14.4343 3.44964 13.7664 3.39635C13.5006 3.37514 13.3677 3.36453 13.2398 3.33926C12.9464 3.28134 12.6674 3.16578 12.419 2.99927C12.3106 2.92664 12.2091 2.84017 12.0062 2.66722C11.4963 2.23268 11.2413 2.01541 10.9747 1.88801C10.3582 1.59332 9.64146 1.59332 9.02493 1.88801C8.75836 2.01541 8.5034 2.23269 7.99351 2.66722ZM13.6444 8.2196C13.9093 7.95474 13.9093 7.52532 13.6444 7.26046C13.3795 6.9956 12.9501 6.9956 12.6853 7.26046L8.64339 11.3023L7.31439 9.97333C7.04953 9.70847 6.6201 9.70847 6.35524 9.97333C6.09038 10.2382 6.09038 10.6676 6.35524 10.9325L8.16382 12.741C8.42868 13.0059 8.8581 13.0059 9.12296 12.741L13.6444 8.2196Z"
              fill="#6354FF"
            />
          </svg>
          {{ item.name }}
        </div>
      </div>
    </FormControl>
    <Textarea
      v-if="store.children.additionally"
      v-model="store.children.additionally.hobby"
      id="Hobby"
      inputClass="w-full"
      label="Hobby"
      placeholder="Hobby"
      rows="6"
    />
  </div>
  <LanguagesModal />
</template>
