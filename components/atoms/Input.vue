<template>
  <div class="relative">
    <input
      :type="type"
      :required="required"
      :max="max"
      :disabled="disabled"
      placeholder=""
      :value="value"
      :autofocus="autofocus"
      :id="id"
      @input="updateValue($event)"
      class="h-[72px] rounded-xl text-2xl w-full peer"
      :class="{
        'bg-rose-100': notValid,
        'bg-gray-100 outline-gray-300': !notValid,
        'pl-16': !!icon,
        'pt-4': !!label,
      }"
    />
    <label
      v-if="label"
      :for="id"
      class="absolute duration-300 top-5 left-16 text-gray-400 text-xl origin-[0] scale-75 -translate-y-4 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0"
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
import { z } from "zod";

type Props = {
  type?: "text" | "number" | "email";
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  label?: string;
  icon?: string;
  value?: string | number;
  autofocus?: boolean;
  id?: string;
};
const {
  type = "text",
  required = false,
  label = "",
  disabled = false,
  autofocus = false,
  id = crypto.randomUUID(),
  min = 0,
  max = 500,
  value,
} = defineProps<Props>();
const isDirty = ref(false);

const validator = (value: string | number | undefined) => {
  let schema;
  switch (type) {
    case "number":
      schema = z
        .number()
        .min(min || 1)
        .max(max);
      break;
    case "email":
      schema = z
        .string()
        .email()
        .min(min || 1)
        .max(max);
      break;
    default:
      schema = z
        .string()
        .min(min || 1)
        .max(max);
      break;
  }
  if (!required) schema = schema.min(min).optional();
  return schema.safeParse(value);
};

const notValid = computed(() => {
  if (!isDirty.value) return false;
  const valid = validator(value).success;
  return !valid;
});

const emits = defineEmits(["update"]);
const updateValue = (event: Event) => {
  isDirty.value = true;
  const newValue = (event.target as { value?: string }).value;
  emits("update", newValue);
};
</script>
