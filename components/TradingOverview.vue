<template>
  <div class="lg:container mx-auto sm:p-4 p-10 rounded-md border">
    <h2 class="mb-4 text-sm font-semibold leading-32">
      Trading Overview
    </h2>
    <div class="overflow-x-auto">
      <table class="min-w-full text-xs">
        <colgroup>
          <col>
          <col>
          <col>
          <col>
        </colgroup>
        <tbody>
          <tr v-for="({ name, key, time, amount, rate, rateVal}, index) in overviewStats" :key="index" class="border-b border-opacity-20 border-gray-700 bg-wite">
            <td class="p-3">
              <div class="flex items-center gap-x-2">
                <img v-if="key === 'bit'" src="@/assets/img/bit.png" class="h-6 w-6" alt="">
                <img v-if="key === 'eth'" src="@/assets/img/eth.png" class="h-6 w-6" alt="">
                <p>{{ name }}</p>
              </div>
            </td>
            <td class="p-3">
              <p>{{ time }}</p>
            </td>
            <td class="p-3">
              <p class="bg-red-50 rounded-full px-2 py-1 gap-x-2 w-20 flex justify-center items-center">
                <svg
                  v-if="rate === 'decrease'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ff6a6a"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><path d="M20.2 17.2l-7.7-7.7-4 4-5.7-5.7" /><path d="M15 18h6v-6" /></svg>
                <svg
                  v-if="rate === 'increase'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4a90e2"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" /><path d="M15 7h6v6" /></svg>
                <span :class="[rate === 'increase' ? 'text-green-500' : 'text-red-500']" class="font-medium">{{ rateVal }}</span>
              </p>
            </td>
            <td class="p-3">
              <p class="">
                {{ amount }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const overviewStats = ref([
  {
    key: 'bit',
    name: 'BitCoin',
    time: '1:50 pm',
    amount: '$653.3',
    rate: 'increase',
    rateVal: '-3.6'
  },
  {
    key: 'eth',
    name: 'Ethereum',
    time: '1:50 pm',
    amount: '$653.3',
    rate: 'decrease',
    rateVal: '+1.6'
  },
  {
    key: 'bit',
    name: 'BitCoin',
    time: '1:50 pm',
    amount: '$653.3',
    rate: 'increase',
    rateVal: '-8.6'
  },
  {
    key: 'bit',
    name: 'BitCoin',
    time: '1:50 pm',
    amount: '$653.3',
    rate: 'increase',
    rateVal: '-3.6'
  },
  {
    key: 'eth',
    name: 'Ethereum',
    time: '1:50 pm',
    amount: '$653.3',
    rate: 'decrease',
    rateVal: '+1.6'
  },
  {
    key: 'bit',
    name: 'BitCoin',
    time: '1:50 pm',
    amount: '$653.3',
    rate: 'increase',
    rateVal: '-8.6'
  },
  {
    key: 'bit',
    name: 'BitCoin',
    time: '1:50 pm',
    amount: '$653.3',
    rate: 'increase',
    rateVal: '-3.6'
  },
  {
    key: 'eth',
    name: 'Ethereum',
    time: '1:50 pm',
    amount: '$653.3',
    rate: 'decrease',
    rateVal: '+1.6'
  },
  {
    key: 'bit',
    name: 'BitCoin',
    time: '1:50 pm',
    amount: '$653.3',
    rate: 'increase',
    rateVal: '-8.6'
  },
  {
    key: 'bit',
    name: 'BitCoin',
    time: '1:50 pm',
    amount: '$653.3',
    rate: 'increase',
    rateVal: '-3.6'
  },
  {
    key: 'eth',
    name: 'Ethereum',
    time: '1:50 pm',
    amount: '$653.3',
    rate: 'decrease',
    rateVal: '+1.6'
  },
  {
    key: 'bit',
    name: 'BitCoin',
    time: '1:50 pm',
    amount: '$653.3',
    rate: 'increase',
    rateVal: '-8.6'
  }
]);
</script>
