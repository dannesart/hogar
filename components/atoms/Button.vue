<template>
  <button
    class="font-bold text-xl px-6 py-4 rounded-xl flex gap-3 justify-center items-center"
    v-wave
    :class="variantClass()"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
type Props = {
  variant?: "primary" | "secondary";
};
const { variant = "primary" } = defineProps<Props>();

const variantClass = () => {
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
