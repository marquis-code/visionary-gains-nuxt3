<template>
  <main class="lg:flex justify-start items-start gap-x-10 space-y-10 lg:space-y-0">
    <section class="bg-white lg:w-7/12 rounded-md border">
      <div class="border-b pl-6 py-4 text-sm font-semibold">
        <h1 class="text-sm text-gray-600">
          Fund Your Account
        </h1>
        <p class="text-gray-500 text-xs font-light">
          copy wallet address of your intended payment method
        </p>
      </div>

      <div class="p-6 space-y-6">
        <div v-for="(value, key) in adminData?.admin" :key="key"
     class="flex items-center justify-between w-full gap-x-6">
  <div class="space-y-1 w-full">
    <label class="input-label">{{ key.toUpperCase() }}</label>
    <input ref="myinput" readonly :value="value"
           class="py-3 border rounded-md w-full outline-none pl-6 text-sm font-light"
           @focus="$event.target.select()">
  </div>
  <div class="flex justify-center items-center pt-7">
    <img src="@/assets/img/copy.png" class="h-4 w-4 py cursor-pointer" alt="" @click="copy(value)">
  </div>
</div>

        <div class="">
          <a href="http://bitcoin.com/" target="_blank" class="bg-black text-sm px-6  mt-5 py-3 rounded-md text-white">Buy
            Crypto</a>
        </div>
      </div>
      <!-- <api-loader v-else /> -->
    </section>
    <section class="bg-white lg:w-5/12 rounded-md border">
      <p class="border-b text- font- py-4 pl-6">
        Enter amount and upload proof of payment
      </p>
      <form class="p-6 space-y-6" @submit.prevent="handleDeposit">
        <div class="space-y-1">
          <label class="input-label">Deposit Amount</label>
          <input v-model="form.amount" placeholder="Enter amount in USD" type="number"
            class="input-field">
        </div>
        <div class="space-y-4">
         <div>
          <label class="input-label">Deposit Type</label>
          <select v-model="form.depositType"
            class="input-field">
            <option value="" disabled>
              ---- Select deposit type -----
            </option>
            <option :value="itm.key" v-for="(itm, idx) in depositTypeArray" :key="idx">
              {{ itm.name }}
            </option>
          </select>
         </div>
          <div class="">
            <label class="input-label">Wallet address</label>
            <input readonly :value="computedWalletAddress"
              class="input-field">
          </div>
          <div class="">
            <label class="input-label">Upload Image</label>
            <div v-if="!imagePreview" class="max-w-2xl mx-auto">
              <div class="flex items-center justify-center w-full">
                <label for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                        upload</span> or drag and drop</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" @change="handleProofUpload">
                </label>
              </div>
            </div>
            <div v-else>
              <img :src="imagePreview" alt="image preview" class="w-full h-32 object-cover object-center">
            </div>
          </div>
          <div class="w-full pt-6">
            <button :disabled="!isFormEnabled || processing"
              class="w-full text-white disabled:cursor-not-allowed disabled:opacity-25  bg-black py-3.5 px-3 rounded-md">
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

const depositType = ref<string>('');
const imagePreview = ref<string | null>(null);
const adminData = ref<any>({});
const processing = ref(false);
const loadingAdminInfo = ref(false);
const form = ref({
  amount: '',
  depositType: '',
  proof: '',
  walletAddress: ''
});
const depositTypeArray = ref<Array<{ name: string; key: string }>>([]);

const computedWalletAddress = computed(() => {
  if (form.value.depositType === 'bitcoin') return computedWalletInfo.value[0].code;
  if (form.value.depositType === 'ethereum') return computedWalletInfo.value[1].code;
  if (form.value.depositType === 'bank') return computedWalletInfo.value[2].code;
  return '';
});

const isFormEnabled = computed(() => !!(form.value.amount && form.value.depositType && form.value.proof));

definePageMeta({
  layout: 'updated-user-dashboard'
})

const computedWalletInfo = computed(() => {
  if (Object.keys(adminData.value).length) {
    return [
      {
        name: 'Bitcoin',
        code: adminData.value?.admin?.btc ?? 'N/A'
      },
      {
        name: 'Ethereum erc-20',
        code: adminData.value?.admin?.eth ?? 'N/A'
      },
      {
        name: 'Bank Account',
        code: ''
      }
    ];
  } else {
    return [
      {
        name: 'Bitcoin',
        code: ''
      },
      {
        name: 'Ethereum erc-20',
        code: ''
      },
      {
        name: 'Bank Account',
        code: ''
      }
    ];
  }
});

onMounted(() => {
  getAdminInfo();
});

const copy = (val: string) => {
  const cb = window.navigator.clipboard;
  cb.writeText(val).then(() => window.$toastr?.s('Copied to clipboard'));
};

const handleProofUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.value = reader.result as string;
      form.value.proof = reader.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.value = null;
  }
};

const handleDeposit = async () => {
  processing.value = true;
  const accessToken = JSON.parse(window.localStorage.getItem('auth') || '""');
  const depositMutation = `
    mutation newTransaction($input: NewTransaction!) {
      newTransaction(input: $input)
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
        query: depositMutation,
        variables: {
          input: {
            amount: form.value.amount,
            transactionType: 'Deposit',
            proof: form.value.proof,
            wallet: computedWalletAddress.value
          }
        }
      })
    });
    const data = await response.json();
    if (data?.errors) {
      window.$toastr?.e(data.errors[0].message);
    } else {
      window.$toastr?.s('You have successfully initiated a transaction');
      form.value.amount = '';
      form.value.depositType = '';
      form.value.proof = '';
    }
  } finally {
    processing.value = false;
  }
};

const populateDepositArray = (data: any) => {
  console.log(data, 'populated fdata')
  if (data.admin?.btc?.length) {
    depositTypeArray.value.push({ name: 'Bitcoin', key: 'bitcoin' });
  }

  if (data.admin?.eth?.length) {
    depositTypeArray.value.push({ name: 'Ethereum', key: 'ethereum' });
  }

  if (data?.admin?.bank?.length) {
    depositTypeArray.value.push({ name: 'Bank', key: 'bank' });
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
        admin {
          eth
          btc
        }
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
    loadingAdminInfo.value = false;
    if (data?.errors) {
      window.$toastr?.e(data.errors[0].message);
    } else {
      adminData.value = data.data.getUser;
      populateDepositArray(adminData.value);
    }
  } finally {
    loadingAdminInfo.value = false;
  }
};

</script>

