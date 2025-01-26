<template>
  <div class="relative">
    <input
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :disabled="disabled"
      :value="value"
      class="p-5 rounded-xl text-2xl w-full"
      :class="{
        'bg-rose-100': notValid,
        'bg-gray-100 outline-gray-300': !notValid,
        'pl-16': !!icon,
      }"
    />
    <label v-if="label"
      >{{ label }}
      {{ !required ? "(optional)" : "" }}
    </label>
    <Icon v-if="icon" :name="icon" size="30" class="absolute left-5 top-5" />
    <div
      v-if="disabled"
      class="absolute -right-2 -top-2 w-8 h-8 flex items-center justify-center bg-blue-950 text-white rounded-full"
    >
      <Icon :name="'meteor-icons:lock'" size="15" />
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  type?: "text" | "number" | "email";
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  label?: string;
  icon?: string;
  value?: string | number;
};
const {
  type = "text",
  required = false,
  placeholder = "",
  label = "",
  disabled = false,
} = defineProps<Props>();

const notValid = ref(false);
</script>
