<template>
  <NuxtLayout>
    <template v-slot:header>
      <AtomsHeadline :size="3">{{ family?.title }}</AtomsHeadline>
    </template>
    <section class="flex flex-col gap-6">
      <div class="flex flex-col gap-3">
        <AtomsHeadline :size="4">Description</AtomsHeadline>
        <div class="flex justify-between">
          <p>
            {{ family?.description || "No description yet." }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <AtomsHeadline :size="4">Members</AtomsHeadline>
        <MoleculesCard
          v-for="member in family?.members"
          :title="(member as unknown as User).displayName"
          :icon="
            family?.createdBy === (member as unknown as User)._id
              ? 'lucide:user-round-check'
              : 'lucide:user-round'
          "
          :actions="[
            {
              label: 'Remove',
              actionId: 'remove',
              disabled: family?.createdBy !== user.id || user.id === (member as unknown as User)._id,
            }
          ]"
        ></MoleculesCard>
      </div>

      <MoleculesAction
        :float="true"
        :actions="[
          {
            label: 'Edit',
            actionId: 'edit',
          },
          {
            label: 'Leave',
            variant: 'transparent',
            actionId: 'leave',
          },
          {
            label: 'Delete',
            variant: 'transparent',
            actionId: 'delete',
          },
        ]"
        :title="'More'"
      ></MoleculesAction>
    </section>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { User } from "~/models/user";
import { useFamilyStore } from "~~/stores/family";
import { useUserStore } from "~~/stores/user";

definePageMeta({
  middleware: "auth",
});
const familyStore = useFamilyStore();
const { fetchFamilyById, leaveFamily } = familyStore;
const { family } = storeToRefs(familyStore);
const { id } = useRoute().params;
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const router = useRouter();

if (id && typeof id === "string") fetchFamilyById(id);

const leaving = ref(false);
const deleting = ref(false);

const handleLeave = async () => {
  leaving.value = true;

  await leaveFamily(id as string);
  router.push("/family");
  leaving.value = false;
};

const handleDelete = async () => {
  leaving.value = true;

  await leaveFamily(id as string);
  router.push("/family");
  leaving.value = false;
};
</script>
