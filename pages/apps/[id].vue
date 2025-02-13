<template>
  <NuxtLayout>
    <template v-slot:header>
      <AtomsHeadline :size="3">{{ id }}</AtomsHeadline>
    </template>
    <div>Welcome to {{ id }} app</div>
  </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const { id } = useRoute().params;
</script>
