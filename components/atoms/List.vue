<template>
  <div class="grid gap-4">
    <div
      v-for="item in items"
@click="emits('edit', item.id)"
      class="bg-white p-5 rounded-xl text-xl flex gap-3 relative"
:class="{ 'pl-16': !!item.icon }"
    >
<div v-if="item.icon class="absolute w-12 h-12 rounded-full bg-gray-100 flex justify-center items-center left-5">
<Icon :name="item.icon" size="15"/>
</div>
      <span class="font-bold">{{ item.label }}</span> {{ item.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
type Item = {
  label: string;
  value: string | number;
  id: number;
icon?: string;
};

type Props = {
  items: Item[];
};

const { items = [] } = defineProps<Props>();
const emits = defineEmits(["edit", "delete"]);
</script>
