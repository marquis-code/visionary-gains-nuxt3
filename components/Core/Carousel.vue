<template>
  <div class="relative w-full max-w-4xl mx-auto overflow-hidden h-96">
    <!-- Carousel Images -->
    <div class="w-full h-full">
      <img
        :src="dynamicImage(images[currentIndex])"
        alt="carousel image"
        class="w-full h-full object-cover transition-all duration-700 ease-in-out"
      />
    </div>

    <!-- Controls for manually switching images -->
    <div class="absolute inset-0 flex justify-between items-center px-4">
      <button
        class="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
        @click="previousImage"
      >
        ‹
      </button>
      <button
        class="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
        @click="nextImage"
      >
        ›
      </button>
    </div>

    <!-- Image Indicators -->
    <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
      <span
        v-for="(image, index) in images"
        :key="index"
        @click="goToImage(index)"
        :class="{
          'bg-blue-500': currentIndex === index,
          'bg-gray-300': currentIndex !== index
        }"
        class="w-3 h-3 rounded-full cursor-pointer transition"
      >
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { dynamicImage } from '@/utils/assets'

// Array of image filenames (these will be resolved by dynamicImage)
const images = ref<string[]>([
  'carousel1.jpg',
  'carousel2.jpg',
  'carousel3.jpg',
  'carousel4.jpg',
]);

// Current image index
const currentIndex = ref(0);
let intervalId: ReturnType<typeof setInterval>;

// Switch to the next image
const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
  console.log("Next Image Index: ", currentIndex.value); // Debugging log
};

// Switch to the previous image
const previousImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length;
  console.log("Previous Image Index: ", currentIndex.value); // Debugging log
};

// Switch to a specific image
const goToImage = (index: number) => {
  currentIndex.value = index;
};

// Set up automatic image switching
onMounted(() => {
  intervalId = setInterval(() => {
    nextImage();
  }, 3000); // Switch every 3 seconds
  console.log('Carousel mounted and interval set'); // Debugging log
});

// Cleanup the interval when the component is destroyed
onUnmounted(() => {
  clearInterval(intervalId);
  console.log('Carousel unmounted and interval cleared'); // Debugging log
});
</script>

<style scoped>
/* No extra styles needed with Tailwind */
</style>
