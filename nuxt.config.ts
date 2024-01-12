// import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  colorMode: {
    classSuffix: "",
  },
  components: {
    global: true,
    dirs: ["~/components"],
  },
  css: ["@/assets/css/main.scss"],
  imports: {
    dirs: [
      // Scan composables from nested directories
      "packages/app/composables",
      "packages/app/composables/multiselect",
      "packages/app/composables/validation",
      "packages/app/composables/config",
      "packages/app/composables/tools"
    ],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-lodash",
    "@vueuse/nuxt",
    'nuxt-icon'
  ],
  plugins: [
    { src: "~/packages/app/plugins/Head.ts" },
    { src: "~/packages/app/plugins/Multiselect.ts" },
    { src: "~/packages/app/plugins/Toast.ts" }
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // vite: {
  //   server: {
  //     watch: {
  //       usePolling: true,
  //     },
  //   },
  // },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.VITE_BASE_URL + "/" + process.env.VITE_VERSION,
      API_SERVER: process.env.VITE_BASE_URL,
      UPLOAD_SERVER: process.env.UPLOAD_SERVER
    },
  },
  ssr: false,

});
