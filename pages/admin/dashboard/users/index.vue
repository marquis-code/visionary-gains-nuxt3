<!-- <template>
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
        <CoreModal class="mt-3">
          <b-table striped show-empty responsive :items="filteredUsers" :fields="fields" :busy="loading"
            :current-page="currentPage" :per-page="perPage">
            <template #table-busy>
              <div class="text-center my-2 cursor-pointer">
                <b-spinner class="align-middle" />
                <small>Loading...</small>
              </div>
            </template>

            <template #empty>
              <p class="text-center text-sm text-secondary py-4 cursor-pointer">
                {{
            search
              ? `No User found for search value: "${search}"`
              : "No Users available"
          }}
              </p>
            </template>

            <template #cell(sn)="data">
              <div class="font-medium py-4 text-sm cursor-pointer">
                {{ data.index + 1 }}
              </div>
            </template>

            <template #cell(user)="data">
              <div class="font-medium text-sm cursor-pointer flex items-center gap-x-2 py-4">
                <div class="bg-gray-500 text-white rounded-full h-10 w-10 flex text-center justify-center items-center">
                  {{ getInitials(data?.item?.firstName, data?.item?.lastName) }}
                </div>
                <div>
                  <span>
                    {{
            data?.item?.firstName
          }}
                  </span>
                  <span>
                    {{
              data?.item?.lastName
            }}
                  </span><br>
                  <span>
                    {{
              data?.item?.email
            }}
                  </span>
                </div>
              </div>
            </template>
            <template #cell(planType)="data">
              <div class="font-medium py-4 text-sm">
                {{ data?.item?.planType ?? 'N/A' }}
              </div>
            </template>

            <template #cell(accountBalance)="data">
              <div class="font-medium py-4 text-sm cursor-pointer">
                {{
            formatNumberAsDollar(data?.item?.accountBalance) ?? 'N/A' }}
              </div>
            </template>

            <template #cell(tradingBalance)="data">
              <div class="font-medium py-4 text-sm">
                {{ formatNumberAsDollar(data?.item?.tradingBalance) ?? 'N/A' }}
              </div>
            </template>

            <template #cell(profit)="data">
              <div class="font-medium py-4 text-sm">
                {{
            formatNumberAsDollar(data?.item?.profit) ?? 'N/A'
          }}
              </div>
            </template>

            <template #cell(eth)="data">
              <div class="font-medium py-4 text-sm">
                <span v-if="data.item.eth" class="font-medium py-4 text-sm">
                  {{ data.item.eth }}
                </span>
                <span v-else>N/A</span>
              </div>
            </template>
            <template #cell(btc)="data">
              <div class="font-medium py-4 text-sm">
                <span v-if="data.item.btc" class="font-medium py-4 text-sm">
                  {{ data.item.btc }}
                </span>
                <span v-else>N/A</span>
              </div>
            </template>

            <template #cell(status)="data">
              <div class="font-medium text-sm cursor-pointer px-3 py-4">
                <span
                  :class="[data?.item?.Status === 'Active' ? 'bg-green-500 text-white rounded-md text-sm' : 'bg-red-500 text-white rounded-md text-sm']"
                  class="px-3 py-2">
                  {{
            data?.item?.Status }}
                </span>
              </div>
            </template>
            <template #cell(action)="data">
              <div class="font-medium text-sm cursor-pointer px-3 py-4">
                <img src="@/assets/icons/actions.svg" alt="more" class="cursor-pointer h-10 w-10"
                  @click="handleClick(data.item)">
              </div>
            </template>
          </b-table>

          <div class="flex justify-end items-end">
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" size="md" class="my-3" />
          </div>
        </CoreModal>
      </section>
    </Transition>
    <CoreModal @update:show="showUpdateUserInfo = $event" id="updateUserInfo" :show="showUpdateUserInfo">
      <div class="flex justify-center items-center">
        <h1 class="text-lg font-semibold text-black">
          Update Information
        </h1>
      </div>
      <form class="gap-6 w-full space-y-6 px-6 pb-6" @submit.prevent="updateUserInfo">
        <div class="col-span-6 sm:col-span-6">
          <label for="profit" class="block text-sm font-medium text-gray-700">
            Profit
          </label>

          <input id="profit" v-model="selectedUser.profit" type="number" step="0.01" min="0" name="profit"
            class="input-field">
        </div>

        <div class="col-span-6 sm:col-span-6">
          <label for="tradingBalance" step="0.01" min="0" class="block text-sm font-medium text-gray-700">
            Trading Balance
          </label>

          <input id="tradingBalance" v-model="selectedUser.tradingBalance" type="number" name="tradingBalance"
            class="input-field">
        </div>

        <div class="col-span-6 sm:col-span-6">
          <label for="accountBalance" class="block text-sm font-medium text-gray-700">
            Account Balance
          </label>

          <input id="accountBalance" v-model="selectedUser.accountBalance" type="number" step="0.01" min="0"
            name="accountBalance"
            class="input-field">
        </div>

        <div class="w-full pt-10">
          <button :disabled="processing" type="submit"
            class="bg-black disabled:cursor-not-allowed disabled:opacity-25 w-full text-white py-2.5 rounded-md">{{
            processing ? 'processing' : 'Submit' }}</button>
        </div>
      </form>
    </CoreModal>
  </main>
</template> -->

