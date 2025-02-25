<template>
  <button
    class="font-bold text-xl px-6 py-4 rounded-xl flex gap-3 justify-center items-center"
    v-wave
    :class="variantClass"
  >
    <slot v-if="!loading" />
    <Icon v-if="loading" :name="'svg-spinners:3-dots-bounce'" :size="30" />
  </button>
</template>

<script setup lang="ts">
type Props = {
  variant?: "primary" | "secondary" | "transparent";
  loading?: boolean;
};
const { variant = "primary", loading = false } = defineProps<Props>();

const variantClass = computed(() => {
  return variant.toLowerCase();
});
</script>

<style>
.primary {
  @apply bg-rose-200 hover:bg-rose-300 text-rose-950;
}
.secondary {
  @apply bg-blue-950 hover:bg-blue-800 text-white;
}
.transparent {
  @apply border border-solid border-blue-950 text-blue-950;
}
</style>
