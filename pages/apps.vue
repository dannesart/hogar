<template>
  <NuxtLayout>
<template v-slot:header>
    <h1 class="text-3xl text-blue-950 font-extrabold">Apps</h1>
  </template>
</NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
