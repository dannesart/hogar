<template>
  <NuxtLayout>
    <h1 class="text-6xl text-blue-950 font-extrabold">Your home</h1>
  </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
