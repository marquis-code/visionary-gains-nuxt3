<template>
  <main>
    <Transition name="fade">
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
            class="w-full rounded-tr-md rounded-tl-md outline-none bg-white p-3 text-gray-700 transition border focus:border-white focus:outline-none focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent">
        </div>
        <b-card class="mt-3">
          <b-table striped show-empty responsive :items="filteredDeposits" :fields="fields" :busy="loading"
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
              <div class="font-medium py-4 text-sm cursor-pointer">
                {{ data.index + 1 }}
              </div>
            </template>

            <template #cell(amount)="data">
              <div class="font-medium py-4 text-sm cursor-pointer">
                {{
            formatNumberAsDollar(data?.item?.amount) ?? 'N/A'
          }}
              </div>
            </template>

            <template #cell(wallet)="data">
              <div class="font-medium py-4 text-sm cursor-pointer">
                {{
            data?.item?.wallet ?? 'N/A' }}
              </div>
            </template>

            <!-- <template #cell(transactionType)="data">
              <div class="font-medium py-4 text-sm">
                {{ data?.item?.transactionType ?? 'N/A' }}
              </div>
            </template> -->

            <template #cell(transactionStatus)="data">
              <div class="font-medium py-4 text-sm cursor-pointer">
                <span class="px-3 py-2 rounded-full text-sm"
                  :class="[data?.item?.transactionStatus === 'Pending' ? 'bg-yellow-500 text-white' : data?.item?.transactionStatus === 'Approved' ? 'text-white bg-green-500' : data?.item?.transactionStatus === 'Declined' ? 'text-white bg-red-500' : '']">
                  {{
            data?.item?.transactionStatus ?? 'N/A' }}
                </span>
              </div>
            </template>
            <template #cell(user)="data">
              <div class="font-medium text-sm cursor-pointer flex items-center gap-x-2 py-4">
                <div class="bg-gray-500 text-white rounded-full h-10 w-10 flex text-center justify-center items-center">
                  {{ getInitials(data?.item?.user?.firstName, data?.item?.user?.lastName) }}
                </div>
                <div>
                  <span>
                    {{
            data?.item?.user?.firstName
          }}
                  </span>
                  <span>
                    {{
              data?.item?.user?.lastName
            }}
                  </span><br>
                  <span>
                    {{
              data?.item?.user?.email
            }}
                  </span>
                </div>
              </div>
            </template>

            <template #cell(proof)="data">
              <div class="font-medium py-4 text-sm">
                <span v-if="data?.item?.proof">
                  <enlargeable-image :src="data?.item?.proof" class="z-50" animation_duration="700">
                    <img class="h-10 w-10 rounded-full" alt="" :src="data?.item?.proof">
                  </enlargeable-image>
                </span>
                <span v-else>N/A</span>
              </div>
            </template>

            <template #cell(timeAdded)="data">
              <div class="font-medium py-4 text-sm">
                {{ formatDateTime(data?.item?.timeAdded) ?? 'N/A' }}
              </div>
            </template>

            <template #cell(actions)="data">
              <div class="py-4">
                <div v-if="data?.item?.transactionStatus === 'Pending'" class="flex items-center gap-x-3">
                  <button class="text-white text-sm bg-green-500 w-full py-1.5 rounded-full"
                    @click="handleAction(data.item, 'approve')">
                    Approve
                  </button>
                  <button class="text-white text-sm bg-red-500 w-full py-1.5 rounded-full"
                    @click="handleAction(data.item, 'reject')">
                    Reject
                  </button>
                </div>
                <div v-else>
                  <button disabled class="bg-black text-white py-2 text-sm px-3 rounded-full">
                    Completed
                  </button>
                </div>
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import EnlargeableImage from '@diracleo/vue-enlargeable-image';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const router = useRouter();

const transactionsList = ref<any[]>([]);
const fields = ref([
  {
    key: 'sn',
    label: 'S/N',
    class: 'font-medium text-gray-400 text-sm'
  },
  {
    key: 'user',
    label: 'User',
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
  },
  {
    key: 'actions',
    label: 'Actions',
    class: 'font-medium text-end text-gray-400'
  }
]);

const currentPage = ref(1);
const perPage = ref(6);
const search = ref('');
const showModal = ref(false);
const totalRows = ref(1);
const loading = ref(false);
const processing = ref(false);

const filteredDeposits = computed(() => {
  const searchValue = search.value.toLowerCase();
  return transactionsList.value.filter((itm) => {
    return (
      itm?.user.firstName.toLowerCase().includes(searchValue) ||
      itm?.user.lastName.toLowerCase().includes(searchValue) ||
      itm?.email.toLowerCase().includes(searchValue)
    );
  });
});

onMounted(() => {
  fetchTransactions();
  totalRows.value = transactionsList.value.length;
});

const goBack = () => {
  router.go(-1);
};

const fetchTransactions = async () => {
  loading.value = true;
  if (process.client) {
    const accessToken = JSON.parse(window.localStorage.getItem('auth') || '""');
    const query = `
      query {
        getTransactions {
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
        transactionsList.value = data.data.getTransactions.filter(
          (itm) => itm.transactionType === 'Deposit'
        );
        totalRows.value = transactionsList.value.length;
      }
    } finally {
      loading.value = false;
    }
  }
};

const getInitials = (firstName: string, lastName: string) => {
  const firstInitial = firstName ? firstName.charAt(0) : '';
  const lastInitial = lastName ? lastName.charAt(0) : '';
  return `${firstInitial}${lastInitial}`;
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

const handleAction = (data: any, type: 'approve' | 'reject') => {
  Swal.fire({
    title: `${type === 'approve' ? 'Approve' : 'Reject'} Deposit`,
    text: "Please Note: You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Proceed!'
  }).then((result) => {
    if (result.isConfirmed) {
      processTransaction(data.id, type);
    } else {
      Swal.fire('Cancelled', 'Action was cancelled', 'info');
    }
  });
};

const processTransaction = async (transactionId: string, status: 'approve' | 'reject') => {
  processing.value = true;
  if (process.client) {
    const accessToken = JSON.parse(window.localStorage.getItem('auth') || '""');
    const statusType = status === 'approve' ? 'Approved' : 'Declined';
    const processTransactionQuery = `
      mutation ProcessTransaction($transactionID: String!, $status: TransactionStatus!) {
        processTransaction(transactionID: $transactionID, status: $status)
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
          query: processTransactionQuery,
          variables: {
            transactionID: transactionId,
            status: statusType
          }
        })
      });
      const data = await response.json();
      if (data?.errors) {
        window.$toastr?.e(data.errors[0].message);
      } else {
        window.$toastr?.s(`You have successfully ${status === 'approve' ? 'Approved' : 'Rejected'} this transaction.`);
      }
    } finally {
      processing.value = false;
    }
  }
};

const formatNumberAsDollar = (number: number | null | undefined) => {
  return number?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

definePageMeta({
  layout: 'dashboards',
})
</script>

<script lang="ts">
export default {
  components: {
    EnlargeableImage
  },
  layout: 'dashboards',
  scrollToTop: true
};
</script>


<style scoped>
.fade-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.fade-leave-active {
  transition: all 0.3as cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.fade-leave-to {
  transform: scale(0.8);
}
</style>
