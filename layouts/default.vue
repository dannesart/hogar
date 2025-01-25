<template>
  <div class="flex flex-col h-svh">
    <header class="p-10 flex justify-between items-center">
      <NuxtLink :to="'/'">
        <Icon name="meteor-icons:home" size="40" />
      </NuxtLink>
    </header>
    <main class="px-10 flex-1">
      <slot />
    </main>
    <nav class="sticky px-10 py-5 flex justify-between">
      <NuxtLink
        :to="'/apps'"
        class="hover:bg-rose-300 w-16 h-16 flex items-center justify-center rounded-full"
        activeClass="bg-rose-300"
      >
        <Icon name="meteor-icons:app-gallery" size="30" />
      </NuxtLink>
      <NuxtLink
        :to="'/home'"
        activeClass="bg-rose-300"
        class="hover:bg-rose-300 w-16 h-16 flex items-center justify-center rounded-full"
      >
        <Icon name="meteor-icons:home" size="30" />
      </NuxtLink>
      <NuxtLink
        activeClass="bg-rose-300"
        :to="'/profile'"
        class="hover:bg-rose-300 w-16 h-16 flex items-center justify-center rounded-full"
      >
        <Icon name="meteor-icons:user" size="30" />
      </NuxtLink>
    </nav>
  </div>
</template>
