<template>
  <main class="space-y-6">
    <section class="border-[0.5px] shadow rounded-lg border-gray-300">
      <dl class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-3">
        <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
          <dt class="text-sm/6 font-medium text-gray-500">Account balance</dt>
          <dd class="text-xs font-medium text-gray-700">+4.75%</dd>
          <dd class="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">{{
            formatNumberAsDollar(userData?.accountBalance) ?? '0.00' }}</dd>
        </div>
        <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
          <dt class="text-sm/6 font-medium text-gray-500">Profit</dt>
          <dd class="text-xs font-medium text-rose-600">+54.02%</dd>
          <dd class="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900"> {{
            formatNumberAsDollar(userData?.profit) ?? '0.00' }}</dd>
        </div>
        <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
          <dt class="text-sm/6 font-medium text-gray-500">Trading</dt>
          <dd class="text-xs font-medium text-gray-700">-1.39%</dd>
          <dd class="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900"> {{
            formatNumberAsDollar(userData?.tradingBalance) ?? '0.00' }}</dd>
        </div>
      </dl>
    </section>

    <TradingViewTable />
    <iframe src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_68d44" width="100%" height="400"
      frameborder="0" allowfullscreen></iframe>
    <div class="">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold text-gray-900">Recent Transactions</h1>
          <p class="mt-2 text-sm text-gray-700">A list of all your recent transactions.</p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <NuxtLink to="/dashboard/deposit"
            class="block rounded-md bg-black px-3 py-2 text-center text-sm font-semibold text-white hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
            Deposit Funds</NuxtLink>
        </div>
      </div>
      <div v-if="!loadingTransactions && transactionsList?.length" class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="">
                <tr class="border-[0.5px] border-gray-100 rounded-lg">
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Info
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Transaction Date</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <!-- <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span class="sr-only">Edit</span>
                  </th> -->
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(item, index) in transactionsList" :key="index">
                  <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div class="flex items-center">
                      <div class="h-11 w-11 flex-shrink-0">
                        <img class="h-11 w-11 rounded-full"
                          :src="item?.proof"
                          alt="">
                      </div>
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">{{ item?.transactionType }}</div>
                        <!-- <div class="mt-1 text-gray-500">lindsay.walton@example.com</div> -->
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div class="text-gray-900">{{ formatDateTime(item?.timeAdded) ?? 'N/A' }}</div>
                    <!-- <div class="mt-1 text-gray-500">Optimization</div> -->
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <span class="px-3 py-1 font-semibold rounded-md text-white"
                      :class="[item?.transactionStatus === 'Approved' ? 'bg-green-500' : item?.transactionStatus === 'Pending' ? 'bg-yellow-500' : item?.transactionStatus === 'Declined' ? 'bg-red-500' : 'bg-violet-400']">
                      <span> {{ item?.transactionStatus }}</span>
                    </span>
                    <!-- <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Active</span> -->
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500"> {{ formatNumberAsDollar(item?.amount)
                    }}</td>
                  <!-- <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, Lindsay
                        Walton</span></a>
                  </td> -->
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>

      <loader v-else-if="loadingTransactions && !transactionsList.length" />
      <p v-else class="text-center font-medium py-20 border-[0.5px] rounded-lg border-gray-100 mt-6">
        No Transactions Available
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const loading = ref(false);
const userData = ref<any>({});
const loadingTransactions = ref(false);
const transactionsList = ref<any[]>([]);
const assetsList = ref([
  {
    name: 'BTC',
    price: '$214.08',
    rate: '+0.23%',
    balance: '122,356',
    proportion: 75,
    icon: 'binance'
  },
  {
    name: 'ETH',
    price: '$214.08',
    rate: '+0.23%',
    balance: '122,356',
    proportion: 14,
    icon: 'eth'
  }
]);

onMounted(() => {
  getUserInfo();
  fetchTransactions();
});

const getUserInfo = async () => {
  loading.value = true;
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
    loading.value = false;
  }
};

const fetchTransactions = async () => {
  loadingTransactions.value = true;
  const accessToken = JSON.parse(window.localStorage.getItem('auth') || '""');
  const query = `
    query {
      getUsersTransactions {
        id
        amount
        wallet
        transactionType
        transactionStatus
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
        proof
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
      transactionsList.value = data.data.getUsersTransactions;
    }
  } finally {
    loadingTransactions.value = false;
  }
};

const formatNumberAsDollar = (number: number | null | undefined) => {
  return number?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const formatDateTime = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (!isNaN(dateObj.getTime())) {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }
  return 'Invalid Date';
};

definePageMeta({
  layout: 'updated-user-dashboard'
})
</script>
