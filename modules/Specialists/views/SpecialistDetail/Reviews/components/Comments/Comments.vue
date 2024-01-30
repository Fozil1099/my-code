<script lang="ts" setup></script>

<template>
  <div class="card p-5 relative">
    <div class="flex gap-2 items-center">
      <div class="flex -space-x-4">
        <div
          class="inline-block w-12 h-12 border-2 border-white rounded-full hover:relative hover:z-50 hover:-translate-y-0.5 hover:shadow-lg duration-100 avatar-tooltip"
        >
          <template v-if="true">
            <img
              class="w-full h-full rounded-full object-cover"
              src="@/assets/images/static/baby.png"
            />
          </template>
          <div
            v-else
            class="w-full h-full rounded-full object-cover flex items-center justify-center bg-primary"
          >
            <Icon icon="User" color="#fff" />
          </div>
        </div>
      </div>
      <div class="">
        <h6 class="text-normal-medium">Lily Frost</h6>
        <span class="text-base font-normal text-secondary-900"
          >06.09.2023 • 10:00 AM</span
        >
      </div>
    </div>
    <div class="my-4 text-normal">
      Have experience working in a private kindergarten. A large game library
      for children 5-7 years old. Certified counselor, many years of experience
      working with children 6-9 years old.
    </div>
    <div class="flex items-center gap-2">
      <svg
        v-for="_ in 5"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.62699 4.50731C8.68253 2.61376 9.2103 1.66699 9.99935 1.66699C10.7884 1.66699 11.3162 2.61376 12.3717 4.5073L12.6448 4.99719C12.9447 5.53527 13.0947 5.80431 13.3286 5.98183C13.5624 6.15935 13.8536 6.22524 14.4361 6.35703L14.9664 6.47702C17.0161 6.94079 18.041 7.17267 18.2848 7.95677C18.5287 8.74086 17.83 9.55788 16.4326 11.1919L16.0711 11.6147C15.674 12.079 15.4755 12.3112 15.3861 12.5984C15.2968 12.8857 15.3268 13.1954 15.3869 13.815L15.4415 14.379C15.6528 16.5592 15.7584 17.6492 15.1201 18.1338C14.4817 18.6184 13.5221 18.1766 11.603 17.293L11.1064 17.0644C10.5611 16.8133 10.2884 16.6877 9.99935 16.6877C9.7103 16.6877 9.43762 16.8133 8.89225 17.0644L8.39574 17.293C6.47658 18.1766 5.517 18.6184 4.87864 18.1338C4.24028 17.6492 4.34592 16.5592 4.55718 14.379L4.61184 13.815C4.67187 13.1954 4.70189 12.8857 4.61257 12.5984C4.52325 12.3112 4.3247 12.079 3.92761 11.6147L3.5661 11.1919C2.16872 9.55788 1.47004 8.74086 1.71387 7.95677C1.9577 7.17267 2.98256 6.94079 5.0323 6.47702L5.56259 6.35703C6.14506 6.22524 6.43629 6.15935 6.67014 5.98183C6.90398 5.80431 7.05395 5.53527 7.3539 4.99719L7.62699 4.50731Z"
          fill="#FFB82F"
        />
      </svg>
    </div>
    <div class="absolute top-5 right-5 cursor-pointer">
      <Icon icon="Danger Square" size="24" color="#5C5F7C" />
    </div>
  </div>
</template>
