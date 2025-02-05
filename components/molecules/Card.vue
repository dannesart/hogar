<template>
  <article class="bg-gray-50 p-5 rounded-xl">
    <header v-if="icon || title" class="flex gap-6 items-center">
      <div
        v-if="icon"
        class="w-16 h-16 rounded-full bg-rose-50 flex justify-center items-center"
      >
        <Icon :name="icon" :size="30" />
      </div>
      <AtomsHeadline :size="2" v-if="title">
        {{ title }}
      </AtomsHeadline>
    </header>
    <div v-if="short" class="mt-5">
      <p>{{ short }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
type Props = {
  title?: string;
  icon?: string;
  short?: string;
};
const { title, short, icon } = defineProps<Props>();
</script>
