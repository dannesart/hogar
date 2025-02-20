<template>
  <NuxtLayout>
    <template v-slot:header>
      <AtomsHeadline :size="3">Apps</AtomsHeadline>
    </template>
    <div class="grid gap-6 grid-cols-2">
      <NuxtLink v-for="app in apps" :to="'/apps/' + app.id">
        <MoleculesCard
          :title="app.label"
          :variant="'vertical'"
          :icon="app.icon"
        ></MoleculesCard>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const apps = [
  {
    id: "budget",
    icon: "lucide:chart-no-axes-combined",
    label: "Budget",
  },
  {
    id: "todo",
    icon: "lucide:list-todo",
    label: "Todo",
  },
  {
    id: "economay",
    icon: "lucide:dollar-sign",
    label: "Economy",
  },
];
</script>

<script lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
