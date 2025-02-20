<template>
  <article class="bg-gray-50 p-5 rounded-xl flex-1">
    <header
      v-if="icon || title"
      class="flex gap-6 items-center"
      :class="{
        'justify-between': variant === 'horizontal',
        'justify-center': variant === 'vertical',
      }"
    >
      <NuxtLink
        :to="link"
        class="flex gap-6 items-center"
        :class="{ 'flex-col': variant === 'vertical' }"
      >
        <div
          v-if="icon"
          class="w-16 h-16 flex-none rounded-full bg-rose-50 flex justify-center items-center"
        >
          <Icon :name="icon" :size="30" />
        </div>
        <div v-if="title" class="overflow-hidden text-ellipsis">
          <AtomsHeadline :size="4">
            {{ title }}
          </AtomsHeadline>
        </div>
      </NuxtLink>
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
