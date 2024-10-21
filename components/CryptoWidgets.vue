  <template>
    <client-only>
        <Chart v-if="isClient" />
        <CryptoMarket v-if="isClient" />
       <Snaps v-if="isClient"  />
       <Screener v-if="isClient" />
    </client-only>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { defineAsyncComponent } from 'vue';
  
  const isClient = ref(false);
  
  // Dynamically import components only on the client side
  const Chart = defineAsyncComponent(() => import('vue-tradingview-widgets').then(m => m.Chart));
  const CryptoMarket = defineAsyncComponent(() => import('vue-tradingview-widgets').then(m => m.CryptoMarket));
  const Snaps = defineAsyncComponent(() => import('vue-tradingview-widgets').then(m => m.Snaps));
  const Screener = defineAsyncComponent(() => import('vue-tradingview-widgets').then(m => m.Screener));
  
  onMounted(() => {
    if (process.client) {
      isClient.value = true;
    }
  });
  </script>
  
  <style scoped>
  .snaps-container {
    width: 100%;
    height: 100%; /* Optional, adjust as needed */
  }
  </style>
  