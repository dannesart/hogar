<template>
  <NuxtLayout>
    <template v-slot:header>
<h1 class="text-4xl text-blue-950 font-extrabold">Profile</h1>
</template>
    <AtomsButton @click="handleLogout"> Log me out, please. </AtomsButton>
  </NuxtLayout>
</template>

<script setup lang="ts">
const userClient = useSupabaseClient();
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
