<template>
  <NuxtLayout>
    <template v-slot:header>
      <AtomsHeadline :size="3">Apps</AtomsHeadline>
    </template>
    <div class="grid gap-6 grid-cols-2">
      <NuxtLink v-for="app in apps" :to="'/apps/' + app.id">
        <MoleculesCard
          v-wave
          :title="app.name"
          :variant="'vertical'"
          :icon="app.icon"
        ></MoleculesCard>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const appsStore = useAppsStore();
const { apps } = storeToRefs(appsStore);
</script>

<script lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
