<template>
  <article class="bg-gray-50 p-5 rounded-xl">
    <header
      v-if="icon || title"
      class="flex gap-6 items-center justify-between"
    >
      <div class="flex gap-6 items-center">
        <div
          v-if="icon"
          class="w-16 h-16 flex-none rounded-full bg-rose-50 flex justify-center items-center"
        >
          <Icon :name="icon" :size="30" />
        </div>
        <AtomsHeadline :size="4" v-if="title">
          {{ title }}
        </AtomsHeadline>
      </div>
      <MoleculesAction
        :variant="'more'"
        :style="'transparent'"
        :size="'small'"
        @action="handleAction"
        :actions="actions"
        v-if="editable"
      ></MoleculesAction>
    </header>
    <div v-if="$slots.default" class="pl-20">
      <slot />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Action } from "~/types/Action";

type Props = {
  title?: string;
  icon?: string;
  editable?: boolean;
  actions?: Action[];
};
const { title, icon, editable = false, actions = [] } = defineProps<Props>();

const emits = defineEmits(["edit", "action"]);

const handleAction = async (actionId: string) => {
  emits("action", actionId);
};
</script>