<template>
  <div class="bg-white rounded-lg">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold text-gray-900">Users</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add user</button>
      </div>
    </div>
  </div>
  <div class="mt-8 flow-root overflow-hidden">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <table class="w-full text-left">
        <thead class="bg-white">
          <tr>
            <th scope="col" class="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
              User
              <div class="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200"></div>
              <div class="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200"></div>
            </th>
            <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Plan Type</th>
            <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">Account Balance</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Trading Balance</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Profit</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ethereum</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Bitcoin</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
            
            <th scope="col" class="relative py-3.5 pl-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredUsers" :key="index">
            <td class="relative py-4 pr-3 text-sm font-medium text-gray-900">
              {{
            item?.firstName
          }}
              <div class="absolute bottom-0 right-full h-px w-screen bg-gray-100"></div>
              <div class="absolute bottom-0 left-0 h-px w-screen bg-gray-100"></div>
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
              {{
              item?.lastName
            }}
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
              {{
              item?.email
            }}
            </td>
            <td class="px-3 py-4 text-sm text-gray-500">
              {{ item?.planType ?? 'N/A' }}
            </td>
            <td class="px-3 py-4 text-sm text-gray-500">
              {{
            formatNumberAsDollar(item?.accountBalance) ?? 'N/A' }}
            </td>
            <td class="px-3 py-4 text-sm text-gray-500">
              {{ formatNumberAsDollar(item?.tradingBalance) ?? 'N/A' }}
            </td>
            <td class="px-3 py-4 text-sm text-gray-500">
              {{
            formatNumberAsDollar(item?.profit) ?? 'N/A'
          }}
            </td>
            <td class="px-3 py-4 text-sm text-gray-500">
              <div class="font-medium py-4 text-sm">
                <span v-if="item.eth" class="font-medium py-4 text-sm">
                  {{ item.eth }}
                </span>
                <span v-else>N/A</span>
              </div>
            </td>
            <td class="px-3 py-4 text-sm text-gray-500">
              <div class="font-medium py-4 text-sm">
                <span v-if="item.btc" class="font-medium py-4 text-sm">
                  {{ item.btc }}
                </span>
                <span v-else>N/A</span>
              </div>
            </td>
            <td class="px-3 py-4 text-sm text-gray-500">
              <span
                  :class="[item?.Status === 'Active' ? 'bg-green-500 text-white rounded-md text-sm' : 'bg-red-500 text-white rounded-md text-sm']"
                  class="px-3 py-2">
                  {{
            item?.Status }}
                </span>
            </td>

            <td class="relative py-4 pl-3 text-right text-sm font-medium">
              <div class="font-medium text-sm cursor-pointer px-3 py-4">
                <img src="@/assets/icons/actions.svg" alt="more" class="cursor-pointer h-10 w-10"
                  @click="handleClick(item)">
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const showUpdateUserInfo = ref(false)

const selectedUser = ref<any>({});
const usersList = ref<any[]>([]);
const processing = ref(false);

const currentPage = ref(1);
const perPage = ref(6);
const search = ref('');
const showModal = ref(false);
const totalRows = ref(1);
const loading = ref(false);

const filteredUsers = computed(() => {
  const searchValue = search.value.toLowerCase();
  return usersList.value.filter((itm) => {
    return (
      itm?.firstName.toLowerCase().includes(searchValue) ||
      itm?.lastName.toLowerCase().includes(searchValue) ||
      itm?.email.toLowerCase().includes(searchValue) ||
      itm?.Status.toLowerCase().includes(searchValue)
    );
  });
});

onMounted(() => {
  fetchUsers();
  totalRows.value = usersList.value.length;
});

const goBack = () => {
  router.go(-1);
};

const fetchUsers = async () => {
  loading.value = true;
  if (process.client) {
    const accessToken = JSON.parse(window.localStorage.getItem('auth') || '""');
    const query = `
      query {
        getUsers {
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
        usersList.value = data.data.getUsers;
        totalRows.value = usersList.value.length;
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

const handleClick = (data: any) => {
  selectedUser.value = data;
  showModal.value = true; // Adjust according to how the modal is displayed
};

const updateUserInfo = async () => {
  processing.value = true;
  if (process.client) {
    const accessToken = JSON.parse(window.localStorage.getItem('auth') || '""');
    const updateUserMutation = `
      mutation updateUser($userId: String!, $input: UpdateUser!) {
        updateUser(userId: $userId, input: $input) {
          accountBalance
          tradingBalance
          profit
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
        body: JSON.stringify({
          query: updateUserMutation,
          variables: {
            userId: selectedUser.value.id ?? '',
            input: {
              profit: selectedUser.value.profit,
              tradingBalance: selectedUser.value.tradingBalance,
              accountBalance: selectedUser.value.accountBalance
            }
          }
        })
      });
      const data = await response.json();
      if (data?.errors) {
        window.$toastr?.e(data.errors[0].message);
      } else {
        window.$toastr?.s('User Information was updated successfully');
        showModal.value = false; // Adjust according to how the modal is hidden
      }
    } finally {
      processing.value = false;
    }
  }
};

const formatNumberAsDollar = (number: number | null | undefined) => {
  return number?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
</script>

<script lang="ts">
export default {
  name: 'UsersList',
  layout: 'dashboards',
  scrollToTop: true,
  head() {
    return {
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.image
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.title
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.image
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.image
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.title
        }
      ]
    };
  }
};

definePageMeta({
  layout: 'dashboards',
})
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
