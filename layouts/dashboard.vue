<template>
  <main class="flex relative bg-black">
    <div class="hidden lg:flex h-screen flex-col sticky top-0 justify-between border-e bg-black w-3/12">
      <div class="px-4 py-6 bg-black">
        <span
          class="grid h-10 w-32 place-content-center rounded-lg"
        >
          <button rel="noopener noreferrer" to="/dashboard" aria-label="Back to homepage" class="flex items-center p-2">
            <img src="@/assets/img/logo.png" class="w-44 lg:w-60" alt="">
          </button>
        </span>

        <ul class="mt-6 space-y-1">
          <li class="space-y-3 flex flex-col">
            <nuxt-link
              v-for="{name, url, icon} in sidebarItems"
              :key="name"
              :to="url"
              class="rounded-md px-4 py-2.5 space-y-2 text-sm font-light text-gray-700 flex items-center space-x-3"
            >
              <!-- <img :src="require(`~/assets/icons/${icon}.svg`)" alt="icons"> -->
              <p class="text-gray-100 pb-2">
                {{ name }}
              </p>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="sticky inset-x-0 bottom-0 border-t pt-3 border-gray-100">
        <div class="flex justify-center items-center pb-3">
          <button
            class="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-red-500 px-5 py-2 transition-colors hover:bg-transparent focus:outline-none focus:ring"
            @click="handleLogout"
          >
            <span
              class="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500"
            >
              Logout
            </span>

            <span
              class="shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f25155"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              ><path d="M16 17l5-5-5-5M19.8 12H9M10 3H4v18h6" /></svg>
            </span>
          </button>
        </div>
      </div>

      <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a href="#" class="flex items-center gap-2 bg-white p-4 hover:bg-black">
          <img
            alt="Man"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            class="h-10 w-10 rounded-full object-cover"
          >

          <div>
            <p class="text-xs">
              <strong class="block font-medium">Eric Frusciante</strong>

              <span> eric@frusciante.com </span>
            </p>
          </div>
        </a>
      </div>
    </div>
    <div v-if="showMobile" class="z-50 absolute top-0 w-full">
      <div class="flex flex-col h-screen p-6 w-full dark:bg-gray-900 dark:text-gray-100">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <img src="@/assets/img/logo.png" class="w-44" alt="">
            <button class="p-2" @click="toggleNavbar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <!-- <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center py-4">
              <button type="submit" class="p-2 focus:outline-none focus:ring">
                <svg fill="currentColor" viewBox="0 0 512 512" class="w-5 h-5 dark:text-gray-400">
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" />
                </svg>
              </button>
            </span>
            <input type="search" name="Search" placeholder="Search..." class="w-full py-2 pl-10 text-sm dark:border-transparent rounded-md focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900">
          </div> -->
          <div class="flex-1">
            <ul class="pt-2 pb-4 space-y-1 text-sm">
              <li v-for="({name, url}, index) in sidebarItems" :key="index" class="rounded-sm">
                <NuxtLink rel="noopener noreferrer" :to="url" class="flex items-center p-2 py-3 space-x-3 rounded-md cursor-pointer" @click="toggleNavbar">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 fill-current dark:text-gray-400">
                    <path d="M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z" />
                  </svg>
                  <!-- <img src="@/assets/img/Fidelitysvalues.png" alt="logo" class="h-10 w-10"> -->
                  <span>{{ name }}</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex items-center p-2 mt-12 space-x-4 justify-self-end">
          <img src="https://source.unsplash.com/100x100/?portrait" alt="" class="w-12 h-12 rounded-lg dark:bg-black0">
          <div>
            <h2 class="text-lg font-semibold">
              SubNine
            </h2>
            <span class="flex items-center space-x-1">
              <a rel="noopener noreferrer" href="#" class="text-xs hover:underline dark:text-gray-400">View profile</a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div class="flex justify-end items-end bg-black w-full sticky top-0">
        <div class="flex items-center justify-between lg:hidden pr-6 pt-2">
          <div class="-ml-[350px] cursor-pointer" @click="$router.push('/')">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" class="w-8 h-8 dark:text-violet-400">
              <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z" />
              <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z" />
            </svg> -->
            <img src="@/assets/img/Fidelitysvalues.png" alt="logo" class="h-10 w-10">
          </div>
          <div>
            <button class="p-2" @click="toggleNavbar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="white"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ><path d="M21 9.5H3M21 4.5H3M21 14.5H3M21 19.5H3" /></svg>
            </button>
          </div>
        </div>
        <div class="hidden lg:flex items-center gap-x-3 py-3 pr-6 bg-black">
          <p class="text-sm lg:text-base">
            Hi, Abah Marquis
          </p>
          <div class="relative flex-shrink-0">
            <span class="absolute bottom-0 right-0 w-4 h-4 dark:bg-green-600 border rounded-full dark:text-gray-100 dark:border-gray-900" />
            <img src="https://source.unsplash.com/50x50/?portrait" alt="" class="w-10 h-10 border rounded-full dark:bg-black0 dark:border-gray-700">
          </div>
        </div>
      </div>
      <div class="p-6 h-screen bg-black overflow-y-auto">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const router = useRouter();
const route = useRoute();

const showMobileNav = ref(false);
const showMobile = ref(false);
const isMobile = ref(false);
const sidebarItems = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    url: '/dashboard'
  },
  {
    name: 'Profile',
    icon: 'dashboard',
    url: '/dashboard/profile'
  },
  {
    name: 'Deposit',
    icon: 'dashboard',
    url: '/dashboard/deposit'
  },
  {
    name: 'Withdrawals',
    icon: 'dashboard',
    url: '/dashboard/withdrawals'
  },
  {
    name: 'Buy plans',
    icon: 'dashboard',
    url: '/dashboard/purchase-plans'
  },
  {
    name: 'Transaction history',
    icon: 'dashboard',
    url: '/dashboard/transaction-history'
  },
  {
    name: 'Investment',
    icon: 'dashboard',
    url: '/dashboard/investment'
  }
];

const onResize = () => {
  isMobile.value = window.innerWidth < 900;
};

const toggleMobileNavbar = () => {
  showMobileNav.value = !showMobileNav.value;
};

const toggleNavbar = () => {
  showMobile.value = !showMobile.value;
};

const handleLogout = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, logout!'
  }).then((result) => {
    if (result.isConfirmed) {
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('auth');
      router.push('/admin');
    } else {
      Swal.fire('Cancelled', "You're still logged in!", 'info');
    }
  });
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

  const user = window.localStorage.getItem('user');
  if (user === null) {
    router.push('/login');
  }
});

</script>


<style scoped>
.nuxt-link-active {
  font-weight: bold;
}
/* exact link will show the primary color for only the exact matching link */
.nuxt-link-exact-active {
  background-color: black;
  color: white;
}

</style>
