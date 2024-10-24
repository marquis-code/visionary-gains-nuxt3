<template>
  <main class="bg-[#303435] h-screen">
    <section class="bbg-[#303435] flex justify-center items-center pt-20 container mx-auto">
      <div class="p-4 md:p-8 space-y-3 w-11/12 mx-auto mt-20 bg-white rounded-xl md:w-[500px] border shadow-sm">
        <h1 class="text-2xl font-bold text-center">
          Admin Login
        </h1>
        <form class="space-y-10 w-full bg-white" @submit.prevent="login">
          <div class="space-y-1 text-sm w-full">
            <label for="email" class="input-label">Email</label>
            <input id="email" v-model="form.email" type="email" name="email" placeholder="email"
              class="input-field">
            <small v-if="!isEmailValid" class="text-red-600 text-sm font-medium">Please enter a valid email
              address</small>
          </div>
          <div class="space-y-1 text-sm w-full">
            <label for="password" class="input-label">Password</label>
            <input id="password" v-model="form.password" type="password" name="password" placeholder="Password"
              class="input-field">
          </div>
          <button :disabled="!isFormEmpty || processing"
            class="block w-full disabled:cursor-not-allowed disabled:opacity-25 p-3 py-3.5  text-center  bg-black text-white rounded-md">
            {{ processing ? 'processing...' : 'Sign in' }}
          </button>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const processing = ref(false);
const isEmailValid = ref(true);
const form = ref({
  email: '',
  password: ''
});

const isFormEmpty = computed(() => !form.value.email || !form.value.password);

const validateEmail = (value: string) => {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  isEmailValid.value = emailPattern.test(value);
};

watch(
  () => form.value.email,
  (newValue) => {
    validateEmail(newValue);
  }
);

const login = async () => {
  processing.value = true;
  const loginMutation = `
    mutation {
      adminLogin(email: "${form.value.email}", password: "${form.value.password}") {
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
      if (process.client) {
        window.localStorage.setItem('auth', JSON.stringify(data?.data?.adminLogin?.jwt));
        window.localStorage.setItem('user', JSON.stringify(data?.data?.adminLogin?.user));
        window.$toastr?.s('Login was successful');
        router.push('/admin/dashboard');
      }
    }
  } finally {
    processing.value = false;
  }
};
</script>

<script lang="ts">
definePageMeta({
  layout: 'authLayout'
})
</script>

