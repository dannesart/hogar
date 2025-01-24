<template>
  <div
    class="p-10 flex flex-col justify-between h-screen bg-[url(~/assets/splash.jpg)] bg-cover relative"
  >
    <header>
      <div class="text-4xl text-white font-extrabold">Hogar</div>
    </header>

    <div class="grid gap-8 sticky bottom-10 z-10">
      <h2 class="text-2xl text-white font-extrabold">Log in</h2>

      <div class="flex flex-col gap-6 text-white justify-center">
        <AtomsButton @click="social('google')">Google</AtomsButton>
        <AtomsButton @click="social('github')">Github</AtomsButton>
      </div>
    </div>

    <div
      class="bottom-0 absolute bg-gradient-to-t to-transparent from-black/40 h-96 left-0 right-0"
    ></div>
  </div>
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
