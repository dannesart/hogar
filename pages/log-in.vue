<template>
  <div
    class="p-10 flex flex-col justify-between h-screen bg-center bg-cover relative"
  >
    <img src="~/assets/home.svg" />

    <div class="flex flex-col items-center justify-center">
      <h1 class="text-4xl text-blue-950 font-extrabold">Welcome back!</h1>
      <h2 class="text-4xl text-rose-400 font-extrabold">Sign in</h2>
    </div>

    <div class="grid gap-8 sticky bottom-10 z-10">
      <div class="flex flex-col gap-6 text-white justify-center">
        <AtomsButton @click="social('google')">Google</AtomsButton>
        <AtomsButton :variant="'secondary'" @click="social('github')"
          >Github</AtomsButton
        >
      </div>
    </div>
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

useHead({
  title: "Log in",
  meta: [
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "viewport",
      content:
        "minimal-ui, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    },
  ],
});
</script>
