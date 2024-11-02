<template>
  <section class="bg-white space-y-6">
    <div class="lg:grid lg:min-h-screen lg:grid-cols-12 w-full">
      <section class="relative flex h-32 items-end bg-[#303435] lg:col-span-5 lg:h-full xl:col-span-6">
        <img alt="Night"
          src="@/assets/img/signup-image.jpeg"
          class="absolute inset-0 h-full w-full object-cover opacity-80">
        <div class="hidden lg:relative lg:block lg:p-12">
          <a class="block text-white" href="/">
            <span class="sr-only">Home</span>
            <img src="@/assets/img/logo.png" alt="logo" class="w-48">
          </a>

          <h2 class="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Welcome to Visionary Gains
          </h2>

          <p class="mt-4 leading-relaxed text-white/90">
            Trade global financial markets ON OVER 1,000 ASSETS. Forex, Stocks,
            Commodities, Indices & Cryptocurrencies
          </p>
        </div>
      </section>

      <main
        class="items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-[#303435] w-full">
        <div class="max-w-xl lg:max-w-3xl lg:mx-auto grid place-content-center h-full">
          <div class="relative -mt-16 block lg:hidden">
            <a class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
              href="/">
              <span class="sr-only">Home</span>
              <img src="@/assets/img/logo.png" alt="logo" class="w-48">
            </a>

            <h1 class="mt-2 text-2xl font-bold text-gray-200 sm:text-3xl md:text-4xl">
              Welcome to Visionary Gains
            </h1>

            <p class="mt-4 leading-relaxed text-sm text-white">
              Trade global financial markets ON OVER 1,000 ASSETS. Forex,
              Stocks, Commodities, Indices & Cryptocurrencies
            </p>
          </div>

          <form class="lg:w-[500px] space-y-6 pt-10" @submit.prevent="handleSubmit">
            <div class="col-span-6 sm:col-span-3">
              <label for="FirstName" class="input-label">
                First Name
              </label>

              <input id="FirstName" v-model="form.first_name" type="text" name="first_name"
                class="input-field">
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="LastName" class="input-label">
                Last Name
              </label>

              <input id="LastName" v-model="form.last_name" type="text" name="last_name"
                class="input-field">
            </div>

            <div class="col-span-6">
              <label for="Email" class="input-label">
                Email
              </label>

              <input id="Email" v-model="form.email" type="email" name="email"
                class="input-field">
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="Password" class="input-label">
                Password
              </label>

              <input id="Password" v-model="form.password" type="password" name="password"
                class="input-field">
            </div>
            <div class="col-span-6">
              <label for="referralCode" class="input-label">
                Referral Code
              </label>

              <input id="referralCode" v-model="form.referralCode" type="text" name="referralCode"
                class="input-field">
            </div>
            <!--
            <div class="col-span-6">
              <p class="text-sm text-white">
                By creating an account, you agree to our
                <a href="#" class="text-green-600 underline">
                  terms and conditions
                </a>
                and
                <a href="#" class="text-green-600 underline">privacy policy</a>.
              </p>
            </div> -->

            <div class="w-full pt-6">
              <button :disabled="!isFormEmpty" :class="[
            !isFormEmpty
              ? 'opacity-25 cursor-not-allowed'
              : '',
          ]" class="inline-block w-full shrink-0 text-sm rounded-md border border-green-500 bg-green-600 px-12 py-3 font-medium text-white transition">
                {{ formBusy ? "processing..." : " Create an account" }}
              </button>

              <p class="mt-6 text-sm text-white">
                Already have an account?
                <NuxtLink to="/login" class="text-white underline">
                  Log in
                </NuxtLink>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const processing = ref(false);
const formBusy = ref(false);
const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  referralCode: ''
});

const isFormEmpty = computed(() => {
  return !(
    form.value.first_name &&
    form.value.last_name &&
    form.value.email &&
    form.value.password
  );
});

const handleSubmit = async () => {
  formBusy.value = true;
  const signupMutation = `
    mutation newUser($input: NewUser!) {
      newUser(input: $input) {
        jwt
      }
    }
  `;

  try {
    const response = await fetch('https://visionary-zpui.onrender.com/graphql/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: signupMutation,
        variables: {
          input: {
            firstName: form.value.first_name,
            lastName: form.value.last_name,
            email: form.value.email,
            password: form.value.password,
            referralCode: form.value.referralCode
          }
        }
      })
    });

    const data = await response.json();
    if (data?.errors) {
      window.$toastr?.e(data.errors[0].message);
    } else {
      window.localStorage.setItem('auth', JSON.stringify(data?.data?.newUser?.jwt));
      window.$toastr?.s('Signup was successful');
      router.push('/login');
    }
  } finally {
    formBusy.value = false;
  }
};
</script>

<script lang="ts">
definePageMeta({
  layout: 'authLayout'
})
</script>
