<template>
  <NuxtLayout>
    <template v-slot:header>
      <AtomsHeadline :size="3">Family</AtomsHeadline>
    </template>
    <section>
      <MoleculesTabs :tabs="['families', 'invites']">
        <template v-slot:families>
          <!-- Empty -->
          <div
            class="p-5 md:p-10 bg-gray-50 rounded-2xl flex flex-col gap-6 mb-10"
            v-if="!families.length && !loading"
          >
            <AtomsHeadline :size="3">
              It looks so empty in here :(
            </AtomsHeadline>
            <AtomsButton @click="toggleCreateFamiliy"
              >Create family</AtomsButton
            >
          </div>
          <!-- Loading -->
          <div
            class="p-5 md:p-10 bg-gray-50 rounded-2xl flex flex-col gap-6 mb-10"
            v-if="loading"
          >
            <div class="w-full h-10 bg-gray-200 animate-pulse"></div>
            <div class="w-8/12 h-6 bg-gray-200 animate-pulse"></div>
          </div>
          <!-- Families -->
          <div class="flex flex-col gap-5">
            <MoleculesCard
              v-for="family in families"
              :title="family.title"
              :icon="'lucide:users-round'"
              :editable="family.createdBy === user.id"
              @action="($event) => handleAction($event, family.id || '')"
            ></MoleculesCard>
          </div>
        </template>
        <template v-slot:invites>
          <!-- Invites-->
          <div
            class="p-5 mt-6 md:p-10 bg-gray-50 rounded-2xl flex flex-col gap-6 mb-10"
            v-if="invites.length"
          >
            <div class="flex gap-6 items-center">
              <div
                class="w-16 h-16 flex-none rounded-full bg-rose-50 flex justify-center items-center"
              >
                <Icon name="lucide:users-round" :size="30" />
              </div>
              <AtomsHeadline :size="5">
                You have been invited to '{{ invites[0].title }}'
              </AtomsHeadline>
            </div>
            <div class="flex gap-6">
              <AtomsButton :variant="'transparent'">Decline</AtomsButton>
              <AtomsButton @click="handleAcceptInvite(invites[0].id || '')"
                >Join family</AtomsButton
              >
            </div>
          </div>
        </template>
      </MoleculesTabs>

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
            :autofocus="true"
            :value="familyName"
            @update="updateName"
          />
        </div>
        <template v-slot:footer>
          <AtomsButton @click="createFamily"> Create family </AtomsButton>
        </template>
      </AtomsModal>

      <AtomsModal v-if="showInvite" @close="toggleInviteFamily">
        <template v-slot:header>
          <AtomsHeadline :size="2">Invite</AtomsHeadline>
        </template>
        <div class="flex flex-col gap-5">
          <AtomsInput
            :type="'email'"
            :placeholder="'Email'"
            :icon="'lucide:at-sign'"
            :value="inviteEmail"
            @update="updateEmail"
          />
        </div>
        <template v-slot:footer>
          <AtomsButton @click="inviteFamily"> Invite </AtomsButton>
        </template>
      </AtomsModal>

      <MoleculesAction
        v-if="families.length && families.length <= maxFamilies"
        @action="toggleCreateFamiliy"
        :variant="'add'"
        :float="true"
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
const { newFamily, deleteFamily, inviteToFamily, acceptInvite } = familyStore;
const { families, loading, invites } = storeToRefs(familyStore);
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const maxFamilies = 3;
const isShowingCreateFamilyModal = ref(false);
const familyName = ref();
const inviteEmail = ref();
const showConfirm = ref(false);
const showInvite = ref(false);
const activeFamilyId = ref();

const toggleCreateFamiliy = () => {
  isShowingCreateFamilyModal.value = !isShowingCreateFamilyModal.value;
};

const updateName = (e: any) => {
  familyName.value = e;
};
const updateEmail = (e: any) => {
  inviteEmail.value = e;
};

const createFamily = async () => {
  if (familyName.value) await newFamily(familyName.value);
  toggleCreateFamiliy();
};
const inviteFamily = async () => {
  if (inviteEmail.value)
    await inviteToFamily(activeFamilyId.value, inviteEmail.value);
  toggleInviteFamily("");
};

const handleAcceptInvite = async (familyId: string) => {
  await acceptInvite(familyId);
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
const toggleInviteFamily = async (familyId: string) => {
  showInvite.value = !showInvite.value;
  activeFamilyId.value = familyId;
};

const handleAction = async (actionId: string, familyId: string) => {
  if (actionId === "delete") toggleConfirmDeleteFamily(familyId);
  if (actionId === "invite") toggleInviteFamily(familyId);
};
</script>
