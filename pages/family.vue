<template>
  <NuxtLayout>
    <template v-slot:header>
      <h1 class="text-3xl text-blue-950 font-extrabold">Family</h1>
    </template>
    <section>
      <div class="p-5 md:p-10 bg-gray-50 rounded-2xl flex flex-col gap-6 mb-10">
        <AtomsHeadline :size="3" v-if="!families.length">
          It looks so empty in here :(
        </AtomsHeadline>
        <AtomsButton @click="toggleCreateFamiliy">Create family</AtomsButton>
      </div>

      <div class="flex flex-col gap-5">
        <AtomsCollapse v-for="family in families" :label="family.title">
          <label>Members:</label> {{ family.members.length }}
        </AtomsCollapse>
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
            :value="familyName"
            @update="updateName"
          />
        </div>
        <template v-slot:footer>
          <AtomsButton @click="createFamily"> Create family </AtomsButton>
        </template>
      </AtomsModal>
    </section>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFamilyStore } from "~~/stores/family";

definePageMeta({
  middleware: "auth",
});
const familyStore = useFamilyStore();
const { newFamily } = familyStore;
const { families } = storeToRefs(familyStore);

const isShowingCreateFamilyModal = ref(false);
const familyName = ref();
const toggleCreateFamiliy = () => {
  isShowingCreateFamilyModal.value = !isShowingCreateFamilyModal.value;
};

const updateName = (e: any) => {
  familyName.value = e;
};

const createFamily = async () => {
  if (familyName.value) await newFamily(familyName.value);
  toggleCreateFamiliy();
};
</script>
