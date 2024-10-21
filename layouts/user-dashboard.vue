<template>
  <main class="flex bg-[#030303]">
    <user-side-bar class="bg-[#030303]  sticky text-white top-0 hidden lg:block" />
    <div class=" w-full flex-1">
      <div class="sticky top-0 z-50">
        <user-header />
      </div>
      <div class="md:p-3 md:border-[0.4px] md:shadow-md md:bg-[#232323] h-screen md:rounded-lg m-3 z-0">
        <slot />
      </div>
    </div>
  </main>
</template>

<script>
// import UserHeaderSection from '@/components/user-dashboard/UserHeaderSection.vue'
export default {
  components: {
    // UserHeaderSection
  },
  // mounted() {
  //   const user = window.localStorage.getItem('user')

  //   if (user) {
  //     const result = JSON.parse(user)
  //   }
  //   if (user === null) {
  //     this.$router.push('/login')
  //   }
  // }
}
</script>
