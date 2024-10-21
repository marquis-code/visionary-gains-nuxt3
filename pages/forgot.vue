<template>
  <div class="bg-[#303435] h-screen">
    <section v-if="!token_sent" class="bg-[#303435] flex justify-center items-center pt-20 container mx-auto">
      <div class="w-full max-w-md p-8 space-y-6 rounded-xl bg-white">
        <h1 class="text-3xl font-bold">
          Don't worry!
        </h1>
        <p class="text-gray-500 text-sm leading-loose">
          we are here to help you recover your password. Enter the email address you used when you joined and we'll send
          you instructions to reset your password.
        </p>
        <form class="space-y-10" @submit.prevent="handleForgetPassword">
          <div class="space-y-1 text-sm w-full">
            <label for="email" class="input-label">Email</label>
            <input id="email" v-model="form.email" type="email" name="email" placeholder="email"
              class="input-field">
          </div>
          <div class="w-full">
            <button :disabled="!isFormEmpty" :class="[
      !isFormEmpty || processing ? 'opacity-25 cursor-not-allowed' : '',
    ]" class="w-full shrink-0 text-sm disabled:cursor-not-allowed disabled:opacity-25 rounded-md border border-green-500 bg-green-600 px-12 py-3 font-medium text-white transition">
              {{ processing ? "processing..." : "Submit" }}
            </button>
          </div>
        </form>
      </div>
    </section>
    <section v-else class="grid place-content-center h-screen">
      <div class="flex justify-center items-center flex-col gap-y-3">
        <img src="@/assets/icons/airplane.svg" class="h-10 w-10" alt="">
        <p class="text-white">
          Reset password token has been sent to your email.
        </p>
        <nuxt-link to="/reset" class="bg-black text-white px-6 py-2 rounded-md tetx-sm">Proceed to reset</nuxt-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const processing = ref(false);
const tokenSent = ref(false);
const form = ref({
  email: ''
});

const isFormEmpty = computed(() => !form.value.email);

onMounted(() => {
  if (window.process) {
    const user = window.localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    if (parsedUser && Object.keys(parsedUser).length) {
      router.push('/dashboard');
    }
  }
});

const handleForgetPassword = async () => {
  processing.value = true;
  const resetPassword = `
    mutation SendResetPasswordCode($email: String!) {
      sendResetPasswordCode(email: $email)
    }
  `;

  try {
    const response = await fetch('https://api.visionarygains.com/graphql/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: resetPassword,
        variables: {
          email: form.value.email
        }
      })
    });

    const data = await response.json();
    if (data?.errors) {
      window.$toastr?.e(data.errors[0].message);
    } else {
      tokenSent.value = true;
      window.localStorage.setItem('user-email', JSON.stringify(form.value.email));
    }
  } finally {
    processing.value = false;
  }
};

definePageMeta({
  layout: 'authLayout'
})
</script>