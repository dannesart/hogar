<template>
  <article
    class="bg-white p-5 rounded-xl flex-1 items-center relative"
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
      <div
        v-if="icon === 'index'"
        class="font-extrabold text-blue-950 text-2xl"
      >
        {{ index + 1 }}
      </div>
      <Icon :name="icon" :size="30" v-else />
    </div>
    <NuxtLink :to="link" v-if="title" class="overflow-hidden text-ellipsis">
      <AtomsHeadline :size="4">
        {{ title }}
      </AtomsHeadline>
    </NuxtLink>
    <div
      v-if="$slots.corner || editable"
      :class="{
        'absolute right-5 top-5': variant === 'vertical',
      }"
    >
      <MoleculesAction
        :variant="'more'"
        :style="'transparent'"
        :size="'small'"
        @action="handleAction"
        :actions="actions"
        v-if="editable"
      ></MoleculesAction>

      <slot name="corner" />
    </div>
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
  index?: number;
};
const {
  title,
  icon,
  editable = false,
  actions = [],
  link,
  variant = "horizontal",
  index = 0,
} = defineProps<Props>();

const emits = defineEmits(["edit", "action"]);

const handleAction = async (actionId: string) => {
  emits("action", actionId);
};
</script>
