<template>
  <main class="lg:flex justify-start items-start gap-x-10 space-y-10 lg:space-y-0">
    <section class="bg-white lg:w-5/12 rounded-md border">
      <p class="border-b text-sm font-semibold py-4 pl-6">
        Enter amount and upload proof of payment
      </p>
      <form class="p-6 space-y-6" @submit.prevent="handleWithdrawal">
        <div class="space-y-1">
          <label class="text-xs text-gray-700 font-medium">Amount</label>
          <input v-model="form.amount" placeholder="Enter amount in USD" type="number"
            class="py-3 border border-gray-600 text-sm rounded-md w-full outline-none pl-6">
        </div>
        <div class="space-y-4">
          <label class="text-xs text-gray-700 font-medium">Withdrawal Type</label>
          <select v-model="form.withdrawalType"
            class="py-3 border border-gray-600 text-sm rounded-md w-full outline-none pl-6">
            <option value="" disabled>
              ---- Select withdrawal type -----
            </option>
            <option value="bitcoin">
              Bitcoin
            </option>
            <option value="ethereum">
              Etheruem
            </option>
            <option value="bank">
              Bank Account
            </option>
          </select>
          <!-- <div class="space-y-1">
            <label class="text-xs text-gray-700 font-medium">Wallet address</label>
            <input readonly :value="computedWalletAddress" class="py-2.5 bg-gray-100 cursor-not-allowed border border-gray-600 text-sm rounded-md w-full outline-none pl-6">
          </div> -->
          <div class="space-y-1">
            <label class="text-xs text-gray-700 font-medium">Wallet address</label>
            <input v-model="form.wallet"
              class="py-3 bg-gray-50 border border-gray-600 text-sm rounded-md w-full outline-none pl-6">
          </div>
          <div class="w-full pt-6">
            <button :disabled="!isFormEnabled || processing"
              class="w-full text-white disabled:cursor-not-allowed disabled:opacity-25  bg-black py-3 px-3 rounded-md">
              {{ processing ? 'processing..' : 'Submit' }}
            </button>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ApiLoader from '@/components/ApiLoader.vue';

const depositType = ref<string>('');
const imagePreview = ref<string | null>(null);
const loadingAdminInfo = ref(false);
const processing = ref(false);
const loading = ref(false);
const adminData = ref<any>({});
const form = ref({
  amount: '',
  transactionType: '',
  proof: '',
  wallet: '',
  withdrawalType: ''
});

const computedWalletAddress = computed(() => {
  if (form.value.withdrawalType === 'bitcoin') {
    return computedWalletInfo.value[0].code;
  }
  if (form.value.withdrawalType === 'ethereum') {
    return computedWalletInfo.value[1].code;
  }
  if (form.value.withdrawalType === 'bank') {
    return computedWalletInfo.value[2].code;
  }
  return '';
});

const isFormEnabled = computed(() => {
  return !!(form.value.amount && form.value.withdrawalType);
});

const computedWalletInfo = computed(() => {
  return Object.keys(adminData.value).length
    ? [
        { name: 'Bitcoin', code: adminData.value.admin?.btc ?? 'N/A' },
        { name: 'Ethereum erc-20', code: adminData.value.admin?.eth ?? 'N/A' },
        { name: 'Bank Account', code: '00907654378889' }
      ]
    : [
        { name: 'Bitcoin', code: '' },
        { name: 'Ethereum erc-20', code: '' },
        { name: 'Bank Account', code: '' }
      ];
});

onMounted(() => {
  getAdminInfo();
});

const copy = (val: string) => {
  const cb = window.navigator.clipboard;
  cb.writeText(val).then(() => window.$toastr?.s('Copied to clipboard'));
};

const handleWithdrawal = async () => {
  processing.value = true;
  const accessToken = JSON.parse(window.localStorage.getItem('auth') || '""');

  const withdrawalMutation = `
    mutation newTransaction($input: NewTransaction!) {
      newTransaction(input: $input)
    }
  `;

  try {
    const response = await fetch('https://api.visionarygains.com/graphql/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        query: withdrawalMutation,
        variables: {
          input: {
            amount: form.value.amount,
            transactionType: 'Withdrawal',
            proof: '',
            wallet: form.value.wallet
          }
        }
      })
    });

    const data = await response.json();
    if (data?.errors) {
      window.$toastr?.e(data.errors[0].message);
    } else {
      window.$toastr?.s('You have successfully initiated a withdrawal');
      form.value.amount = '';
      form.value.wallet = '';
      form.value.transactionType = '';
    }
  } finally {
    processing.value = false;
  }
};

const getAdminInfo = async () => {
  loadingAdminInfo.value = true;
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
    const response = await fetch('https://api.visionarygains.com/graphql/query', {
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
      adminData.value = data.data.getUser;
    }
  } finally {
    loadingAdminInfo.value = false;
  }
};
</script>

<script lang="ts">
export default {
  components: { ApiLoader },
  layout: 'user-dashboard'
};
</script>


<style></style>
