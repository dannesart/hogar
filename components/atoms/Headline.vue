<template>
  <h1
    v-if="size === 1"
    class="text-6xl text-blue-950 font-extrabold mb-6 font-patua"
  >
    <slot />
  </h1>

  <h2 v-if="size === 2" class="text-4xl text-blue-950 font-black font-figtree">
    <slot />
  </h2>

  <h3
    v-if="size === 3"
    class="text-3xl text-blue-950 font-extrabold font-figtree"
  >
    <slot />
  </h3>
  <h3 v-if="size === 4" class="text-2xl text-blue-950 font-bold font-figtree">
    <slot />
  </h3>
</template>

<script setup lang="ts">
const { size } = defineProps(["size"]);
</script>
