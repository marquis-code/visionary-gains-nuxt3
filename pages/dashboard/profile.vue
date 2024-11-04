<template>
  <main class="">
    <section class="bg-white max-w-lg rounded-md border">
      <p class="border-b pl-6 py-4 text-sm font-semibold">
        Keep Your Profile Up-To-Date
      </p>
      <form class="p-6  space-y-6" @submit.prevent="updateUser">
        <div class="space-y-1">
          <label class="input-label">First Name</label>
          <input v-model="updatedUserData.firstName" type="text"
            class="input-field">
          <span class="text-sm text-gray-500">We'll never share your details with anyone else</span>
        </div>

        <div class="space-y-1">
          <label class="input-label">Last Name</label>
          <input v-model="updatedUserData.lastName" type="text"
            class="input-field">
          <span class="text-sm text-gray-500">We'll never share your details with anyone else</span>
        </div>

        <div class="space-y-1">
          <label class="input-label">Email address:</label>
          <input v-model="updatedUserData.email" type="email"
            class="input-field">
          <span class="text-sm text-gray-500">We'll never share your details with anyone else</span>
        </div>

        <div class="space-y-1">
          <label class="input-label">Password:</label>
          <input v-model="updatedUserData.password" type="password"
            class="input-field">
          <span class="text-sm text-gray-500">We'll never share your details with anyone else</span>
        </div>

        <!-- <div class="space-y-1">
          <label class="input-label">Wallet Address:</label>
          <input v-model="updatedUserData.walletAddress" type="text" class="py-2 border rounded-md w-full outline-none pl-6">
        </div> -->
        <div class="w-full pt-6">
          <button :disabled="!isFormEmpty" :class="[!isFormEmpty ? 'opacity-25 cursor-not-allowed' : null]"
            class="bg-black w-full disabled:cursor-not-allowed disabled:opacity-25 text-white rounded-lg px-6 py-3 text-sm">
            {{ processing ? 'processing...' : 'Update' }}
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const userId = ref('12345');
const processing = ref(false);
const updatedUserData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
});

const isFormEmpty = computed(() => {
  return !!(
    updatedUserData.value.firstName &&
    updatedUserData.value.lastName &&
    updatedUserData.value.email
  );
});

onMounted(() => {
  getUserInfo();
});

const updateUser = async () => {
  processing.value = true;
  const accessToken = JSON.parse(window.localStorage.getItem('auth') || '""');
  const user = JSON.parse(window.localStorage.getItem('user') || '{}');

  const updateUserMutation = `
    mutation updateUser($userId: String!, $input: UpdateUser!) {
      updateUser(userId: $userId, input: $input) {
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
  `;

  try {
    const response = await fetch('https://visionary-zpui.onrender.com/graphql/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        query: updateUserMutation,
        variables: {
          userId: user?.id ?? '',
          input: {
            firstName: updatedUserData.value.firstName,
            lastName: updatedUserData.value.lastName,
            password: updatedUserData.value.password,
            email: updatedUserData.value.email
          }
        }
      })
    });

    const data = await response.json();
    if (data?.errors) {
      window.$toastr?.e(data.errors[0].message);
    } else {
      window.$toastr?.s('You have successfully updated your profile');
    }
  } finally {
    processing.value = false;
  }
};

const getUserInfo = async () => {
  processing.value = true;
  const accessToken = JSON.parse(window.localStorage.getItem('auth') || '""');
  const query = `
    query {
      getUser {
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
  `;

  try {
    const response = await fetch('https://visionary-zpui.onrender.com/graphql/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    if (data?.errors) {
      window.$toastr?.e(data.errors[0].message);
    } else {
      updatedUserData.value = data.data.getUser;
    }
  } finally {
    processing.value = false;
  }
};

definePageMeta({
  layout: 'updated-user-dashboard'
})
</script>

