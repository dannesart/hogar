<template>
  <NuxtLayout>
    <template v-slot:header>
      <AtomsHeadline :size="3">{{ appId }} {{ id }}</AtomsHeadline>
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

const { appId, id } = useRoute().params;
const appStore = useAppsStore();
const { appById } = appStore;
const app = appById(appId as string);
</script>
