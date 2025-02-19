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
              :link="'/family/' + family.id"
              :actions="[
                {
                  label: 'Invite',
                  actionId: 'invite',
                  disabled: family.createdBy !== user.id,
                },
                {
                  label: 'Members',
                  actionId: 'members',
                  variant: 'secondary',
                  disabled: false,
                },
                {
                  label: 'Delete',
                  actionId: 'delete',
                  variant: 'transparent',
                  disabled: family.createdBy !== user.id,
                },
                {
                  label: 'Leave',
                  actionId: 'leave',
                  variant: 'transparent',
                  disabled: family.createdBy === user.id,
                },
              ]"
              @action="($event) => handleAction($event, family.id || '')"
            >
            </MoleculesCard>
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
              <AtomsButton
                @click="handleDeclineInvite(invites[0].id || '')"
                :variant="'transparent'"
                >Decline</AtomsButton
              >
              <AtomsButton @click="handleAcceptInvite(invites[0].id || '')"
                >Join family</AtomsButton
              >
            </div>
          </div>
        </template>
      </MoleculesTabs>
      <!-- Modals -->
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
            :label="'Name'"
            :icon="'lucide:letter-text'"
            :required="true"
            :autofocus="true"
            :value="familyName"
            @update="updateName"
          />
        </div>
        <template v-slot:footer>
          <AtomsButton @click="createFamily" :loading="isCreatingFamily">
            Create family
          </AtomsButton>
        </template>
      </AtomsModal>

      <AtomsModal v-if="showInvite" @close="toggleInviteFamily">
        <template v-slot:header>
          <AtomsHeadline :size="2">Invite</AtomsHeadline>
        </template>
        <div class="flex flex-col gap-5">
          <AtomsInput
            :type="'email'"
            :label="'Email'"
            :required="true"
            :icon="'lucide:at-sign'"
            :value="inviteEmail"
            @update="updateEmail"
          />
        </div>
        <template v-slot:footer>
          <AtomsButton @click="inviteFamily"> Invite </AtomsButton>
        </template>
      </AtomsModal>

      <AtomsModal v-if="showMembers" @close="toggleMembers">
        <template v-slot:header>
          <AtomsHeadline :size="2">Members</AtomsHeadline>
        </template>
        <div class="flex flex-col gap-5">
          <div v-for="member in activeFamily.members">
            <MoleculesCard
              :title="member.displayName"
              :icon="'lucide:user-round'"
            >
            </MoleculesCard>
          </div>
        </div>
      </AtomsModal>
      <!-- Page actions -->
      <MoleculesAction
        v-if="families.length && families.length < maxFamilies"
        @action="toggleCreateFamiliy"
        :variant="'add'"
        :float="true"
      ></MoleculesAction>
      <!-- Confirms -->
      <MoleculesConfirm
        :show="showConfirm"
        :title="'Delete family'"
        @confirm="confirmDeleteFamily"
        @close="toggleConfirmDeleteFamily('')"
      ></MoleculesConfirm>
      <MoleculesConfirm
        :show="showLeave"
        :title="'Leave family'"
        @confirm="confirmLeaveFamily"
        @close="toggleLeave('')"
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
const {
  newFamily,
  deleteFamily,
  leaveFamily,
  inviteToFamily,
  acceptInvite,
  declineInvite,
} = familyStore;
const { families, loading, invites } = storeToRefs(familyStore);
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const maxFamilies = 3;
const isShowingCreateFamilyModal = ref(false);
const familyName = ref();
const inviteEmail = ref();
const showConfirm = ref(false);
const showInvite = ref(false);
const showLeave = ref(false);
const showMembers = ref(false);
const activeFamilyId = ref();
const isCreatingFamily = ref(false);

const activeFamily = computed(() => {
  let family = {} as any;

  const f = [...families.value].find(
    (family) => family.id === activeFamilyId.value
  );
  family = { ...f, members: f?.members };

  return family;
});

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
  if (familyName.value) {
    isCreatingFamily.value = true;
    await newFamily(familyName.value);
    isCreatingFamily.value = false;
    toggleCreateFamiliy();
  }
};
const inviteFamily = async () => {
  if (inviteEmail.value)
    await inviteToFamily(activeFamilyId.value, inviteEmail.value);
  toggleInviteFamily("");
};

const handleAcceptInvite = async (familyId: string) => {
  await acceptInvite(familyId);
};
const handleDeclineInvite = async (familyId: string) => {
  await declineInvite(familyId);
};
const confirmLeaveFamily = async (familyId: string) => {
  if (!activeFamilyId.value) return;
  await leaveFamily(activeFamilyId.value);
  toggleLeave("");
};

const confirmDeleteFamily = async () => {
  if (!activeFamilyId.value) return;
  await deleteFamily(activeFamilyId.value);
  toggleConfirmDeleteFamily("");
};

const toggleConfirmDeleteFamily = (familyId: string) => {
  showConfirm.value = !showConfirm.value;
  activeFamilyId.value = familyId;
};
const toggleInviteFamily = (familyId: string) => {
  showInvite.value = !showInvite.value;
  activeFamilyId.value = familyId;
};
const toggleMembers = (familyId: string) => {
  showMembers.value = !showMembers.value;
  activeFamilyId.value = familyId;
};
const toggleLeave = (familyId: string) => {
  showLeave.value = !showLeave.value;
  activeFamilyId.value = familyId;
};

const handleAction = (actionId: string, familyId: string) => {
  if (actionId === "delete") toggleConfirmDeleteFamily(familyId);
  if (actionId === "invite") toggleInviteFamily(familyId);
  if (actionId === "members") toggleMembers(familyId);
  if (actionId === "leave") toggleLeave(familyId);
};
</script>
