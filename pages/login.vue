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
              v-model="credential.password.value"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              placeholder="Password"
              class="input-field"
            />
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

const { credential, login, loading, isFormDisabled } = useLogin();
const showPassword = ref(false);

definePageMeta({
    layout: 'authLayout'  
  });
  
</script>

