<script lang="ts" setup>
import Statistics from "./components/Statistics";
import MainCard from "./components/MainCard";
import { Location } from "@/components";
import { ConfirmPhoneModal, ConfirmMailModal } from "./components/Confirmation";
import ChangePasswordModal from "./components/ChangePasswordModal";
</script>

<template>
  <Statistics />
  <div class="grid grid-cols-2 mt-10 gap-5">
    <div>
      <MainCard />
      <div class="grid grid-cols-2 gap-3 mt-3">
        <div
          class="card flex items-start justify-between p-5 cursor-pointer"
          v-modal="'confirm-phone-input'"
        >
          <div class="flex items-center gap-3">
            <div class="bg-primary rounded-lg p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.0516 2H11.9484C10.2682 1.99999 8.93732 1.99997 7.89575 2.14245C6.82382 2.28908 5.95621 2.59803 5.27199 3.29418C4.58778 3.99033 4.28413 4.87308 4.14001 5.9637C3.99997 7.02343 3.99999 8.37751 4 10.087V13.9129C3.99999 15.6225 3.99997 16.9766 4.14001 18.0363C4.28413 19.1269 4.58778 20.0097 5.27199 20.7058C5.95621 21.402 6.82382 21.7109 7.89575 21.8575C8.93731 22 10.2682 22 11.9484 22H12.0516C13.7318 22 15.0627 22 16.1043 21.8575C17.1762 21.7109 18.0438 21.402 18.728 20.7058C19.4122 20.0097 19.7159 19.1269 19.86 18.0363C20 16.9766 20 15.6225 20 13.913V10.0871C20 8.37754 20 7.02343 19.86 5.9637C19.7159 4.87308 19.4122 3.99033 18.728 3.29418C18.0438 2.59803 17.1762 2.28908 16.1043 2.14245C15.0627 1.99997 13.7318 1.99999 12.0516 2ZM8.57143 18.5116C8.57143 18.1263 8.87843 17.814 9.25714 17.814H14.7429C15.1216 17.814 15.4286 18.1263 15.4286 18.5116C15.4286 18.8969 15.1216 19.2093 14.7429 19.2093H9.25714C8.87843 19.2093 8.57143 18.8969 8.57143 18.5116Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <h4 class="text-normal-medium mb-1">Notifications</h4>
              <div class="flex items-center gap-1.5">
                <span class="text-warning text-sm tracking-sm font-normal">
                  Not verified
                </span>
              </div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              d="M8.16406 4.16675L13.1641 10.0001L8.16406 15.8334"
              stroke="#1D1D21"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div
          v-modal="'confirm-mail-input'"
          class="card flex items-start justify-between p-5 cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <div class="bg-primary rounded-lg p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H14C17.7712 20 19.6569 20 20.8284 18.8284C22 17.6569 22 15.7712 22 12C22 8.22876 22 6.34315 20.8284 5.17157C19.6569 4 17.7712 4 14 4H10C6.22876 4 4.34315 4 3.17157 5.17157ZM18.5762 7.51986C18.8413 7.83807 18.7983 8.31099 18.4801 8.57617L16.2837 10.4066C15.3973 11.1452 14.6789 11.7439 14.0448 12.1517C13.3843 12.5765 12.7411 12.8449 12 12.8449C11.2589 12.8449 10.6157 12.5765 9.95518 12.1517C9.32112 11.7439 8.60271 11.1452 7.71636 10.4066L5.51986 8.57617C5.20165 8.31099 5.15866 7.83807 5.42383 7.51986C5.68901 7.20165 6.16193 7.15866 6.48014 7.42383L8.63903 9.22291C9.57199 10.0004 10.2197 10.5384 10.7666 10.8901C11.2959 11.2306 11.6549 11.3449 12 11.3449C12.3451 11.3449 12.7041 11.2306 13.2334 10.8901C13.7803 10.5384 14.428 10.0004 15.361 9.22291L17.5199 7.42383C17.8381 7.15866 18.311 7.20165 18.5762 7.51986Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <h4 class="text-normal-medium mb-1">Email</h4>
              <div class="flex items-center gap-1.5">
                <span class="text-warning text-sm tracking-sm font-normal">
                  Not verified
                </span>
              </div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              d="M8.16406 4.16675L13.1641 10.0001L8.16406 15.8334"
              stroke="#1D1D21"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <div
        class="card flex items-start justify-between p-5 mt-3 cursor-pointer"
        v-modal="'change-password'"
      >
        <div class="flex items-center gap-3">
          <div class="bg-primary rounded-lg p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.0516 2H11.9484C10.2682 1.99999 8.93732 1.99997 7.89575 2.14245C6.82382 2.28908 5.95621 2.59803 5.27199 3.29418C4.58778 3.99033 4.28413 4.87308 4.14001 5.9637C3.99997 7.02343 3.99999 8.37751 4 10.087V13.9129C3.99999 15.6225 3.99997 16.9766 4.14001 18.0363C4.28413 19.1269 4.58778 20.0097 5.27199 20.7058C5.95621 21.402 6.82382 21.7109 7.89575 21.8575C8.93731 22 10.2682 22 11.9484 22H12.0516C13.7318 22 15.0627 22 16.1043 21.8575C17.1762 21.7109 18.0438 21.402 18.728 20.7058C19.4122 20.0097 19.7159 19.1269 19.86 18.0363C20 16.9766 20 15.6225 20 13.913V10.0871C20 8.37754 20 7.02343 19.86 5.9637C19.7159 4.87308 19.4122 3.99033 18.728 3.29418C18.0438 2.59803 17.1762 2.28908 16.1043 2.14245C15.0627 1.99997 13.7318 1.99999 12.0516 2ZM8.57143 18.5116C8.57143 18.1263 8.87843 17.814 9.25714 17.814H14.7429C15.1216 17.814 15.4286 18.1263 15.4286 18.5116C15.4286 18.8969 15.1216 19.2093 14.7429 19.2093H9.25714C8.87843 19.2093 8.57143 18.8969 8.57143 18.5116Z"
                fill="white"
              />
            </svg>
          </div>
          <div>
            <h4 class="text-normal-medium mb-1">Password</h4>
            <div class="flex items-center gap-1.5">
              <span class="text-normal"> •••••••••• </span>
            </div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
        >
          <path
            d="M8.16406 4.16675L13.1641 10.0001L8.16406 15.8334"
            stroke="#1D1D21"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div class="card p-5">
      <h2 class="mb-3 title">Location</h2>
      <span class="text-normal">19 Berkeley Street, W1J 8ED</span>
      <div class="h-[calc(100%-80px)] mt-3">
        <Location />
      </div>
    </div>
  </div>

  <ConfirmPhoneModal />
  <ConfirmMailModal />
  <ChangePasswordModal />
</template>
