<script lang="ts" setup>
import { isUserLoggedIn, logout } from "@/auth/jwtService";
import { store as _authStore } from "@/modules/Authorization";
import { navigation } from "@/utils/constants";
import { DropDown, Locale } from "@com";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// variables
const route = useRoute();
const authStore = _authStore();
const router = useRouter();

onMounted(() => {
  if (isUserLoggedIn() && !authStore.currentUser.id) authStore.getCurrentUser();
});
</script>

<template>
  <nav class="navbar fixed bg-white w-full z-20 top-0 start-0">
    <div
      class="max-w-screen-base flex flex-wrap items-center justify-between mx-auto py-6"
    >
      <a class="flex items-center space-x-3 rtl:space-x-reverse">
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white cursor-pointer"
          @click="$router.push('/')"
        >
          <img src="@/assets/images/Logo.svg" alt="" />
        </span>
      </a>
      <div
        class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-10"
      >
        <div class="flex items-center md:gap-6 gap-3">
          <Locale
            class="gap-[8px] px-[16px] py-[14px] relative rounded-[8px]"
          />
          <div class="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M25.6667 13.9997C25.6667 15.5318 25.3649 17.0488 24.7786 18.4643C24.1923 19.8798 23.333 21.1659 22.2496 22.2493C21.1663 23.3326 19.8801 24.192 18.4647 24.7783C17.0492 25.3646 15.5321 25.6663 14 25.6663C12.468 25.6663 10.9509 25.3646 9.5354 24.7783C8.11994 24.192 6.83381 23.3326 5.75046 22.2493C4.66711 21.1659 3.80775 19.8798 3.22145 18.4643C2.63514 17.0488 2.33337 15.5318 2.33337 13.9997C2.33337 12.4676 2.63514 10.9505 3.22145 9.53503C3.80775 8.11957 4.66711 6.83344 5.75046 5.75009C6.83381 4.66674 8.11994 3.80738 9.5354 3.22108C10.9509 2.63477 12.468 2.33301 14 2.33301C15.5321 2.33301 17.0492 2.63478 18.4647 3.22108C19.8801 3.80739 21.1663 4.66675 22.2496 5.7501C23.333 6.83345 24.1923 8.11957 24.7786 9.53504C25.3649 10.9505 25.6667 12.4676 25.6667 13.9997L25.6667 13.9997Z"
                stroke="#5C5F7C"
                stroke-width="1.75"
              />
              <path
                d="M18.6667 13.9997C18.6667 15.5318 18.546 17.0488 18.3115 18.4643C18.077 19.8798 17.7332 21.1659 17.2999 22.2493C16.8665 23.3326 16.3521 24.192 15.7859 24.7783C15.2197 25.3646 14.6129 25.6663 14 25.6663C13.3872 25.6663 12.7804 25.3646 12.2142 24.7783C11.648 24.192 11.1335 23.3326 10.7002 22.2493C10.2669 21.1659 9.92312 19.8798 9.6886 18.4643C9.45408 17.0488 9.33337 15.5318 9.33337 13.9997C9.33337 12.4676 9.45408 10.9505 9.6886 9.53503C9.92313 8.11957 10.2669 6.83344 10.7002 5.75009C11.1335 4.66674 11.648 3.80738 12.2142 3.22108C12.7804 2.63477 13.3872 2.33301 14 2.33301C14.6129 2.33301 15.2197 2.63478 15.7859 3.22108C16.3521 3.80739 16.8665 4.66675 17.2999 5.7501C17.7332 6.83345 18.077 8.11957 18.3115 9.53504C18.546 10.9505 18.6667 12.4676 18.6667 13.9997L18.6667 13.9997Z"
                stroke="#5C5F7C"
                stroke-width="1.75"
              />
              <path
                d="M2.33337 14H25.6667"
                stroke="#5C5F7C"
                stroke-width="1.75"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
        <DropDown v-if="isUserLoggedIn()" class="right-0">
          <template #button>
            <div
              v-if="authStore.currentUser.profile.image"
              class="h-[52px] bg-primary flex items-center overflow-hidden justify-center rounded-lg w-[52px] cursor-pointer"
            >
              <img
                :src="authStore.currentUser.profile.image || ''"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
            <div
              v-else
              class="h-full bg-primary flex items-center justify-center p-[14px] rounded-lg cursor-pointer"
            >
              <Icon icon="User Rounded" color="#fff" size="24" />
            </div>
          </template>

          <div
            class="mt-2.5 rounded-xl px-4 bg-white border-[0.05px] border-[#ABB7C3] shadow-base min-w-[250px]"
          >
            <div
              class="flex items-center py-4 gap-2 cursor-pointer"
              @click="router.push({ name: 'profile' })"
            >
              <Icon icon="User Rounded" color="#7367f0" size="20" />
              <span class="text-base tracking-sm font-normal">Profile</span>
            </div>
            <div class="flex items-center py-4 gap-2 cursor-pointer">
              <Icon icon="Settings" color="#7367f0" size="20" />
              <span class="text-base tracking-sm font-normal">Profile</span>
            </div>
            <div class="flex items-center py-4 gap-2 cursor-pointer">
              <Icon icon="Bell Bing" color="#7367f0" size="20" />
              <span class="text-base tracking-sm font-normal">Profile</span>
            </div>
            <div
              class="flex items-center py-4 gap-2 cursor-pointer"
              @click="logout(true)"
            >
              <Icon icon="Upload" color="#FF3737" size="20" class="rotate-90" />
              <span class="text-base tracking-sm font-normal text-danger"
                >Log out</span
              >
            </div>
          </div>
        </DropDown>
        <div v-else class="flex items-center justify-center gap-3">
          <button class="btn-primary-hover" @click="$router.push('/login')">
            Log in
          </button>
          <button class="btn-primary" @click="$router.push('/register')">
            Sign up
          </button>
        </div>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-semibold border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
        >
          <li v-for="item in navigation">
            <RouterLink
              :to="{ name: item.route }"
              class="block text-xl font-normal tracking-[0.3px] hover:text-primary text-dark"
              :class="item.route === route.name && 'text-primary'"
            >
              {{ item.title }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
