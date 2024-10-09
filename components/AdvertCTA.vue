<template>
  <section class="tinted-image overflow-hidden bg-cover bg-top bg-no-repeat">
    <div class="bg-black/25 p-8 md:p-12 lg:px-16 lg:py-24">
      <div class="ltr:sm:text-left rtl:sm:text-right flex justify-center items-center flex-col">
        <h2 class="text-sm font-bold text-white text-center">
          ABOUT OUR PROCESS
        </h2>
        <h2 class="text-2xl font-bold text-white sm:text-3xl md:text-5xl text-center">
          Easy Access
        </h2>

        <p class="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed text-center">
          We take advantage of algorithms and smart assistants to identify business relationships automated.We add
          diversification to your investment portfolio by investing in our products with ease and transparency.
        </p>

        <div class="mt-4 sm:mt-8 flex items-center gap-x-5">
          <NuxtLink to="/plans"
            class="inline-block text-xs  rounded-full bg-indigo-600 px-10 py-3 lg:text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400">
            Choose A Plan
          </NuxtLink>
          <NuxtLink to="/signup"
            class="inline-block text-xs  rounded-full bg-indigo-600 px-10 py-3 lg:text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400">
            Sign Up
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>