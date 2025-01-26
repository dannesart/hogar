<template>
  <div class="grid gap-4">
    <div
      v-for="item in items"
      class="bg-white p-5 rounded-xl text-xl flex gap-3 relative"
    >
      <span class="font-bold">{{ item.label }}</span> {{ item.value }}

      <div class="absolute right-5 top-4 flex gap-4">
        <button
          @click="emits('delete', item.id)"
          class="bg-gray-100 w-10 h-10 rounded-full flex justify-center items-center"
        >
          <Icon name="meteor-icons:trash-can" size="20" />
        </button>
        <button
          @click="emits('edit', item.id)"
          class="bg-gray-100 w-10 h-10 rounded-full flex justify-center items-center"
        >
          <Icon name="meteor-icons:pencil" size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Item = {
  label: string;
  value: string | number;
  id: number;
};

type Props = {
  items: Item[];
};

const { items = [] } = defineProps<Props>();
const emits = defineEmits(["edit", "delete"]);
</script>
