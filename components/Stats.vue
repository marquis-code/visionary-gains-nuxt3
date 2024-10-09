<template>
  <section class="bg-[#303435]">
    <section class="text-gray-600 body-font">
      <!-- <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="text-2xl font-medium text-white title-font mb-4">
            OUR TEAM
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-white">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.
          </p>
        </div>
        <div class="flex flex-wrap justify-center items-center -m-4">
          <div v-for="(itm, idx) in teams" :key="idx" class="p-4 lg:w-1/4 md:w-1/2">
            <div class="h-full flex flex-col items-center text-center">
              <img alt="team" class="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" :src="require(`@/assets/img/${itm.img}`)">
              <div class="w-full">
                <h2 class="title-font font-medium text-lg text-gray-900">
                  {{ itm.name }}
                </h2>
                <h3 class="text-gray-500 mb-3">
                  {{ itm.title }}
                </h3>
                <div class="flex justify-between items-center mt-6">
                  <nuxt-link :to="`/teams/${itm.profileUrl}`" class=" text-white py-2.5 bg-black px-3 rounded-md">
                    View Profile
                  </nuxt-link>
                  <a class="ml-2 text-gray-500">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </section>
    <!-- <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="text-3xl font-bold text-white sm:text-4xl">
          Trusted by eCommerce Businesses
        </h2>
      </div>

      <div class="mt-8 sm:mt-12">
        <dl class="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div v-for="{name, value} in stats" :key="name" class="flex flex-col rounded-lg bg-black px-4 py-8 text-center border border-white">
            <dt class="order-last text-lg font-medium text-white">
              {{ name }}
            </dt>

            <dd class="text-4xl font-extrabold text-white md:text-5xl">
              {{ value }}
            </dd>
          </div>
        </dl>
      </div>
    </div> -->
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const stats = ref([
  {
    name: 'Active Expert Traders',
    value: '700'
  },
  {
    name: 'Expert Financial Consultants',
    value: '556'
  },
  {
    name: 'Satisfied Clients',
    value: '11,912'
  }
  // {
  //   name: 'Reviews',
  //   value: '1000+'
  // }
]);

const teams = ref([
  {
    name: 'Breanna Marrie Riley',
    title: 'CEO',
    img: 'investment-manager-one.jpeg',
    profileUrl: 'ceo'
  },
  {
    name: 'Sonia Ann Lindsey',
    title: 'Investment Manager',
    img: 'investment-manager-two.jpeg',
    profileUrl: 'investment-manager'
  },
  {
    name: 'Adam Lehan Thomson',
    title: 'Investment Director',
    img: 'investment-director.jpeg',
    profileUrl: 'investment-director'
  }
]);
</script>

