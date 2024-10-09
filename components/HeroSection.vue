<template>
  <section>
    <div class="dark:bg-[#303435]">
      <div
        class="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-900 space-y-6">
        <h1 class="text-4xl font-bold leadi sm:text-6xl xl:max-w-3xl dark:text-white">
          Trade global financial markets
        </h1>
        <div class="space-y-3 text-white text-sm">
          <p class="">
            ON OVER 1,000 ASSETS
          </p>
          <p class="text-white">
            Forex, Stocks, Commodities, Indices & Cryptocurrencies
          </p>
        </div>
        <div class="flex justify-center gap-x-6">
          <div class="w-full">
            <nuxt-link to="/login" type="button"
              class="px-8 w-full block py-3 m-2 text-sm font-medium rounded dark:text-gray-50 bg-[#01257D] hover:bg-[#20305a]">
              Get started
            </nuxt-link>
          </div>
          <div class="w-full">
            <nuxt-link to="/about" type="button"
              class="px-8 w-full block py-3 m-2 text-sm border rounded dark:border-gray-700 dark:text-white">
              Learn more
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- <img :src="require(`~/assets/img/${carouselImages[activeCarouselIndex].url}.jpg`)" alt=""
        class="w-5/6 h-[500px] object-cover mx-auto mb-12 -mt-20 rounded-lg shadow-md lg:-mt-40 dark:bg-gray-500"> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const activeCarouselIndex = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

const options = {
  loop: true,
  perPage: 1,
  autoplay: true,
  speed: 2000,
  autoplayTimeout: 3000,
};

const images = ref([
  {
    id: 1,
    url: 'carousel1.jpg',
    title: 'WORK WITH RELIABLE PARTNERS',
    description: 'WE HELP YOUR PROJECTS',
  },
  {
    id: 2,
    url: 'carousel4.jpg',
    title: 'STEADY, CONSTANTLY WITH MINIMAL RISK',
    description: 'GROW YOUR FUNDS',
  },
  {
    id: 3,
    url: 'carousel3.jpg',
    title: 'WITHOUT NEEDING THE SKILL SET',
    description: 'TRADE LIKE A PRO',
  },
]);

const carouselImages = ref([
  {
    id: 1,
    url: 'trading1',
  },
  {
    id: 2,
    url: 'trading2',
  },
  {
    id: 3,
    url: 'trading3',
  },
  {
    id: 4,
    url: 'trading4',
  },
  {
    id: 5,
    url: 'trading5',
  },
]);

const startSlider = () => {
  timer = setInterval(() => {
    next();
  }, 5000);
};

const next = () => {
  activeCarouselIndex.value = (activeCarouselIndex.value + 1) % carouselImages.value.length;
};

const previous = () => {
  activeCarouselIndex.value =
    (activeCarouselIndex.value - 1 + carouselImages.value.length) % carouselImages.value.length;
};

onMounted(() => {
  startSlider();
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>


<style></style>
