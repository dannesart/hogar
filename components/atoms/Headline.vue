<template>
  <h1 v-if="size === 1" class="text-6xl text-blue-950 font-extrabold mb-6">
    <slot />
  </h1>

  <h2 v-if="size === 2" class="text-4xl text-blue-950 font-extrabold mb-4">
    <slot />
  </h2>
</template>

<script setup lang="ts">
const { size } = defineProps(["size"]);
</script>
