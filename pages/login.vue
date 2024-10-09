<template>
  <div class="bg-[#303435] h-screen">
    <section class="bg-[#303435] flex justify-center items-center pt-20 container mx-auto">
      <div class="w-full max-w-md p-8 space-y-3 rounded-xl bg-white">
        <h1 class="text-2xl font-bold text-center">
          Login
        </h1>
        <form class="space-y-10" @submit.prevent="login">
          <div class="space-y-1 text-sm w-full">
            <label for="email" class="block text-gray-900 font-medium">Email</label>
            <input id="email" v-model="form.email" type="email" name="email" placeholder="email"
              class="border w-full outline-none px-4 py-3 rounded-md border-gray-900 text-gray-900">
          </div>
          <div class="space-y-1 text-sm w-full relative">
            <label for="password" class="block text-gray-900 font-medium">Password</label>
            <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" name="password"
              placeholder="Password"
              class="border w-full outline-none px-4 py-3 rounded-md border-gray-900 text-gray-900">
            <!-- <img @click="showPassword = !showPassword" :src="require(`@/assets/icons/${eye}`)" alt=""
              class="absolute cursor-pointer top-9 right-4 h-6 w-6"> -->
          </div>
          <div class="w-full">
            <button :disabled="!isFormEmpty" :class="[
          !isFormEmpty || processing ? 'opacity-25 cursor-not-allowed' : '',
        ]" class="w-full shrink-0 text-xs disabled:cursor-not-allowed disabled:opacity-25 rounded-md border border-green-500 bg-green-600 px-12 py-3 font-medium text-white transition">
              {{ processing ? "processing..." : "Sign In" }}
            </button>
          </div>
        </form>
        <p class="text-sm text-center sm:px-6 text-gray-900">
          Don't have an account?
          <nuxt-link to="/signup" rel="noopener noreferrer" href="#" class="underline text-gray-900">
            Sign up
          </nuxt-link>
        </p>
        <p class="text-sm text-center sm:px-6 text-gray-900">
          Forgot password?
          <nuxt-link to="/forgot" rel="noopener noreferrer" href="#" class="underline text-gray-900">
            change password
          </nuxt-link>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const processing = ref(false);
const showPassword = ref(false);
const form = ref({
  email: '',
  password: ''
});

const isFormEmpty = computed(() => !form.value.email || !form.value.password);
const eye = computed(() => (showPassword.value ? 'eye-open.svg' : 'eye-close.svg'));

onMounted(() => {
  if (window.process) {
    const user = window.localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    if (parsedUser && Object.keys(parsedUser).length) {
      router.push('/dashboard');
    }
  }
});

const login = async () => {
  processing.value = true;
  const loginMutation = `
    mutation {
      userLogin(email: "${form.value.email}", password: "${form.value.password}") {
        jwt
        user {
          id
          firstName
          lastName
          email
          Status
          PlanType
          accountBalance
          tradingBalance
          profit
          eth
          btc
          timeAdded
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.visionarygains.com/graphql/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: loginMutation,
        variables: {
          email: form.value.email,
          password: form.value.password
        }
      })
    });

    const data = await response.json();
    if (data?.errors) {
      window.$toastr?.e(data.errors[0].message);
    } else {
      window.localStorage.setItem('auth', JSON.stringify(data?.data?.userLogin?.jwt));
      window.localStorage.setItem('user', JSON.stringify(data?.data?.userLogin?.user));
      window.$toastr?.s('Login was successful');
      router.push('/dashboard');
    }
  } finally {
    processing.value = false;
  }
};
</script>

<script lang="ts">
export default {
  layout: 'authLayout'
};
</script>

