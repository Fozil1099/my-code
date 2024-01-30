<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div>
    <div class="card p-4 select-none">
      <img
        src="@/assets/images/static/teacher.png"
        alt=""
        class="w-full object-cover cursor-pointer rounded-2xl"
      />
      <div class="pt-4 flex flex-col justify-between gap-10">
        <div class="inline-flex flex-col gap-2">
          <div class="w-full flex items-start gap-1.5">
            <div class="py-2">
              <div class="rounded-full w-3 h-3 bg-success"></div>
            </div>
            <h2 class="text-xl text-dark font-medium">
              Veronica Belova, 18 y.
            </h2>
          </div>
          <span class="text-base font-normal text-secondary-900">
            22.01.2024 - 31.01.2024
          </span>
          <div class="flex gap-4">
            <div class="flex items-center gap-1">
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
                  d="M9.9974 18.3327C14.5998 18.3327 18.3307 14.6017 18.3307 9.99935C18.3307 5.39698 14.5998 1.66602 9.9974 1.66602C5.39502 1.66602 1.66406 5.39698 1.66406 9.99935C1.66406 14.6017 5.39502 18.3327 9.9974 18.3327ZM6.99529 12.9605C7.20084 12.6832 7.59227 12.625 7.86957 12.8306C8.47652 13.2805 9.20915 13.541 9.9974 13.541C10.7856 13.541 11.5183 13.2805 12.1252 12.8306C12.4025 12.625 12.794 12.6832 12.9995 12.9605C13.205 13.2378 13.1469 13.6292 12.8696 13.8348C12.0592 14.4354 11.0682 14.791 9.9974 14.791C8.92659 14.791 7.93556 14.4354 7.12522 13.8348C6.84791 13.6292 6.78974 13.2378 6.99529 12.9605ZM13.3307 8.74935C13.3307 9.4397 12.9576 9.99935 12.4974 9.99935C12.0372 9.99935 11.6641 9.4397 11.6641 8.74935C11.6641 8.05899 12.0372 7.49935 12.4974 7.49935C12.9576 7.49935 13.3307 8.05899 13.3307 8.74935ZM7.4974 9.99935C7.95763 9.99935 8.33073 9.4397 8.33073 8.74935C8.33073 8.05899 7.95763 7.49935 7.4974 7.49935C7.03716 7.49935 6.66406 8.05899 6.66406 8.74935C6.66406 9.4397 7.03716 9.99935 7.4974 9.99935Z"
                  fill="#6354FF"
                />
              </svg>
              <span class="text-base font-normal">2 children</span>
            </div>
            <div class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M7.91667 1.66602C7.22631 1.66602 6.66667 2.22566 6.66667 2.91602V3.74935C6.66667 4.4397 7.22631 4.99935 7.91667 4.99935H12.0833C12.7737 4.99935 13.3333 4.4397 13.3333 3.74935V2.91602C13.3333 2.22566 12.7737 1.66602 12.0833 1.66602H7.91667Z"
                  fill="#6354FF"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.41667 3.3632C4.36841 3.42201 3.70665 3.58905 3.23223 4.06347C2.5 4.7957 2.5 5.97421 2.5 8.33123V13.3312C2.5 15.6883 2.5 16.8668 3.23223 17.599C3.96447 18.3312 5.14298 18.3312 7.5 18.3312H12.5C14.857 18.3312 16.0355 18.3312 16.7678 17.599C17.5 16.8668 17.5 15.6883 17.5 13.3312V8.33123C17.5 5.97421 17.5 4.7957 16.7678 4.06347C16.2933 3.58905 15.6316 3.42201 14.5833 3.3632V3.74935C14.5833 5.13006 13.464 6.24935 12.0833 6.24935H7.91667C6.53595 6.24935 5.41667 5.13006 5.41667 3.74935V3.3632ZM12.9265 10.4563C13.1788 10.2207 13.1924 9.82525 12.9569 9.5729C12.7214 9.32056 12.3259 9.30692 12.0736 9.54244L8.92857 12.4778L7.92645 11.5424C7.67411 11.3069 7.27861 11.3206 7.04309 11.5729C6.80757 11.8252 6.82121 12.2207 7.07355 12.4563L8.50212 13.7896C8.74225 14.0137 9.11489 14.0137 9.35502 13.7896L12.9265 10.4563Z"
                  fill="#6354FF"
                />
              </svg>

              <span class="text-base font-normal">Have tasks</span>
            </div>
          </div>
        </div>
        <div class="grid gap-3">
          <div class="grid grid-cols-2 gap-3">
            <button class="btn-outline-secondary">Cancel</button>
            <button class="btn-primary">Complete</button>
          </div>
          <button
            class="btn-outline-primary w-full"
            @click="
              router.push({ name: 'specialists-detail', params: { id: 1 } })
            "
          >
            Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
