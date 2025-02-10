<template>
  <NuxtLayout>
    <template v-slot:header>
      <AtomsHeadline :size="3">Profile</AtomsHeadline>
    </template>
    <section class="grid gap-10">
      <div
        class="bg-rose-50 p-4 md:p-10 rounded-2xl flex justify-center relative mb-10"
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
        <AtomsInput
          :type="'email'"
          :value="user?.email"
          :placeholder="'Email'"
          :icon="'lucide:at-sign'"
          :disabled="true"
        ></AtomsInput>
        <AtomsInput
          :type="'text'"
          :value="baseDisplayName"
          :placeholder="'Display name'"
          :icon="'lucide:user-pen'"
          :disabled="false"
          s
          @update="($event) => (baseDisplayName = $event)"
        ></AtomsInput>
        <AtomsButton :variant="'secondary'" @click="saveBaseInformation">
          Save base information
        </AtomsButton>
      </article>

      <article class="grid gap-3">
        <AtomsHeadline :size="4"> Other </AtomsHeadline>
        <AtomsButton @click="handleLogout"> Log me out, please. </AtomsButton>
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

  await patchUser(baseDisplayName.value);
};
</script>
