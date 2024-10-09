// plugins/enlargeable-image.ts
import { defineNuxtPlugin } from '#app';
import VueEnlargeableImage from '@diracleo/vue-enlargeable-image';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueEnlargeableImage);
});
