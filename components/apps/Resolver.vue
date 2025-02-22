<template>
  <AppsTodo v-if="component === 'Todo'" :title="props?.title" />
</template>

<script setup lang="ts">
type Props = {
  component: string;
  props?: any;
};

const { component, props } = defineProps<Props>();
</script>
