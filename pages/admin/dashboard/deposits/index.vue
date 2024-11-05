<template>
  <main>
    <div class="">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-base font-semibold text-gray-900">Deposits</h1>
              <p class="mt-2 text-sm text-gray-700">
                A list of all deposits.
              </p>
            </div>
  
          </div>
          <div v-if="!loading && transactionsList?.length" class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
              >
                <div
                  class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"
                >
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          User
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Wallet
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Staus
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Proof
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          class="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span class="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                      <tr v-for="(item, index) in filteredDeposits" :key="index">
                        <td
                          class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                        >
                          <div
                            class="font-medium text-sm cursor-pointer flex items-center gap-x-2 py-4"
                          >
                            <div
                              class="bg-gray-500 text-white rounded-full h-10 w-10 flex text-center justify-center items-center"
                            >
                              {{
                                getInitials(
                                  item?.user?.firstName,
                                  item?.user?.lastName
                                )
                              }}
                            </div>
                            <div>
                              <span>
                                {{ item?.user?.firstName }}
                              </span>
                              <span>
                                {{ item?.user?.lastName }} </span
                              ><br />
                              <span>
                                {{ item?.user?.email }}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td
                          class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                        >
                          {{ formatNumberAsDollar(item?.amount) ?? "N/A" }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {{ item?.wallet?.length > 20 ? `${item.wallet.slice(0, 20)}...` : item?.wallet ?? "N/A" }}
                        </td>
                        <td
                          class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          <span
                            class="px-3 py-2 rounded-full text-sm"
                            :class="[
                              item?.transactionStatus === 'Pending'
                                ? 'bg-yellow-500 text-white'
                                : item?.transactionStatus === 'Approved'
                                ? 'text-white bg-green-500'
                                : item?.transactionStatus === 'Declined'
                                ? 'text-white bg-red-500'
                                : '',
                            ]"
                          >
                            {{ item?.transactionStatus ?? "N/A" }}
                          </span>
                        </td>
                        <td
                          class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          <img :src="item.proof" class="h-10 w-10 rounded-full" />
                        </td>
                        <td
                          class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          {{ formatDateTime(item?.timeAdded) ?? "N/A" }}
                        </td>
                        <td
                          class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                        >
                        <button
                    @click="toggleDropdown(index)"
                    class="inline-flex items-center text-sm font-medium text-[#667185] hover:text-black"
                  >
                    <svg
                      width="48"
                      height="44"
                      viewBox="0 0 48 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.9966 22H22.0041"
                        stroke="#292929"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M27 22H27.0075"
                        stroke="#1D2739"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17 22H17.0075"
                        stroke="#1D2739"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                          <div v-if="activeDropdown === index"
                          class="absolute -top-2 right-10 z-50 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg">
                          <ul class="py-1 text-sm text-gray-700 divide divide-y-[0.5px]">
                      <li>
                        <a
                          @click="handleAction(item, 'approve')"
                          href="#"
                          class="block flex items-center gap-x-2 px-4 py-3 hover:bg-gray-100 text-start"
                        >
                        Approve
                        </a>
                      </li>
                      <li>
                        <a
                          @click="handleAction(item, 'reject')"
                          href="#"
                          class="block flex items-center gap-x-2 px-4 py-3 hover:bg-gray-100 text-start"
                        >
                        Reject
                        </a>
                      </li>
                    </ul>
                        <!-- <div v-if="item?.transactionStatus === 'Pending'" class="flex items-center gap-x-3">
                          <button class="text-white text-sm bg-green-500 w-full py-1.5 rounded-full"
                            @click="handleAction(                                                              item, 'approve')">
                            Approve
                          </button>
                          <button class="text-white text-sm bg-red-500 w-full py-1.5 rounded-full"
                            @click="handleAction(                                                              item, 'reject')">
                            Reject
                          </button>
                        </div>
                        <div v-else>
                          <button disabled class="bg-black text-white py-2 text-sm px-3 rounded-full">
                            Completed
                          </button>
                        </div> -->
              </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <loader v-else-if="loading && !transactionsList.length" />
      <p v-else class="text-center font-medium py-20 border-[0.5px] rounded-lg text-gray-900 border-gray-100 mt-6">
        No Deposit Transactions Available
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import EnlargeableImage from '@diracleo/vue-enlargeable-image';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const router = useRouter();

const transactionsList = ref<any[]>([]);

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

const activeDropdown = ref<number | null>(null);

const toggleDropdown = (index: number) => {
  if (activeDropdown.value === index) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = index;
  }
};

// Function to close the dropdown
const closeDropdown = () => {
  activeDropdown.value = null;
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
  if (!isNaN(dateObj?.getTime())) {
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
  layout: 'updated-admin-dashboard',
})
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
