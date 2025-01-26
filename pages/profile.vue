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
          :value="userObject?.user_metadata?.email"
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
        <AtomsInput
          :type="'number'"
          :placeholder="'Loans'"
          :icon="'meteor-icons:dollar'"
        ></AtomsInput>
      </article>
      <article class="grid gap-3">
        <AtomsHeadline :size="3"> Other </AtomsHeadline>
        <AtomsButton @click="handleLogout"> Log me out, please. </AtomsButton>
      </article>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
const userClient = useSupabaseClient();
const userObject = useSupabaseUser();
const router = useRouter();

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
