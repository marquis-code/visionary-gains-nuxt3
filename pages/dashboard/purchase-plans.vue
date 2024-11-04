<template>
  <section class="bg-white lg:w-5/12 rounded-md border h-[500px]">
    <p class="border-b text-sm font-semibold py-4 pl-6">
      To buy a plan, select PLAN of your choice.
    </p>
    <form class="p-6 space-y-6 z-10" @submit.prevent="buyPlan">
      <div class="space-y-1">
        <label class="input-label">Choose Plan:*</label>
        <select v-model="form.plan"
          class="input-field">
          <option v-for="(item, index) in [
      {
        name: 'Platinum Plan (29%) Monthly',
        value: 'Platinum',
      },
      {
        name: 'Diamond Plan (35%) Monthly',
        value: 'Diamond',
      },
    ]" :key="index" :value="item.value">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="space-y-1">
        <label class="input-label">Enter Amount:*</label>
        <input v-model="form.amount" class="input-field">
        <span class="text-sm font-medium text-red-500">Note that plan amount must be available in your account balance
          of
          {{ formatNumberAsDollar(userData?.accountBalance) ?? '0.00' }}.</span>
      </div>
      <button :class="[
      !isFormEmpty || processing ? 'opacity-25 cursor-not-allowed' : '',
    ]" :disabled="!isFormEmpty" class="w-full text-white text-sm rounded-lg bg-black py-3">
        {{ processing ? 'processing....' : 'Proceed' }}
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const processing = ref(false);
const userData = ref<any>({});
const form = ref({
  plan: '',
  amount: ''
});

const isFormEmpty = computed(() => {
  return !!(form.value.plan && form.value.amount);
});

onMounted(() => {
  getUserInfo();
});

const buyPlan = async () => {
  processing.value = true;
  const accessToken = JSON.parse(window.localStorage.getItem('auth') || '""');

  const buyPlanMutation = `
    mutation {
      buyPlan(amount: ${form.value.amount}, planType: "${form.value.plan}")
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
        query: buyPlanMutation,
        variables: {
          amount: form.value.amount,
          planType: form.value.plan
        }
      })
    });
    
    const data = await response.json();
    if (data?.errors) {
      window.$toastr?.e(data.errors[0].message);
    } else {
      window.$toastr?.s('You have successfully purchased a plan');
      form.value.amount = '';
      form.value.plan = '';
    }
  } finally {
    processing.value = false;
  }
};

const formatNumberAsDollar = (number: number | null | undefined) => {
  return number?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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
      userData.value = data.data.getUser;
    }
  } finally {
    processing.value = false;
  }
};
</script>

<script lang="ts">
definePageMeta({
  layout: 'updated-user-dashboard'
})
</script>


<style></style>
