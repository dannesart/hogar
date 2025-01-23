<template>
  <NuxtLayout>
    <div v-if="userObject" class="grid gap-8">
      <h2 class="text-6xl text-blue-950 font-extrabold">
        Welcome,
        {{
          userObject.user_metadata?.user_name ||
          userObject.user_metadata?.name?.split(" ")[0] ||
          userObject.user_metadata?.full_name?.split(" ")[0]
        }}.
      </h2>
      <div>
        <AtomsButton @click="handleLogout"> Log me out, please </AtomsButton>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const userObject = useSupabaseUser();
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

<script lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
