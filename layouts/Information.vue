<template>
  <section class="flex flex-col md:flex-row h-screen">
    <div
      class="bg-indigo-600 hidden xl:block w-full xl:w-auto h-screen relative"
    >
      <div class="fixed top-16 left-24 text-white text-[36px] font-bold">
        unknownProject
      </div>
      <img
        src="@/assets/images/information-bg.svg"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>
    <div class="xl:w-[calc(100%-514px)] w-full overflow-auto bg-white">
      <div class="max-w-screen-lg mx-auto px-3">
        <slot />
      </div>
    </div>
  </section>
</template>
