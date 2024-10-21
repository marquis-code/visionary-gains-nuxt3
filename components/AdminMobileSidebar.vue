<template>
  <div class="flex h-screen flex-col justify-between border-e bg-white bborder">
    <div class="px-4 py-6">
    <div class="flex items-center justify-between">
      <span
      class="grid h-10 w-32 place-content-center pb-2"
    >
    <img src="@/assets/img/logo.jpeg" class="rounded-full h-10 w-10" alt="" />
    <!-- <img src="~/assets/icons/logo.svg" alt="logout icon" /> -->
    </span>
    <button @click="$emit('close')" class="font-bold text-gray-900 text-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    </div>

      <ul class="mt-6 space-y-2">
        <li v-for="(item, index) in sidebarItems" :key="index">
          <nuxt-link
            :to="item.path"
            :class="[item.path === $route.path ? 'bg-green-100' : '']"
            href=""
            class="px-4 py-3 text-sm font-light text-gray-700 rounded-md flex justify-between items-center"
          >
            <div class="flex items-center gap-x-2">
              <!-- <img :src="require(`~/assets/icons/${item.icon}.svg`)" alt=""> -->
            <span> {{ item.name }}</span>
            </div>
            <div v-if="item.name === 'Communities' || item.name === 'Notifications'" class="flex justify-center items-center rounded-full bg-red-500 h-6 w-6">
              <span class="text-white font-light text-center">2</span>
            </div>
          </nuxt-link>
        </li>
      </ul>

   <div class="pt-10 pl-3">
    <button class="text-red-500 font-medium flex items-center gap-x-2">
      <img src="~/assets/icons/logout.svg" alt="logout icon" />
     <span> Logout</span>
    </button>
   </div>
    </div>

    <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
      <a href="#" class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
        <img
          alt="Man"
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          class="h-10 w-10 rounded-full object-cover"
        >

        <div>
          <p class="text-sm">
            <strong class="block font-medium">Michael Smith</strong>

            <span>michaelsmith12@gmail.com</span>
          </p>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      sidebarItems: [
        {
          name: 'Home',
          icon: 'home',
          path: '/'
        },
        {
          name: 'Services',
          icon: 'services',
          path: '/services'
        },
        {
          name: 'Appointment',
          icon: 'appointments',
          path: '/appointments'
        },
        {
          name: 'Records',
          icon: 'records',
          path: '/records'
        },
        {
          name: 'Medical Timeline',
          icon: 'medical-timeline',
          path: '/medical-timelines'
        },
        {
          name: 'Order History',
          icon: 'order-history',
          path: '/order-history'
        },
        {
          name: 'Wallet',
          icon: 'wallet',
          path: '/wallet'
        },
        {
          name: 'Communities',
          icon: 'communities',
          path: '/communities'
        },
        {
          name: 'Notifications',
          icon: 'notifications',
          path: '/notifications'
        },
        {
          name: 'Settings',
          icon: 'settings',
          path: '/settings'
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style scoped>
a.nuxt-link-exact-active {
  color: #444444 !important;
  font-weight: 500;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  margin: 0;
}
</style>
