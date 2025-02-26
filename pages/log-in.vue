<template>
  <div class="p-10 flex flex-col justify-between h-svh bg-rose-50 relative">
    <div class="flex justify-between">
      <AtomsHeadline :size="3"> Hogar </AtomsHeadline>
    </div>

    <div
      class="flex flex-col gap-1 md:self-center md:w-full md:max-w-screen-sm font-figtree"
    >
      <AtomsHeadline :size="1"> Let's move in together! </AtomsHeadline>
    </div>

    <div
      class="grid gap-8 sticky bottom-10 md:self-center z-10 md:w-full md:max-w-screen-sm"
    >
      <div class="flex flex-col gap-6 text-white justify-center">
        <AtomsHeadline :size="2" :variant="'light'">Sign in</AtomsHeadline>
        <AtomsButton @click="social('google')" :loading="isLoginIn">
          <Icon name="meteor-icons:google" size="30" />
          Google
        </AtomsButton>
        <!-- <AtomsButton :variant="'secondary'" @click="social('github')">
          <Icon name="meteor-icons:github" size="30" /> Github</AtomsButton
        > -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Provider } from "@supabase/auth-js";
const supabase = useSupabaseClient();
const isLoginIn = ref(false);
const darkMode = ref(false);

const social = async (provider: Provider) => {
  isLoginIn.value = true;
  await supabase.auth.signInWithOAuth({
    provider: provider,
    options: { redirectTo: "/" },
  });
  isLoginIn.value = false;
};
</script>

<style>
.sb {
  background: linear-gradient(150deg, #ecedee, transparent 30%),
    linear-gradient(330deg, rgb(210, 206, 242), transparent 30%),
    linear-gradient(225deg, #fff0be, #fbdce7, #e2fae1, powderblue);
}
</style>
