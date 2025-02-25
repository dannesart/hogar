<template>
  <div
    class="w-16 h-8 rounded-full relative"
    :class="{ 'bg-blue-950': toggledRef, 'bg-white': !toggledRef }"
    @click="toggle"
  >
    <div
      class="h-6 w-6 rounded-full left-1 top-1 bg-blue-950 absolute transition-all"
      :class="{ 'translate-x-full left-2 bg-rose-50': toggledRef }"
    ></div>
  </div>
</template>
<script setup lang="ts">
type Props = {
  toggled: Boolean;
};
const { toggled } = defineProps<Props>();
const emits = defineEmits(["toggle"]);
const toggledRef = ref(toggled);
const toggle = () => {
  toggledRef.value = !toggledRef.value;
  emits("toggle", toggledRef.value);
};
</script>
