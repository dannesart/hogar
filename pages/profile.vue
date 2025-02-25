<template>
  <NuxtLayout>
    <template v-slot:header>
      <AtomsHeadline :size="3">Profile</AtomsHeadline>
    </template>
    <section class="grid gap-10">
      <div
        class="bg-rose-100 p-4 md:p-10 rounded-2xl flex justify-center relative mb-10"
      >
        <ClientOnly>
          <img
            :src="user?.picture"
            class="w-32 h-32 rounded-full object-cover relative top-20 md:top-24"
          />
        </ClientOnly>
      </div>

      <article class="grid gap-3">
        <AtomsHeadline :size="4"> Base </AtomsHeadline>
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
        <AtomsHeadline :size="4"> Settings </AtomsHeadline>
        <AtomsContainer>
          <div class="flex justify-between items-center gap-6">
            <AtomsLabel> Allow apps to access your data </AtomsLabel>
            <AtomsToggle :toggled="false" @toggle="" />
          </div>
        </AtomsContainer>
      </article>

      <article class="grid gap-3">
        <AtomsHeadline :size="4"> Other </AtomsHeadline>
        <AtomsContainer>
          <AtomsButton @click="handleLogout"> Log me out, please. </AtomsButton>
        </AtomsContainer>
      </article>
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

const handleLogout = async () => {
  try {
    const { error } = await userClient.auth.signOut();
    if (error) throw error;
    router.push("/log-in");
  } catch (error) {
    console.log(error);
  }
};

const saveBaseInformation = async () => {
  if (!baseDisplayName.value) return;
  isSaving.value = true;

  await patchUser(baseDisplayName.value);
  isSaving.value = false;
};
</script>
