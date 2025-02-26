<template>
  <div class="relative">
    <input
      :type="type"
      :required="required"
      :max="max"
      :disabled="disabled || loading"
      placeholder=""
      :value="valueRef"
      :autofocus="autofocus"
      :id="id"
      @input="updateValue($event)"
      @blur="handleBlur"
      class="h-[72px] rounded-xl text-2xl w-full peer pr-4"
      :class="{
        'bg-rose-100': notValid,
        'bg-gray-100 outline-gray-300': !notValid && variant === 'gray',
        'bg-white disabled:bg-gray-100 outline-gray-300 border-2 border-gray-100':
          !notValid && variant === 'white',
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
      <Icon :name="'lucide:lock'" size="15" />
    </div>
    <Icon
      v-if="loading"
      :name="'svg-spinners:3-dots-bounce'"
      :class="'absolute right-5 top-5'"
      :size="30"
    />
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
  variant?: "white" | "gray";
  loading?: boolean;
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
  variant = "gray",
  loading = false,
} = defineProps<Props>();
const isDirty = ref(false);
const valueRef = ref(value);

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
  const valid = validator(valueRef.value);
  return !valid.success;
});

const emits = defineEmits(["update", "blur"]);
const updateValue = (event: Event) => {
  isDirty.value = true;
  const newValue = (event.target as { value?: string }).value;
  valueRef.value = newValue;
  emits("update", newValue);
};
const handleBlur = () => {
  emits("blur", valueRef.value);
};
</script>
