<template>
  <div
    class="fixed z-10 bg-rose-50/50 backdrop-blur-sm inset-0"
    @click="emits('close')"
  ></div>
  <div
    class="bg-white z-20 p-5 bottom-0 left-0 right-0 md:left-1/4 md:right-1/4 rounded-xl fixed flex flex-col gap-5 slide-in"
  >
    <header v-if="$slots.header">
      <slot name="header" />
    </header>
    <slot />
    <footer class="flex flex-col gap-4" v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup>
const emits = defineEmits(["close"]);
</script>

<style>
.slide-in {
  animation: slide 0.2s ease-in-out forwards;
}

@keyframes slide {
  0% {
    translate: 0 100%;
  }
  100% {
    translate: 0 0;
  }
}
</style>
