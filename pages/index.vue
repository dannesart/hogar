<template>
  <NuxtLayout>
    <div v-if="userObject" class="grid gap-8">
      <h2 class="text-6xl text-blue-950 font-extrabold">
        Welcome,
        <span class="text-rose-300">
          {{
            userObject.user_metadata?.user_name ||
            userObject.user_metadata?.name?.split(" ")[0] ||
            userObject.user_metadata?.full_name?.split(" ")[0]
          }}.</span
        >
      </h2>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const userObject = useSupabaseUser();
</script>

<script lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
