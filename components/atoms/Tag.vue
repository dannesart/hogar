<template>
  <div
    class="px-6 py-3 rounded-full bg-gray-100 text-blue-950 font-bold max-w-max"
    :class="{ 'cursor-pointer hover:bg-gray-200': clickable }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
type Props = {
  clickable?: boolean;
};

const { clickable = false } = defineProps<Props>();
</script>
