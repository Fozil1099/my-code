<script lang="ts" setup>
import { navigation } from "@/utils/constants";
import { Input } from "@com";
</script>

<template>
  <div class="footer w-full">
    <div
      class="max-w-screen-base flex items-start justify-between mx-auto py-20"
    >
      <div class="w-full justify-between items-start inline-flex">
        <div class="flex-col justify-start items-start gap-10 inline-flex">
          <div class="cursor-pointer" @click="$router.push('/')">
            <img src="@/assets/images/Logo.svg" alt="" />
          </div>
          <div class="flex-col justify-start items-start gap-2 flex">
            <div
              class="text-secondary-900 text-sm font-normal tracking-[0.21px]"
            >
              Download the app by clicking the link below :
            </div>
            <div class="justify-start items-start gap-4 inline-flex">
              <div class="cursor-pointer">
                <img src="@/assets/images/social/app-store.svg" alt="" />
              </div>
              <div class="cursor-pointer">
                <img src="@/assets/images/social/google-play.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex-col justify-start items-start gap-5 inline-flex">
          <div class="text-neutral-900 text-xl font-bold tracking-[0.3px]">
            Pages
          </div>
          <div class="flex-col justify-center items-start gap-4 flex">
            <RouterLink
              v-for="item in navigation"
              :to="{ name: item.route }"
              class="text-dark text-base font-normal leading-[20px] tracking-sm hover:text-primary cursor-pointer"
            >
              {{ item.title }}
            </RouterLink>
          </div>
        </div>
        <div class="flex-col justify-start items-start gap-5 inline-flex">
          <div class="text-neutral-900 text-xl font-bold tracking-[0.3px]">
            Contacts
          </div>
          <div class="flex-col justify-center items-start gap-4 flex">
            <div class="justify-start items-center gap-2 inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M9.03132 4.42982L9.57217 5.39892C10.0603 6.27349 9.86432 7.42078 9.09559 8.18951C9.09559 8.18951 9.09559 8.18951 9.09559 8.18951C9.09549 8.18961 8.16323 9.12205 9.85376 10.8126C11.5437 12.5026 12.4762 11.5714 12.4768 11.5708C12.4769 11.5707 12.4768 11.5707 12.4769 11.5707C13.2456 10.802 14.3929 10.6061 15.2674 11.0942L16.2365 11.635C17.5571 12.372 17.7131 14.224 16.5523 15.3848C15.8548 16.0823 15.0003 16.6251 14.0558 16.6609C12.4656 16.7212 9.76523 16.3187 7.05642 13.6099C4.34761 10.9011 3.94518 8.20069 4.00546 6.61058C4.04127 5.66601 4.584 4.81154 5.2815 4.11403C6.4423 2.95324 8.29431 3.10921 9.03132 4.42982Z"
                  fill="#6354FF"
                />
              </svg>
              <div
                class="text-dark text-base font-normal leading-[20px] tracking-sm hover:text-primary cursor-pointer"
              >
                (00) 000 00 00
              </div>
            </div>
            <div class="justify-start items-center gap-2 inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.3103 4.30932C2.33398 5.28563 2.33398 6.85698 2.33398 9.99967C2.33398 13.1424 2.33398 14.7137 3.3103 15.69C4.28661 16.6663 5.85795 16.6663 9.00065 16.6663H12.334C15.4767 16.6663 17.048 16.6663 18.0243 15.69C19.0007 14.7137 19.0007 13.1424 19.0007 9.99967C19.0007 6.85698 19.0007 5.28563 18.0243 4.30932C17.048 3.33301 15.4767 3.33301 12.334 3.33301H9.00065C5.85795 3.33301 4.28661 3.33301 3.3103 4.30932ZM16.1475 6.26623C16.3684 6.5314 16.3326 6.9255 16.0674 7.14648L14.237 8.67181C13.4984 9.28736 12.8997 9.78627 12.3713 10.1261C11.8209 10.4801 11.2849 10.7037 10.6673 10.7037C10.0498 10.7037 9.51371 10.4801 8.9633 10.1261C8.43491 9.78628 7.83624 9.28737 7.09761 8.67182L5.2672 7.14648C5.00203 6.9255 4.9662 6.5314 5.18718 6.26623C5.40816 6.00105 5.80226 5.96522 6.06743 6.1862L7.86651 7.68544C8.64398 8.33332 9.18376 8.78169 9.63947 9.07478C10.0806 9.3585 10.3798 9.45374 10.6673 9.45374C10.9549 9.45374 11.254 9.3585 11.6952 9.07478C12.1509 8.78169 12.6907 8.33332 13.4681 7.68543L15.2672 6.1862C15.5324 5.96522 15.9265 6.00105 16.1475 6.26623Z"
                  fill="#6354FF"
                />
              </svg>
              <div
                class="text-dark text-base font-normal leading-[20px] tracking-sm hover:text-primary cursor-pointer"
              >
                unknownProject@gmail.com
              </div>
            </div>
            <div class="justify-start items-start gap-2 inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.6667 1.66699C6.98477 1.66699 4 5.00248 4 8.75033C4 12.4688 6.12777 16.5107 9.44756 18.0624C10.2215 18.4241 11.1119 18.4241 11.8858 18.0624C15.2056 16.5107 17.3333 12.4688 17.3333 8.75033C17.3333 5.00248 14.3486 1.66699 10.6667 1.66699ZM10.6667 10.0003C11.5871 10.0003 12.3333 9.25413 12.3333 8.33366C12.3333 7.41318 11.5871 6.66699 10.6667 6.66699C9.74619 6.66699 9 7.41318 9 8.33366C9 9.25413 9.74619 10.0003 10.6667 10.0003Z"
                  fill="#6354FF"
                />
              </svg>
              <div
                class="text-dark text-base font-normal leading-[20px] tracking-sm hover:text-primary cursor-pointer"
              >
                2972 Westheimer Rd. Santa Ana, <br />Illinois 85486
              </div>
            </div>
          </div>
        </div>
        <div class="flex-col justify-start items-start gap-[73px] inline-flex">
          <div class="flex-col justify-start items-start gap-5 flex">
            <div class="justify-center items-center gap-2.5 inline-flex">
              <div class="text-neutral-900 text-xl font-bold tracking-[0.3px]">
                Social media
              </div>
            </div>
            <div class="justify-start items-start gap-5 inline-flex">
              <div class="cursor-pointer">
                <img src="@/assets/images/social/telegram.svg" alt="" />
              </div>
              <div class="cursor-pointer">
                <img src="@/assets/images/social/facebook.svg" alt="" />
              </div>
              <div class="cursor-pointer">
                <img src="@/assets/images/social/instagram.svg" alt="" />
              </div>
              <div class="cursor-pointer">
                <img src="@/assets/images/social/pinterest.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex-col justify-start items-start flex">
            <div class="justify-center items-center gap-2.5 inline-flex">
              <div class="text-neutral-900 text-xl font-bold tracking-[0.3px]">
                Subscribe to the newsletter
              </div>
            </div>
            <div class="justify-start items-start gap-2 inline-flex">
              <Input
                id="mail"
                placeholder="Mail"
                type="email"
                icon="Letter"
                inputClass="w-full py-4"
                iconClass="py-4"
              />
              <button class="btn-primary mt-[18px]">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
