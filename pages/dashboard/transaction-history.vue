<template>
  <main>
    <Transition name="fade">
      <!-- <b-container> -->
      <section class="text-white">
        <div class="flex items-center justify-between my-3">
          <button class="outline-none border bg-gray-200 text-black px-3 py-1 rounded-md text-sm" @click="goBack()">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none"
              stroke="#747070" stroke-width="2" stroke-linecap="square" stroke-linejoin="bevel">
              <path d="M19 12H6M12 5l-7 7 7 7" />
            </svg>
          </button>
        </div>

        <div class="sm:flex-1 pb-0 mt-3">
          <label for="search" class="sr-only">Search</label>

          <input v-model="search" type="text" placeholder="Search.."
            class="input-field">
        </div>
        <b-card class="mt-3">
          <b-table striped show-empty responsive :items="transactionsList" :fields="fields" :busy="loading"
            :current-page="currentPage" :per-page="perPage">
            <template #table-busy>
              <div class="text-center my-2 cursor-pointer">
                <b-spinner class="align-middle" />
                <small>Loading...</small>
              </div>
            </template>

            <template #empty>
              <p class="text-center text-sm text-secondary py-2 cursor-pointer">
                {{
            search
              ? `No Transactions found for search value: "${search}"`
              : "No Transactions available"
          }}
              </p>
            </template>

            <template #cell(sn)="data">
              <div class="py-4">
                <span class="font-medium py-2 text-sm cursor-pointer">
                  {{ data.index + 1 }}</span>
              </div>
            </template>

            <template #cell(amount)="data">
              <div class="py-4">
                <span class="font-medium py-2 text-sm cursor-pointer">
                  {{
            formatNumberAsDollar(data?.item?.amount)
          }}
                </span>
              </div>
            </template>

            <template #cell(wallet)="data">
              <div class="py-4">
                <span class="font-medium py-2 text-sm cursor-pointer">
                  {{
            data?.item?.wallet }}</span>
              </div>
            </template>

            <template #cell(transactionType)="data">
              <div class="py-4">
                <span class="font-medium py-2 text-sm">
                  {{ data?.item?.transactionType }}</span>
              </div>
            </template>

            <template #cell(transactionStatus)="data">
              <div class="py-4">
                <span class="font-medium py-2 text-sm cursor-pointer">
                  {{
            data?.item?.transactionStatus }}</span>
              </div>
            </template>

            <template #cell(proof)="data">
              <div class="py-4">
                <span v-if="data?.item?.proof" class="font-medium py-2 text-sm">
                  <enlargeable-image :src="data.item.proof" class="z-50" animation_duration="700">
                    <img class="h-10 w-10 rounded-full" alt="" :src="data?.item?.proof">
                  </enlargeable-image>
                </span>
                <span v-else>N/A</span>
              </div>
            </template>

            <template #cell(timeAdded)="data">
              <div class="py-4">
                <span class="font-medium py-2 text-sm">{{ formatDateTime(data?.item?.timeAdded) }}</span>
              </div>
            </template>
          </b-table>

          <div class="flex justify-end items-end">
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" size="md" class="my-3" />
          </div>
        </b-card>
        <!-- </div> -->
      </section>
      <!-- </b-container> -->
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import EnlargeableImage from '@diracleo/vue-enlargeable-image';

const transactionsList = ref<any[]>([]);
const fields = ref([
  {
    key: 'sn',
    label: 'S/N',
    class: 'font-medium text-gray-400 text-sm'
  },
  {
    key: 'amount',
    label: 'Amount',
    class: 'font-medium text-gray-400 text-sm'
  },
  {
    key: 'wallet',
    label: 'Wallet',
    class: 'font-medium text-gray-400 text-sm'
  },
  {
    key: 'transactionType',
    label: 'Transaction Type',
    class: 'font-medium text-gray-400 text-sm'
  },
  {
    key: 'transactionStatus',
    label: 'Transaction Status',
    class: 'font-medium text-gray-400 text-sm'
  },
  {
    key: 'proof',
    label: 'Proof',
    class: 'font-medium text-gray-400 text-sm'
  },
  {
    key: 'timeAdded',
    label: 'Date',
    class: 'font-medium text-gray-400 text-sm'
  }
]);

const currentPage = ref(1);
const perPage = ref(6);
const search = ref('');
const showModal = ref(false);
const totalRows = ref(1);
const loading = ref(false);

onMounted(() => {
  fetchTransactions();
  totalRows.value = transactionsList.value.length;
});

const fetchTransactions = async () => {
  loading.value = true;
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
      totalRows.value = data.data.getUsersTransactions.length;
    }
  } finally {
    loading.value = false;
  }
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

const formatNumberAsDollar = (number: number | null | undefined) => {
  return number?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const goBack = () => {
  window.history.back();
};
</script>

<script lang="ts">
export default {
  name: 'Objective',
  components: {
    EnlargeableImage
  },
  layout: 'user-dashboard',
  scrollToTop: true
};
</script>


<style scoped>
.fade-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.fade-leave-to {
  transform: scale(0.8);
}
</style>
