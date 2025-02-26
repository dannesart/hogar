<template>
  <div class="flex flex-col min-h-svh bg-gray-50">
    <header
      class="py-5 px-5 md:px-10 flex gap-4 items-center md:sticky top-0"
      v-if="$slots.header"
    >
      <div
        class="flex-1 overflow-hidden text-ellipsis flex justify-between items-center"
      >
        <slot name="header" />
      </div>
    </header>
    <main
      class="px-5 md:px-10 md:pb-32 flex-1 max-w-screen-xl w-full self-center relative"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>
