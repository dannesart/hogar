<template>
  <NuxtPage />
</template>
<script setup>
import { useUserStore } from "~/stores/user";
import { useFamilyStore } from "~/stores/family";
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
const { fetchFamilies, fetchInvites } = useFamilyStore();
await Promise.all([fetchUser(), fetchFamilies(), fetchInvites()]);
</script>
