<template>
  <NuxtLayout>
    <template v-slot:header>
      <AtomsHeadline :size="3">{{ appId }}</AtomsHeadline>

      <Icon
        :name="!!shortCut ? 'lucide:star-off' : 'lucide:star'"
        :size="30"
        @click="toggleShortCut"
      />
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
const { appById, shortCutByRoute, setShortCut, removeShortCut } = appStore;
const app = appById(appId as string);
const route = computed(() => "/apps/" + appId + "/" + id);
const shortCut = computed(() => shortCutByRoute(route.value));

const toggleShortCut = () => {
  if (shortCut.value) {
    removeShortCut(route.value);
    return;
  }
  setShortCut(id as string, route.value);
};
</script>
