<template>
  <NuxtPage />
</template>
<script setup>
import { useUserStore } from "~/stores/user";
useHead({
  title: "Hogar",
  meta: [
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "viewport",
      content:
        "minimal-ui, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    },
  ],
});

const { fetchUser } = useUserStore();
await fetchUser();
</script>
