<template>
  <article class="bg-gray-50 p-5 rounded-xl">
    <header
      v-if="icon || title"
      class="flex gap-6 items-center justify-between"
    >
      <div class="flex gap-8 items-center">
        <div
          v-if="icon"
          class="w-16 h-16 rounded-full bg-rose-50 flex justify-center items-center"
        >
          <Icon :name="icon" :size="30" />
        </div>
        <AtomsHeadline :size="3" v-if="title">
          {{ title }}
        </AtomsHeadline>
      </div>
      <div
        v-if="editable"
        v-wave
        class="cursor-pointer w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-100"
        @click="emits('edit')"
      >
        <Icon name="lucide:ellipsis-vertical" :size="30" />
      </div>
    </header>
    <div class="mt-5 pl-24">
      <slot />
    </div>
  </article>
</template>

<script setup lang="ts">
type Props = {
  title?: string;
  icon?: string;
  editable?: boolean;
};
const { title, icon, editable = true } = defineProps<Props>();

const emits = defineEmits(["edit"]);
</script>
