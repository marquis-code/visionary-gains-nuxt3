<template>
  <div class="bg-[#303435] h-screen">
    <section class="bg-[#303435] flex justify-center items-center pt-20 container mx-auto">
      <div class="w-full max-w-md p-8 space-y-3 rounded-xl bg-white">
        <h1 class="text-2xl font-bold text-center">Login</h1>
        <form class="space-y-10" @submit.prevent="login">
          <div class="space-y-1 text-sm w-full">
            <label for="email" class="input-label">Email</label>
            <input
              id="email"
              v-model="credential.email.value"
              type="email"
              name="email"
              placeholder="email"
              class="input-field"
            />
          </div>
          <div class="space-y-1 text-sm w-full relative">
            <label for="password" class="input-label">Password</label>
            <input
              id="password"
              v-model.trim="credential.password.value"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              placeholder="Password"
              class="input-field"
            />
            <div
              @click="toggleShowPassword"
              class="absolute inset-y-0 right-4 top-6 flex items-center cursor-pointer"
            >
              <svg
                v-if="!showPassword"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3332 6.66669C18.3332 6.66669 14.9998 11.6667 9.99984 11.6667C4.99984 11.6667 1.6665 6.66669 1.6665 6.66669"
                  stroke="#1D2739"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M12.5 11.25L13.75 13.3333"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.6665 9.16669L18.3332 10.8334"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.6665 10.8334L3.33317 9.16669"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.5 11.25L6.25 13.3333"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
    
              <svg
                v-if="showPassword"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9532 9.20419C18.2065 9.55944 18.3332 9.7371 18.3332 10C18.3332 10.2629 18.2065 10.4406 17.9532 10.7959C16.8148 12.3922 13.9075 15.8334 9.99984 15.8334C6.09215 15.8334 3.18492 12.3922 2.04654 10.7959C1.79318 10.4406 1.6665 10.2629 1.6665 10C1.6665 9.7371 1.79318 9.55944 2.04654 9.20419C3.18492 7.60789 6.09215 4.16669 9.99984 4.16669C13.9075 4.16669 16.8148 7.60789 17.9532 9.20419Z"
                  stroke="#1D2739"
                  stroke-width="2"
                />
                <path
                  d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z"
                  stroke="#1D2739"
                  stroke-width="1.5"
                />
              </svg>
            </div>
          </div>
          <div class="w-full">
            <button
              :disabled="loading"
              class="w-full shrink-0 text-sm disabled:cursor-not-allowed disabled:opacity-25 rounded-md border border-green-500 bg-green-600 px-12 py-3 font-medium text-white transition"
            >
              {{ loading ? "processing..." : "Sign In" }}
            </button>
          </div>
        </form>
        <p class="text-sm text-center sm:px-6 text-gray-900">
          Don't have an account?
          <nuxt-link to="/signup" rel="noopener noreferrer" class="underline text-gray-900">
            Sign up
          </nuxt-link>
        </p>
        <p class="text-sm text-center sm:px-6 text-gray-900">
          Forgot password?
          <nuxt-link to="/forgot" rel="noopener noreferrer" class="underline text-gray-900">
            change password
          </nuxt-link>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLogin } from '@/composables/auth/useLogin'; // Using the new composable

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};


const { credential, login, loading, isFormDisabled } = useLogin();
const showPassword = ref(false);

definePageMeta({
    layout: 'authLayout'  
  });
  
</script>

