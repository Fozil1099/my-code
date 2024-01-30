<script lang="ts" setup></script>

<template>
  <div class="card p-5">
    <div class="title">About service</div>
    <div class="grid md:grid-cols-2 gap-5 mt-8">
      <div
        v-for="item in 2"
        class="flex w-full shadow-base bg-white border-[0.1px] border-light-200 rounded-xl overflow-hidden"
      >
        <img
          class="h-full max-w-[180px] max-h-[125px] object-cover"
          src="@/assets/images/static/nina.png"
          alt=""
        />
        <div class="p-4 w-full">
          <div class="flex justify-between items-center mb-2">
            <h1
              class="text-dark text-xl leading-sm font-medium max-w-[190px] overflow-hidden overflow-ellipsis"
            >
              Koralova Nina
            </h1>
            <div class="flex items-center gap-4">
              <Icon
                icon="Pen New Square"
                color="#FFB82F"
                class="cursor-pointer"
              />
              <Icon
                v-modal="'delete-child'"
                icon="Trash Bin Trash"
                color="#FF3737"
                class="cursor-pointer"
              />
            </div>
          </div>
          <span class="text-secondary-900 text-base font-normal leading-sm"
            >Female</span
          >
          <div class="mt-2 flex justify-between items-center">
            <span class="text-base font-normal leading-sm">7 years</span>
            <span class="text-primary text-base font-normal leading-sm"
              >Have a schedule</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
