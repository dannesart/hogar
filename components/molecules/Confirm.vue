<template>
  <AtomsModal @close="emits('close')" v-if="show">
    <template v-slot:header v-if="title">
      <AtomsHeadline :size="2"> {{ title }} </AtomsHeadline>
    </template>

    <div class="flex flex-col gap-5">
      <AtomsButton @click="emits('close')" :variant="'transparent'">
        Cancel
      </AtomsButton>
      <AtomsButton @click="emits('confirm')"> Confirm </AtomsButton>
    </div>
  </AtomsModal>
</template>
<script setup lang="ts">
type Props = {
  show: boolean;
  title: string;
};
const { show = false } = defineProps<Props>();
const emits = defineEmits(["close", "confirm"]);
</script>
