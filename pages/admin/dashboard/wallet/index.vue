<template>
  <main>
    <main class="space-y-10">
      <div class="flex justify-between items-center">
        <h1 class="text-white font-medium">
          Overview
        </h1>
        <button type="button" class="px-3 py-2 rounded-full text-white bg-black"
          @click="updateProfitModal = true">
          Update profit
        </button>
      </div>
      <div v-if="!loading" class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div v-for="(item, index) in computedCards" :key="index"
          class="h-32 rounded-lg bg-black flex items-center justify-between gap-x-3 pl-3 relative">
          <div class="flex items-center gap-x-2">
            <div class="rounded-full h-16 w-16 flex justify-center items-center">
              <!-- <img :src="require(`~/assets/img/${item.icon}.png`)" alt="stat icon"> -->
            </div>
            <div>
              <h1 class="text-xl font-medium text-white">
                {{ item.count }}
              </h1>
              <p class="text-2xl text-gray-100">
                {{ item.name }}
              </p>
            </div>
          </div>
          <div v-if="item.value !== 'bank'" class="absolute top-3 right-2 cursor-pointer">
            <button class="flex items-center gap-x-3 border-white border px-3 py-2.5 rounded-md"
              @click="handleWalletModal(item)">
              <span class="text-white">Update</span>
              <img class="cursor-pointer" src="@/assets/icons/more.svg" alt="more">
            </button>
          </div>
        </div>
      </div>
      <div v-else class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <loader v-for="itm in 3" :key="itm" />
      </div>
    </main>
    <CoreModal id="wallet-update" @update:show="updateWalletModal = $event" :show="updateWalletModal">
      <div class="flex justify-center items-center">
        <h1 class="text-lg font-semibold text-black">
          {{ Object.keys(selectedWallet).length ? `Update ${selectedWallet?.walletName} wallet` : 'Update Wallet' }}
        </h1>
      </div>
      <form class="mt-8 gap-6 w-full space-y-6" @submit.prevent="updateWallet">
        <div class="col-span-6 sm:col-span-6">
          <label for="walletName" class="block text-sm font-medium text-gray-700">
            Wallet Name
          </label>

          <select id="walletName" v-model="selectedWallet.value" disabled readonly
            class="mt-1 disabled:cursor-not-allowed bg-gray-100 w-full px-3 py-3 border outline-none rounded-md border-gray-200 text-sm text-gray-700 shadow-sm">
            <option value="btc">
              BitCoin
            </option>
            <option value="eth">
              Ethereum
            </option>
            <option value="bank">
              Bank
            </option>
          </select>
        </div>

        <div class="col-span-6 sm:col-span-6">
          <label for="walletAddress" class="block text-sm font-medium text-gray-700">
            Wallet Address
          </label>

          <input id="walletAddress" v-model="selectedWallet.address" type="text" name="walletAddress"
            class="mt-1 w-full px-3 py-3 border outline-none rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
        </div>

        <div class="w-full flex justify-between items-center gap-x-4">
          <button type="button"
            class="w-full rounded-md border disabled:cursor-not-allowed disabled:opacity-25 bg-gray-500 px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring "
            @click="updateWalletModal = false">
            Cancel
          </button>
          <button type="submit" :disabled="!isFormEmpty || processing"
            class="w-full rounded-md border text-sm disabled:cursor-not-allowed disabled:opacity-25 border-black bg-black px-12 py-3 font-medium text-white transition  focus:outline-none focus:ring">
            {{ processing ? 'saving...' : `Update ${selectedWallet.name} wallet` }}
          </button>
        </div>
      </form>
    </CoreModal>

    <CoreModal id="update-profit-modal" @update:show="updateProfitModal = $event" :show="updateProfitModal">
      <div class="flex justify-center items-center">
        <h1 class="text-lg font-semibold text-black">
          Update Profit Form
        </h1>
      </div>
      <form class="mt-8 gap-6 w-full space-y-6" @submit.prevent="handleProfitUpdate">
        <div class="col-span-6 sm:col-span-6">
          <label for="status" class="block text-sm font-medium text-gray-700">
            Profit Status
          </label>

          <select id="status" v-model="profitUpdate.status"
            class="mt-1 disabled: cursor-not-allowed bg-gray-100 w-full px-3 py-3 border outline-none rounded-md border-gray-200 text-sm text-gray-700 shadow-sm">
            <option value="+">
              Increase
            </option>
            <option value="-">
              Decrease
            </option>
          </select>
        </div>

        <div class="col-span-6 sm:col-span-6">
          <label for="updateAmount" class="block text-sm font-medium text-gray-700">
            Amount
          </label>

          <input id="updateAmount" v-model="profitUpdate.amount" type="tel" name="updateAmount"
            class="mt-1 w-full px-3 py-3 border outline-none rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
        </div>

        <div class="w-full flex justify-between items-center gap-x-4">
          <button type="button"
            class="w-full rounded-md border disabled:cursor-not-allowed disabled:opacity-25 bg-gray-500 px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring "
            @click="updateProfitModal = false">
            Cancel
          </button>
          <button type="submit" :disabled="!isUpdateFormEmpty || processingProfitUpdate"
            class="w-full rounded-md border text-sm disabled:cursor-not-allowed disabled:opacity-25 border-black bg-black px-12 py-3 font-medium text-white transition  focus:outline-none focus:ring">
            {{ processing ? 'saving...' : 'Update profit' }}
          </button>
        </div>
      </form>
    </CoreModal>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const updateProfitModal = ref(false)
