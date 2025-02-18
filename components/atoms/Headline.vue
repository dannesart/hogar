<template>
  <h1
    v-if="size === 1"
    class="text-7xl font-extrabold mb-6 font-patua"
    :class="{
      'text-blue-950': variant === 'dark',
      'text-rose-300': variant === 'light',
    }"
  >
    <slot />
  </h1>

  <h2
    v-if="size === 2"
    class="text-4xl font-black font-figtree"
    :class="{
      'text-blue-950': variant === 'dark',
      'text-rose-300': variant === 'light',
    }"
  >
    <slot />
  </h2>

  <h3
    v-if="size === 3"
    class="text-3xl font-extrabold font-figtree"
    :class="{
      'text-blue-950': variant === 'dark',
      'text-rose-300': variant === 'light',
    }"
  >
    <slot />
  </h3>
  <h4
    v-if="size === 4"
    class="text-2xl font-bold font-figtree"
    :class="{
      'text-blue-950': variant === 'dark',
      'text-rose-300': variant === 'light',
    }"
  >
    <slot />
  </h4>
  <h5
    v-if="size === 5"
    class="text-xl font-bold font-figtree"
    :class="{
      'text-blue-950': variant === 'dark',
      'text-rose-300': variant === 'light',
    }"
  >
    <slot />
  </h5>
</template>

<script setup lang="ts">
type Props = {
  size: number;
  variant?: "dark" | "light";
};
const { size, variant = "dark" } = defineProps<Props>();
</script>
