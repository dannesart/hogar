<template>
  <NuxtLayout>
    <template v-slot:header>
      <AtomsHeadline :size="3">Apps</AtomsHeadline>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
