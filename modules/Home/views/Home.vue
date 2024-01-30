<script lang="ts" setup>
import {CustomersList} from "../components/Customers"
import Banner from "../components/Banner.vue";
import { TeachersList } from "../components/Teachers";
import Feedback from "../components/Feedback.vue";
import Questions from "../components/Questions.vue";
</script>

<template>
  <Banner />

  <div class="w-full bg-white">
    <div class="max-w-screen-base mx-auto">
      <div
        class="py-[100px] flex-col justify-center items-center gap-2.5 inline-flex w-full"
      >
        <div class="justify-center items-center gap-20 inline-flex">
          <img
            class="max-w-[488px] max-h-[400px]"
            src="@/assets/images/parents.svg"
          />
          <div class="max-w-[512px]">
            <div class="flex-col justify-start items-start gap-4 flex">
              <div class="text-dark text-4xl font-bold tracking-[0.54px]">
                We choose reliable unknownProject
              </div>
              <div
                class="self-stretch justify-start items-center gap-1 inline-flex"
              >
                <div
                  class="grow shrink basis-0 text-secondary-900 text-base font-normal tracking-sm"
                >
                  We check the passports, phone numbers, emails and social
                  networks of each baby. We teach most baby teachers at a special
                  school. All baby teachers are personally interviewed<br />by
                  experienced psychologists. We trust our unknownProject, so all
                  children under their care are insured. We monitor the
                  fulfillment of each order by our unknownProject, monitor their
                  rating and check the reviews of parents. If a unknown
                  violates the rules of child care, then we exclude him from our
                  database.
                </div>
              </div>
            </div>
            <button class="btn-primary mt-7">Learn more</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <TeachersList />
  <CustomersList />
  <Feedback />
  <Questions />
  <div class="w-full bg-light-500 pt-[100px]">
    <div class="max-w-screen-base mx-auto relative px-[-10px]">
      <div class="w-full text-center">
        <h2 class="text-4xl leading-normal font-bold text-dark mb-4">
          Feedback from parents
        </h2>
        <span class="text-sm text-secondary-900 tracking-sm">
          We trust our unknownProject, so all children under their care are
          insured.
        </span>
      </div>
      <div class="w-full flex items-center justify-center gap-4 py-10">
        <button class="btn-primary">App Store</button>
        <button class="btn-primary">Google app</button>
      </div>
      <div class="w-full flex justify-center">
        <img src="@/assets/images/the-app.png" alt="" />
      </div>
    </div>
  </div>
</template>
