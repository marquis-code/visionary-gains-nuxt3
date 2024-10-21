// plugins/vue-tradingview-widgets.ts
export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
      import('vue-tradingview-widgets').then((module) => {
        nuxtApp.vueApp.component('Chart', module.Chart);
        nuxtApp.vueApp.component('CryptoMarket', module.CryptoMarket);
        nuxtApp.vueApp.component('Snaps', module.Snaps);
        nuxtApp.vueApp.component('Screener', module.Screener);
      });
    }
  });
  