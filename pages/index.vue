<template>
  <div class="bg-[#303435]">
    <hero-section class="" />
    <div class="w-11/12 md:w-10/12 mx-auto rounded-md p-6 text-gray-900 bg-white space-y-6">
      <div>
        <h1 class="text-2xl text-gray-900 font-medium">Latest Trading News</h1>
      </div>
      <!-- <div class="cryptohopper-web-widget" data-id="5" data-news_count="5" data-news_length="10"></div> -->
      <div class="overflow-x-auto">
        <CryptoWidgets />
      </div>
    </div>
    <section class="bg-[#303435]">
      <div class="container max-w-xl p-6 py-12 mx-auto space-y-10 lg:px-8 lg:max-w-7xl">
        <div>
          <h2 class="lg:text-3xl text-2xl font-bold text-center sm:text-5xl dark:text-gray-50">
            Why choose Visionary Gains?
          </h2>
          <p class="mx-auto mt-4 text-sm text-center text-white">
            We use state-of-the-art security measures when handling your account details and personal funds. Your
            information is SSL encrypted and safely stored.
          </p>
        </div>
        <div class="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div class="mt-12 space-y-12">
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      class="w-7 h-7">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium leadi dark:text-gray-50">
                    Security is our top priority
                  </h4>
                  <p class="mt-2 text-white md:text-base text-sm">
                    We use state-of-the-art security measures when handling your account details and personal funds.
                    Your information is SSL
                  </p>
                </div>
              </div>
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      class="w-7 h-7">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium leadi dark:text-gray-50">
                    Next-Generation platform
                  </h4>
                  <p class="mt-2 text-white md:text-base text-sm">
                    Our ground-breaking platform can be easily customized to fit your precise level of expertise and
                    trading needs.
                  </p>
                </div>
              </div>
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      class="w-7 h-7">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium leadi dark:text-gray-50">
                    24/7 Support
                  </h4>
                  <p class="mt-2 text-white md:text-base text-sm">
                    Our dedicated team of customer support experts are always available to assist you with every need or
                    request, anywhere you are in your native language.
                  </p>
                </div>
              </div>
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      class="w-7 h-7">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium leadi dark:text-gray-50">
                    Firm Regulation
                  </h4>
                  <p class="mt-2 text-white md:text-base text-sm">
                    Visionary Gains complies with the strictest regulation guidelines, under IFSC (International
                    Financial Services Commission), to ensure the safest trading conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" class="mt-10 lg:mt-0 h-96">
            <CoreCarousel />
          </div>
        </div>

        <div class="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div class="mt-12 space-y-12">
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      class="w-7 h-7">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium leadi dark:text-gray-50">
                    FOCUS ON YOUR BUSINESS
                  </h4>
                  <p class="mt-2 text-white md:text-base text-sm">
                    We Take Care Of The Hard Work For You
                  </p>
                </div>
              </div>
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      class="w-7 h-7">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium leadi dark:text-gray-50">
                    We Take Care Of The Hard Work For You
                  </h4>
                  <p class="mt-2 text-white md:text-base text-sm">
                    we have put together some of the planet's best live trading protocols, paired with an expert team while
                    tapping from the power of Artificial Intelligence.
                  </p>
                </div>
              </div>
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      class="w-7 h-7">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium leadi dark:text-gray-50">
                    Security
                  </h4>
                  <p class="mt-2 text-white md:text-base text-sm">
                    Your funds are safe and sound, kept in segregated bank accounts and protected by industry-leading
                      security protocols.
                  </p>
                </div>
              </div>
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      class="w-7 h-7">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium leadi dark:text-gray-50">
                    Privacy
                  </h4>
                  <p class="mt-2 text-white md:text-base text-sm">
                    Visionary Gains is fully compliant with PCI Data Security Standards. We encrypt and protect your
                      information, so you never need to worry.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" class="mt-10 lg:mt-0 h-96">
            <CoreCarousel />
          </div>
        </div>
      </div>
      <!-- <CoreCarousel />  -->
    </section>
    <section class="mb-20">
      <portfolio-section />
    </section>
    <AdvertCTA />
    <updated-testimonials />
    <div class="w-11/12 md:w-10/12 mx-auto">
      <!-- Another CryptoHopper Widget -->
      <div class="cryptohopper-web-widget" data-id="1" data-coins="bitcoin,ethereum,tether,bnb,dogecoin,tron,polkadot"
        data-table_style="dark" data-realtime="on"></div>
    </div>
    <div class="flex justify-center items-center w-11/12 mx-auto">
      <div id="chart-widget" />
    </div>
  </div>
</template>

<script setup lang="ts">
const activeCarouselIndex = ref(0) as any

// Ref for trading widget URL
const tradingWidgetUrl = ref('https://webdev.prosp.devexperts.com:8095/widget/vendors.js')

const timer = ref(0) as any
const carouselImages = ref([
  {
    id: 1,
    url: 'trading1'
  },
  {
    id: 2,
    url: 'trading2'
  },
  {
    id: 3,
    url: 'trading3'
  },
  {
    id: 4,
    url: 'trading4'
  },
  {
    id: 5,
    url: 'trading5'
  }
]) as any

// Inject external CryptoHopper widget script
useHead({
  script: [
    {
      src: 'https://www.cryptohopper.com/widgets/js/widget.js',
      type: 'text/javascript',
      async: true
    }
  ]
})

// Ensure widget re-initializes after DOM mounts
onMounted(() => {
  setTimeout(() => {
    // If widget initialization is required, you can reinitialize here
    if (window.CryptohopperWebWidget) {
      window.CryptohopperWebWidget.init()
    }
  }, 500)
})
</script>