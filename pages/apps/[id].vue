<template>
  <NuxtLayout>
    <template v-slot:header>
      <AtomsHeadline :size="3">{{ id }}</AtomsHeadline>
    </template>
    <div>
      <template v-if="app?.components">
        <AppsResolver
          v-for="component in app.components"
          :component="component.name"
          :props="component.props"
        />
      </template>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const { id } = useRoute().params;
const appStore = useAppsStore();
const { appById } = appStore;
const app = appById(id as string);
</script>
