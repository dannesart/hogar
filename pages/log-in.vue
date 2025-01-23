<template>
  <NuxtLayout>
    <div class="grid gap-8">
      <h2 class="text-6xl text-blue-950 font-extrabold">Log in</h2>

      <div class="flex gap-6">
        <AtomsButton @click="social('google')">Google</AtomsButton>
        <AtomsButton @click="social('github')">Github</AtomsButton>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Provider } from "@supabase/auth-js";
const supabase = useSupabaseClient();

const social = async (provider: Provider) => {
  await supabase.auth.signInWithOAuth({
    provider: provider,
    options: { redirectTo: "/" },
  });
};
</script>