const updateWalletModal = ref(false)

const loading = ref(false);
const showModal = ref(false);
const tradingBalance = ref<string>('');
const updateProfitStatus = ref<string | null>(null);
const processingProfitUpdate = ref(false);
const selectedWallet = ref<any>({});
const profitUpdate = ref({
  status: '',
  amount: ''
});
const form = ref({
  name: '',
  address: ''
});
const updatedUserData = ref<any>({});
const processing = ref(false);

const isFormEmpty = computed(() => !!(selectedWallet.value.name && selectedWallet.value.address));
const isUpdateFormEmpty = computed(() => !!(profitUpdate.value.amount && profitUpdate.value.status));

const computedCards = computed(() => [
  {
    name: 'Trading Balance',
    value: 'bank',
    walletName: 'Bank Account',
    count: formatNumberAsDollar(tradingBalance.value) ?? 'N/A',
    address: '',
    icon: 'wallet',
    classStyle: 'bg-green-500'
  },
  {
    name: 'BTC',
    value: 'btc',
    walletName: 'Bitcoin',
    count: '',
    address: updatedUserData.value.btc ?? 'N/A',
    icon: 'bit',
    classStyle: 'bg-pink-500'
  },
  {
    name: 'ETH',
    value: 'eth',
    walletName: 'Ethereum',
    count: '',
    address: updatedUserData.value.eth ?? 'N/A',
    icon: 'eth',
    classStyle: 'bg-blue-500'
  }
]);

onMounted(() => {
  fetchAdminStats();
  getUserInfo();
});

const handleClick = () => {
  showModal.value = true;
};

const handleWalletModal = (item: any) => {
  selectedWallet.value = item;
  updateWalletModal.value = true; // Adjust as per your modal display logic
};

const updateWallet = async () => {
  processing.value = true;
  if (process.client) {
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

    const input = selectedWallet.value.value === 'btc'
      ? { btc: selectedWallet.value.address }
      : selectedWallet.value.value === 'eth'
      ? { eth: selectedWallet.value.address }
      : {
        btc: selectedWallet.value.address,
        eth: selectedWallet.value.address
      };

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
            input
          }
        })
      });
      const data = await response.json();
      if (data?.errors) {
        window.$toastr?.e(data.errors[0].message);
      } else {
        window.$toastr?.s(`${selectedWallet.value.name} wallet address was successfully updated`);
        updateWalletModal.value = false
        showModal.value = false; // Adjust as per your modal display logic
      }
    } finally {
      processing.value = false;
    }
  }
};

const fetchAdminStats = async () => {
  loading.value = true;
  if (process.client) {
    const accessToken = JSON.parse(window.localStorage.getItem('auth') || '""');
    const query = `
      query {
        getAdminStats {
          totalProfit
          totalWithdrawal
          totalUsers
          totalDeposits
          tradingBalance
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
        tradingBalance.value = data.data.getAdminStats.tradingBalance;
      }
    } finally {
      loading.value = false;
    }
  }
};

const handleProfitUpdate = async () => {
  processingProfitUpdate.value = true;
  if (process.client) {
    const accessToken = JSON.parse(window.localStorage.getItem('auth') || '""');
    const mutation = `
      mutation {
        updateProfits
      }
    `;

    try {
      const response = await fetch('https://visionary-zpui.onrender.com/graphql/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ query: mutation })
      });
      const data = await response.json();
      if (data?.errors) {
        window.$toastr?.e(data.errors[0].message);
      } else {
        updateProfitStatus.value = data.data.updateProfits;
        updateProfitModal.value = false
      }
    } finally {
      processingProfitUpdate.value = false;
      showModal.value = false; // Adjust as per your modal display logic
      fetchAdminStats();
    }
  }
};

const getUserInfo = async () => {
  loading.value = true;
  if (process.client) {
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
      loading.value = false;
    }
  }
};

const formatNumberAsDollar = (number: number | null | undefined) => {
  return number?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
definePageMeta({
  layout: 'updated-admin-dashboard',
})
</script>


<style></style>
