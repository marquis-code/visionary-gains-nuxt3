<template>
  <div class="bg-[#303435] h-screen">
    <section class="bg-[#303435] flex justify-center items-center pt-20 container mx-auto">
      <div class="w-full max-w-md p-8 space-y-6 rounded-xl bg-white">
        <h1 class="text-3xl font-bold">
          Almost Done!
        </h1>
        <p class="text-gray-500 text-sm leading-loose">
          Please enter your reset password token and your new password.
        </p>
        <form class="space-y-10" @submit.prevent="login">
          <div class="space-y-1 text-sm w-full">
            <label for="token" class="block text-gray-900 font-medium">Token</label>
            <input id="token" v-model="form.resetCode" type="tel" name="token" placeholder="email"
              class="border w-full outline-none px-4 py-3 rounded-md border-gray-900 text-gray-900">
          </div>
          <div class="space-y-1 text-sm w-full">
            <label for="password" class="block text-gray-900 font-medium">New Password</label>
            <input id="password" v-model="form.password" type="password" name="password" placeholder="password"
              class="border w-full outline-none px-4 py-3 rounded-md border-gray-900 text-gray-900">
          </div>
          <div class="w-full">
            <button :disabled="!isFormEmpty" :class="[
          !isFormEmpty || processing ? 'opacity-25 cursor-not-allowed' : '',
        ]" class="w-full shrink-0 text-xs disabled:cursor-not-allowed disabled:opacity-25 rounded-md border border-green-500 bg-green-600 px-12 py-3 font-medium text-white transition">
              {{ processing ? "processing..." : "Submit" }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = ref<string>('');
const processing = ref(false);
const form = ref({
  resetCode: '',
  email: '',
  password: ''
});

const isFormEmpty = computed(() => !form.value.password || !form.value.resetCode);

onMounted(() => {
  user.value = JSON.parse(window.localStorage.getItem('user-email') || '""');
});

const login = async () => {
  processing.value = true;
  const resetPasswordMutation = `
    mutation resetPassword($email: String!, $newPassword: String!, $resetCode: String!) {
      resetPassword(email: $email, newPassword: $newPassword, resetCode: $resetCode)
    }
  `;

  try {
    const response = await fetch('https://api.visionarygains.com/graphql/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: resetPasswordMutation,
        variables: {
          email: user.value,
          newPassword: form.value.password,
          resetCode: form.value.resetCode
        }
      })
    });

    const data = await response.json();
    if (data?.errors) {
      window.$toastr?.e(data.errors[0].message);
    } else {
      window.localStorage.removeItem('user-email');
      window.$toastr?.s('Password reset was successful. Please login.');
      router.push('/login');
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


<style></style>
