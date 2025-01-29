<template>
  <div class="flex flex-col h-svh">
    <header class="py-5 px-5 md:px-10 flex gap-4 items-center">
      <NuxtLink :to="'/'">
        <Icon name="meteor-icons:home" size="40" />
      </NuxtLink>
      <slot name="header"></slot>
    </header>
    <main class="px-5 md:px-10 flex-1 max-w-screen-xl w-full self-center">
      <slot />
    </main>
    <nav
      class="sticky bottom-0 px-5 md:px-10 py-5 bg-white flex justify-between md:shadow-md md:rounded-full md:max-w-max md:min-w-96 md:bottom-10 md:self-center"
    >
      <NuxtLink
        v-for="nav in navs"
        :to="nav.route"
v-wave
        class="flex flex-col gap-2 justify-center items-center cursor-pointer"
        activeClass="text-rose-600"
      >
        <Icon :name="nav.icon" size="30" />

        <label>{{ nav.label }}</label>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
const iconBase = "lucide:";
const navs = [
  {
    label: "Home",
    icon: iconBase + "house",
    route: "/",
  },
  {
    label: "Apps",
    icon: iconBase + "grip",
    route: "/apps",
  },
  {
    label: "Family",
    icon: iconBase + "users-round",
    route: "/family",
  },
  {
    label: "Profile",
    icon: iconBase + "user-round",
    route: "/profile",
  },
];
</script>
