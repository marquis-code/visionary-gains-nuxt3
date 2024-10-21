<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Dark overlay -->
      <div class="fixed inset-0 bg-black bg-opacity-50"></div>
  
      <!-- Modal content -->
      <div
        class="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 md:mx-0 p-6 space-y-4"
      >
        <!-- Close button -->
        <button
          @click="closeModal"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          ✖
        </button>
  
        <!-- Conditional Title -->
        <h3 v-if="title" class="text-lg font-semibold text-gray-900">{{ title }}</h3>
  
        <!-- Conditional Description -->
        <p v-if="description" class="text-gray-700">{{ description }}</p>
  
        <!-- Modal slot for content -->
        <slot />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, watch, defineEmits } from 'vue';
  
  const props = defineProps({
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  });
  
  const emit = defineEmits(['update:show']);
  
  const isVisible = ref(props.show);
  
  watch(
    () => props.show,
    (newVal) => {
      isVisible.value = newVal;
    }
  );
  
  const closeModal = () => {
    emit('update:show', false);
  };
  </script>
  
  <style scoped>
  /* Add custom styling if needed */
  </style>
  