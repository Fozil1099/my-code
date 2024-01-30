<script lang="ts" setup>
const comments = [
  {
    id: 2,
    message: "Hello, how are you?",
    time: "12:00 PM",
    author: {
      id: 2,
      name: "John",
      photo: "https://avatars.githubusercontent.com/u/1234567",
    },
  },
  {
    id: 3,
    message: "Please indicate what time your son usually goes to bed?",
    time: "12:00 PM",
    author: {
      id: 2,
      name: "John",
      photo: "https://avatars.githubusercontent.com/u/1234567",
    },
  },
  {
    id: 2,
    message: "Hello, i’m fine!",
    time: "12:00 PM",
    author: {
      id: 1,
      name: "John",
      photo: "https://avatars.githubusercontent.com/u/1234567",
    },
  },
  {
    id: 2,
    message: "Hello! No later than 9 PM.",
    time: "12:00 PM",
    author: {
      id: 1,
      name: "John",
      photo: null,
    },
  },
];
</script>

<template>
  <div class="card p-5">
    <div class="flex items-center justify-center gap-2">
      <div class="w-full">
        <div class="line-to-right"></div>
      </div>
      <span class="text-muted w-auto text-nowrap">Today, January 2023</span>
      <div class="w-full">
        <div class="line-to-left"></div>
      </div>
    </div>

    <div
      class="h-[500px] overflow-y-auto overflow-x-hidden custom-vertical-scrollbar mt-4"
    >
      <div class="flex flex-col space-y-3 mt-10">
        <div
          v-for="(item, index) in comments"
          class="flex items-start gap-3"
          :class="
            item.author.id == 1 ? 'self-end flex-row-reverse' : 'self-start'
          "
        >
          <template v-if="comments[index - 1]?.author?.id != item.author.id">
            <div
              v-if="item.author.photo"
              class="h-[52px] bg-primary flex items-center overflow-hidden justify-center rounded-lg w-[52px] cursor-pointer"
            >
              <img
                :src="item.author.photo || ''"
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
          <div v-else class="w-[52px] h-[52px]"></div>
          <div class="grid gap-3">
            <div
              v-if="comments[index - 1]?.author?.id != item.author.id"
              class="flex gap-3"
              :class="item.author.id == 1 && 'flex-row-reverse'"
            >
              <h3 class="text-base font-medium tracking-sm text-dark">
                {{ item.author.name }}
              </h3>
              <span class="text-muted">{{ item.time }}</span>
            </div>
            <div
              class="py-3 px-5 border-[1px] border-light-200 shadow-base rounded-xl"
              :class="
                item.author.id == 1
                  ? 'rounded-tr-none  bg-primary text-white'
                  : 'rounded-tl-none  bg-light-100'
              "
            >
              <p
                v-html="item.message.replace(/\n/g, '<br />')"
                class="font-normal text-base tracking-sm"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="px-5 py-[14px] w-full card bg-light-900">
      <div class="flex items-center justify-between gap-6">
        <div class="flex items-center gap-6 w-full">
          <Icon icon="Smile Circle" color="#6354FF" size="28" />
          <div class="h-[40px] w-0.5 bg-primary rounded-[30px]"></div>
          <input
            type="text"
            class="w-full bg-transparent focus:outline-none placeholder:text-muted"
            placeholder="Comment"
          />
        </div>
        <button class="btn-primary-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18.6357 15.6701L20.3521 10.5208C21.8516 6.02242 22.6013 3.77322 21.414 2.58595C20.2268 1.39869 17.9776 2.14842 13.4792 3.64788L8.32987 5.36432C4.69923 6.57453 2.88392 7.17964 2.36806 8.06698C1.87731 8.91112 1.87731 9.95369 2.36806 10.7978C2.88392 11.6852 4.69923 12.2903 8.32987 13.5005C8.77981 13.6505 9.28601 13.5434 9.62294 13.2096L15.1286 7.75495C15.4383 7.44808 15.9382 7.45041 16.245 7.76015C16.5519 8.06989 16.5496 8.56975 16.2398 8.87662L10.8231 14.2432C10.4518 14.6111 10.3342 15.1742 10.4995 15.6701C11.7097 19.3007 12.3148 21.1161 13.2022 21.6319C14.0463 22.1227 15.0889 22.1227 15.933 21.6319C16.8204 21.1161 17.4255 19.3008 18.6357 15.6701Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.line-to-left {
  height: 1px;
  align-self: stretch;
  border-radius: 30px;
  background: linear-gradient(
    270deg,
    rgba(163, 165, 187, 0) 0%,
    #a3a5bb 100%
  ) !important;
}

.line-to-right {
  height: 1px;
  align-self: stretch;
  border-radius: 30px;
  background: linear-gradient(
    270deg,
    #a3a5bb 0%,
    rgba(163, 165, 187, 0) 100%
  ) !important;
}
</style>
