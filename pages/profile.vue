<template>
  <NuxtLayout>
    <template v-slot:header>
      <AtomsHeadline :size="3">Profile</AtomsHeadline>
    </template>
    <section class="grid gap-10">
      <div
        class="bg-rose-100 p-4 md:p-10 rounded-2xl flex justify-center relative mb-10"
      >
        <div class="absolute inset-0 overflow-hidden">
          <h1
            class="font-bebas text-[12rem] md:text-[30rem] text-rose-200 absolute left-0 top-0 leading-[1]"
          >
            Profile
          </h1>
        </div>
        <ClientOnly>
          <img
            :src="user?.picture"
            class="w-32 h-32 rounded-full object-cover relative top-20 md:top-24 border-4 border-rose-300"
          />
        </ClientOnly>
      </div>

      <article class="grid gap-3">
        <AtomsHeadline :size="4" :underline="true"> Base </AtomsHeadline>
        <AtomsContainer>
          <AtomsInput
            :type="'email'"
            :value="user?.email"
            :placeholder="'Email'"
            :icon="'lucide:at-sign'"
            :label="'Email'"
            :required="true"
            :disabled="true"
            :variant="'white'"
          ></AtomsInput>

          <div class="flex gap-6">
            <AtomsInput
              :type="'text'"
              :value="baseDisplayName"
              :placeholder="'Display name'"
              :icon="'lucide:user-pen'"
              :label="'Display name'"
              :required="true"
              :disabled="false"
              :loading="isSaving"
              :class="'flex-1'"
              :variant="'white'"
              @update="($event) => (baseDisplayName = $event)"
              @blur="saveBaseInformation"
            ></AtomsInput>
          </div>
        </AtomsContainer>
      </article>

      <article class="grid gap-3">
        <AtomsHeadline :size="4" :underline="true"> Settings </AtomsHeadline>
        <AtomsContainer>
          <div class="flex justify-between items-center gap-6">
            <AtomsLabel> Dark mode </AtomsLabel>
            <AtomsToggle :toggled="false" @toggle="" />
          </div>
          <div class="flex justify-between items-center gap-6">
            <AtomsLabel> Allow apps to access your data </AtomsLabel>
            <AtomsToggle :toggled="false" @toggle="" />
          </div>
        </AtomsContainer>
      </article>

      <article class="grid gap-3">
        <AtomsHeadline :size="4" :underline="true"> Other </AtomsHeadline>
        <AtomsContainer>
          <AtomsButton @click="handleLogout"> Log me out, please. </AtomsButton>
          <AtomsButton :variant="'transparent'" @click="handleDelete">
            Delete me, please.
          </AtomsButton>
        </AtomsContainer>
      </article>

      <MoleculesConfirm
        :show="isShowingDeleteModal"
        title="Are you sure you want to delete your account?"
        @close="isShowingDeleteModal = false"
      >
      </MoleculesConfirm>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "~~/stores/user";

const userClient = useSupabaseClient();
const router = useRouter();
const userStore = useUserStore();

const { user } = storeToRefs(userStore);
const { patchUser } = userStore;

const baseDisplayName = ref(user.value?.displayName);
const hasChanges = computed(() => {
  return baseDisplayName.value !== user.value?.displayName;
});
const isSaving = ref(false);
const isShowingDeleteModal = ref(false);

const handleLogout = async () => {
  try {
    const { error } = await userClient.auth.signOut();
    if (error) throw error;
    router.push("/log-in");
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async () => {
  try {
    if (!user.value.providerId) return;
    const { error } = await userClient.auth.admin.deleteUser(
      user.value.providerId
    );
    if (error) throw error;
    router.push("/sad-to-see-you-go");
  } catch (error) {
    console.log(error);
  }
};

const handleDelete = async () => {
  isShowingDeleteModal.value = true;
  //deleteUser();
};

const saveBaseInformation = async () => {
  if (!baseDisplayName.value || !hasChanges.value) return;
  isSaving.value = true;

  await patchUser(baseDisplayName.value);
  isSaving.value = false;
};
</script>
