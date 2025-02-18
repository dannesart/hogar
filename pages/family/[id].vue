<template>
  <NuxtLayout>
    <template v-slot:header>
      <AtomsHeadline :size="3">{{ id }}</AtomsHeadline>
    </template>
    <section>
      <div>Family {{ id }}</div>
    </section>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFamilyStore } from "~~/stores/family";

definePageMeta({
  middleware: "auth",
});

const { id } = useRoute().params;
</script>
