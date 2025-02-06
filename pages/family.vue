<template>
  <NuxtLayout>
    <template v-slot:header>
      <h1 class="text-3xl text-blue-950 font-extrabold">Family</h1>
    </template>
    <section>
      <div
        class="p-5 md:p-10 bg-gray-50 rounded-2xl flex flex-col gap-6 mb-10"
        v-if="!families.length"
      >
        <AtomsHeadline :size="3"> It looks so empty in here :( </AtomsHeadline>
        <AtomsButton @click="toggleCreateFamiliy">Create family</AtomsButton>
      </div>

      <div class="flex flex-col gap-5">
        <MoleculesCard
          v-for="family in families"
          :title="family.title"
          :icon="'lucide:users-round'"
          :editable="family.createdBy === user.id"
          @action="($event) => handleAction($event, family.id)"
        >
          <strong>Members:</strong> {{ family.members.length }}
        </MoleculesCard>
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

      <MoleculesAction
        v-if="families.length"
        @action="toggleCreateFamiliy"
        :variant="'add'"
        class="absolute bottom-6 right-6 z-10"
      ></MoleculesAction>

      <MoleculesConfirm
        :show="showConfirm"
        :title="'Delete family'"
        @confirm="confirmDeleteFamily"
        @close="toggleConfirmDeleteFamily('')"
      ></MoleculesConfirm>
    </section>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFamilyStore } from "~~/stores/family";
import { useUserStore } from "~~/stores/user";

definePageMeta({
  middleware: "auth",
});
const familyStore = useFamilyStore();
const { newFamily, deleteFamily } = familyStore;
const { families } = storeToRefs(familyStore);
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const isShowingCreateFamilyModal = ref(false);
const familyName = ref();
const showConfirm = ref(false);
const activeFamilyId = ref();

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

const confirmDeleteFamily = async () => {
  await familyName.value;
  await deleteFamily(activeFamilyId.value);
  toggleConfirmDeleteFamily("");
};

const toggleConfirmDeleteFamily = async (familyId: string) => {
  showConfirm.value = !showConfirm.value;
  activeFamilyId.value = familyId;
};

const handleAction = async (actionId: string, familyId: string) => {
  if (actionId === "delete") toggleConfirmDeleteFamily(familyId);
};
</script>
