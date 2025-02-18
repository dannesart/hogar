<template>
  <NuxtLayout>
    <template v-slot:header>
      <AtomsHeadline :size="3">Hogar</AtomsHeadline>
    </template>
    <div v-if="user" class="grid gap-8">
      <AtomsHeadline :size="1">
        Welcome,
        <span class="text-rose-300"> {{ user.displayName }}.</span>
      </AtomsHeadline>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "~~/stores/user";

const { user } = storeToRefs(useUserStore());
</script>

<script lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
