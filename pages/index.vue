<template>
  <NuxtLayout>
    <template v-slot:header>
      <AtomsHeadline :size="3">Hogar</AtomsHeadline>
    </template>
    <div v-if="user" class="grid gap-8">
      <h1 class="text-6xl text-blue-950 font-extrabold font-figtree">
        Welcome,
        <span class="text-rose-300"> {{ user.displayName }}.</span>
      </h1>
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
