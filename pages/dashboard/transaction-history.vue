<template>
  <main>
    <Transition name="fade">
      <!-- <b-container> -->
      <section class="t">
        <!-- <div class="sm:flex-1 pb-0 mt-3">
          <label for="search" class="sr-only">Search</label>

          <input v-model="search" type="text" placeholder="Search.."
            class="input-field">
        </div>-->
        <div class>
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-base font-semibold text-gray-900">Transactions</h1>
              <p
                class="mt-2 text-sm text-gray-700"
              >A list of all the transactions in.</p>
            </div>
          </div>
          <div v-if="transactionsList.length && !loading" class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >Amount</th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >Wallet</th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >Transaction Type</th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >Transaction Status</th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >Proof</th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >Date</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                      <tr v-for="(item, idx) in transactionsList" :key="idx">
                        <td
                          class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                        >
                          {{
                            formatNumberAsDollar(item?.amount)
                          }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {{
                            item?.wallet
                          }}
                        </td>
                        <td
                          class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >{{ item?.transactionType }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {{
                            item?.transactionStatus
                          }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div class="py-4">
                            <span v-if="item?.proof" class="font-medium py-2 text-sm">
                              <enlargeable-image
                                :src="item.proof"
                                class="z-50"
                                animation_duration="700"
                              >
                                <img class="h-10 w-10 rounded-full" alt :src="item?.proof" />
                              </enlargeable-image>
                            </span>
                            <span v-else>N/A</span>
                          </div>
                        </td>
                        <td
                          class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >{{ formatDateTime(item?.timeAdded) }}</td>
                        <td
                          class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                        >
                          <a href="#" class="text-indigo-600 hover:text-indigo-900">
                            Edit
                            <span class="sr-only">, Lindsay Walton</span>
                          </a>
                        </td>
                      </tr>

                      <!-- More people... -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <loader v-else-if="loading && !transactionsList.length" />
          <p v-else class="text-center font-medium py-20 border-[0.5px] rounded-lg border-gray-100 mt-6">
            No Transactions Available
          </p>
        </div>
      </section>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import EnlargeableImage from '@diracleo/vue-enlargeable-image';

definePageMeta({
  layout: 'updated-user-dashboard'
})

const transactionsList = ref<any[]>([]);

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
