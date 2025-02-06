<template>
  <div class="p-10 flex flex-col justify-between h-svh sb relative">
    <AtomsHeadline :size="3"> Hogar </AtomsHeadline>

    <div
      class="flex flex-col gap-1 md:self-center md:w-full md:max-w-screen-sm font-figtree"
    >
      <h1 class="text-6xl text-blue-950 font-extrabold">Welcome!</h1>
      <h2 class="text-6xl text-rose-300 font-extrabold">Sign in</h2>
    </div>

    <div
      class="grid gap-8 sticky bottom-10 md:self-center z-10 md:w-full md:max-w-screen-sm"
    >
      <div class="flex flex-col gap-6 text-white justify-center">
        <AtomsButton @click="social('google')">
          <Icon name="meteor-icons:google" size="30" />
          Google
        </AtomsButton>
        <AtomsButton :variant="'secondary'" @click="social('github')">
          <Icon name="meteor-icons:github" size="30" /> Github</AtomsButton
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
</script>

<style>
.sb {
  background: linear-gradient(150deg, #ecedee, transparent 30%),
    linear-gradient(330deg, rgb(210, 206, 242), transparent 30%),
    linear-gradient(225deg, #fff0be, #fbdce7, #e2fae1, powderblue);
}
</style>
