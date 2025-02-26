// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~~/assets/main.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@nuxt/icon",
    "v-wave/nuxt",
    "@nuxt/fonts",
    "nuxt-mongoose",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          "defineStore",
          "acceptHMRUpdate",
          ["defineStore", "definePiniaStore"],
        ],
      },
    ],
  ],
  runtimeConfig: {
    BASE_URL: process.env.BASE_URL,
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },
  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    config: {
      theme: {
        extend: {
          fontFamily: {
            MPLUS: ["'M PLUS Rounded 1c'"],
            patua: ["Patua One"],
            figtree: ["Figtree"],
            bebas: ["Bebas Neue"],
          },
        },
      },
    },
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: "/log-in",
      callback: "/",
      exclude: ["/", "/create-account"],
    },
  },
});
