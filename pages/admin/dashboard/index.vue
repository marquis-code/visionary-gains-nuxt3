<template>
  <main class="space-y-10">
    <div class="bg-gray-900 rounded-lg">
  <div class="mx-auto max-w-7xl">
    <div class="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="(item, index) in computedStats" :key="index" class="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
        <p class="text-sm/6 font-medium text-gray-400">{{ item.name }}</p>
        <p class="mt-2 flex items-baseline gap-x-2">
          <span class="text-4xl font-semibold tracking-tight text-white">{{ item.count }}</span>
        </p>
      </div>
    </div>
  </div>
</div>

    <TradingViewTable />
    <iframe src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_68d44" width="100%" height="400"
      frameborder="0" allowfullscreen></iframe>

    <!-- <div>
      <h1 class="text-white font-medium">
        Statistics
      </h1>
    </div>
    <div v-if="!loading" class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 ">
      <div v-for="(item, index) in computedStats" :key="index"
        class="h-32 rounded-lg bg-black flex items-center gap-x-3 pl-6">
        <div :class="item.classStyle" class="rounded-full h-10 w-10 flex justify-center items-center">
        </div>
        <div>
          <h1 class="text-xl font-medium text-white">
            {{ item.count }}
          </h1>
          <p class="text-sm text-gray-100">
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
      <loader v-for="itm in 4" :key="itm" />
    </div>
    <div class="lg:flex w-full gap-x-10 pt-6 space-y-6 lg:space-y-0">
      <div class="h-full rounded-lg lg:w-6/12 py-3 bg-gray-200 border space-y-6">
        <div class="flex justify-between items-center px-6">
          <p class="font-medium">
            Active Visitors
          </p>
          <div>
            <select class="border outline-none rounded-md bg-gray-100 text-sm px-3 py-2.5">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>
        <graph-3 />
      </div>
      <div class="h-full rounded-lg lg:w-6/12 py-3 bg-gray-200 border space-y-6">
        <div class="flex justify-between items-center px-6">
          <p class="font-medium">
            Wallet Usage
          </p>
          <div>
            <select class="border outline-none rounded-md bg-gray-100 text-sm px-3 py-2.5">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>
        <graph-4 />
      </div>
    </div> -->
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const stats = ref<any>({});
const loading = ref(false);

const computedStats = computed(() => [
  {
    name: 'Total Profit',
    count: formatNumberAsDollar(stats.value.totalProfit) ?? 'N/A',
    icon: 'funds',
    classStyle: 'bg-pink-500',
  },
  {
    name: 'Total Withdrawals',
    count: formatNumberAsDollar(stats.value.totalWithdrawal) ?? 'N/A',
    icon: 'customers',
    classStyle: 'bg-blue-500',
  },
  {
    name: 'Total Users',
    count: stats.value.totalUsers ?? 'N/A',
    icon: 'users',
    classStyle: 'bg-green-500',
  },
  {
    name: 'Total Deposits',
    count: formatNumberAsDollar(stats.value.totalDeposits) ?? 'N/A',
    icon: 'users',
    classStyle: 'bg-yellow-500',
  },
]);

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
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      if (data?.errors) {
        window.$toastr?.e(data.errors[0].message);
      } else {
        stats.value = data.data.getAdminStats;
      }
    } finally {
      loading.value = false;
    }
  }
};

const goBack = () => {
  router.go(-1);
};

const formatNumberAsDollar = (number: number | null | undefined) => {
  return number?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

onMounted(fetchAdminStats);

definePageMeta({
  layout: 'updated-admin-dashboard',
})
</script>