<template>
  <main class="flex relative bg-[#232323]">
    <div class="hidden lg:flex h-screen flex-col sticky top-0 justify-between border-e bg-[#030303] w-72">
      <div class="px-4 py-6">
        <span class="grid h-10 w-60 place-content-center rounded-lg">
          <button rel="noopener noreferrer" to="/admin/dashboard" aria-label="Back to homepage"
            class="flex items-center p-2">
            <img src="@/assets/img/logo.png" alt="logo" class="w-60">
            <!-- <h1 class="text-white font-semibold">Visionary Gains</h1> -->
          </button>
        </span>

        <ul class="mt-6 space-y-1">
          <li class="space-y-3 flex flex-col">
            <nuxt-link v-for="itm in sidebarItems" :key="itm.name" :to="itm.url"
              class="rounded-md px-4 py-2.5 space-y-2 text-sm font-light text-gray-700 flex items-center space-x-3">
              <!-- <img :src="require(`~/assets/icons/${itm.icon}.svg`)" alt="icons"> -->
              <p class="text-gray-100">
                {{ itm.name }}
              </p>
            </nuxt-link>
          </li>
        </ul>
      </div>

      <div class="sticky inset-x-0 bottom-0 border-t pt-3 border-gray-100">
        <div class="flex justify-center items-center pb-3">
          <button
            class="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-red-500 px-5 py-2 transition-colors hover:bg-transparent focus:outline-none focus:ring" @click="logOut">
            <span
              class="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500">
              Logout
            </span>

            <span
              class="shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#f25155" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 17l5-5-5-5M19.8 12H9M10 3H4v18h6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="showMobile" class="z-50 absolute top-0 w-full">
      <div class="flex flex-col h-screen p-6 w-full dark:bg-gray-900 dark:text-gray-100">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <img src="@/assets/img/logo.png" alt="logo" class="w-60">
            <button class="p-2" @click="toggleNavbar">
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none"
                stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div class="flex-1">
            <ul class="pt-2 pb-4 space-y-1 text-sm">
              <nuxt-link v-for="item in sidebarItems" :key="item.name" :to="item.url"
                class="rounded-md px-4 py-2.5 space-y-2 text-sm font-light text-gray-700 flex items-center space-x-3">
                <!-- <img :src="require(`~/assets/icons/${item.icon}.svg`)" alt="icons"> -->
                <p class="text-gray-100">
                  {{ item.name }}
                </p>
              </nuxt-link>
            </ul>
          </div>
        </div>
        <div class="flex items-center p-2 space-x-4 justify-self-end pl-10">
          <button
            class="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-red-500 px-5 py-2 transition-colors hover:bg-transparent focus:outline-none focus:ring" @click="logOut">
            <span
              class="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500">
              Logout
            </span>

            <span
              class="shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#f25155" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 17l5-5-5-5M19.8 12H9M10 3H4v18h6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div class="flex lg:hidden justify-between items-center px-3 md:bg-[#232323] w-full pt-3 ">
        <!-- <div class="flex items-center justify-between lg:hidden pr-6 pt-2 border-2 border-red-500">
          <div class="-ml-[350px] cursor-pointer border-2 border-red-500" @click="$router.push('/admin/dashboard')">
            <h1 class="text-white font-semibold">Visionary Gains</h1>
          </div>
          <div>
            <button class="p-2" @click="toggleNavbar">
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none"
                stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 9.5H3M21 4.5H3M21 14.5H3M21 19.5H3" />
              </svg>
            </button>
          </div>
        </div>
        <div class="hidden lg:flex items-center gap-x-3 py-3 pr-6">
          <p class="text-sm lg:text-base text-white">
            Hi, {{ loggedUser?.firstName }} {{ loggedUser?.lastName }}
          </p>
          <div class="relative flex-shrink-0">
            <span
              class="absolute bottom-0 right-0 w-4 h-4 dark:bg-green-600 border rounded-full dark:text-gray-100 dark:border-gray-900" />
            <img src="https://source.unsplash.com/50x50/?portrait" alt=""
              class="w-10 h-10 border rounded-full dark:bg-gray-500 dark:border-gray-700">
          </div>
        </div> -->
        <div>
          <img src="@/assets/img/logo.png" alt="logo" class="w-60">
          <!-- <h1 class="text-white font-semibold font-mono test-xl">Visionary Trader</h1> -->
        </div>
        <div>
          <svg @click="toggleNavbar" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
      </div>
      <div class="p-6 h-screen md:bg-[#232323] overflow-y-auto">
        <slot></slot>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { logOut } from '@/composables/core/useLogout'
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const router = useRouter();
const route = useRoute();

const showMobileNav = ref(false);
const showMobile = ref(false);
const isMobile = ref(false);
const loggedUser = ref<any>(null);
const windowSize = ref({ width: 0, height: 0 });

const sidebarItems = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    url: '/admin/dashboard'
  },
  {
    name: 'Users',
    icon: 'users',
    url: '/admin/dashboard/users'
  },
  {
    name: 'Withdrawals',
    icon: 'accounts',
    url: '/admin/dashboard/withdrawals'
  },
  {
    name: 'Deposits',
    icon: 'accounts',
    url: '/admin/dashboard/deposits'
  },
  {
    name: 'Wallet',
    icon: 'lending',
    url: '/admin/dashboard/wallet'
  }
];

const onResize = () => {
  isMobile.value = window.innerWidth < 900;
  windowSize.value = {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

const toggleMobileNavbar = () => {
  showMobileNav.value = !showMobileNav.value;
};

const toggleNavbar = () => {
  showMobile.value = !showMobile.value;
};

watch(
  () => route.path,
  () => {
    if (isMobile.value) {
      showMobile.value = !showMobile.value;
    }
  }
);

onMounted(() => {
  onResize();
  window.addEventListener('resize', onResize, { passive: true });

  // const user = JSON.parse(window.localStorage.getItem('user') || 'null');
  // if (!user) {
  //   router.push('/admin');
  // } else {
  //   loggedUser.value = user;
  // }
});
</script>


<style scoped>
.nuxt-link-active {
  font-weight: bold;
}

.nuxt-link-exact-active {
  background-color: black;
  color: white;
}
</style>
