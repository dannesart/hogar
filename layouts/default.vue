<template>
  <div class="flex flex-col h-svh">
    <header class="py-5 px-5 md:px-10 flex gap-4 items-center">
      <NuxtLink :to="'/'">
        <Icon name="meteor-icons:home" size="40" />
      </NuxtLink>
      <slot name="header"></slot>
    </header>
    <main class="px-5 md:px-10 flex-1">
      <slot />
    </main>
    <nav
      class="sticky bottom-0 px-5 md:px-10 py-5 flex justify-between md:shadow-md md:rounded-full md:max-w-max md:min-w-96 md:bottom-10 md:self-center"
    >
      <NuxtLink
        v-for="nav in navs"
        :to="nav.route"
        class="flex flex-col justify-center items-center"
        activeClass="active"
      >
        <div class="icon">
          <Icon :name="nav.icon" size="30" />
        </div>
        <label>{{ nav.label }}</label>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
const navs = [
  {
    label: "Apps",
    icon: "meteor-icons:app-gallery",
    route: "/apps",
  },
  {
    label: "Your home",
    icon: "meteor-icons:home",
    route: "/home",
  },
  {
    label: "Profile",
    icon: "meteor-icons:user",
    route: "/profile",
  },
];
</script>

<style>
.icon {
  @apply hover:bg-rose-300 w-16 h-16 flex items-center justify-center rounded-full;
}
.active .icon {
  @apply bg-rose-300;
}
</style>
