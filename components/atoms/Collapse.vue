<template>
  <article
    class="rounded-xl flex flex-col"
    :class="{ 'bg-rose-200': needsAttention, 'bg-gray-200': !needsAttention }"
  >
    <div
      @click="toggle"
      class="px-5 py-5 text-2xl font-bold cursor-pointer flex justify-between"
    >
      <h2
        :class="{
          'text-rose-950': needsAttention,
          'text-gray-950': !needsAttention,
        }"
      >
        {{ label }}
      </h2>
      <Icon
        name="meteor-icons:angle-down"
        size="30"
        :class="{ 'rotate-180': isOpen }"
      />
    </div>
    <section v-if="isOpen" class="px-5 py-5 grid gap-5">
      <slot />
    </section>
  </article>
</template>

<script setup lang="ts">
const { label, needsAttention } = defineProps(["label", "needsAttention"]);

const isOpen = ref(false);
const toggle = () => (isOpen.value = !isOpen.value);
</script>
