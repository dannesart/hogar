<template>
  <article
    class="bg-gray-50 p-5 rounded-xl flex-1 items-center"
    :class="{
      'grid grid-cols-[64px_1fr_64px] grid-rows-[1fr_auto] gap-x-5':
        variant === 'horizontal',
      'flex flex-col  gap-5': variant === 'vertical',
    }"
  >
    <div
      v-if="icon"
      class="w-16 h-16 flex-none rounded-full bg-rose-50 flex justify-center items-center"
    >
      <Icon :name="icon" :size="30" />
    </div>
    <NuxtLink :to="link" v-if="title" class="overflow-hidden text-ellipsis">
      <AtomsHeadline :size="4">
        {{ title }}
      </AtomsHeadline>
    </NuxtLink>

    <MoleculesAction
      :variant="'more'"
      :style="'transparent'"
      :size="'small'"
      @action="handleAction"
      :actions="actions"
      v-if="editable"
    ></MoleculesAction>
    <div
      v-if="$slots.default"
      class="col-span-2 col-start-2 text-lg font-semibold text-gray-500"
    >
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
  link?: string;
  variant?: "horizontal" | "vertical";
};
const {
  title,
  icon,
  editable = false,
  actions = [],
  link,
  variant = "horizontal",
} = defineProps<Props>();

const emits = defineEmits(["edit", "action"]);

const handleAction = async (actionId: string) => {
  emits("action", actionId);
};
</script>
