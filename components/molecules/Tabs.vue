<template>
  <div class="flex gap-4">
    <div
      v-for="tab in tabs"
      v-wave
      class="px-10 py-4 rounded-full text-xl font-bold text-blue-950 capitalize cursor-pointer"
      @click="activeTab = tab"
      :class="{ 'bg-gray-100': activeTab === tab }"
    >
      {{ tab }}
    </div>
  </div>

  <template v-for="tab in tabs">
    <div class="py-6" v-if="activeTab === tab">
      <slot :name="tab" />
    </div>
  </template>
</template>

<script setup lang="ts">
type Props = {
  tabs: string[];
};

const { tabs = [] } = defineProps<Props>();
const activeTab = ref(tabs[0]);
</script>
