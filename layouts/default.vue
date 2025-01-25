<template>
  <div class="flex flex-col h-svh">
    <header class="p-10 flex justify-between items-center">
      <Icon name="meteor-icons:home" size="40" />
    </header>
    <main class="p-10 flex-1">
      <slot />
    </main>
    <nav class="sticky px-10 py-5 flex justify-between">
      <a
        class="hover:bg-rose-300 w-16 h-16 flex items-center justify-center rounded-full"
      >
        <Icon name="meteor-icons:app-gallery" size="30" />
      </a>
      <a
        class="hover:bg-rose-300 w-16 h-16 flex items-center justify-center rounded-full"
      >
        <Icon name="meteor-icons:user" size="30" />
      </a>
      <a
        class="hover:bg-rose-300 w-16 h-16 flex items-center justify-center rounded-full"
      >
        <Icon name="meteor-icons:home" size="30" />
      </a>
      <a
        @click="handleLogout"
        class="hover:bg-rose-300 w-16 h-16 flex items-center justify-center rounded-full"
      >
        <Icon name="meteor-icons:power" size="30" />
      </a>
    </nav>
  </div>
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
