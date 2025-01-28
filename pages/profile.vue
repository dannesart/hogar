<template>
  <NuxtLayout>
    <template v-slot:header>
      <h1 class="text-3xl text-blue-950 font-extrabold">Profile</h1>
    </template>
    <section class="grid gap-10">
      <article class="grid gap-3">
        <AtomsHeadline :size="3"> Base </AtomsHeadline>
        <AtomsInput
          :type="'email'"
          :value="user?.email"
          :placeholder="'Email'"
          :icon="'meteor-icons:envelope'"
          :disabled="true"
        ></AtomsInput>
      </article>
      <article class="grid gap-3">
        <AtomsHeadline :size="3"> Economy </AtomsHeadline>
        <AtomsInput
          :type="'number'"
          :placeholder="'Salary'"
          :icon="'meteor-icons:dollar'"
        ></AtomsInput>
        <AtomsCollapse label="Loans">
          <AtomsList
            :items="[{ label: 'Monthly', value: 3000, id: 32424 }]"
            @delete="deleteItem"
            @edit="editItem"
          ></AtomsList>
          <div class="flex justify-end">
            <AtomsButton :variant="'secondary'"> Add loan </AtomsButton>
          </div>
        </AtomsCollapse>
      </article>
      <article class="grid gap-3">
        <AtomsHeadline :size="3"> Other </AtomsHeadline>
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

const { user } = storeToRefs(useUserStore());

const deleteItem = (id: number) => {
  console.log("Delete", id);
};

const editItem = (id: number) => {
  console.log("Edit", id);
};

const handleLogout = async () => {
  try {
    const { error } = await userClient.auth.signOut();
    if (error) throw error;
    router.push("/log-in");
  } catch (error) {
    console.log(error);
  }
};
</script>
