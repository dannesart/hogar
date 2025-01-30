<template>
  <NuxtLayout>
    <template v-slot:header>
      <h1 class="text-3xl text-blue-950 font-extrabold">Family</h1>
    </template>
    <section>
      <div class="p-10 bg-gray-50 rounded-2xl flex flex-col gap-6">
        <AtomsHeadline :size="3">
          It's looks so empty in here :(
        </AtomsHeadline>
        <AtomsButton>Create family</AtomsButton>
      </div>
    </section>
  </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
