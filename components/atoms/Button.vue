<template>
  <button
    class="font-bold text-lg px-6 py-4 rounded-xl"
    :class="variantClass()"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const { variant } = defineProps(["variant"]);

const variantClass = () => {
  if (!variant) return "primary";
  return variant.toLowerCase();
};
</script>

<style>
.primary {
  @apply bg-rose-200 hover:bg-rose-300 text-rose-950;
}
.secondary {
  @apply bg-blue-950 hover:bg-blue-800 text-white;
}
</style>
