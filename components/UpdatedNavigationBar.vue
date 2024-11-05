<template>
  <main>
    <nav class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="Your Company">
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink
                :to="item.url"
                v-for="(item, idx) in navigationItems"
                :key="idx"
                :class="[
                  'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                  isActive(item.url) ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-gray-900 hover:border-gray-300 hover:text-gray-700'
                ]"
              >
                {{ item.title }}
              </NuxtLink>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
           
            <div class="relative ml-3">
              <div>
                <button @click="isOpen = true" type="button" class="relative font-semibold bg-black flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="absolute -inset-1.5"></span>
                  <span class="sr-only">Open user menu</span>
                Login
                  <!-- <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""> -->
                </button>
              </div>
            </div>
          </div>
          <div class="-mr-2 flex items-center sm:hidden">
            <button @click="isOpen = true" type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false">
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>
              <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <CoreSideNav :isOpen="isOpen" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const isOpen = ref(false);
const navigationItems = ref([
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
  { title: 'Investment plans', url: '/plans' },
  { title: 'Contact', url: '/contact' },
  { title: 'Meet the Team', url: '/teams' }
]);

const route = useRoute();

const isActive = (url: string) => {
  return route.path === url;
};
</script>
