<template>
  <NuxtLayout :class="'bg-gray-50'">
    <template v-slot:header>
      <AtomsHeadline :size="3">Hogar</AtomsHeadline>
    </template>
    <div v-if="user" class="grid gap-8">
      <AtomsHeadline :size="1">
        Welcome,
        <span class="text-rose-300"> {{ user.displayName }}.</span>
      </AtomsHeadline>

      <div class="grid gap-6">
        <AtomsHeadline :size="4"> Shortcuts </AtomsHeadline>
        <div class="grid gap-6 grid-cols-2">
          <MoleculesCard
            :title="value.label"
            :icon="'lucide:list-todo'"
            :variant="'vertical'"
            :link="value.route"
            v-for="(value, key) in shortCuts"
          >
          </MoleculesCard>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "~~/stores/user";

const { user } = storeToRefs(useUserStore());
const { shortCuts } = storeToRefs(useAppsStore());
</script>

<script lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
