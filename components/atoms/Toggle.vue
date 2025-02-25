<template>
  <div
    class="rounded-full flex-none relative transition-all border-2 border-gray-100 cursor-pointer"
    :class="{
      'bg-blue-950': toggledRef,
      'bg-white': !toggledRef,
      'w-16 h-8': size === 'small',
      'w-32 h-16': size === 'default',
    }"
    @click="toggle"
  >
    <div
      class="rounded-full left-1 bg-blue-950 absolute transition-all"
      :class="{
        'translate-x-full  bg-rose-50': toggledRef,
        'h-6 w-6 top-1 left-2': size === 'small',
        'w-12 h-12 top-1.5': size === 'default',
        'left-5': size === 'default' && toggledRef,
      }"
    ></div>
  </div>
</template>
<script setup lang="ts">
type Props = {
  toggled: Boolean;
  size?: "default" | "small";
};
const { toggled, size = "default" } = defineProps<Props>();
const emits = defineEmits(["toggle"]);
const toggledRef = ref(toggled);
const toggle = () => {
  toggledRef.value = !toggledRef.value;
  emits("toggle", toggledRef.value);
};
</script>
