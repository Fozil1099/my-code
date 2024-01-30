<script lang="ts" setup>
import TeacherMainCard from "../TeacherMainCard";
</script>

<template>
  <div class="w-full">
    <div class="max-w-screen-base mx-auto py-[60px]">
      <div class="flex items-start gap-10">
        <div class="md:w-1/4">
          <TeacherMainCard />
        </div>
        <div class="md:w-3/4">
          <div class="card p-5">
            <h4 class="title">Education details</h4>
            <div class="grid grid-cols-2 gap-5 mt-5">
              <div class="card p-5 bg-light-500">
                <h4 class="text-dark text-xl font-semibold tracking-[0.3px]">
                  About
                </h4>
                <div class="flex w-full mt-3 items-center justify-between">
                  <span class="text-muted">Institution</span>
                  <span class="text-normal"
                    >State Institute named after Nizami</span
                  >
                </div>
                <div class="flex w-full mt-3 items-center justify-between">
                  <span class="text-muted">Faculty</span>
                  <span class="text-normal"
                    >Korean language and literature</span
                  >
                </div>
                <div class="flex w-full mt-3 items-center justify-between">
                  <span class="text-muted">Getting started</span>
                  <span class="text-normal">01.09.2015.</span>
                </div>
                <div class="flex w-full mt-3 items-center justify-between">
                  <span class="text-muted">Getting started</span>
                  <span class="text-normal">30.06.2019.</span>
                </div>
              </div>
              <div class="card p-5 bg-light-500">
                <h4 class="text-dark text-xl font-semibold tracking-[0.3px]">
                  Documents
                </h4>
                <div class="card p-4 mt-3">
                  <h4 class="text-dark text-base font-medium tracking-[0.3px]">
                    Title
                  </h4>
                  <div class="flex justify-between items-center mt-3">
                    <span class="rounded-lg bg-primary px-3 py-2 text-white">
                      Document.pdf
                    </span>

                    <div class="flex justify-end items-center gap-3">
                      <Icon
                        icon="Eye"
                        class="cursor-pointer"
                        size="24"
                        color="#6354FF"
                      />
                    </div>
                  </div>
                </div>
                <div class="card p-4 mt-3">
                  <h4 class="text-dark text-base font-medium tracking-[0.3px]">
                    Title
                  </h4>
                  <div class="flex justify-between items-center mt-3">
                    <span class="rounded-lg bg-primary px-3 py-2 text-white">
                      Document.pdf
                    </span>

                    <div class="flex justify-end items-center gap-3">
                      <Icon
                        icon="Eye"
                        class="cursor-pointer"
                        size="24"
                        color="#6354FF"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
