<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
</script>

<template>
  <div
    class="card p-5"
    @click="
      router.push({
        name: 'specialists-detail-work',
        params: {
          id: route.params.id,
          workId: '1',
        },
      })
    "
  >
    <div class="title mb-8">Work</div>
    <div class="grid md:grid-cols-2 gap-5">
      <div
        v-for="_ in 6"
        class="flex w-full shadow-base bg-white border-[0.1px] border-light-200 rounded-xl overflow-hidden cursor-pointer"
      >
        <div
          class="h-full w-[180px] flex items-center justify-center bg-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="32"
            viewBox="0 0 30 32"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.0003 3.125C13.5325 3.125 12.2809 4.06254 11.817 5.3749C11.61 5.96071 10.9673 6.26775 10.3814 6.06069C9.79564 5.85364 9.4886 5.2109 9.69565 4.6251C10.4673 2.44188 12.5494 0.875 15.0003 0.875C17.4512 0.875 19.5333 2.44188 20.3049 4.6251C20.512 5.2109 20.2049 5.85364 19.6191 6.06069C19.0333 6.26775 18.3906 5.96071 18.1835 5.3749C17.7197 4.06254 16.468 3.125 15.0003 3.125Z"
              fill="white"
            />
            <path
              d="M18 17.75H12C11.5858 17.75 11.25 18.0858 11.25 18.5V21.7422C11.25 22.0489 11.4367 22.3247 11.7215 22.4386L12.7717 22.8587C14.2021 23.4308 15.7979 23.4308 17.2283 22.8587L18.2785 22.4386C18.5633 22.3247 18.75 22.0489 18.75 21.7422V18.5C18.75 18.0858 18.4142 17.75 18 17.75Z"
              fill="white"
            />
            <path
              d="M9.01614 22.0537L1.50879 19.8015C1.55393 24.4732 1.82684 28.7757 3.47687 30.2424C5.4539 31.9998 8.63588 31.9998 14.9998 31.9998C21.3638 31.9998 24.5458 31.9998 26.5228 30.2424C28.1728 28.7757 28.4458 24.4733 28.4909 19.8015L20.9839 22.0536C20.8695 23.1527 20.1558 24.111 19.1142 24.5277L18.064 24.9477C16.0971 25.7345 13.9029 25.7345 11.936 24.9477L10.8858 24.5277C9.8442 24.111 9.13053 23.1528 9.01614 22.0537Z"
              fill="white"
            />
            <path
              d="M8.41339 6.5H21.5866C25.2618 6.5 27.0995 6.5 28.3401 7.50947C28.5786 7.70349 28.7965 7.92144 28.9905 8.15989C30 9.40055 30 11.2382 30 14.9134C30 15.846 30 16.3123 29.7738 16.676C29.7298 16.7469 29.6799 16.8139 29.6247 16.8765C29.3413 17.1976 28.8946 17.3316 28.0014 17.5996L21 19.7V18.5C21 16.8431 19.6569 15.5 18 15.5H12C10.3431 15.5 9 16.8431 9 18.5V19.7L1.99861 17.5996C1.10535 17.3316 0.658726 17.1976 0.375319 16.8765C0.320112 16.8139 0.270221 16.7469 0.226165 16.676C0 16.3123 0 15.846 0 14.9134C0 11.2382 0 9.40055 1.00947 8.15989C1.20349 7.92144 1.42144 7.70349 1.65989 7.50947C2.90055 6.5 4.73816 6.5 8.41339 6.5Z"
              fill="white"
            />
          </svg>
        </div>
        <div class="p-4 w-full">
          <div class="flex justify-between items-center mb-2">
            <h1
              class="text-dark text-xl leading-sm font-medium max-w-[190px] overflow-hidden overflow-ellipsis text-nowrap"
            >
              Baby teacher
            </h1>
            <div class="flex items-center gap-3">
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
            >ZK Company
          </span>
          <h6
            class="text-secondary-900 text-base font-normal leading-sm mt-1.5"
          >
            01.01.2022 - 01.01.2023
            <!-- {{ formatDate(item.start_date) }} -
              {{ item.until_now ? "Present" : formatDate(item.end_date) }} -->
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>
