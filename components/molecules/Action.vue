<template>
  <button
    v-wave
    class="w-20 h-20 rounded-full flex justify-center items-center cursor-pointer"
    :class="cssStyle"
    @click="toggleModal"
  >
    <Icon :name="icon" :size="30" />
  </button>
  <AtomsModal v-if="variant === 'more' && showModal" @close="toggleModal">
    <template v-slot:header>
      <AtomsHeadline :size="2"> More </AtomsHeadline>
    </template>
    <div class="flex flex-col gap-5">
      <AtomsButton
        v-for="action in actions"
        @click="handleMoreAction(action.actionId)"
      >
        {{ action.label }}
      </AtomsButton>
    </div>
  </AtomsModal>
</template>

<script setup lang="ts">
type Props = {
  variant?: "add" | "more" | "delete";
  style?: "default" | "transparent";
  actions?: { label: string; actionId: string }[];
};

const { variant = "more", style = "default" } = defineProps<Props>();
const emits = defineEmits(["action"]);
const showModal = ref(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
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
  switch (style) {
    case "transparent":
      return "hover:bg-gray-100 bg-transparent";
    default:
      return "bg-rose-50 text-rose-500";
  }
});
</script>
