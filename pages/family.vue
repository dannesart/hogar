<template>
  <NuxtLayout>
    <template v-slot:header>
      <h1 class="text-3xl text-blue-950 font-extrabold">Family</h1>
    </template>
    <section>
      <div class="p-5 md:p-10 bg-gray-50 rounded-2xl flex flex-col gap-6">
        <AtomsHeadline :size="3"> It looks so empty in here :( </AtomsHeadline>
        <AtomsButton @click="toggleCreateFamiliy">Create family</AtomsButton>
      </div>
      <AtomsModal
        v-if="isShowingCreateFamilyModal"
        @close="toggleCreateFamiliy"
      >
        <template v-slot:header>
          <AtomsHeadline :size="2">New family</AtomsHeadline>
        </template>
        <div class="flex flex-col gap-5">
          <AtomsInput
            :type="'text'"
            :placeholder="'Name'"
            :icon="'lucide:letter-text'"
          />
        </div>
        <template v-slot:footer>
          <AtomsButton> Create family </AtomsButton>
        </template>
      </AtomsModal>
    </section>
  </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const isShowingCreateFamilyModal = ref(false);
const toggleCreateFamiliy = () => {
  isShowingCreateFamilyModal.value = !isShowingCreateFamilyModal.value;
};
</script>
