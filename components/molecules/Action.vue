<template>
  <button
    v-wave
    class="rounded-full flex justify-center items-center cursor-pointer"
    :class="cssStyle"
    @click="toggleModal"
  >
    <Icon :name="icon" :size="30" />
  </button>
  <AtomsModal v-if="showModal && !standalone" @close="toggleModal">
    <template v-slot:header>
      <AtomsHeadline v-if="title" :size="2"> {{ title }} </AtomsHeadline>
    </template>
    <div class="flex flex-col gap-5">
      <template v-for="action in actions">
        <AtomsButton
          v-if="!action.disabled"
          @click="handleMoreAction(action.actionId)"
          :variant="action.variant"
        >
          {{ action.label }}
        </AtomsButton>
      </template>
      <slot />
    </div>
  </AtomsModal>
</template>

<script setup lang="ts">
import type { Action } from "~/types/Action";

type Props = {
  variant?: "add" | "more" | "delete";
  style?: "default" | "transparent";
  actions?: Action[];
  size?: "default" | "small";
  float?: boolean;
  title?: string;
  standalone?: boolean;
};

const {
  variant = "more",
  style = "default",
  size = "default",
  float = false,
  title = "",
  standalone = false,
} = defineProps<Props>();
const emits = defineEmits(["action"]);
const showModal = ref(false);

const toggleModal = (e?: Event) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  showModal.value = !showModal.value;
  emits("action", "toggle");
};

const handleMoreAction = (actionId: string) => {
  toggleModal();
  emits("action", actionId);
};

const icon = computed(() => {
  switch (variant) {
    case "add":
      return "lucide:plus";
    case "delete":
      return "lucide:remove";
    default:
      return "lucide:ellipsis-vertical";
  }
});

const cssStyle = computed(() => {
  const combined = [];

  if (float) combined.push("absolute bottom-6 right-6 z-10 shadow-xl");

  switch (style) {
    case "transparent":
      combined.push("hover:bg-gray-100 bg-transparent");
      break;
    default:
      combined.push("bg-rose-50 text-rose-500");
      break;
  }
  switch (size) {
    case "small":
      combined.push("w-16 h-16");
      break;
    default:
      combined.push("w-20 h-20");
      break;
  }
  return combined.join(" ");
});
</script>
